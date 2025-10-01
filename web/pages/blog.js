import { useState, useEffect } from "react";
import axios from "axios";
import BlogGrid from "../components/blog/BlogGrid";
import CategoryFilter from "../components/blog/CategoryFilter";
import BlogHero from "../components/blog/BlogHero";
import BlogCard from "../components/blog/BlogCard";
import Layout from "./layout";
import { base } from "../service/serviceConfig";
import { safeBackgroundImage } from "../utils/ssrHelpers";

export default function Blog({
  blogPageData,
  initialBlogs,
  pagination,
  dynamicCategories,
}) {
  const [blogs, setBlogs] = useState(initialBlogs);
  const [allBlogs, setAllBlogs] = useState(initialBlogs);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const heroImage = blogPageData?.hero?.[0]?.backgroundimage?.url;

  const loadMoreBlogs = async (page) => {
    setLoading(true);
    try {
      const STRAPI = process.env.NEXT_PUBLIC_STRAPI_URL;
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
        setAllBlogs(response.data.data);
      } else {
        setAllBlogs((prev) => [...prev, ...response.data.data]);
      }
      setCurrentPage(page);
    } catch (error) {
      console.error("Error loading blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedCategory === "all") {
      setBlogs(allBlogs);
    } else {
      const filtered = allBlogs.filter((post) => {
        const categories = post?.categories || [];
        return categories.some((cat) => cat?.name === selectedCategory);
      });
      setBlogs(filtered);
    }
  }, [selectedCategory, allBlogs]);

  const filterByCategory = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
    // loadMoreBlogs(1);
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

  // Extract SEO data from blog page data
  const seoData = blogPageData?.seo;

  return (
    <Layout
      seoData={seoData}
      pageTitle="Blog - Wren AI"
      pageDescription="Latest insights, tutorials, and updates from Wren AI"
    >
      <div className="max-w-6xl mx-auto">
        <div
          style={{
            backgroundImage: safeBackgroundImage(heroImage),
            WebkitBackgroundSize: "100% 100%",
            backgroundPosition: "center top",
          }}
          className="bg-no-repeat pt-24 max-w-6xl mx-auto"
        >
          <BlogHero data={blogPageData?.hero} blogs={blogs}/>
        </div>

        {/* Blog Content */}
        <div className="lg:pb-15 pb-10 px-5">
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
      </div>
    </Layout>
  );
}

export async function getStaticProps({ locale }) {
  const STRAPI = process.env.NEXT_PUBLIC_STRAPI_URL;
  const token = process.env.NEXT_PUBLIC_STRAPI_TOKEN;

  const api = axios.create({
    baseURL: STRAPI,
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });

  try {
    const selectedLang = locale || "en";
    const [navRes, blogPageRes, blogsRes, categoriesRes] = await Promise.all([
      // Navigation data
      Promise.all([
        api
          .get(
            `/api/pages?fields=slug,navLabel,title,showInNav,navOrder&lang=${selectedLang}`
          )
          .then((r) => r.data)
          .catch(() => null),
      ]).then(([nav, pages]) => ({ nav, pages })),

      // Blog page configuration
      api
        .get(`/api/blog-page?populate=*&lang=${selectedLang}`)
        .then((r) => r.data)
        .catch(() => null),

      // Initial blog posts
      api
        .get(
          `/api/blogs?populate=*&pagination[page]=1&pagination[pageSize]=12&sort[0]=publishedDate:desc&lang=${selectedLang}`
        )
        .then((r) => r.data)
        .catch(() => ({ data: [], meta: { pagination: { pageCount: 0 } } })),

      // Fetch categories
      api
        .get(`/api/categories?lang=${selectedLang}`)
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
      },
      revalidate: 60,
    };
  }
}
