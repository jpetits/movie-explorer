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
        initialError={null}
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
        initialError={null}
        searchQuery=""
        searchMovies={mockSearchMovies}
      />,
    );

    expect(screen.queryByText("No movies found.")).not.toBeInTheDocument();
  });

  it("displays error message when initialError is provided", () => {
    const mockSearchMovies = jest.fn();
    render(
      <SearchMovie
        initialMovieList={[]}
        initialError="An error occurred"
        searchQuery="Inception"
        searchMovies={mockSearchMovies}
      />,
    );

    expect(screen.getByText("An error occurred")).toBeInTheDocument();
  });
});
