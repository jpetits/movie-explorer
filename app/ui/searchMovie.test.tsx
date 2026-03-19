import { fireEvent, render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SearchMovie from "./searchMovie";

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
  usePathname: () => "/search",
}));

const mockObserve = jest.fn();
const mockDisconnect = jest.fn();

global.IntersectionObserver = jest.fn().mockImplementation((callback) => ({
  observe: mockObserve,
  disconnect: mockDisconnect,
  unobserve: jest.fn(),
}));

describe("SearchMovie", () => {
  it("renders MovieList when searchQuery is provided", () => {
    render(
      <SearchMovie
        initialMovieList={[
          {
            id: 1,
            title: "Inception",
            release_date: "2010-07-16",
            vote_average: 8.8,
          },
        ]}
        searchQuery="inception"
        fetchMorePath="/search?query=inception"
      />,
      { wrapper: createWrapper() },
    );
    expect(screen.getByText("Inception")).toBeInTheDocument();
  });

  it("renders nothing when searchQuery is empty", () => {
    const { container } = render(
      <SearchMovie
        initialMovieList={[]}
        searchQuery=""
        fetchMorePath="/search?query="
      />,
      { wrapper: createWrapper() },
    );
    expect(container.firstChild?.firstChild).toBeNull();
  });
});
