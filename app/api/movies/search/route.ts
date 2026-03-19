import { searchMovies } from "@/app/lib/data";

export const revalidate = 600;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = Number(searchParams.get("page")) || 1;
  const searchQuery = searchParams.get("query") || "";
  const movies = await searchMovies(searchQuery, page);
  return Response.json(movies);
}
