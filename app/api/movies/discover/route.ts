import { z } from "zod";
import { fetchDiscoverMovies } from "@/app/lib/data";
import { DiscoverParamsSchema } from "@/app/lib/schema";

export const revalidate = 3600;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const result = DiscoverParamsSchema.safeParse(
    Object.fromEntries(searchParams.entries()),
  );
  if (!result.success) {
    return Response.json({ error: result.error.message }, { status: 400 });
  }

  const movies = await fetchDiscoverMovies(result.data);
  return Response.json(movies);
}
