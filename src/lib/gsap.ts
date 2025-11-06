"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register once in client components that import this module
if (typeof window !== "undefined") {
  // Safe to call multiple times; GSAP handles duplicate registration gracefully
  gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger };