import Link from "next/link";
import { Code2 } from "lucide-react";
import { profile } from "@/data/profile";
import { SearchBar } from "@/components/SearchBar";

/**
 * Persistent header row for the main content column — a compact
 * wordmark (distinct from the sidebar's fuller profile block, same as
 * the reference layout's logo+search top bar) plus the quick-search
 * field. Rendered once from the root layout so it's consistent across
 * every route, not just the home page.
 */
export function TopBar() {
  return (
    <div className="flex flex-col gap-4 px-6 pt-6 sm:flex-row sm:items-center sm:justify-between md:px-12 md:pt-8">
      <Link href="/" className="flex items-center gap-2 text-heading">
        <Code2 className="h-5 w-5 text-primary" aria-hidden="true" />
        <span className="text-lg font-semibold">{profile.name}</span>
      </Link>
      <SearchBar />
    </div>
  );
}
