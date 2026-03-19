import { deduplicateIds, formatDate, unwrapResult, withResult } from "./utils";
import { Result } from "../types/types";

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

describe("withResult", () => {
  it("should return success result", async () => {
    const promise = Promise.resolve("success");
    const result = await withResult(promise, "error");
    expect(result).toEqual({ success: true, data: "success" });
  });

  it("should return error result", async () => {
    const promise = Promise.reject(new Error("failure"));
    const result = await withResult(promise, "error");
    expect(result).toEqual({ success: false, error: "error" });
  });
});

describe("unwrapResult", () => {
  it("should unwrap success result", () => {
    const result = { success: true, data: "success" };
    const { data, error } = unwrapResult(result as Result<string>, "fallback");
    expect(data).toBe("success");
    expect(error).toBeNull();
  });

  it("should unwrap error result", () => {
    const result = { success: false, error: "error" };
    const { data, error } = unwrapResult(result as Result<string>, "fallback");
    expect(data).toBe("fallback");
    expect(error).toBe("error");
  });

  it("should return fallback for null result", () => {
    const { data, error } = unwrapResult(null, "fallback");
    expect(data).toBe("fallback");
    expect(error).toBeNull();
  });
});

describe("deduplicateIds", () => {
  it("should deduplicate items based on id", () => {
    const current = [
      { id: 1, name: "Item 1" },
      { id: 2, name: "Item 2" },
    ];
    const nextToAppend = [
      { id: 2, name: "Item 2" },
      { id: 3, name: "Item 3" },
    ];
    const result = deduplicateIds(current, nextToAppend);
    expect(result).toEqual([
      { id: 1, name: "Item 1" },
      { id: 2, name: "Item 2" },
      { id: 3, name: "Item 3" },
    ]);
  });
});
