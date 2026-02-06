"use client";

import { useEnrollment } from '@/hooks/useEnrollment';

type Lesson = {
  id: string;
  title: string;
  duration?: string;
  isPreview?: boolean;
  youtubeVideoId?: string;
};

type Props = {
  course: any;
  activeLessonId?: string | null;
  onSelectLesson?: (lesson: Lesson) => void;
  showEnrollCta?: boolean;
};

export default function VideoLessons({
  course,
  activeLessonId = null,
  onSelectLesson,
  showEnrollCta = true,
}: Props) {
  const { enroll, isEnrolled } = useEnrollment();
  const enrolled = isEnrolled(course.id);

  const handleEnroll = () => {
    enroll(course.id);
  };

  const lessons: Lesson[] = course.videoLessons || [];

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mt-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Course Content</h2>
      
      {!enrolled && showEnrollCta && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-blue-900">Enroll to access all course content</h3>
              <p className="text-blue-700 text-sm mt-1">Get unlimited access to {lessons.length} video lessons</p>
            </div>
            <button
              onClick={handleEnroll}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 font-medium"
            >
              Enroll Now - ৳{course.price}
            </button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {lessons.length === 0 && (
          <div className="border border-dashed rounded-lg p-4 text-gray-600 text-sm">
            No lessons published yet.
          </div>
        )}

        {lessons.map((lesson: Lesson) => {
          const canAccess = enrolled || lesson.isPreview;
          const isActive = Boolean(activeLessonId && lesson.id === activeLessonId);
          
          return (
            <div
              key={lesson.id}
              onClick={() => {
                if (!canAccess) return;
                onSelectLesson?.(lesson);
              }}
              className={`border rounded-lg p-4 flex items-center justify-between ${
                canAccess 
                  ? `border-gray-200 hover:bg-gray-50 cursor-pointer ${isActive ? "ring-2 ring-blue-200 bg-blue-50/40" : ""}`
                  : 'border-gray-200 bg-gray-50 opacity-60 cursor-not-allowed'
              }`}
            >
              <div className="flex items-center space-x-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  canAccess ? 'bg-blue-100 text-blue-600' : 'bg-gray-200 text-gray-400'
                }`}>
                  {canAccess ? '▶' : '🔒'}
                </div>
                <div>
                  <h4 className={`font-medium ${canAccess ? 'text-gray-900' : 'text-gray-500'}`}>
                    {lesson.title}
                  </h4>
                  {lesson.duration && <p className="text-sm text-gray-500">{lesson.duration}</p>}
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {lesson.isPreview && (
                  <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded">Preview</span>
                )}
                {canAccess ? (
                  <span className="text-blue-600 text-sm font-medium">{isActive ? "Now playing" : "Watch"}</span>
                ) : (
                  <span className="text-gray-400 text-sm">Enroll to access</span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {enrolled && (
        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-green-700 font-medium">✓ You are enrolled in this course!</p>
          <p className="text-green-600 text-sm mt-1">You now have full access to all course content.</p>
        </div>
      )}
    </div>
  );
}