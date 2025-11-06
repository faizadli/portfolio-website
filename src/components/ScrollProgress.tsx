"use client";
import { useEffect, useState } from "react";

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      const p = Math.min(100, Math.max(0, (scrollTop / (scrollHeight - clientHeight)) * 100));
      setProgress(p);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed left-0 right-0 top-0 z-50">
      <div className="h-[3px] w-full bg-background/60" />
      <div
        className="h-[3px] bg-gradient-to-r from-brand via-accent to-accent"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}