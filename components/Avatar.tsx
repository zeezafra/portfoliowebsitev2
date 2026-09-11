// Real portrait, same asset already used by Hero and AboutMeCard — not a
// new/invented image, just reused here so the sidebar matches the rest of
// the site instead of falling back to initials.
import Image from "next/image";

export function Avatar({
  name,
  size = 48,
  className = "",
}: {
  name: string;
  size?: number;
  className?: string;
}) {
  return (
    <Image
      src="/images/hero-portrait.png"
      alt={name}
      width={size}
      height={size}
      className={`shrink-0 rounded-full object-cover ${className}`}
      style={{ width: size, height: size }}
    />
  );
}
