import "@testing-library/jest-dom/vitest"
import { vi } from "vitest";

globalThis.matchMedia = globalThis.matchMedia || function() {
  return {
    matches: false,
    addListener: vi.fn(),
    removeListener: vi.fn(),
  };
};