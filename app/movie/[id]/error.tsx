"use client";

import { ROUTES } from "@/app/routing/constants";
import Link from "next/dist/client/link";

export default function Error() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4">
      <h1>Something went wrong.</h1>
      <p>{"We couldn't load the movie. Please try again later."}</p>
      <Link href={ROUTES.list} className="text-sm underline underline-offset-4">
        Back to list
      </Link>
    </div>
  );
}
