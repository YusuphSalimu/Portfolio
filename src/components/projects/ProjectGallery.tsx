"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { ProjectImage } from "@/lib/projects/schema";

export default function ProjectGallery({ images }: { images: ProjectImage[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (activeIndex === null) {
      triggerRef.current?.focus();
      return;
    }

    closeButtonRef.current?.focus();
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveIndex(null);
      } else if (event.key === "ArrowRight") {
        setActiveIndex((index) => (index === null ? 0 : (index + 1) % images.length));
      } else if (event.key === "ArrowLeft") {
        setActiveIndex((index) =>
          index === null ? 0 : (index - 1 + images.length) % images.length,
        );
      } else if (event.key === "Tab" && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"])',
        );
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex, images.length]);

  if (images.length === 0) {
    return <p className="muted-copy">Screenshots will be added when available.</p>;
  }

  const activeImage = activeIndex === null ? undefined : images[activeIndex];

  return (
    <>
      <div className="project-gallery">
        {images.map((image, index) => (
          <button
            key={image.src}
            type="button"
            className="project-gallery__item"
            aria-label={`Open screenshot ${index + 1}: ${image.alt}`}
            onClick={(event) => {
              triggerRef.current = event.currentTarget;
              setActiveIndex(index);
            }}
          >
            <Image src={image.src} alt={image.alt} fill sizes="(max-width: 700px) 100vw, 50vw" />
          </button>
        ))}
      </div>
      {activeImage && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Project screenshot"
          tabIndex={-1}
          ref={dialogRef}
          onClick={(event) => {
            if (event.target === event.currentTarget) setActiveIndex(null);
          }}
        >
          <button
            ref={closeButtonRef}
            type="button"
            className="lightbox__close"
            onClick={() => setActiveIndex(null)}
            aria-label="Close screenshot"
          >
            ×
          </button>
          <button
            type="button"
            className="lightbox__previous"
            onClick={() =>
              setActiveIndex((index) =>
                index === null ? 0 : (index - 1 + images.length) % images.length,
              )
            }
            aria-label="Previous screenshot"
          >
            ←
          </button>
          <div className="lightbox__image">
            <Image src={activeImage.src} alt={activeImage.alt} fill sizes="95vw" />
          </div>
          <button
            type="button"
            className="lightbox__next"
            onClick={() =>
              setActiveIndex((index) => (index === null ? 0 : (index + 1) % images.length))
            }
            aria-label="Next screenshot"
          >
            →
          </button>
          <p>{activeImage.alt}</p>
        </div>
      )}
    </>
  );
}
