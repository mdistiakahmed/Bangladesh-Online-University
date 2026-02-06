export default function CategoryCard({ category }: any) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer hover:scale-105 transition-transform">
      <div className="text-4xl mb-4">{category.icon}</div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{category.name}</h3>
      <p className="text-gray-600 text-sm">{category.description}</p>
    </div>
  );
}