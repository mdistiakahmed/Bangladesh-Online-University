"use client";

import { useMemo, useState } from "react";
import VideoLessons from "@/components/VideoLessons";
import VideoPlayer from "@/components/VideoPlayer";
import { useEnrollment } from "@/hooks/useEnrollment";

type Lesson = {
  id: string;
  title: string;
  duration?: string;
  isPreview?: boolean;
  youtubeVideoId?: string;
};

export default function CourseDetailsClient({ course }: { course: any }) {
  const { enroll, isEnrolled } = useEnrollment();
  const enrolled = isEnrolled(course.id);

  const lessons: Lesson[] = useMemo(() => course.videoLessons || [], [course.videoLessons]);

  const defaultLessonId = useMemo(() => {
    const firstPreview = lessons.find((l) => l.isPreview)?.id;
    return firstPreview || lessons[0]?.id || null;
  }, [lessons]);

  const [activeLessonId, setActiveLessonId] = useState<string | null>(defaultLessonId);

  const activeLesson = useMemo(() => {
    if (!activeLessonId) return null;
    return lessons.find((l) => l.id === activeLessonId) || null;
  }, [activeLessonId, lessons]);

  const activeLessonLocked = Boolean(activeLesson && !enrolled && !activeLesson.isPreview);

  const activeIndex = useMemo(() => {
    if (!activeLesson) return -1;
    return lessons.findIndex((l) => l.id === activeLesson.id);
  }, [activeLesson, lessons]);

  const canAccessLesson = (lesson: Lesson) => enrolled || Boolean(lesson.isPreview);

  const selectLesson = (lesson: Lesson) => {
    if (!canAccessLesson(lesson)) return;
    setActiveLessonId(lesson.id);
  };

  const goToSiblingLesson = (direction: -1 | 1) => {
    if (lessons.length === 0) return;

    let idx = activeIndex;
    if (idx < 0) idx = direction === 1 ? -1 : lessons.length;

    for (let i = idx + direction; i >= 0 && i < lessons.length; i += direction) {
      const candidate = lessons[i];
      if (canAccessLesson(candidate)) {
        setActiveLessonId(candidate.id);
        return;
      }
    }
  };

  const handleEnroll = () => {
    enroll(course.id);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <VideoPlayer
                title={activeLesson?.title || course.title}
                youtubeVideoId={activeLesson?.youtubeVideoId}
                locked={activeLessonLocked}
                lockedTitle="Locked lesson"
                lockedSubtitle="Click “Enroll Now” to unlock all lessons."
              />

              {/* Lesson nav (one by one) */}
              {lessons.length > 0 && (
                <div className="flex items-center justify-between gap-3 px-4 sm:px-6 py-3 border-b bg-white">
                  <button
                    onClick={() => goToSiblingLesson(-1)}
                    disabled={activeIndex <= 0}
                    className="px-3 py-2 rounded-md border text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                  >
                    Previous
                  </button>
                  <div className="text-sm text-gray-600">
                    {activeIndex >= 0 ? (
                      <span>
                        Lesson <span className="font-semibold">{activeIndex + 1}</span> of{" "}
                        <span className="font-semibold">{lessons.length}</span>
                      </span>
                    ) : (
                      <span>Select a lesson</span>
                    )}
                  </div>
                  <button
                    onClick={() => goToSiblingLesson(1)}
                    disabled={activeIndex < 0 || activeIndex >= lessons.length - 1}
                    className="px-3 py-2 rounded-md border text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                  >
                    Next
                  </button>
                </div>
              )}

              <div className="p-6">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">{course.title}</h1>
                <p className="text-lg text-gray-700 mb-6">{course.description}</p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  <div className="text-center">
                    <div className="text-xl sm:text-2xl font-bold text-blue-600">{course.lessons}</div>
                    <div className="text-sm text-gray-500">Lessons</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl sm:text-2xl font-bold text-blue-600">{course.duration}</div>
                    <div className="text-sm text-gray-500">Duration</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl sm:text-2xl font-bold text-blue-600">{course.level}</div>
                    <div className="text-sm text-gray-500">Level</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl sm:text-2xl font-bold text-blue-600">{course.students}</div>
                    <div className="text-sm text-gray-500">Students</div>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">What you'll learn</h2>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span className="text-gray-700">Build modern web applications with latest technologies</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span className="text-gray-700">Master best practices and industry standards</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span className="text-gray-700">Create portfolio-worthy projects</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span className="text-gray-700">Get hands-on experience with real-world examples</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Video Lessons Section */}
            <VideoLessons
              course={course}
              activeLessonId={activeLessonId}
              onSelectLesson={selectLesson}
              showEnrollCta={false}
            />
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
              {!enrolled ? (
                <>
                  <div className="text-center mb-6">
                    <div className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">৳{course.price}</div>
                    <div className="text-gray-500">One-time payment</div>
                  </div>

                  <button
                    onClick={handleEnroll}
                    className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 mb-4"
                  >
                    Enroll Now
                  </button>

                  <button className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 mb-6">
                    Add to Cart
                  </button>
                </>
              ) : (
                <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="font-semibold text-green-800">You’re enrolled</div>
                  <div className="text-green-700 text-sm mt-1">All lessons are unlocked for you in this session.</div>
                </div>
              )}

              <div className="space-y-4 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Instructor:</span>
                  <span className="font-medium">{course.instructor}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Rating:</span>
                  <div className="flex items-center">
                    <span className="text-yellow-400">⭐</span>
                    <span className="ml-1 font-medium">{course.rating}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Category:</span>
                  <span className="font-medium">{course.category}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Language:</span>
                  <span className="font-medium">Bangla + English</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Certificate:</span>
                  <span className="font-medium">Yes</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

