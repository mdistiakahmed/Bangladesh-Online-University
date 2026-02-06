import Link from 'next/link';

export default function CourseCard({ course }: any) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="h-48 bg-gray-200 flex items-center justify-center">
        <img 
          src={course.thumbnail} 
          alt={course.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.src = `https://picsum.photos/seed/${course.id}/400/300.jpg`;
          }}
        />
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded">
            {course.category}
          </span>
          <span className="text-xs text-gray-500">{course.level}</span>
        </div>
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{course.title}</h3>
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{course.description}</p>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <span className="text-yellow-400">⭐</span>
            <span className="text-sm text-gray-700 ml-1">{course.rating}</span>
            <span className="text-sm text-gray-500 ml-2">({course.students} students)</span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-500">
            <span>👤 {course.instructor}</span>
            <span className="ml-3">⏱️ {course.duration}</span>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t flex items-center justify-between">
          <span className="text-2xl font-bold text-gray-900">৳{course.price}</span>
          <Link href={`/courses/${course.id}`}>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm font-medium">
              View Course
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}