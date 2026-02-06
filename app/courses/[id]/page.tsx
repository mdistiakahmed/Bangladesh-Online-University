import { notFound } from "next/navigation";
import { courses } from "@/data/courses";
import CourseDetailsClient from "@/components/CourseDetailsClient";

export default async function CoursePage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const course = courses.find((c) => c.id === id);

  if (!course) {
    notFound();
  }

  return <CourseDetailsClient course={course} />;
}
