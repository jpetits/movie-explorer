import SearchMovie from "@/app/ui/searchMovie";

export default function Search({
  params,
}: {
  params: Promise<{ query: string }>;
}) {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Search Movies</h1>
      <p className="text-gray-600">Search functionality coming soon...</p>
      <SearchMovie />
    </div>
  );
}
