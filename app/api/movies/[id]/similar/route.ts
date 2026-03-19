import { fetchSimilarMovies } from "@/app/lib/data";

export const revalidate = 3600;

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const { searchParams } = new URL(request.url);
  const page = Number(searchParams.get("page")) || 1;
  const movies = await fetchSimilarMovies(Number(id), page);
  return Response.json(movies);
}
