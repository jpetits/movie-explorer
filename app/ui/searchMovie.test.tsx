jest.mock("../lib/data", () => ({
  searchMovies: jest.fn(),
}));

import { searchMovies } from "../lib/data";
import SearchMovie from "./searchMovie";
import { fireEvent, render, screen } from "@testing-library/react";

jest.mock("next/navigation", () => ({
  useSearchParams: jest.fn(),
  useRouter: () => ({ replace: jest.fn() }),
  usePathname: () => "/search",
}));

describe("SearchMovie", () => {
  it("shows results after search", async () => {
    (searchMovies as jest.Mock).mockResolvedValue({
      success: true,
      data: [
        {
          id: 1,
          title: "Inception",
          release_date: "2010-07-16",
          vote_average: 8.8,
        },
      ],
    });

    render(
      <SearchMovie
        initialMovies={[]}
        initialError={null}
        searchQuery={undefined}
      />,
    );
    fireEvent.change(screen.getByLabelText(/search movies/i), {
      target: { value: "Inception" },
    });

    const movieTitle = await screen.findByText(/inception/i);
    expect(movieTitle).toBeInTheDocument();
  });
});
