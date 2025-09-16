// import type { Core } from '@strapi/strapi';

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap({ strapi }: any) {
    const createSingleIfMissing = async (uid: string, data: any) => {
      try {
        const existing = await strapi.entityService.findMany(uid, { publicationState: 'preview' });
        if (!existing || (Array.isArray(existing) && existing.length === 0)) {
          await strapi.entityService.create(uid, { data });
        }
      } catch (e) {
        // ignore boot seeding errors
      }
    };

    const createIfNone = async (uid: string, data: any[]) => {
      try {
        const count = await strapi.query(uid).count();
        if (count === 0) {
          for (const row of data) {
            await strapi.entityService.create(uid, { data: row });
          }
        }
      } catch (e) {}
    };

    await createSingleIfMissing('api::home.home', {
      sections: [
        { type: 'hero' },
        { type: 'logos' },
        { type: 'capabilities' },
        { type: 'feature-showcase' },
        { type: 'work' },
        { type: 'stats' },
        { type: 'cta' }
      ]
    });

    await createSingleIfMissing('api::hero.hero', {
      badge: '#1 Generative BI Solution',
      headline: 'Analytics without the Wait.\nDecisions without the Bottleneck.',
      subheadline: 'Trusted by 10,000+ data experts and analytics teams worldwide.',
      buttons: [
        { __component: 'shared.button', label: 'Start Free Trial Today', url: '#' },
        { __component: 'shared.button', label: 'Schedule a demo', url: '#' }
      ],
    });

    await createIfNone('api::logos.logos', [
      { name: 'chord' },
      { name: 'Snoonu' },
      { name: 'IMPACTABLE' },
      { name: 'NEXTLINK' }
    ]);

    await createSingleIfMissing('api::capabilities.capabilities', {
      title: 'Fast, Intelligent, and Secure',
      subtitle: 'Core Capabilities',
      features: [
        { __component: 'home.feature', title: 'Natural Language to SQL', description: 'Ask questions, get answers.' },
        { __component: 'home.feature', title: 'Realtime Insights', description: 'Live dashboards from your data.' },
        { __component: 'home.feature', title: 'Enterprise Security', description: 'SSO, RBAC, audit logs.' }
      ]
    });

    await createSingleIfMissing('api::navigation.navigation', {
      links: [
        { __component: 'shared.link', label: 'Product', url: '#' },
        { __component: 'shared.link', label: 'Developers', url: '#' },
        { __component: 'shared.link', label: 'Solutions', url: '#' },
        { __component: 'shared.link', label: 'Docs', url: '#' },
        { __component: 'shared.link', label: 'Pricing', url: '#' },
        { __component: 'shared.link', label: 'Blog', url: '#' }
      ]
    });

    await createSingleIfMissing('api::feature-showcase.feature-showcase', {
      cards: [
        { __component: 'home.feature-card', title: 'Instant answers. Explainable insights. Actionable outcomes.', description: 'Ask anything in natural language and get trustworthy analysis backed by SQL you can inspect.', theme: 'dark' },
        { __component: 'home.feature-card', title: 'Searchable, shareable, always-on knowledge.', description: 'Capture decisions and surface them where your teams work.', theme: 'dark' },
        { __component: 'home.feature-card', title: 'Unrivaled model, optimized for AI-driven analytics.', description: 'Purpose-built to reason over your business data with security and privacy by design.', theme: 'dark' },
        { __component: 'home.feature-card', title: 'Enterprise-grade governance without slowing teams down.', description: 'SSO, RBAC, audit logs and fine-grained controls baked in.', theme: 'dark' }
      ]
    });

    await createSingleIfMissing('api::work.work', {
      title: 'Put WrenAI to Work',
      subtitle: 'Empower data teams with secure, scalable access.',
    });

    await createSingleIfMissing('api::stats.stats', {
      items: [
        { __component: 'home.feature', title: '10x', description: 'faster insights' },
        { __component: 'home.feature', title: '90%', description: 'less ad-hoc asking' },
        { __component: 'home.feature', title: '20+', description: 'data sources (per month)' }
      ]
    });

    await createSingleIfMissing('api::cta.cta', {
      title: "Ready to unlock your data's potential?",
      primaryLabel: 'Start free',
      primaryUrl: '#',
      secondaryLabel: 'Explore Pricing',
      secondaryUrl: '#'
    });

    // Seed example pages
    try {
      const countPages = await strapi.query('api::page.page').count();
      if (countPages === 0) {
        const pagesToCreate = [
          { title: 'Product', navLabel: 'Product', showInNav: true, navOrder: 1, content: 'Product overview page placeholder.' },
          { title: 'Developers', navLabel: 'Developers', showInNav: true, navOrder: 2, content: 'Developers docs and resources.' },
          { title: 'Docs', navLabel: 'Docs', showInNav: true, navOrder: 3, content: 'Documentation...' },
          { title: 'Pricing', navLabel: 'Pricing', showInNav: true, navOrder: 4, content: 'Pricing details...' },
          { title: 'Blog', navLabel: 'Blog', showInNav: true, navOrder: 5, content: 'Blog posts...' },
          { title: 'Solutions', navLabel: 'Solutions', showInNav: true, navOrder: 6, content: 'Solutions overview.' },
          { title: 'Company', navLabel: 'Company', showInNav: false, navOrder: 10, content: 'About the company.' },
          { title: 'Careers', navLabel: 'Careers', showInNav: false, navOrder: 11, content: 'Open roles.' },
          { title: 'Contact', navLabel: 'Contact', showInNav: false, navOrder: 12, content: 'Get in touch.' },
          { title: 'Security', navLabel: 'Security', showInNav: false, navOrder: 13, content: 'Security and compliance.' },
          { title: 'Privacy', navLabel: 'Privacy', showInNav: false, navOrder: 14, content: 'Privacy policy.' },
          { title: 'Terms', navLabel: 'Terms', showInNav: false, navOrder: 15, content: 'Terms of service.' },
        ];
        for (const p of pagesToCreate) {
          await strapi.entityService.create('api::page.page', { data: p });
        }
      }
    } catch (e) {}

    await createSingleIfMissing('api::pricing.pricing', {
      title: 'Simple, transparent pricing',
      tiers: [
        { __component: 'pricing.tier', name: 'Free', price: '$0', annualPrice: '$0', ctaLabel: 'Get started', ctaUrl: '#', features: 'Basic features\nCommunity support' },
        { __component: 'pricing.tier', name: 'Pro', price: '$59', annualPrice: '$49', ctaLabel: 'Start trial', ctaUrl: '#', features: 'Advanced features\nPriority support', highlight: true },
        { __component: 'pricing.tier', name: 'Enterprise', price: 'Contact us', annualPrice: 'Contact us', ctaLabel: 'Talk to sales', ctaUrl: '#', features: 'SSO, RBAC\nCustom SLAs\nDedicated support' }
      ],
      faq: [
        { q: 'Can I change plans later?', a: 'Yes, you can upgrade or downgrade at any time.' },
        { q: 'Is there a free trial?', a: 'All paid plans include a 14-day free trial.' }
      ],
      ctaTitle: 'Ready to get started?',
      ctaPrimaryLabel: 'Start free',
      ctaPrimaryUrl: '#',
      ctaSecondaryLabel: 'Talk to sales',
      ctaSecondaryUrl: '#'
    });

    await createSingleIfMissing('api::product.product', {
      title: 'WrenAI Product',
      summary: 'The fastest way to get analytics from natural language.',
      features: [
        { __component: 'home.feature', title: 'NL to SQL', description: 'Ask anything, get correct answers.' },
        { __component: 'home.feature', title: 'Realtime Insights', description: 'Up-to-date dashboards.' },
        { __component: 'home.feature', title: 'Security', description: 'Enterprise-grade controls.' }
      ]
    });
  },
};
