import MovieList from "./movieList";
import { render, screen } from "@testing-library/react";
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

beforeEach(() => {
  global.fetch = jest.fn();
});

jest.mock("next/navigation", () => ({
  useSearchParams: jest.fn(),
  useRouter: () => ({ replace: jest.fn() }),
  usePathname: () => "/list",
}));

const mockObserve = jest.fn();
const mockDisconnect = jest.fn();

global.IntersectionObserver = jest.fn().mockImplementation(() => ({
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
        fetchMorePath="/api/movies/popular"
      />,
      { wrapper: createWrapper() },
    );

    expect(await screen.findByText(/inception/i)).toBeInTheDocument();
    expect(screen.queryByText(/the dark knight/i)).not.toBeInTheDocument();

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => [
        {
          id: 2,
          title: "The Dark Knight",
          release_date: "2008-07-18",
          vote_average: 9.0,
        },
      ],
    });

    triggerIntersection!([
      { isIntersecting: true } as IntersectionObserverEntry,
    ]);
    expect(await screen.findByText(/the dark knight/i)).toBeInTheDocument();
  });

  it("shows error when fetch fails", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
    });

    render(
      <MovieList initialMovieList={[]} fetchMorePath="/api/movies/popular" />,
      { wrapper: createWrapper() },
    );

    expect(await screen.findByText(/No movies found./i)).toBeInTheDocument();
  });

  it("shows no movies found message when list is empty", async () => {
    render(
      <MovieList initialMovieList={[]} fetchMorePath="/api/movies/popular" />,
      { wrapper: createWrapper() },
    );

    expect(await screen.findByText(/No movies found./i)).toBeInTheDocument();
  });
});
