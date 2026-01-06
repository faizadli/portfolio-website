"use client";
import Image from "next/image";
import { X } from "lucide-react";
import React from "react";

type DetailModalProps = {
  open: boolean;
  onClose: () => void;
  image?: string;
  title?: string;
  subtitle?: string;
  description?: string;
  tags?: string[];
};

export default function DetailModal({
  open,
  onClose,
  image,
  title,
  subtitle,
  description,
  tags,
}: DetailModalProps) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="bg-card relative z-10 flex max-h-[85vh] w-full max-w-2xl flex-col rounded-xl border border-white/10 shadow-xl">
        <button
          aria-label="Close"
          onClick={onClose}
          className="text-foreground absolute top-3 right-3 z-20 rounded-full bg-white/20 p-2 shadow-md backdrop-blur-sm hover:bg-white/30"
        >
          <X className="size-5 text-black" />
        </button>
        <div className="overflow-y-auto p-5">
          {image && (
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-md">
              <Image
                src={image}
                alt={title || ""}
                fill
                className="object-cover"
                unoptimized
              />
            </div>
          )}
          {title && <h3 className="mt-4 text-xl font-semibold">{title}</h3>}
          {subtitle && <p className="subtle mt-1 text-sm">{subtitle}</p>}
          {tags && tags.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {tags.map((t) => (
                <span
                  key={t}
                  className="border-accent/30 bg-accent/15 text-foreground rounded-full border px-2 py-1 text-xs"
                >
                  {t}
                </span>
              ))}
            </div>
          )}
          {description && (
            <p className="text-foreground/80 mt-4 text-sm">{description}</p>
          )}
        </div>
      </div>
    </div>
  );
}
