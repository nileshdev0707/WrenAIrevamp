import BlogCard from './BlogCard';

export default function BlogGrid({ 
  posts, 
  title, 
  showLoadMore = false, 
  onLoadMore, 
  loading = false,
  columns = 3 
}) {
  const gridClasses = {
    1: 'grid gap-8',
    2: 'grid gap-8 md:grid-cols-2',
    3: 'grid gap-8 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
  };

  if (!posts || posts.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-gray-900 mb-2">No posts found</h3>
        <p className="text-gray-500">Check back later for new content.</p>
      </div>
    );
  }

  return (
    <div>
      {title && (
        <h2 className="lg:text-3xl md:text-2xl text-xl font-bold text-gray-900 mb-6">{title}</h2>
      )}
      
      <div className={gridClasses[columns] || gridClasses[3]}>
        {posts.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>

      {showLoadMore && onLoadMore && (
        <div className="text-center mt-12">
          <button
            onClick={onLoadMore}
            disabled={loading}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Loading...
              </span>
            ) : (
              'Load More Posts'
            )}
          </button>
        </div>
      )}
    </div>
  );
}
