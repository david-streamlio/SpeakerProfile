---
title: "Building Personalized Feeds with Broker-Side Filtering in Apache Pulsar"
description: "Why filtering messages at the broker — instead of in every consumer — is the key to building scalable personalized feeds, and how Pulsar makes it possible."
pubDate: 2025-09-15
tags: ["apache-pulsar", "streaming", "architecture"]
draft: false
---

Personalized feeds are everywhere — your social timeline, a product
recommendation rail, an alerts inbox. They all share the same hard problem: a
single firehose of events has to be fanned out to millions of consumers, where
**each consumer only cares about a tiny slice** of the stream.

The naive approach is to deliver everything to everyone and let each consumer
throw away what it doesn't need. That works on a whiteboard and falls apart in
production. This post is the written companion to my Data Streaming Summit 2025
talk, and it walks through why **broker-side filtering** is the lever that makes
personalized feeds actually scale.

## The cost of client-side filtering

When every consumer receives the full stream and discards 99% of it, you pay for
that waste three times over:

- **Network** — you ship bytes that are immediately dropped.
- **Broker throughput** — the broker dispatches messages no one will keep.
- **Consumer CPU** — every client deserializes and inspects messages it will
  never use.

Multiply that across millions of subscriptions and the economics stop working.
The filtering logic is also duplicated in every consumer, which means every
client language and every team reimplements the same predicate — and they drift.

## Move the predicate to the broker

The insight is simple: **the broker already has the message in hand.** If it can
evaluate "does this subscriber want this message?" before dispatch, it can skip
delivery entirely. The bytes never leave the broker, the consumer never wakes
up, and the predicate lives in exactly one place.

In Apache Pulsar, this is implemented with an **Entry Filter** — a plugin that
runs on the broker and returns `ACCEPT`, `REJECT`, or `RESCHEDULE` for each
entry, per subscription. Subscribers attach their interest as subscription
properties, and the filter consults message properties to make the call.

```java
public FilterResult filterEntry(Entry entry, FilterContext context) {
    String region = context.getMsgMetadata()
        .getPropertiesList().stream()
        .filter(kv -> kv.getKey().equals("region"))
        .map(KeyValue::getValue)
        .findFirst().orElse(null);

    String wanted = context.getSubscription()
        .getSubscriptionProperties().get("region");

    return wanted == null || wanted.equals(region)
        ? FilterResult.ACCEPT
        : FilterResult.REJECT;
}
```

Now a consumer subscribed with `region=eu-west` simply never sees messages
tagged for other regions — and the broker never spent the bandwidth to tell it.

## Why this is the right altitude

Broker-side filtering isn't just an optimization; it changes the architecture:

1. **One topic, many audiences.** You publish once to a shared topic and let each
   subscription express its own slice, instead of maintaining a topic per
   audience segment.
2. **Predicate lives server-side.** Filtering logic is centralized, versioned,
   and consistent across every consumer language.
3. **Cost scales with delivered messages, not produced ones.** The expensive
   resource — egress and consumer wake-ups — tracks what people actually read.

## Where to go from here

Broker-side filtering is the foundation, but a production feed layers more on
top: ordering guarantees, retention tuned to how far back a feed scrolls, and
careful key partitioning so a single hot user doesn't starve the rest. I cover
those trade-offs in the [full talk](https://streamnative.io/videos/dss-san-francisco-2025-everything-you-wanted-from-broker-side-filtering-and-more-building-personalized-feeds-with-apache).

If you're building anything that fans one stream out to many narrow audiences,
start by asking a simple question: *how much of what I deliver gets thrown away?*
If the answer is "most of it," the filter belongs on the broker.
