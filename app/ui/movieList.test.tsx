import MovieList from "./movieList";
import { render, screen } from "@testing-library/react";
import { fetchPopularMovies } from "../lib/data";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  function wrapper({ children }: { children: React.ReactNode }) {
    return (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
  }

  return wrapper;
}

jest.mock("../lib/data", () => ({
  fetchPopularMovies: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  useSearchParams: jest.fn(),
  useRouter: () => ({ replace: jest.fn() }),
  usePathname: () => "/list",
}));

const mockObserve = jest.fn();
const mockDisconnect = jest.fn();

global.IntersectionObserver = jest.fn().mockImplementation((callback) => ({
  observe: mockObserve,
  disconnect: mockDisconnect,
  unobserve: jest.fn(),
}));

describe("MovieList", () => {
  it("renders movie list", async () => {
    let triggerIntersection: (entries: IntersectionObserverEntry[]) => void;

    (global.IntersectionObserver as jest.Mock).mockImplementation(
      (callback) => {
        triggerIntersection = callback;
        return {
          observe: jest.fn(),
          disconnect: jest.fn(),
          unobserve: jest.fn(),
        };
      },
    );

    render(
      <MovieList
        initialMovieList={[
          {
            id: 1,
            title: "Inception",
            release_date: "2010-07-16",
            vote_average: 8.8,
          },
        ]}
        error={null}
        fetchMore={fetchPopularMovies}
      />,
      { wrapper: createWrapper() },
    );

    (fetchPopularMovies as jest.Mock).mockResolvedValue({
      success: true,
      data: [
        {
          id: 2,
          title: "The Dark Knight",
          release_date: "2008-07-18",
          vote_average: 9.0,
        },
      ],
    });

    const movieTitle = await screen.findByText(/inception/i);
    expect(movieTitle).toBeInTheDocument();

    triggerIntersection!([
      { isIntersecting: true } as IntersectionObserverEntry,
    ]);

    expect(fetchPopularMovies).toHaveBeenCalledWith(2);
  });
});
