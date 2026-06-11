// Imported from src/ so Astro optimizes them (resize, modern formats, hashing).
// Anything in public/ is served as-is and is NOT optimized.
//
// Only import images that are actually rendered — an unused import still gets
// emitted at full size. The extra speaker photos live in src/assets/images/;
// import them here when you build an About/gallery section, e.g.:
//   import dss1 from "../assets/images/data-streaming-summit-2025-1.jpg";
//   export const gallery = [dss1, ...];
import keynote from "../assets/images/data-streaming-summit-2025-keynote.jpg";

/** Primary speaker photo used for the home hero and Open Graph card. */
export const hero = keynote;
