import axios from "axios";
import { useRouter } from "next/router";
import SocialShare from "../../components/blog/SocialShare";
import BlogCard from "../../components/blog/BlogCard";
import Layout from "../layout";

export default function BlogPost({ post, relatedPosts }) {
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-20 pt-5">
          <div className="col-span-2">
            {/* Featured Image */}
            {post.featuredImage && (
              <div className="mb-5">
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
            {/* <div
              className="prose prose-lg prose-slate max-w-none mb-12"
              dangerouslySetInnerHTML={{ __html: post.content }}
            /> */}
            <div className="pt-5">
              <p>Modern game platforms run on data. Every click, coin, and campaign leaves a footprint, from ads and microtransactions to session stats and affiliate activity. These datasets hold the key to growth, but here’s the problem: the SQL queries that unlock answers are often  <strong>slow, compute-heavy, and expensive.</strong> </p>
              <p className="my-4">Fraud detection, revenue-sharing models, retention tracking. They all require multi-table joins and deep scans. Run them inefficiently, and you’re burning credits as fast as you’re generating insights. </p>
              <div>
                <h1 className="text-2xl text-blue-600 font-medium py-4"> The Challenge </h1>
                <p>Waiting on SQL queries doesn’t just slow down decision-making; it delays critical product and business insights.</p>
                <p className="my-4">With <span onClick={() => window.open("https://getwren.ai/", "_blank")} className="font-bold underline cursor-pointer ">Wren AI</span>, teams can move from question to answer in seconds, using natural language to query backend data directly. This reduces reliance on analysts, shortens feedback loops, and keeps projects moving forward without the usual BI bottlenecks.</p>
              </div>
              <div>
                <h1 className="text-2xl text-blue-600 font-medium py-4"> That’s where Wren AI steps in. </h1>
                <p>As an <span onClick={() => window.open("https://github.com/Canner/WrenAI", "_blank")} className="font-bold underline cursor-pointer ">open-source Generative Business Intelligence (GenBI)</span>  tool, Wren AI translates natural language questions into SQL that follows warehouse best practices. Instead of being its optimizer, Wren AI helps shape queries so platforms like Snowflake can execute them more efficiently. The result: lower operation costs, faster answers, and accessible analytics for both technical and non-technical teams.</p>
              </div>
              <div>
                <h1 className="text-2xl text-blue-600 font-medium py-4">The Semantic Layer: Where Optimization Begins </h1>
                <p className="my-4">Wren AI is built around a <strong>Semantic Layer</strong>, a system of Instructions, Question↔SQL pairs, and semantic definitions that guide how queries are generated.</p>
                <ul className="list-disc list-inside">
                  <li className="mt-4"> <strong> Instructions: </strong>  Steer query patterns (e.g., “filter on session_date and game_id first,” “avoid SELECT *,” “aggregate before joins”).</li>
                  <li className="mt-4"> <strong> Question↔SQL pairs: </strong>  Save your best, most cost-efficient SQL; future prompts can reuse or adapt them, avoiding reinvention and bad SQL.</li>
                  <li className="mt-4"> <strong> Metrics/semantics: </strong>  Define canonical measures like LTV, D2 retention, or cohort logic, so every query uses the same efficient formula. </li>
                </ul>
                <p className="my-4">The Semantic Layer doesn’t tune the data warehouse directly. Instead, it provides the context and business logic that guide the NL→SQL agent to generate higher-quality queries and reuse proven ones. The real performance improvements come when cloud platforms like Snowflake apply their own optimizations, such as partition pruning, clustering, and caching, to those well-structured queries.</p>
                <p>That’s why Wren AI’s Semantic Layer is best understood as a knowledge-driven enabler of consistent, efficient query generation. It ensures teams ask questions in a way the warehouse can execute effectively, reducing errors, improving reusability, and accelerating insights across the organization.</p>
              </div>
              <div>
                <h1 className="text-2xl text-blue-600 font-medium py-4">1. Making Revenue Streams Smarter </h1>
                <p>Revenue doesn’t come from one channel. It comes from ads, subscriptions, affiliates, payment fees, and in-app events, each with massive datasets behind them.</p>
                <p className="my-4">Wren AI helps teams explore these revenue streams by guiding SQL generation through its Semantic Layer, ensuring queries make use of existing warehouse features like clustering, metadata, and partition filters. Rather than tuning the warehouse itself, Wren AI enables teams to produce smarter, more consistent queries that align with best practices, reducing the risk of inefficient scans and accelerating time-to-insight.</p>
                <p>That means finance and marketing teams can quickly surface insights like:</p>
                <div className="my-4 flex flex-col gap-5">
                  <div><span className="px-3 py-2 text-sm font-medium bg-gray-100 text-gray-700 rounded-md">Which affiliates deliver the highest-value players? </span></div>
                  <div><span className="px-3 py-2 text-sm font-medium bg-gray-100 text-gray-700 rounded-md">Which subscription tiers drive retention </span></div> 
                  <div><span className="px-3 py-2 text-sm font-medium bg-gray-100 text-gray-700 rounded-md">Which in-app events generate the best margins </span></div> 
                </div>
              </div>
              <div>
                <h1 className="text-2xl text-blue-600 font-medium py-4">2. Turning Gameplay Data into Insights </h1>
                <p>Understanding how players interact in-game is just as critical as tracking revenue. Wren AI ingests granular stats like KDA ratios, session lengths, win/loss records and turns them into actionable SQL queries.</p>
                <p className="my-4">By applying warehouse-friendly query patterns, such as selective projections, partition filters, and leveraging existing metadata. Wren AI enables teams to refine and build knowledge and semantic context. These practices help minimize unnecessary full-table scans and keep compute usage efficient.</p>
                <p>Wren AI gives teams deeper visibility into gameplay patterns while maintaining a fast, lightweight path to insights.</p>
              </div>
              <div>
                <h1 className="text-2xl text-blue-600 font-medium py-4">3. Solving Analytics Pain Across Teams </h1>
                <p>Backend data isn’t just for engineers. Marketers, product managers, and executives all need quick answers, but SQL has long been a barrier. Wren AI removes that friction.</p>
                <div className="flex flex-col gap-4 pt-6">
                  <h1 className="font-semibold">User Engagement:</h1>
                  <div><span className="px-3 py-2 text-sm font-medium bg-gray-100 text-gray-700 rounded-md">Query: “Who signed in and played last week?”</span></div>
                  <p>Wren AI generates SQL that funnels sign-ins and sessions efficiently.</p>
                </div>
                <div className="flex flex-col gap-4 pt-6">
                  <h1 className="font-semibold">Transactions:</h1>
                  <div><span className="px-3 py-2 text-sm font-medium bg-gray-100 text-gray-700 rounded-md">Query: “Show Day-2 retention for Roblox vs. Bingo Blitz?”</span></div>
                  <p>Wren AI writes SQL that applies cohorts and partition filters to avoid heavy scans.</p>
                </div>
                <div className="flex flex-col gap-4 pt-6">
                  <h1 className="font-semibold">Marketing Funnels:</h1>
                  <div><span className="px-3 py-2 text-sm font-medium bg-gray-100 text-gray-700 rounded-md">Query: “What’s LTV for Google installs over the last 3 months?”</span></div>
                  <p>Wren AI ties together cost, install, and revenue tables with efficient joins that minimize compute use.</p>
                </div>
                <div className="flex flex-col gap-4 pt-6">
                  <h1 className="font-semibold">Strategic Oversight:</h1>
                  <div><span className="px-3 py-2 text-sm font-medium bg-gray-100 text-gray-700 rounded-md">Query: “Summarize revenue by country and cohort month.”</span></div>
                  <p>Wren AI empowers every team, not just data scientists, to explore data, test hypotheses, and make faster decisions.</p>
                </div>
                <div>
                  <h1 className="text-2xl text-blue-600 font-medium py-4">4. SQL Knowledge = Cost Efficiency </h1>
                  <p>In modern cloud data platforms, compute is currency. Costs aren’t about how much data you store; they’re about how you query.</p>
                  <p className="my-4">Take Snowflake’s Data Cloud as an example: every SQL query consumes credits, even if the analyst only needs a small slice of data. Wren AI doesn’t modify Snowflake’s internals, but it guides query generation so teams naturally take advantage of features like micro-partitions and result caching.</p>
                  <p>That’s why smarter SQL isn’t just a technical improvement, it’s a business advantage.</p>
                  <ul className="list-disc list-inside">
                    <h1 className="font-semibold pt-5">❌ Traditional SQL</h1>
                    <li>Risk of full-table scans</li>
                    <li>Long runtimes</li>
                    <li>Inefficient joins and repeated work</li>
                    <h1 className="font-semibold pt-5">✅ Wren AI–Generated SQL</h1>
                    <li>Safe “dry runs” before execution</li>
                    <li>Cached queries and knowledge reused across teams</li>
                    <li>Faster runtime with reduced compute load</li>
                  </ul>
                  <p className="my-4"> Unlike BI tools that reduce costs by limiting how much users can query, Wren AI enables teams to keep asking questions freely, while still producing consistent, warehouse-friendly queries that avoid waste and accelerate insights.</p>
                </div>
                <div>
                  <h1 className="text-2xl text-blue-600 font-medium py-4">🚀 Final Thoughts</h1>
                  <p>In today’s data-driven gaming ecosystem, speed and efficiency are everything. Wren AI enables organizations to:</p>
                  <ul className="list-disc list-inside">
                    <li>Generate warehouse-friendly SQL automatically</li>
                    <li>Reduce query costs while scaling analytics</li>
                    <li>Empower non-technical users with self-service insights</li>
                    <li>Keep data exploration continuous without blowing through credits</li>
                  </ul>
                  <p className="my-4">Because one great SQL query is always cheaper, and more powerful than ten inefficient ones.</p>
                  <p>Whether you’re on Snowflake or another cloud data platform, Wren AI helps teams unlock more profound insights, spend smarter, and move faster.</p>
                  <p className="mt-4 font-bold">Wren AI (getwren.ai) is your first step toward cost-intelligent querying by making every query smarter, faster, and leaner.</p>
                </div>
              </div>
            </div>
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
             {/* <div
              className="prose prose-lg prose-slate max-w-none mb-12"
              dangerouslySetInnerHTML={{ __html: post.leftContent }}
            /> */}
            <div className="bg-white rounded-lg py-10">
              <h2 className="xl:text-2xl md:text-xl text-lg font-semibold mb-6">
                Releases
              </h2>
              <div className="space-y-8">
                <div className="space-y-2">
                  <span className="inline-block px-3 py-2 text-xs font-medium bg-gray-100 text-gray-700 rounded-md">
                    August 2025
                  </span>
                  <h3 className="font-semibold text-gray-900">
                    Wren AI Update Version 3
                  </h3>
                  <p className="text-sm text-gray-600">
                    At vero eos et accusamus et iusto odio dignissimos ducimus
                    qui blanditiis praesentium voluptatum deleniti
                  </p>
                </div>
                <div className="space-y-2">
                  <span className="inline-block px-3 py-2 text-xs font-medium bg-gray-100 text-gray-700 rounded-md">
                    July 2025
                  </span>
                  <h3 className="font-semibold text-gray-900">
                    Wren AI Update Version 2
                  </h3>
                  <p className="text-sm text-gray-600">
                    At vero eos et accusamus et iusto odio dignissimos ducimus
                    qui blanditiis praesentium voluptatum deleniti
                  </p>
                </div>
                <div className="space-y-2">
                  <span className="inline-block px-3 py-2 text-xs font-medium bg-gray-100 text-gray-700 rounded-md">
                    July 2025
                  </span>
                  <h3 className="font-semibold text-gray-900">
                    Wren AI Update Version 1
                  </h3>
                  <p className="text-sm text-gray-600">
                    At vero eos et accusamus et iusto odio dignissimos ducimus
                    qui blanditiis praesentium voluptatum deleniti
                  </p>
                </div>
              </div>
            </div>
            <div className="rounded-xl border border-gray-200 shadow-sm p-6 bg-white">
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
                  className="w-full rounded-md bg-gradient-to-r from-[#0B8EE5] to-[#0022CB] text-white font-medium py-2"
                >
                  Subscribe to our newsletter
                </button>
              </form>
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
  const STRAPI = process.env.NEXT_PUBLIC_STRAPI_URL;
  const token = process.env.NEXT_PUBLIC_STRAPI_TOKEN;

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
