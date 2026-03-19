import { fireEvent, render, screen } from "@testing-library/react";
import MovieTile from "./movieTile";
import { formatDate } from "../../lib/utils";

jest.mock("next/navigation", () => ({
  useSearchParams: jest.fn(),
  useRouter: () => ({ replace: jest.fn() }),
  usePathname: () => "/list",
}));

describe("MovieTile", () => {
  it("renders movie tile with image", () => {
    render(
      <MovieTile
        movie={{
          id: 1,
          title: "Inception",
          release_date: "2010-07-16",
          vote_average: 8.8,
          poster_path: "/poster.jpg",
        }}
      />,
    );

    expect(screen.getByText("Inception")).toBeInTheDocument();
    expect(screen.getByText(formatDate("2010-07-16"))).toBeInTheDocument();
    expect(screen.getByText("8.8")).toBeInTheDocument();
    expect(screen.getByAltText("Inception")).toBeInTheDocument();
  });

  it("renders movie tile without image", () => {
    render(
      <MovieTile
        movie={{
          id: 1,
          title: "Inception",
          release_date: "2010-07-16",
          vote_average: 8.8,
          poster_path: null,
        }}
      />,
    );

    expect(screen.getByText("Inception")).toBeInTheDocument();
    expect(screen.getByText(formatDate("2010-07-16"))).toBeInTheDocument();
    expect(screen.getByText("8.8")).toBeInTheDocument();
    expect(screen.getByText("No Image")).toBeInTheDocument();
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/movie/1");
  });

  it("handles image error", () => {
    render(
      <MovieTile
        movie={{
          id: 1,
          title: "Inception",
          release_date: "2010-07-16",
          vote_average: 8.8,
          poster_path: "/invalid.jpg",
        }}
      />,
    );

    const img = screen.getByAltText("Inception") as HTMLImageElement;
    fireEvent.error(img);

    expect(screen.getByText("No Image")).toBeInTheDocument();
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/movie/1");
  });
});
