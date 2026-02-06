"use client";

import Header from '@/components/Header';
import Hero from '@/components/Hero';
import CategoryCard from '@/components/CategoryCard';
import CourseCard from '@/components/CourseCard';
import { categories, courses } from '@/data/courses';

export default function Home() {
  const featuredCourses = courses.slice(0, 3);
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Hero />
      
      {/* Categories Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Explore Career-Focused Categories</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Learn practical skills in Income Tax, SEO, software engineering interviews, and job preparation for BBA/MBA roles in multinational companies.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Courses Section */}
      <section id="courses" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Courses</h2>
            <p className="text-lg text-gray-600">Our most popular and highly-rated courses</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </section>

      {/* All Courses by Category */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">All Courses</h2>
            <p className="text-lg text-gray-600">Browse our complete course catalog</p>
          </div>
          
          {categories.map((category) => {
            const categoryCourses = courses.filter(course => course.category === category.name);
            if (categoryCourses.length === 0) return null;
            
            return (
              <div key={category.id} className="mb-16">
                <div className="flex items-center mb-8">
                  <span className="text-3xl mr-3">{category.icon}</span>
                  <h3 className="text-2xl font-bold text-gray-900">{category.name}</h3>
                  <span className="ml-4 text-gray-500">({categoryCourses.length} courses)</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {categoryCourses.map((course) => (
                    <CourseCard key={course.id} course={course} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">Bangladesh Online University</h3>
            <p className="text-gray-400 mb-8">Empowering education for all Bangladeshis</p>
            <div className="flex justify-center space-x-6 text-sm">
              <a href="#" className="hover:text-blue-400">About</a>
              <a href="#" className="hover:text-blue-400">Contact</a>
              <a href="#" className="hover:text-blue-400">Privacy Policy</a>
              <a href="#" className="hover:text-blue-400">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}