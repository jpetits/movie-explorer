import { fetchPopularMovies } from "@/app/lib/data";

export const revalidate = 3600;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = Number(searchParams.get("page")) || 1;
  const movies = await fetchPopularMovies(page);
  return Response.json(movies);
}
