import { Award, Plus } from "lucide-react";
import { profile } from "@/data/profile";
import { ImageLightboxGrid } from "@/components/gallery/ImageLightboxGrid";

// Phase 7. Reuses the same lightbox as the Phase 6 case-study screenshot
// galleries (ImageLightboxGrid) rather than a second implementation, per
// the roadmap. Certifications without an uploaded `image` still show as
// a labeled card in the grid (name/issuer, no thumbnail) rather than
// being silently dropped — so adding a certification's text before its
// scan still shows up here.
export default function CertificationsPage() {
  const { certifications } = profile;
  const withImages = certifications.filter((cert) => cert.image.trim().length > 0);
  const withoutImages = certifications.filter((cert) => cert.image.trim().length === 0);

  return (
    <div className="flex flex-col gap-8 px-6 py-12 md:px-12 md:py-16">
      <header className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold text-heading md:text-4xl">Certifications</h1>
        <p className="max-w-2xl text-foreground/70">
          Credentials and completed training relevant to IT support and web development work.
        </p>
      </header>

      {certifications.length === 0 ? (
        <div className="flex flex-col items-start gap-3 rounded-radius border border-dashed border-card-border p-6">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/5 text-primary/40">
            <Plus className="h-4 w-4" aria-hidden="true" />
          </span>
          <p className="max-w-md text-sm italic text-foreground/40">
            Add your real certifications (name, issuer, and a scan/photo under
            /public/images) to data/profile.ts — nothing invented here.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          {withImages.length > 0 && (
            <ImageLightboxGrid
              columnsClassName="grid-cols-2 sm:grid-cols-3 lg:grid-cols-4"
              images={withImages.map((cert) => ({
                src: cert.image,
                alt: `${cert.name} certificate`,
                caption: `${cert.name} — ${cert.issuer}`,
              }))}
            />
          )}

          {withoutImages.length > 0 && (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {withoutImages.map((cert) => (
                <div
                  key={cert.name}
                  className="flex flex-col items-center justify-center gap-2 rounded-radius border border-dashed border-card-border p-4 text-center"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/5 text-primary/40">
                    <Award className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <p className="text-xs font-medium text-heading">{cert.name}</p>
                  <p className="text-[11px] text-foreground/50">{cert.issuer}</p>
                  <p className="text-[10px] italic text-foreground/40">Add scan/photo</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
