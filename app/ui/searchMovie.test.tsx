import { fireEvent, render, screen } from "@testing-library/react";
import SearchMovie from "./searchMovie";

jest.mock("next/navigation", () => ({
  useSearchParams: jest.fn(),
  useRouter: () => ({ replace: jest.fn() }),
  usePathname: () => "/search",
}));

describe("SearchMovie", () => {
  it("renders MovieList when searchQuery is provided", () => {
    const mockSearchMovies = jest.fn();
    render(
      <SearchMovie
        initialMovieList={[]}
        searchQuery="Inception"
        searchMovies={mockSearchMovies}
      />,
    );

    expect(screen.getByText("No movies found.")).toBeInTheDocument();
  });

  it("does not render MovieList when searchQuery is empty", () => {
    const mockSearchMovies = jest.fn();
    render(
      <SearchMovie
        initialMovieList={[]}
        searchQuery=""
        searchMovies={mockSearchMovies}
      />,
    );

    expect(screen.queryByText("No movies found.")).not.toBeInTheDocument();
  });
});
