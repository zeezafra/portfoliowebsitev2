import { Images } from "lucide-react";
import { PlaceholderThumb } from "@/components/bento/PlaceholderThumb";
import { ImageLightboxGrid } from "@/components/gallery/ImageLightboxGrid";
import { CATEGORY_ICONS } from "@/lib/project-category";
import type { Project } from "@/data/projects";

/**
 * Screenshots section for a case-study page. The grid + lightbox itself
 * now lives in the shared `ImageLightboxGrid` (Phase 7 reuses it for the
 * certifications gallery); this component just adds the "Screenshots"
 * heading and the category-icon placeholder shown when a project has no
 * images yet — true for every project today.
 *
 * Also no longer a client component itself — now that the interactive
 * lightbox lives in ImageLightboxGrid, this wrapper has no state of its
 * own and can render on the server like the rest of the page.
 */
export function ProjectGallery({
  images,
  title,
  category,
}: {
  images: string[];
  title: string;
  category: Project["category"];
}) {
  const FallbackIcon = CATEGORY_ICONS[category];

  return (
    <section className="flex flex-col gap-2">
      <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-foreground/50">
        <Images className="h-4 w-4 text-primary" aria-hidden="true" />
        Screenshots
      </h2>

      {images.length > 0 ? (
        <ImageLightboxGrid
          images={images.map((src, index) => ({
            src,
            alt: `${title} screenshot ${index + 1}`,
          }))}
        />
      ) : (
        <PlaceholderThumb icon={FallbackIcon} className="h-40 w-full" />
      )}
    </section>
  );
}
