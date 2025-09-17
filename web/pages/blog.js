import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import SiteFooter from "../components/SiteFooter";
import BlogGrid from "../components/blog/BlogGrid";
import CategoryFilter from "../components/blog/CategoryFilter";
import BlogHero from "../components/blog/BlogHero";
import BlogCard from "../components/blog/BlogCard";

export default function Blog({
  blogPageData,
  initialBlogs,
  navigation,
  pagination,
  dynamicCategories,
}) {
  const [blogs, setBlogs] = useState(initialBlogs);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const base = process.env.NEXT_PUBLIC_STRAPI_URL || "";

  const loadMoreBlogs = async (page) => {
    setLoading(true);
    try {
      const STRAPI =
        process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
      let categoryFilter = "";
      if (selectedCategory !== "all") {
        // We need to find the category ID first, then filter by it
        try {
          const categoryRes = await axios.get(
            `${STRAPI}/api/categories?filters[name][$eq]=${encodeURIComponent(
              selectedCategory
            )}`
          );
          const categoryData = categoryRes.data?.data?.[0];
          if (categoryData?.id) {
            categoryFilter = `&filters[categories][id][$eq]=${categoryData.id}`;
          }
        } catch (error) {
          console.error("Error finding category:", error);
        }
      }

      const response = await axios.get(
        `${STRAPI}/api/blogs?populate=*&pagination[page]=${page}&pagination[pageSize]=12${categoryFilter}`
      );

      if (page === 1) {
        setBlogs(response.data.data);
      } else {
        setBlogs((prev) => [...prev, ...response.data.data]);
      }
      setCurrentPage(page);
    } catch (error) {
      console.error("Error loading blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  const filterByCategory = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
    loadMoreBlogs(1);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Use dynamic categories from props, fallback to static ones
  const categories = dynamicCategories || [
    { key: "all", label: "All", shortLabel: "All" },
    { key: "Technology", label: "Technology", shortLabel: "Tech" },
    { key: "Product Updates", label: "Product Updates", shortLabel: "Product" },
    { key: "Tutorials", label: "Tutorials", shortLabel: "Tutorial" },
    { key: "Company News", label: "Company News", shortLabel: "News" },
    { key: "Data Analytics", label: "Data Analytics", shortLabel: "Insight" },
  ];

  return (
    <div>
      <Navbar navigation={navigation} />

      {/* Hero Section - Option 1: Use BlogHero with integrated categories */}
      <BlogHero
        title={blogPageData?.hero?.title || "Blog"}
        subtitle={
          blogPageData?.hero?.subtitle ||
          "Insights, tutorials, and updates from the WrenAI team"
        }
        backgroundImage={blogPageData?.hero?.backgroundimage?.url}
        showCategories={true}
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={filterByCategory}
      />

      {/* Hero Section - Option 2: Traditional Hero + separate CategoryFilter (commented out)
        {blogPageData?.hero && (
          <div
            style={{
              backgroundImage: `url(${
                blogPageData.hero?.backgroundimage?.url?.startsWith("http")
                  ? ""
                  : base
              }${blogPageData.hero?.backgroundimage?.url})`,
              WebkitBackgroundSize: "100%",
              backgroundPosition: "center bottom",
            }}
            className="bg-cover"
          >
            <Hero data={blogPageData.hero} />
          </div>
        )}
        */}

      {/* Blog Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Category Filter - only show if not using BlogHero with integrated categories */}
        {/* <CategoryFilter 
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={filterByCategory}
          /> */}

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
          posts={blogs}
          title={
            selectedCategory === "all"
              ? "All Posts"
              : `${selectedCategory} Posts`
          }
          showLoadMore={pagination && currentPage < pagination.pageCount}
          onLoadMore={() => loadMoreBlogs(currentPage + 1)}
          loading={loading}
        />
      </div>

      <SiteFooter pages={navigation?.pages || []} />
    </div>
  );
}

export async function getStaticProps() {
  const STRAPI = process.env.STRAPI_URL;
  const token = process.env.STRAPI_TOKEN;

  const api = axios.create({
    baseURL: STRAPI,
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });

  try {
    const [navRes, blogPageRes, blogsRes, categoriesRes] = await Promise.all([
      // Navigation data
      Promise.all([
        api
          .get(`/api/navigation?populate=*`)
          .then((r) => r.data)
          .catch(() => null),
        api
          .get(`/api/pages?fields=slug,navLabel,title,showInNav,navOrder`)
          .then((r) => r.data)
          .catch(() => null),
      ]).then(([nav, pages]) => ({ nav, pages })),

      // Blog page configuration
      api
        .get(`/api/blog-page?populate=*`)
        .then((r) => r.data)
        .catch(() => null),

      // Initial blog posts
      api
        .get(
          `/api/blogs?populate=*&pagination[page]=1&pagination[pageSize]=12&sort[0]=publishedDate:desc`
        )
        .then((r) => r.data)
        .catch(() => ({ data: [], meta: { pagination: { pageCount: 0 } } })),

      // Fetch categories
      api
        .get(`/api/categories`)
        .then((r) => r.data)
        .catch(() => ({ data: [] })),
    ]);

    // Build dynamic categories array
    const dynamicCategories = [
      { key: "all", label: "All", shortLabel: "All" },
      ...(categoriesRes?.data?.map((cat) => {
        const name = cat.attributes?.name || cat.name;
        return {
          key: name,
          label: name,
          shortLabel: name?.substring(0, 8) || "Cat",
        };
      }) || []),
    ];

    return {
      props: {
        blogPageData: blogPageRes?.data ?? null,
        initialBlogs: blogsRes?.data ?? [],
        pagination: blogsRes?.meta?.pagination ?? null,
        dynamicCategories,
        navigation: {
          ...(navRes?.nav?.data?.attributes ?? navRes?.nav?.data ?? {}),
          pages: Array.isArray(navRes?.pages?.data)
            ? navRes.pages.data
                .map((p) => p.attributes ?? p)
                .filter((p) => p.showInNav)
                .sort((a, b) => (a.navOrder || 0) - (b.navOrder || 0))
            : [],
        },
      },
      revalidate: 60, // Revalidate every minute
    };
  } catch (error) {
    console.error("Error fetching blog data:", error);
    return {
      props: {
        blogPageData: null,
        initialBlogs: [],
        pagination: null,
        navigation: { pages: [] },
      },
      revalidate: 60,
    };
  }
}
