import Link from 'next/link';

export default function BlogCard({ post, showExcerpt = true, size = 'default' }) {
  const base = process.env.NEXT_PUBLIC_STRAPI_URL || '';

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const cardClasses = size === 'small' 
    ? 'bg-white rounded-lg overflow-hidden hover:shadow-md transition-shadow cursor-pointer'
    : 'bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer';

  const imageClasses = size === 'small' ? 'w-full h-32 object-cover' : 'w-full h-50 object-cover';
  const titleClasses = size === 'small' ? 'text-lg font-semibold' : 'lg:text-xl md:text-lg text-base font-bold';
  const padding = size === 'small' ? 'p-4' : 'p-6';

  // Handle both API response formats (with and without attributes wrapper)
  const attributes = post.attributes || post;
  const featuredImage = attributes.featuredImage?.data?.attributes || attributes.featuredImage;
  
  // Handle categories - they can be relation objects or simple strings
  const categories = (() => {
    if (attributes.categories?.data) {
      // Strapi v4/v5 format with data wrapper
      return attributes.categories.data.map(cat => {
        // Handle both old and new Strapi formats
        if (typeof cat === 'string') return cat;
        if (cat.attributes?.name) return cat.attributes.name;
        if (cat.name) return cat.name;
        return 'Unknown Category';
      });
    } else if (attributes.categories) {
      // Direct categories array or single category
      if (Array.isArray(attributes.categories)) {
        return attributes.categories.map(cat => {
          if (typeof cat === 'string') return cat;
          if (cat.attributes?.name) return cat.attributes.name;
          if (cat.name) return cat.name;
          return 'Unknown Category';
        });
      } else {
        // Single category
        const cat = attributes.categories;
        if (typeof cat === 'string') return [cat];
        if (cat.attributes?.name) return [cat.attributes.name];
        if (cat.name) return [cat.name];
        return ['Unknown Category'];
      }
    }
    return [];
  })();
  
  return (
    <div onClick={() => window.open(`/post/${attributes.slug}`, '_self')} className={cardClasses}>
      {featuredImage && (
        <div className="aspect-w-16 aspect-h-9">
          <img
            src={`${featuredImage.url?.startsWith('http') ? '' : base}${featuredImage.url}`}
            alt={attributes.title}
            className={`${imageClasses} transition-transform duration-300 hover:scale-110`}
          />
        </div>
      )}
      <div className={padding}>
        <div className="flex items-center mb-3">
          <div className="flex gap-2 flex-wrap">
            {categories.length > 0 ? (
              categories?.map((category, index) => (
                <span key={index} className="text-sm bg-[#F5F5F5] text-gray-600 font-medium px-2 py-1 rounded-lg">
                  {typeof category === 'string' ? category : 'Category'}
                </span>
              ))
            ) : attributes.category ? (
              <span className="text-sm text-blue-600 font-medium">
                {typeof attributes.category === 'string' ? attributes.category : 'Category'}
              </span>
            ) : null}
          </div>
          {attributes.readTime && (
            <span className="text-sm text-gray-500 ml-3">{attributes.readTime} min read</span>
          )}
        </div>
        <h3 className={`${titleClasses} text-gray-900 mb-2`}>
          <Link href={`/post/${attributes.slug}`} className="hover:text-blue-600 transition-colors">
            {attributes.title}
          </Link>
        </h3>
        {showExcerpt && (
          <p className="text-gray-600 mb-4 md:text-base text-sm">{attributes.excerpt}</p>
        )}
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">
            {/* {attributes.author} •  */}
            {formatDate(attributes.publishedDate)}
          </span>
          {attributes.tags && attributes.tags.length > 0 && (
            <div className="flex gap-2">
              {attributes.tags.slice(0, 2).map((tag, index) => (
                <span 
                  key={index} 
                  className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
                  style={{ backgroundColor: tag?.color || '#f3f4f6' }}
                >
                  {tag?.name || `Tag ${index + 1}`}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
