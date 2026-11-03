// Pulls the video id out of the YouTube URL shapes used in the data files
// (watch?v=, youtu.be/, /shorts/, /embed/). Returns undefined for non-YouTube links.
export function youtubeId(url?: string): string | undefined {
  if (!url) return undefined;
  const m = url.match(
    /(?:youtube\.com\/(?:watch\?(?:.*&)?v=|shorts\/|embed\/)|youtu\.be\/)([\w-]{11})/,
  );
  return m?.[1];
}

/** YouTube's own 480×360 thumbnail for a video URL, if it is a YouTube link. */
export function youtubeThumb(url?: string): string | undefined {
  const id = youtubeId(url);
  return id ? `https://i.ytimg.com/vi/${id}/hqdefault.jpg` : undefined;
}
