import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import SiteFooter from "../../components/SiteFooter";
import SocialShare from "../../components/blog/SocialShare";
import BlogCard from "../../components/blog/BlogCard";
import Layout from "../layout";

export default function BlogPost({ post, navigation, relatedPosts }) {
  console.log("post ==> ", post);
  const router = useRouter();
  const base = process.env.NEXT_PUBLIC_STRAPI_URL || "";

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  if (!post) {
    return <div>Post not found</div>;
  }

  // Handle categories - they can be relation objects or simple strings
  const categories = (() => {
    if (post.categories?.data) {
      // Strapi v4/v5 format with data wrapper
      return post.categories.data.map((cat) => {
        // Handle both old and new Strapi formats
        if (typeof cat === "string") return cat;
        if (cat.attributes?.name) return cat.attributes.name;
        if (cat.name) return cat.name;
        return "Unknown Category";
      });
    } else if (post.categories) {
      // Direct categories array or single category
      if (Array.isArray(post.categories)) {
        return post.categories.map((cat) => {
          if (typeof cat === "string") return cat;
          if (cat.attributes?.name) return cat.attributes.name;
          if (cat.name) return cat.name;
          return "Unknown Category";
        });
      } else {
        // Single category
        const cat = post.categories;
        if (typeof cat === "string") return [cat];
        if (cat.attributes?.name) return [cat.attributes.name];
        if (cat.name) return [cat.name];
        return ["Unknown Category"];
      }
    }
    return [];
  })();

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <Layout>
      <article className="max-w-6xl mx-auto px-5 py-12">
        {/* Article Header */}
        <div className="mb-8 pt-20 max-w-2xl ">
          <h1 className="lg:text-4xl text-2xl font-medium text-gray-900 mb-4">
            {post.title}
          </h1>
          <p className="text-lg text-gray-600 mb-6">{post.excerpt}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-15">
          <div className="col-span-2">
            {/* Featured Image */}
            {post.featuredImage && (
              <div className="mb-8">
                <img
                  src={`${
                    post.featuredImage.url?.startsWith("http") ? "" : base
                  }${post.featuredImage.url}`}
                  alt={post.title}
                  className="w-full h-64 md:h-96 object-cover rounded-lg"
                />
              </div>
            )}
            {/* Article Content */}
            <div
              className="prose prose-lg prose-slate max-w-none mb-12"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>
          <div className="col-span-1">
            {/* Social Share */}
            <SocialShare
              title={post.title}
              url={typeof window !== "undefined" ? window.location.href : ""}
            />
            <div className="bg-gradient-to-r from-[#2b47d3] to-[#0022CB] rounded-lg p-6">
              <h3 className="md:text-2xl text-lg font-semibold text-white mb-4">
                Supercharge Your <br />
                Data with AI Today
              </h3>
              <p className="text-white mb-4">
                Join thousands of data teams already using Wren AI to make
                data-driven decisions faster and more efficiently.
              </p>
              <a href="/" className="btn bg-white text-blue-600 w-full">
                Start Free Trial
              </a>
            </div>
          </div>
        </div>

        {/* Related Posts */}
        {relatedPosts && relatedPosts.length > 0 && (
          <div className="border-t border-gray-200 pt-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Related Posts
            </h3>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {relatedPosts.map((relatedPost) => (
                <BlogCard
                  key={relatedPost.id}
                  post={relatedPost}
                  size="small"
                  showExcerpt={true}
                />
              ))}
            </div>
          </div>
        )}
      </article>
    </Layout>
  );
}

export async function getStaticPaths() {
  const STRAPI = process.env.STRAPI_URL;
  const token = process.env.STRAPI_TOKEN;

  const api = axios.create({
    baseURL: STRAPI,
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });

  try {
    const res = await api.get(
      "/api/blogs?fields=slug&pagination[pageSize]=100"
    );
    const paths = Array.isArray(res?.data?.data)
      ? res.data.data.map((post) => ({
          params: { slug: post.attributes?.slug || post.slug },
        }))
      : [];

    return {
      paths,
      fallback: "blocking",
    };
  } catch (error) {
    console.error("Error fetching blog paths:", error);
    return {
      paths: [],
      fallback: "blocking",
    };
  }
}

export async function getStaticProps({ params }) {
  const STRAPI = process.env.STRAPI_URL;
  const token = process.env.STRAPI_TOKEN;

  const api = axios.create({
    baseURL: STRAPI,
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });

  try {
    const [postRes, navRes] = await Promise.all([
      // Fetch the blog post
      api.get(`/api/blogs?filters[slug][$eq]=${params.slug}&populate=*`),

      // Fetch navigation
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
    ]);

    const post =
      Array.isArray(postRes?.data?.data) && postRes.data.data.length > 0
        ? postRes.data.data[0]
        : null;

    if (!post) {
      return {
        notFound: true,
      };
    }

    // Use manually selected related posts from Strapi
    const relatedPosts = post.relatedPosts || [];

    return {
      props: {
        post,
        relatedPosts,
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
      revalidate: 60,
    };
  } catch (error) {
    console.error("Error fetching blog post:", error);
    return {
      notFound: true,
    };
  }
}
