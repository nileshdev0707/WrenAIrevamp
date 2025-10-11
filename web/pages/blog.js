import { useState, useEffect } from "react";
import BlogGrid from "../components/blog/BlogGrid";
import CategoryFilter from "../components/blog/CategoryFilter";
import BlogHero from "../components/blog/BlogHero";
import BlogCard from "../components/blog/BlogCard";
import Layout from "./layout";
import { safeBackgroundImage } from "../utils/ssrHelpers";
import { createBlogGetStaticProps } from "../lib/getStaticProps";

export default function Blog({
  blogPageData,
  initialBlogs,
  pagination,
  dynamicCategories,
}) {
  const POSTS_PER_PAGE = 9;
  const [allBlogs, setAllBlogs] = useState(initialBlogs);
  const [displayedBlogs, setDisplayedBlogs] = useState(
    initialBlogs.slice(0, POSTS_PER_PAGE)
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [filteredBlogs, setFilteredBlogs] = useState(initialBlogs);
  const heroImage = blogPageData?.hero?.[0]?.backgroundimage?.url;

  // Filter blogs by category
  useEffect(() => {
    if (selectedCategory === "all") {
      setFilteredBlogs(allBlogs);
    } else {
      const filtered = allBlogs.filter((post) => {
        const categories = post?.categories || [];
        return categories.some((cat) => cat?.name === selectedCategory);
      });
      setFilteredBlogs(filtered);
    }
    setCurrentPage(1); // Reset to first page when category changes
  }, [selectedCategory, allBlogs]);

  // Update displayed blogs when filtered blogs or page changes
  useEffect(() => {
    const startIndex = 0;
    const endIndex = currentPage * POSTS_PER_PAGE;
    setDisplayedBlogs(filteredBlogs.slice(startIndex, endIndex));
  }, [filteredBlogs, currentPage]);

  const filterByCategory = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const loadMoreBlogs = () => {
    setLoading(true);
    // Simulate loading delay for better UX
    setTimeout(() => {
      setCurrentPage((prev) => prev + 1);
      setLoading(false);
    }, 500);
  };

  const hasMorePosts = displayedBlogs.length < filteredBlogs.length;

  // Use dynamic categories from props, fallback to static ones
  const categories = dynamicCategories || [
    { key: "all", label: "All", shortLabel: "All" },
    { key: "Technology", label: "Technology", shortLabel: "Tech" },
    { key: "Product Updates", label: "Product Updates", shortLabel: "Product" },
    { key: "Tutorials", label: "Tutorials", shortLabel: "Tutorial" },
    { key: "Company News", label: "Company News", shortLabel: "News" },
    { key: "Data Analytics", label: "Data Analytics", shortLabel: "Insight" },
  ];

  // Extract SEO data from blog page data
  const seoData = blogPageData?.seo;

  return (
    <Layout
      seoData={seoData}
      pageTitle="Wren AI | Official Blog"
      pageDescription="Learn more about the latest designs of GenBI latest trend and how to utilize AI for the benefit of your marketing, sales, and support teams."
    >
      <div className="mx-auto">
        <div
          style={{
              backgroundImage: safeBackgroundImage(heroImage),
              WebkitBackgroundSize: "contain",
              backgroundPosition: "center -22px",
          }}
          className="bg-no-repeat sm:py-16 py-10 max-w-8xl mx-auto bg-contain"
        >
          <BlogHero data={blogPageData?.hero} blogs={displayedBlogs} />
        </div>

        {/* Blog Content */}
        <div className="max-w-7xl mx-auto lg:pb-15 pb-10 sm:px-5 px-4">
          {/* Category Filter - only show if not using BlogHero with integrated categories */}
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={filterByCategory}
          />

          {/* Featured Posts */}
          {blogPageData?.featuredPosts &&
            blogPageData.featuredPosts.length > 0 &&
            currentPage === 1 &&
            selectedCategory === "all" && (
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Featured Posts
                </h2>
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                  {blogPageData.featuredPosts.slice(0, 3).map((post) => (
                    <BlogCard key={post.id} post={post} />
                  ))}
                </div>
              </div>
            )}

          {/* All Posts */}
          <BlogGrid
            posts={displayedBlogs}
            title={
              selectedCategory === "all"
                ? "All Posts"
                : `${selectedCategory} Posts`
            }
            showLoadMore={hasMorePosts}
            onLoadMore={loadMoreBlogs}
            loading={loading}
          />
        </div>
      </div>
    </Layout>
  );
}

export const getStaticProps = createBlogGetStaticProps({
  revalidate: 60, // Revalidate every minute
});
