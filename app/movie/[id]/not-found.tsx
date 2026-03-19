import { ROUTES } from "@/app/routing/constants";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4">
      <h2 className="text-2xl font-semibold">Movie not found</h2>
      <p className="text-zinc-500">
        {"The movie you're looking for doesn't exist."}
      </p>
      <Link href={ROUTES.list} className="text-sm underline underline-offset-4">
        Back to list
      </Link>
    </div>
  );
}
