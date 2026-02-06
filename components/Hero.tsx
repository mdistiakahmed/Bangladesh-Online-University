export default function Hero() {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-5xl font-bold mb-6">Learn from the Best Instructors in Bangladesh</h2>
        <p className="text-xl mb-8 max-w-3xl mx-auto">
          Access quality education from anywhere. Choose from hundreds of courses in technology, business, design, and more.
        </p>
        <div className="flex justify-center space-x-4">
          <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100">
            Browse Courses
          </button>
          <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600">
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
}