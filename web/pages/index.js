import axios from "axios";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Logos from "../components/Logos";
import Capabilities from "../components/Capabilities";
import FeatureShowcase from "../components/FeatureShowcase";
import Work from "../components/Work";
import Stories from "../components/Stories";
import Stats from "../components/Stats";
import CTA from "../components/CTA";
import SiteFooter from "../components/SiteFooter";

export default function Home({
  hero,
  logos,
  capabilities,
  navigation,
  featureShowcase,
  work,
  stats,
  cta,
  homeSections,
}) {
  const base = process.env.NEXT_PUBLIC_STRAPI_URL || ''
  const homePageSections = (
    homeSections || [
      { type: "hero" },
      { type: "logos" },
      { type: "capabilities" },
      { type: "feature-showcase" },
      { type: "work" },
      { type: "stats" },
      { type: "cta" },
    ]
  );
  return (
    <div>
      <Navbar navigation={navigation} />
       {(homePageSections?.find((s) => s?.type === 'hero') || homePageSections?.find((s) => s?.type === 'logos')) && (
         <div style={{ backgroundImage: `url(${hero?.heroImage?.url.startsWith('http') ? '' : base}${hero?.backgroundimage?.url})`,  WebkitBackgroundSize: '100%',backgroundPosition: 'center bottom' }} className="bg-cover">
           {homePageSections?.find((s) => s?.type === 'hero') && <Hero data={hero} />}
           {homePageSections?.find((s) => s?.type === 'logos') && <Logos items={logos} />}
         </div>
       )}
      {homePageSections?.map((s, i) => {
        switch (s.type) {
          case "capabilities":
            return <Capabilities key={i} data={capabilities} />;
          case "feature-showcase":
            return <FeatureShowcase key={i} data={featureShowcase} />;
          case "work":
            return <Work key={i} data={work} />;
          case "stats":
            return <Stats key={i} data={stats} />;
          case "cta":
            return <CTA key={i} data={cta} />;
          default:
            return null;
        }
      })}
      <SiteFooter pages={navigation?.pages || []} />
    </div>
  );
}

export async function getStaticProps() {
  const STRAPI = process.env.STRAPI_URL
  const token = process.env.STRAPI_TOKEN;
  const api = axios.create({
    baseURL: STRAPI,
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });

  const [
    heroRes,
    logosRes,
    capRes,
    navRes,
    featureRes,
    workRes,
    statsRes,
    ctaRes,
    homeRes,
  ] = await Promise.all([
    api
      .get(`/api/hero?populate=*`)
      .then((r) => r.data)
      .catch(() => null),
    api
      .get(`/api/home-logos?populate=image`)
      .then((r) => r.data)
      .catch(() => null),
    api
      .get(`/api/capabilities?populate=*`)
      .then((r) => r.data)
      .catch(() => null),
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
    api
      .get(`/api/feature-showcase?populate=*`)
      .then((r) => r.data)
      .catch(() => null),
    api
      .get(`/api/work?populate=visual`)
      .then((r) => r.data)
      .catch(() => null),
    api
      .get(`/api/stats?populate=*`)
      .then((r) => r.data)
      .catch(() => null),
    api
      .get(`/api/cta?populate=*`)
      .then((r) => r.data)
      .catch(() => null),
    api
      .get(`/api/home`)
      .then((r) => r.data)
      .catch(() => null),
  ]);

  console.log(heroRes);
  console.log(logosRes);
  console.log(capRes);
  console.log(navRes);

  return {
    props: {
      hero: heroRes?.data?.attributes ?? heroRes?.data ?? null,
      logos: Array.isArray(logosRes?.data)
        ? logosRes.data.map((l) => l?.attributes ?? l)
        : [],
      capabilities: capRes?.data?.attributes ?? capRes?.data ?? null,
      navigation: {
        ...(navRes?.nav?.data?.attributes ?? navRes?.nav?.data ?? {}),
        pages: Array.isArray(navRes?.pages?.data)
          ? navRes.pages.data
              .map((p) => p.attributes ?? p)
              .filter((p) => p.showInNav)
              .sort((a, b) => (a.navOrder || 0) - (b.navOrder || 0))
          : [],
      },
      featureShowcase: featureRes?.data?.attributes ?? featureRes?.data ?? null,
      work: workRes?.data?.attributes ?? workRes?.data ?? null,
      stats: statsRes?.data?.attributes ?? statsRes?.data ?? null,
      cta: ctaRes?.data?.attributes ?? ctaRes?.data ?? null,
      homeSections:
        homeRes?.data?.attributes?.sections ?? homeRes?.data?.sections ?? null,
    },
    revalidate: 10,
  };
}
