import Link from "next/link";
import { memo } from "react";

const DashboardHeader = memo(function DashboardHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link
          href="/list"
          className="text-sm font-semibold tracking-wide text-zinc-100 hover:text-white transition-colors"
        >
          MOVIE EXPLORER
        </Link>
        <Link
          href="/search"
          className="text-sm text-zinc-400 hover:text-zinc-100 transition-colors"
        >
          Search
        </Link>
      </div>
    </header>
  );
});

export default DashboardHeader;
