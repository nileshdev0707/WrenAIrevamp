export default function BlogHero({ title, subtitle, backgroundImage, showCategories = false, categories, selectedCategory, onCategoryChange }) {
  const base = process.env.NEXT_PUBLIC_STRAPI_URL || '';
  
  return (
    <section 
      className="relative py-16 md:py-20 bg-gradient-to-r from-[#0B8EE5] to-[#0022CB] text-white"
      style={backgroundImage ? {
        backgroundImage: `linear-gradient(rgba(11, 142, 229, 0.8), rgba(0, 34, 203, 0.8)), url(${backgroundImage?.startsWith('http') ? '' : base}${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      } : {}}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in-up">
            {title || 'Blog'}
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto animate-fade-in-up animation-delay-200">
            {subtitle || 'Insights, tutorials, and updates from the WrenAI team'}
          </p>
        </div>
        
        {showCategories && categories && (
          <div className="flex justify-center animate-fade-in-up animation-delay-400">
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-2">
              <div className="flex overflow-x-auto scrollbar-hide gap-2">
                {categories.map((category, index) => {
                  const categoryKey = typeof category === 'string' ? category : category.key;
                  const categoryLabel = typeof category === 'string' ? category : category.label;
                  const shortLabel = typeof category === 'string' ? category : category.shortLabel;
                  
                  return (
                    <button
                      key={categoryKey}
                      onClick={() => onCategoryChange && onCategoryChange(categoryKey)}
                      className={`flex-shrink-0 px-4 py-2 rounded-2xl text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                        selectedCategory === categoryKey
                          ? 'bg-white text-[#0B8EE5] font-bold shadow-lg'
                          : 'bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm'
                      }`}
                      style={{ animationDelay: `${500 + (index * 50)}ms` }}
                    >
                      <span className="hidden sm:inline">
                        {categoryKey === 'all' ? 'All Posts' : categoryLabel}
                      </span>
                      <span className="sm:hidden">
                        {categoryKey === 'all' ? 'All' : shortLabel}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
