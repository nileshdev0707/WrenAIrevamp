import { useRouter } from "next/router";
import SocialShare from "../../components/blog/SocialShare";
import BlogCard from "../../components/blog/BlogCard";
import Layout from "../layout";
import Footer from "../../components/footer";
import { HubspotEmbedForm } from "../../components/hubspotEmbedForm";
import { safeImageSrc } from "../../utils/ssrHelpers";
import Link from "next/link";
import ReactMarkdownDetails from "../../components/reactMarkDown";
import {
  createBlogsSlugGetStaticProps,
  createBlogGetStaticPaths,
} from "../../lib/getStaticProps";

export default function BlogPost({ post, relatedPosts, blogPageData }) {
  const router = useRouter();
  const base = process.env.NEXT_PUBLIC_STRAPI_URL || "";

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  if (!post) {
    return <div>Post not found</div>;
  }

  // Extract post attributes
  const attributes = post.attributes || post;

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

  // Create SEO data for individual blog post
  const seoData = attributes.seo || {
    metaTitle: attributes.title,
    metaDescription: attributes.excerpt,
    metaImage:
      attributes.featuredImage?.data?.attributes || attributes.featuredImage,
    keywords: categories.join(", "),
  };

  return (
    <Layout
      seoData={seoData}
      pageTitle={attributes.title}
      pageDescription={attributes.excerpt}
    >
      <article className="max-w-6xl mx-auto py-8 md:py-10 lg:mt-15">
        {/* Article Header */}
        <div className="mb-8 pt-25 sm:px-5 px-4">
          <h1 className="lg:text-4xl text-2xl font-medium text-gray-900 mb-4">
            {post.title}
          </h1>
          <p className="lg:text-lg text-base text-gray-600 mb-6">
            {post.excerpt}
          </p>
          <div className="flex items-center gap-5 sm:hidden">
            <img
              src={
                post?.author?.photo?.url
                  ? `${
                      post?.author?.photo?.url.startsWith("http") ? "" : base
                    }${post?.author?.photo?.url}`
                  : "/svg/avtar.svg"
              }
              alt={post?.author?.name || post?.author || ""}
              className="w-14 h-14 rounded-full object-cover"
            />
            <div>
              <p className="font-medium text-gray-900 text-lg">
                {post?.author?.name || post?.author || ""}
              </p>
              <p className="text-sm text-gray-500">
                Updated:{" "}
                {post?.updatedAt
                  ? new Date(post.updatedAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "2-digit",
                        year: "numeric",
                      }
                    )
                  : ""}
                <br />
                Published:{" "}
                {post?.publishedDate
                  ? new Date(post.publishedDate).toLocaleDateString("en-US", {
                      month: "short",
                        day: "2-digit",
                        year: "numeric",
                      }
                    )
                  : ""}
              </p>
            </div>
          </div>
        </div>

        <div className="md:grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-20 pt-5 sm:px-5 px-4">
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
            {/* Article Content
            <div dangerouslySetInnerHTML={{ __html: post.content }} /> */}
            <ReactMarkdownDetails data={post.content} />
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
              <div className="bg-white rounded-lg mt-5">
                <h2 className="xl:text-2xl md:text-xl text-lg font-semibold mb-6">
                  Related Posts
                </h2>
                <div className="space-y-8">
                  {post.relatedPosts.map((post) => (
                    <div className="space-y-2">
                      <Link href={`/post/${post.slug}`}>
                        <span className="mb-4 inline-block px-3 py-2 text-xs font-medium bg-gray-100 text-gray-700 rounded-md">
                          {post?.publishedDate
                            ? new Date(post.publishedDate).toLocaleDateString(
                                "en-US",
                                {
                                  month: "short",
                                  day: "2-digit",
                                  year: "numeric",
                                }
                              )
                            : ""}
                        </span>
                        <h3 className="font-semibold text-gray-900">
                          {post.title}
                        </h3>
                        <p className="text-sm text-gray-600">{post.excerpt}</p>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {blogPageData?.formId && (
              <div className="mt-5 border border-gray-300 p-5 rounded-md">
                <HubspotEmbedForm formId={blogPageData?.formId} hideClass />
              </div>
            )}
          </div>
        </div>

        <div className="md:block hidden">
          {blogPageData?.bottomContentBlock?.length && (
            <Footer data={blogPageData?.bottomContentBlock} />
          )}
        </div>
        {/* Related Posts */}
        {relatedPosts && relatedPosts.length > 0 && (
          <div className="border-t border-gray-200 pt-12 xl:px-0 px-5">
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

export const getStaticPaths = createBlogGetStaticPaths();

export const getStaticProps = createBlogsSlugGetStaticProps({
  revalidate: 60,
});
