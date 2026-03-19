import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { act, fireEvent, render, screen } from "@testing-library/react";
import SearchInput from "./search";
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

jest.mock("next/navigation", () => ({
  useSearchParams: jest.fn(),
  useRouter: jest.fn(),
  usePathname: jest.fn(),
}));

beforeEach(() => jest.useFakeTimers());
afterEach(() => jest.useRealTimers());

describe("Search", () => {
  it("renders search input and updates URL on input change", () => {
    const mockReplace = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({
      replace: mockReplace,
    });
    (useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams());
    (usePathname as jest.Mock).mockReturnValue("/search");

    render(<SearchInput />, { wrapper: createWrapper() });

    const input = screen.getByPlaceholderText(/search for a movie/i);
    expect(input).toBeInTheDocument();

    fireEvent.change(screen.getByPlaceholderText(/search for a movie/i), {
      target: { value: "Inception" },
    });

    act(() => jest.advanceTimersByTime(500));
    expect(mockReplace).toHaveBeenCalledWith("/search?query=Inception");
  });

  it("removes query param when input is cleared", () => {
    const mockReplace = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({
      replace: mockReplace,
    });
    (useSearchParams as jest.Mock).mockReturnValue(
      new URLSearchParams("query=Inception"),
    );
    (usePathname as jest.Mock).mockReturnValue("/search");

    render(<SearchInput />, { wrapper: createWrapper() });

    const input = screen.getByPlaceholderText(/search for a movie/i);
    expect(input).toHaveValue("Inception");

    fireEvent.change(screen.getByPlaceholderText(/search for a movie/i), {
      target: { value: "" },
    });

    act(() => jest.advanceTimersByTime(500));
    expect(mockReplace).toHaveBeenCalledWith("/search");
  });
});
