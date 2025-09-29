import axios from "axios";
import { useRouter } from "next/router";
import SocialShare from "../../components/blog/SocialShare";
import BlogCard from "../../components/blog/BlogCard";
import Layout from "../layout";
import Footer from "../../components/footer";
import { HubspotEmbedForm } from "../../components/hubspotEmbedForm";
import { safeImageSrc } from "../../utils/ssrHelpers";

export default function BlogPost({ post, relatedPosts, blogPageData }) {
  console.log("post --------==> ", post.relatedPosts);
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
          <p className="lg:text-lg text-base text-gray-600 mb-6">
            {post.excerpt}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-20 pt-5">
          <div className="col-span-2">
            {/* Featured Image */}
            {post.featuredImage && (
              <div className="mb-5">
                <img
                  src={
                    safeImageSrc(post.featuredImage.url) ||
                    `${base}${post.featuredImage.url}`
                  }
                  alt={post.title}
                  className="w-full h-64 md:h-96 object-cover rounded-lg"
                />
              </div>
            )}
            {/* Article Content */}
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </div>
          <div className="col-span-1">
            {/* Social Share */}
            <SocialShare
              title={post.title}
              url={typeof window !== "undefined" ? window.location.href : ""}
              blogPageData={blogPageData}
              post={post}
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
              <a
                href="https://cloud.getwren.ai/"
                target="_blank"
                className="btn bg-white text-blue-600 w-full"
              >
                Start Free Trial
              </a>
            </div>
              {post.relatedPosts.length > 0 && (
            <div class="bg-white rounded-lg mt-5">
              <h2 class="xl:text-2xl md:text-xl text-lg font-semibold mb-6">
                Releases
              </h2>
                <div class="space-y-8">
                {post.relatedPosts.map((post) => (
                  <div class="space-y-2">
                    <span class="inline-block px-3 py-2 text-xs font-medium bg-gray-100 text-gray-700 rounded-md">
                      {post?.publishedAt
                        ? new Date(post.publishedAt).toLocaleDateString(
                            "en-US",
                            {
                              month: "short",
                              day: "2-digit",
                              year: "numeric",
                            }
                          )
                        : ""}
                    </span>
                    <h3 class="font-semibold text-gray-900">{post.title}</h3>
                    <p class="text-sm text-gray-600">{post.excerpt}</p>
                  </div>
                ))}
              </div>
            </div>
              )}

            {blogPageData?.formId && (
              <div className="mt-5">
                <HubspotEmbedForm formId={blogPageData?.formId} hideClass />
              </div>
            )}
            {/* <div className="rounded-xl border border-gray-200 shadow-sm p-6 bg-white mt-5">
              <h2 className="xl:text-2xl lg:text-xl text-base font-semibold text-gray-900 mb-2">
                Stay in the loop
              </h2>
              <p className="text-gray-600 text-sm mb-4">
                Be the first to get exclusive offers and the latest news.
              </p>
              <form className="flex flex-col space-y-3">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring focus:ring-blue-200 outline-none"
                />

                <button
                  type="submit"
                  className="w-full rounded-md bg-gradient-to-r from-[#0B8EE5] to-[#0022CB] text-white font-medium py-2 cursor-pointer"
                >
                  Subscribe to our newsletter
                </button>
              </form>
            </div> */}
          </div>
        </div>

        {blogPageData?.bottomContentBlock?.length && (
          <Footer data={blogPageData?.bottomContentBlock} />
        )}
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
  const STRAPI = process.env.NEXT_PUBLIC_STRAPI_URL;
  const token = process.env.NEXT_PUBLIC_STRAPI_TOKEN;

  const api = axios.create({
    baseURL: STRAPI,
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });

  try {
    const res = await api.get(
      "/api/blogs?fields=slug&pagination[pageSize]=100"
    );

    // Generate paths for all locales
    const locales = ["en", "zh"];
    const paths = [];

    if (Array.isArray(res?.data?.data)) {
      res.data.data.forEach((post) => {
        const slug = post.attributes?.slug || post.slug;
        if (slug) {
          locales.forEach((locale) => {
            paths.push({ params: { slug }, locale });
          });
        }
      });
    }

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

export async function getStaticProps({ params, locale }) {
  const STRAPI = process.env.NEXT_PUBLIC_STRAPI_URL;
  const token = process.env.NEXT_PUBLIC_STRAPI_TOKEN;

  const api = axios.create({
    baseURL: STRAPI,
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });

  try {
    const selectedLang = locale || "en";
    const [postRes, navRes, blogPageRes] = await Promise.all([
      // Fetch the blog post
      api.get(
        `/api/blogs?filters[slug][$eq]=${params.slug}&populate=*&lang=${selectedLang}`
      ),

      // Fetch navigation
      Promise.all([
        api
          .get(`/api/navigation?populate=*&lang=${selectedLang}`)
          .then((r) => r.data)
          .catch(() => null),
        api
          .get(
            `/api/pages?fields=slug,navLabel,title,showInNav,navOrder&lang=${selectedLang}`
          )
          .then((r) => r.data)
          .catch(() => null),
      ]).then(([nav, pages]) => ({ nav, pages })),
      api
        .get(`/api/blog-page?populate=*&lang=${selectedLang}`)
        .then((r) => r.data)
        .catch(() => null),
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
    const blogPageData = blogPageRes?.data ?? null;
    return {
      props: {
        post,
        relatedPosts,
        blogPageData,
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
