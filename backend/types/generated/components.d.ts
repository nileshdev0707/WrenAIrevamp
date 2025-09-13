import type { Schema, Struct } from '@strapi/strapi';

export interface HomeCaseStudies extends Struct.ComponentSchema {
  collectionName: 'components_home_case_studies';
  info: {
    displayName: 'Case Studies';
  };
  attributes: {
    caseStudieItems: Schema.Attribute.Component<'home.items', true>;
    description: Schema.Attribute.String;
    subTitle: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface HomeCoreCapabilities extends Struct.ComponentSchema {
  collectionName: 'components_home_core_capabilities';
  info: {
    displayName: 'Core Capabilities';
  };
  attributes: {
    badge: Schema.Attribute.String;
    coreCapabilitieList: Schema.Attribute.Component<
      'home.core-capabilities-list',
      true
    >;
    learnMore: Schema.Attribute.Component<'shared.button', true>;
    subTitle: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface HomeCoreCapabilitiesList extends Struct.ComponentSchema {
  collectionName: 'components_home_core_capabilities_lists';
  info: {
    displayName: 'Core Capabilities List';
  };
  attributes: {
    badge: Schema.Attribute.String;
    bullets: Schema.Attribute.JSON;
    image: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    >;
    size: Schema.Attribute.Enumeration<['sm', 'lg']>;
    subTitle: Schema.Attribute.String;
    title: Schema.Attribute.String;
    variant: Schema.Attribute.Enumeration<['light', 'dark']>;
  };
}

export interface HomeFeature extends Struct.ComponentSchema {
  collectionName: 'components_home_features';
  info: {
    displayName: 'feature';
  };
  attributes: {
    badge: Schema.Attribute.String;
    bullets: Schema.Attribute.JSON;
    description: Schema.Attribute.Text;
    image: Schema.Attribute.Media<'images'>;
    size: Schema.Attribute.Enumeration<['sm', 'lg']> &
      Schema.Attribute.DefaultTo<'sm'>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    variant: Schema.Attribute.Enumeration<['light', 'dark']> &
      Schema.Attribute.DefaultTo<'light'>;
  };
}

export interface HomeFeatureCard extends Struct.ComponentSchema {
  collectionName: 'components_home_feature_cards';
  info: {
    displayName: 'feature-card';
  };
  attributes: {
    description: Schema.Attribute.Text;
    theme: Schema.Attribute.Enumeration<['dark', 'light']> &
      Schema.Attribute.DefaultTo<'dark'>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface HomeItems extends Struct.ComponentSchema {
  collectionName: 'components_home_items';
  info: {
    displayName: 'Case Studies items';
  };
  attributes: {
    description: Schema.Attribute.String;
    image: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    >;
    link: Schema.Attribute.String;
    linkTitle: Schema.Attribute.String;
    subTitle: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface HomeTeamsList extends Struct.ComponentSchema {
  collectionName: 'components_home_teams_lists';
  info: {
    displayName: 'teamsList';
  };
  attributes: {
    name: Schema.Attribute.String;
    role: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface HomeTrustedByDataTeams extends Struct.ComponentSchema {
  collectionName: 'components_home_trusted_by_data_teams';
  info: {
    displayName: 'Trusted by Data Teams';
  };
  attributes: {
    subTitle: Schema.Attribute.String;
    teamsItem: Schema.Attribute.Component<'home.teams-list', true>;
    title: Schema.Attribute.String;
    trustedByDataTeamsItem: Schema.Attribute.Component<
      'home.trusted-data-teams-list',
      true
    >;
  };
}

export interface HomeTrustedDataTeamsList extends Struct.ComponentSchema {
  collectionName: 'components_home_trusted_data_teams_lists';
  info: {
    displayName: 'trustedDataTeamsList';
  };
  attributes: {
    badge: Schema.Attribute.String;
    subTitle: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface HomeUseCases extends Struct.ComponentSchema {
  collectionName: 'components_home_use_cases_s';
  info: {
    displayName: 'Use Cases ';
  };
  attributes: {
    badge: Schema.Attribute.String;
    description: Schema.Attribute.String;
    htmlDescription: Schema.Attribute.RichText;
    subTitle: Schema.Attribute.String;
    title: Schema.Attribute.String;
    useCasesItems: Schema.Attribute.Component<'home.use-cases-items', true>;
  };
}

export interface HomeUseCasesItems extends Struct.ComponentSchema {
  collectionName: 'components_home_use_cases_items';
  info: {
    displayName: 'Use Cases Items';
  };
  attributes: {
    badge: Schema.Attribute.String;
    description: Schema.Attribute.String;
    image: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    >;
    layout: Schema.Attribute.Enumeration<['topImage', 'bottomImage']>;
    subtitle: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface PricingFrequentlyAskedQuestions
  extends Struct.ComponentSchema {
  collectionName: 'components_pricing_frequently_asked_questions';
  info: {
    displayName: 'Frequently  Asked Questions';
  };
  attributes: {
    detail: Schema.Attribute.RichText;
    subtitle: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface PricingPriceFeatures extends Struct.ComponentSchema {
  collectionName: 'components_pricing_price_features';
  info: {
    displayName: 'priceFeatures';
  };
  attributes: {
    subtitle: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface PricingPriceHero extends Struct.ComponentSchema {
  collectionName: 'components_pricing_price_heroes';
  info: {
    displayName: 'price-hero';
  };
  attributes: {
    subtitle: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface PricingTier extends Struct.ComponentSchema {
  collectionName: 'components_pricing_tiers';
  info: {
    displayName: 'Pricing Tier';
  };
  attributes: {
    annualPrice: Schema.Attribute.String;
    compareFeatures: Schema.Attribute.JSON;
    ctaLabel: Schema.Attribute.String;
    ctaUrl: Schema.Attribute.String;
    description: Schema.Attribute.Text;
    features: Schema.Attribute.Text;
    featuresDetails: Schema.Attribute.RichText;
    highlight: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    price: Schema.Attribute.String;
  };
}

export interface ProductWhatIsWrenAiItem extends Struct.ComponentSchema {
  collectionName: 'components_product_what_is_wren_ai_items';
  info: {
    displayName: 'What Is Wren AI Item';
  };
  attributes: {
    icon: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    position: Schema.Attribute.String;
    subTitle: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface ProductWhatiswrenaiBlock extends Struct.ComponentSchema {
  collectionName: 'components_product_whatIsWrenAI_blocks';
  info: {
    displayName: 'What Is Wren AI';
  };
  attributes: {
    badge: Schema.Attribute.String;
    description: Schema.Attribute.RichText;
    descriptionDetail: Schema.Attribute.Blocks;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    subtitle: Schema.Attribute.String;
    title: Schema.Attribute.String;
    WhatisWrenAIItem: Schema.Attribute.Component<
      'product.what-is-wren-ai-item',
      true
    >;
  };
}

export interface SectionsCtaSection extends Struct.ComponentSchema {
  collectionName: 'components_sections_cta_sections';
  info: {
    displayName: 'cta-section';
  };
  attributes: {
    primaryLabel: Schema.Attribute.String;
    primaryUrl: Schema.Attribute.String;
    secondaryLabel: Schema.Attribute.String;
    secondaryUrl: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface SectionsFeatureGrid extends Struct.ComponentSchema {
  collectionName: 'components_sections_feature_grids';
  info: {
    displayName: 'feature-grid';
  };
  attributes: {
    items: Schema.Attribute.Component<'home.feature', true>;
    subtitle: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface SectionsHeroSection extends Struct.ComponentSchema {
  collectionName: 'components_sections_hero_sections';
  info: {
    displayName: 'hero-section';
  };
  attributes: {
    backgroundimage: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
    badge: Schema.Attribute.String;
    buttons: Schema.Attribute.Component<'shared.button', true>;
    image: Schema.Attribute.Media<'images'>;
    subtitle: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface SectionsLogosSection extends Struct.ComponentSchema {
  collectionName: 'components_sections_logos_sections';
  info: {
    displayName: 'logos-section';
  };
  attributes: {
    headline: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
  };
}

export interface SharedBottomContentBlock extends Struct.ComponentSchema {
  collectionName: 'components_shared_bottom_content_blocks';
  info: {
    displayName: 'Bottom ContentBlock';
  };
  attributes: {
    btnBottomContentBlock: Schema.Attribute.Component<'shared.button', true>;
    image: Schema.Attribute.Media<'images'>;
    subTitle: Schema.Attribute.String;
    title: Schema.Attribute.String;
    topTitle: Schema.Attribute.String;
  };
}

export interface SharedButton extends Struct.ComponentSchema {
  collectionName: 'components_shared_buttons';
  info: {
    displayName: 'button';
  };
  attributes: {
    label: Schema.Attribute.String & Schema.Attribute.Required;
    url: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedContentBlock extends Struct.ComponentSchema {
  collectionName: 'components_shared_content_blocks';
  info: {
    displayName: 'ContentBlock';
  };
  attributes: {
    alignment: Schema.Attribute.Enumeration<['left', 'center', 'right']>;
    badge: Schema.Attribute.String;
    contentBlockButton: Schema.Attribute.Component<'shared.button', true>;
    description: Schema.Attribute.RichText;
    descriptionDetail: Schema.Attribute.Blocks;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    layout: Schema.Attribute.Enumeration<['text', 'table', 'cards', 'grid']>;
    subtitle: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface SharedLink extends Struct.ComponentSchema {
  collectionName: 'components_shared_links';
  info: {
    displayName: 'link';
  };
  attributes: {
    label: Schema.Attribute.String & Schema.Attribute.Required;
    url: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'home.case-studies': HomeCaseStudies;
      'home.core-capabilities': HomeCoreCapabilities;
      'home.core-capabilities-list': HomeCoreCapabilitiesList;
      'home.feature': HomeFeature;
      'home.feature-card': HomeFeatureCard;
      'home.items': HomeItems;
      'home.teams-list': HomeTeamsList;
      'home.trusted-by-data-teams': HomeTrustedByDataTeams;
      'home.trusted-data-teams-list': HomeTrustedDataTeamsList;
      'home.use-cases': HomeUseCases;
      'home.use-cases-items': HomeUseCasesItems;
      'pricing.frequently-asked-questions': PricingFrequentlyAskedQuestions;
      'pricing.price-features': PricingPriceFeatures;
      'pricing.price-hero': PricingPriceHero;
      'pricing.tier': PricingTier;
      'product.what-is-wren-ai-item': ProductWhatIsWrenAiItem;
      'product.whatiswrenai-block': ProductWhatiswrenaiBlock;
      'sections.cta-section': SectionsCtaSection;
      'sections.feature-grid': SectionsFeatureGrid;
      'sections.hero-section': SectionsHeroSection;
      'sections.logos-section': SectionsLogosSection;
      'shared.bottom-content-block': SharedBottomContentBlock;
      'shared.button': SharedButton;
      'shared.content-block': SharedContentBlock;
      'shared.link': SharedLink;
    }
  }
}
