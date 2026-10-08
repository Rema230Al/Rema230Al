"use client";

import { useRef } from "react";
import Image from "next/image";

type Props = { src: string; width: number; height: number; alt: string };

/** A small thumbnail that opens the full image in a native modal dialog (Esc, backdrop click or Close). */
export default function Lightbox({ src, width, height, alt }: Props) {
  const dialog = useRef<HTMLDialogElement>(null);
  const close = () => dialog.current?.close();

  return (
    <>
      <button
        type="button"
        onClick={() => dialog.current?.showModal()}
        aria-label={`Open larger: ${alt}`}
        className="group block w-48 overflow-hidden rounded-md border border-line md:w-56"
      >
        <Image
          src={src}
          width={width}
          height={height}
          alt={alt}
          className="h-auto w-full transition-transform duration-700 group-hover:scale-105"
        />
      </button>

      <dialog
        ref={dialog}
        data-lenis-prevent
        aria-label={alt}
        onClick={(e) => e.target === dialog.current && close()}
        className="lightbox m-auto overflow-visible border-0 bg-transparent p-0 text-ink backdrop:bg-void/85 backdrop:backdrop-blur-sm"
      >
        <Image
          src={src}
          width={width}
          height={height}
          alt={alt}
          className="h-auto max-h-[85svh] w-auto max-w-[min(92vw,1100px)] rounded-md"
        />
        <button
          type="button"
          onClick={close}
          className="link-underline absolute -top-8 right-0 font-mono text-[11px] uppercase tracking-[0.2em] text-ink/80 hover:text-ink"
        >
          Close ✕
        </button>
      </dialog>
    </>
  );
}
