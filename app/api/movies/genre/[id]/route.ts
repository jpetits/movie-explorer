import { z } from "zod";
import { TMDB_MAX_PAGE } from "@/app/lib/tmdb";
import { fetchMoviesByGenre } from "@/app/lib/data";

const GenreParamsSchema = z.object({
  page: z.coerce.number().int().min(1).max(TMDB_MAX_PAGE).default(1),
  genreId: z.coerce.number().int().min(1),
});
export const revalidate = 3600;

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const { searchParams } = new URL(request.url);
  const result = GenreParamsSchema.safeParse({
    page: searchParams.get("page"),
    genreId: id,
  });
  if (!result.success) {
    return Response.json({ error: result.error.name }, { status: 400 });
  }
  const { page, genreId } = result.data;
  const movies = await fetchMoviesByGenre(genreId, page);
  return Response.json(movies);
}
