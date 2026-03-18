import "@testing-library/jest-dom";

jest.mock("next/navigation", () => ({
  useRouter: () => ({ replace: jest.fn(), back: jest.fn() }),
  usePathname: () => jest.fn(),
  useSearchParams: () => jest.fn(),
}));
