import { formatDate } from "./utils";

describe("formatDate", () => {
  it("should format date correctly", () => {
    expect(formatDate("2024-01-01")).toBe("January 1, 2024");
    expect(formatDate("2024-12-31")).toBe("December 31, 2024");
  });

  it("should return 'TBA' for empty date", () => {
    expect(formatDate("")).toBe("TBA");
  });

  it("should return 'TBA' for undefined date", () => {
    expect(formatDate(undefined)).toBe("TBA");
  });

  it("should return 'TBA' for invalid date", () => {
    expect(formatDate("invalid-date")).toBe("TBA");
  });
});
