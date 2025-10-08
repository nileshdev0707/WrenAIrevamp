import { getContentType } from "../../lib/static-data-loader";

function stripMd(markdown) {
  if (!markdown) return "";
  // Simple markdown stripping - remove markdown syntax
  return markdown
    .replace(/#{1,6}\s+/g, "") // Remove headers
    .replace(/\*\*(.*?)\*\*/g, "$1") // Remove bold
    .replace(/\*(.*?)\*/g, "$1") // Remove italic
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1") // Remove links, keep text
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, "") // Remove images
    .replace(/```[\s\S]*?```/g, "") // Remove code blocks
    .replace(/`([^`]+)`/g, "$1") // Remove inline code
    .replace(/\n+/g, " ") // Replace newlines with spaces
    .trim();
}

function generateRssFeed(posts) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://getwren.ai";
  const feedImageUrl = `${siteUrl}/favicon_io/favicon-32x32.png`;
  const lastBuildDate = new Date().toUTCString();

  let rssItems = posts
    .map((post) => {
      const postUrl = `${siteUrl}/post/${post.slug}`;
      const imageUrl =
        post.featuredImage?.url || post.featuredImage?.data?.attributes?.url;
      const absoluteImageUrl = imageUrl
        ? imageUrl.startsWith("http")
          ? imageUrl
          : `${siteUrl}${imageUrl}`
        : null;

      return `
        <item>
          <title><![CDATA[${post.title}]]></title>
          <description><![CDATA[${stripMd(
            post.excerpt || post.content
          )}]]></description>
          <link>${postUrl}</link>
          <guid isPermaLink="true">${postUrl}</guid>
          <pubDate>${new Date(post.publishedAt).toUTCString()}</pubDate>
          ${
            absoluteImageUrl
              ? `<enclosure url="${absoluteImageUrl}" type="image/jpeg" />`
              : ""
          }
        </item>
      `;
    })
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?>
    <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
      <channel>
        <title>Wren AI Blog</title>
        <description>Latest insights on AI, data analytics, and business intelligence from Wren AI</description>
        <link>${siteUrl}/blog</link>
        <language>en-us</language>
        <lastBuildDate>${lastBuildDate}</lastBuildDate>
        <atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml"/>
        <image>
          <url>${feedImageUrl}</url>
          <title>Wren AI Blog</title>
          <link>${siteUrl}/blog</link>
        </image>
        ${rssItems}
      </channel>
    </rss>`;
}

export async function getServerSideProps({ res }) {
  try {
    const blogsData = getContentType("blogs");
    const posts = blogsData?.data || [];

    // Sort posts by publishedAt date in descending order
    posts.sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );

    // Limit to the 20 most recent posts
    const recentPosts = posts.slice(0, 20);

    const rssFeed = generateRssFeed(recentPosts);

    res.setHeader("Content-Type", "application/rss+xml");
    res.setHeader(
      "Cache-Control",
      "public, s-maxage=60, stale-while-revalidate=300"
    );
    res.write(rssFeed);
    res.end();

    return {
      props: {},
    };
  } catch (error) {
    console.error("Error generating RSS feed:", error);
    res.statusCode = 500;
    res.end("Error generating RSS feed");
    return { props: {} };
  }
}

export default function RssXml() {
  return null;
}
