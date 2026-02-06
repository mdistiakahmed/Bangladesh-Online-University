"use client";

import React, { createContext, useCallback, useContext, useMemo, useState } from "react";

type EnrollmentState = Record<string, true>;

type EnrollmentContextValue = {
  enroll: (courseId: string) => void;
  isEnrolled: (courseId: string) => boolean;
  enrolledCourseIds: string[];
};

const EnrollmentContext = createContext<EnrollmentContextValue | null>(null);

export function EnrollmentProvider({ children }: { children: React.ReactNode }) {
  const [enrollments, setEnrollments] = useState<EnrollmentState>({});

  const enroll = useCallback((courseId: string) => {
    setEnrollments((prev) => {
      if (!courseId) return prev;
      if (prev[courseId]) return prev;
      return { ...prev, [courseId]: true };
    });
  }, []);

  const isEnrolled = useCallback(
    (courseId: string) => Boolean(courseId && enrollments[courseId]),
    [enrollments],
  );

  const value = useMemo<EnrollmentContextValue>(
    () => ({
      enroll,
      isEnrolled,
      enrolledCourseIds: Object.keys(enrollments),
    }),
    [enroll, isEnrolled, enrollments],
  );

  return <EnrollmentContext.Provider value={value}>{children}</EnrollmentContext.Provider>;
}

export function useEnrollmentContext() {
  const ctx = useContext(EnrollmentContext);
  if (!ctx) {
    throw new Error("useEnrollmentContext must be used within <EnrollmentProvider />");
  }
  return ctx;
}

