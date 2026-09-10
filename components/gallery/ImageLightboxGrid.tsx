"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

export type GalleryImage = {
  src: string;
  alt: string;
  /** Optional caption shown under the thumbnail and in the lightbox
   *  (e.g. a certification's issuer). Omit for plain screenshots. */
  caption?: string;
};

/**
 * Thumbnail grid + fullscreen lightbox (prev/next, Escape/click-outside
 * to close, arrow-key navigation). Pulled out of Phase 6's ProjectGallery
 * so it has exactly one implementation — the roadmap explicitly calls for
 * reusing "whatever lightbox approach Phase 6 used" rather than building
 * a second one for the certifications gallery.
 *
 * Renders only the grid + modal — callers own their own heading and
 * empty-state fallback, since what an empty gallery should show differs
 * per use (a category-icon placeholder for project screenshots vs. an
 * "add a certification" prompt here).
 */
export function ImageLightboxGrid({
  images,
  columnsClassName = "grid-cols-2 sm:grid-cols-3",
}: {
  images: GalleryImage[];
  columnsClassName?: string;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const close = useCallback(() => setOpenIndex(null), []);
  const showPrev = useCallback(
    () => setOpenIndex((i) => (i === null ? i : (i - 1 + images.length) % images.length)),
    [images.length],
  );
  const showNext = useCallback(
    () => setOpenIndex((i) => (i === null ? i : (i + 1) % images.length)),
    [images.length],
  );

  useEffect(() => {
    if (openIndex === null) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") showPrev();
      if (e.key === "ArrowRight") showNext();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openIndex, close, showPrev, showNext]);

  if (images.length === 0) return null;

  const active = openIndex !== null ? images[openIndex] : null;

  return (
    <>
      <div className={`grid gap-3 ${columnsClassName}`}>
        {images.map((image, index) => (
          <button
            key={image.src}
            type="button"
            onClick={() => setOpenIndex(index)}
            aria-label={`Open image ${index + 1} of ${images.length}${
              image.caption ? `: ${image.caption}` : ""
            }`}
            className="group relative flex flex-col overflow-hidden rounded-radius border border-card-border shadow-card"
          >
            <span className="relative block aspect-video w-full">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover transition-transform group-hover:scale-105"
              />
            </span>
            {image.caption && (
              <span className="bg-card px-2 py-1.5 text-center text-[11px] font-medium text-heading">
                {image.caption}
              </span>
            )}
          </button>
        ))}
      </div>

      <AnimatePresence>
        {active && openIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/80 p-4"
            onClick={close}
            role="dialog"
            aria-modal="true"
            aria-label={`Image ${openIndex + 1} of ${images.length}${
              active.caption ? `: ${active.caption}` : ""
            }`}
          >
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className="absolute right-4 top-4 text-white/80 hover:text-white"
            >
              <X className="h-6 w-6" />
            </button>

            {images.length > 1 && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  showPrev();
                }}
                aria-label="Previous image"
                className="absolute left-4 text-white/80 hover:text-white"
              >
                <ChevronLeft className="h-8 w-8" />
              </button>
            )}

            <motion.div
              key={openIndex}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.15 }}
              className="flex max-h-[85vh] max-w-4xl flex-col gap-2"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative h-[70vh] w-full">
                <Image src={active.src} alt={active.alt} fill className="object-contain" />
              </div>
              {active.caption && (
                <p className="text-center text-sm font-medium text-white/90">{active.caption}</p>
              )}
            </motion.div>

            {images.length > 1 && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  showNext();
                }}
                aria-label="Next image"
                className="absolute right-4 text-white/80 hover:text-white"
              >
                <ChevronRight className="h-8 w-8" />
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
