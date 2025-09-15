import axios from "axios";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Logos from "../components/Logos";
import Capabilities from "../components/Capabilities";
// import FeatureShowcase from "../components/FeatureShowcase";
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
  // featureShowcase,
  work,
  stats,
  cta,
  homeSections,
  // homeRes,
  homePageRes,
  stories,
}) {
  console.log(homeSections, 'homeSections')

// const stories = homePageRes?.caseStudies ?? homePageRes?.data ?? null
// console.log(stories, 'stories 999')
  const base = process.env.NEXT_PUBLIC_STRAPI_URL || ''
  const homePageSections = (
  [    
      { type: "hero" },
      { type: "logos" },
      { type: "capabilities" },
      // { type: "feature-showcase" },
      { type: "work" },
      { type: "stories"},
      { type: "stats" },
      { type: "cta" },
    ]
  );
  console.log(homePageSections, 'homePageSections');
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
          // case "feature-showcase":
          //   return <FeatureShowcase key={i} data={featureShowcase} />;
          case "work":
            return <Work key={i} data={work} />;
          case "stories":
            return <Stories key={i} data={stories}/>;
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
    homePageRes,
    
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
    api
      .get(`/api/home-page?populate=*`)
      .then((r) => r.data)
      .catch(() => null),
  ]);

  
  return {

    props: {
      hero: homePageRes?.data?.hero ?? homePageRes?.data?.hero ?? null,
      logos: Array.isArray(homePageRes?.data?.TrustedBy)
        ? homePageRes.data.TrustedBy.map((l) => l?.attributes ?? l)
        : [],
      capabilities: homePageRes?.data?.coreCapabilities ?? homePageRes?.data.coreCapabilities ?? null,
      navigation: {
        ...(navRes?.nav?.data?.attributes ?? navRes?.nav?.data ?? {}),
        pages: Array.isArray(navRes?.pages?.data)
          ? navRes.pages.data
              .map((p) => p.attributes ?? p)
              .filter((p) => p.showInNav)
              .sort((a, b) => (a.navOrder || 0) - (b.navOrder || 0))
          : [],
      },
      // featureShowcase: featureRes?.data?.attributes ?? featureRes?.data ?? null,
      // work: workRes?.data?.attributes ?? workRes?.data ?? null,
      work: homePageRes?.data ?? homePageRes?.data ?? null,
      stats: statsRes?.data?.attributes ?? statsRes?.data ?? null,
      cta: ctaRes?.data?.attributes ?? ctaRes?.data ?? null,
      // homeSections:
      //   homeRes?.data?.sections ?? homeRes?.data?.sections ?? null,
      // homeRes: homeRes,
      homePageRes: homePageRes?.data?.attributes ?? homePageRes?.data ?? null,
      stories: homePageRes?.data ?? homePageRes?.data ?? null,
    },
    revalidate: 10,
  };
}
