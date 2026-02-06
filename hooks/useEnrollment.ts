"use client";

import { useEnrollmentContext } from "@/app/providers";

export function useEnrollment() {
  // Kept as a hook facade so components can import from one place.
  // This is intentionally in-memory (resets on full page reload).
  return useEnrollmentContext();
}