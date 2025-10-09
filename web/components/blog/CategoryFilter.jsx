import { useState, useEffect } from 'react';

export default function CategoryFilter({ 
  categories, 
  selectedCategory, 
  onCategoryChange,
  className = '' 
}) {
  const [activeCategory, setActiveCategory] = useState(selectedCategory || 'all');
  const defaultCategories = [
    { key: 'all', label: 'All', shortLabel: 'All' },
    { key: 'Technology', label: 'Technology', shortLabel: 'Tech' },
    { key: 'Product Updates', label: 'Product Updates', shortLabel: 'Product' },
    { key: 'Tutorials', label: 'Tutorials', shortLabel: 'Tutorial' },
    { key: 'Company News', label: 'Company News', shortLabel: 'News' },
    { key: 'Data Analytics', label: 'Data Analytics', shortLabel: 'Insight' }
  ];
  
  const categoryList = categories || defaultCategories;

  // Sync with URL hash on page load
  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (hash && categoryList.some(cat => (cat.key || cat) === hash)) {
      setActiveCategory(hash);
      onCategoryChange(hash);
    }
  }, []);

  const handleCategoryClick = (categoryKey) => {
    setActiveCategory(categoryKey);
    onCategoryChange(categoryKey);
    // Update URL anchor without reload
    window.history.replaceState(null, "", `#${categoryKey}`);
  };


  return (
    <div className={`md:py-20 sm:py-10 py-5 ${className}`}>
      <div className="flex overflow-x-auto scrollbar-hide gap-2 px-4 sm:px-0">
        {categoryList.map((category, index) => {
          const categoryKey = typeof category === 'string' ? category : category.key;
          const categoryLabel = typeof category === 'string' ? category : category.label;
          const shortLabel = typeof category === 'string' ? category : category.shortLabel;
          
          return (
            <button
            key={categoryKey}
            onClick={() => handleCategoryClick(categoryKey)}
              className={`cursor-pointer flex-shrink-0 px-4 py-2 rounded-lg text-sm sm:text-md transition-all duration-200 whitespace-nowrap font-medium ${
                  activeCategory === categoryKey
                  ? 'bg-gradient-to-r from-[#0B8EE5] to-[#0022CB] text-white font-bold shadow-lg'
                  : 'bg-[#F5F5F5] text-gray-600 hover:bg-gray-200 hover:shadow-md'
              }`}
              style={{ animationDelay: `${100 + (index * 50)}ms` }}
            >
              <span className="hidden sm:inline">
                {categoryKey === 'all' ? 'All ' : categoryLabel}
              </span>
              <span className="sm:hidden">
                {categoryKey === 'all' ? 'All' : shortLabel}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
