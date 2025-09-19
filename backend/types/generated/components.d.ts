import type { Schema, Struct } from '@strapi/strapi';

export interface BlogDetailBlogDetail extends Struct.ComponentSchema {
  collectionName: 'components_blog_detail';
  info: {
    displayName: 'blog detail';
  };
  attributes: {
    htmlDetail: Schema.Attribute.RichText;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    subTitle: Schema.Attribute.String;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface BottomContentBlockBottomContentBlock
  extends Struct.ComponentSchema {
  collectionName: 'components_bottom_content_block_bottom_content_blocks';
  info: {
    displayName: 'bottomContentBlock';
  };
  attributes: {
    btnBottomContentBlock: Schema.Attribute.Component<
      'bottom-content-block.btn-bottom-content-block',
      true
    >;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    subTitle: Schema.Attribute.String;
    title: Schema.Attribute.String;
    topTitle: Schema.Attribute.String;
  };
}

export interface BottomContentBlockBtnBottomContentBlock
  extends Struct.ComponentSchema {
  collectionName: 'components_bottom_content_block_btn_bottom_content_blocks';
  info: {
    displayName: 'btnBottomContentBlock';
  };
  attributes: {
    label: Schema.Attribute.String & Schema.Attribute.Required;
    url: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ButtonBlockButtonBlock extends Struct.ComponentSchema {
  collectionName: 'components_button_block_button_blocks';
  info: {
    displayName: 'buttonBlock';
  };
  attributes: {
    label: Schema.Attribute.String & Schema.Attribute.Required;
    url: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

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

export interface SectionsBottomContentBlock extends Struct.ComponentSchema {
  collectionName: 'components_sections_bottom_content_blocks';
  info: {
    displayName: 'bottomContentBlock';
  };
  attributes: {
    label: Schema.Attribute.String & Schema.Attribute.Required;
    url: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionsButton extends Struct.ComponentSchema {
  collectionName: 'components_sections_buttons';
  info: {
    displayName: 'button';
  };
  attributes: {
    label: Schema.Attribute.String & Schema.Attribute.Required;
    url: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionsButtonBlock extends Struct.ComponentSchema {
  collectionName: 'components_sections_button_blocks';
  info: {
    displayName: 'buttonBlock';
  };
  attributes: {
    label: Schema.Attribute.String & Schema.Attribute.Required;
    url: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionsButtonContantBlock extends Struct.ComponentSchema {
  collectionName: 'components_sections_button_contant_blocks';
  info: {
    displayName: 'buttonContantBlock';
  };
  attributes: {
    label: Schema.Attribute.String & Schema.Attribute.Required;
    url: Schema.Attribute.String & Schema.Attribute.Required;
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
    description: Schema.Attribute.String;
    FeaturedTitle: Schema.Attribute.String;
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

export interface SectionsOpenSourceProject extends Struct.ComponentSchema {
  collectionName: 'components_sections_open_source_projects';
  info: {
    displayName: 'openSourceProject';
  };
  attributes: {
    badge: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    subTitle: Schema.Attribute.Text;
    title: Schema.Attribute.String;
    WrenAI: Schema.Attribute.Component<'sections.wren-ai', false>;
    wrenEngineAI: Schema.Attribute.Component<
      'wren-engine-ai.wren-engine-ai',
      false
    >;
  };
}

export interface SectionsPublicRoadmap extends Struct.ComponentSchema {
  collectionName: 'components_sections_public_roadmaps';
  info: {
    displayName: 'publicRoadmap';
  };
  attributes: {
    badge: Schema.Attribute.String;
    buttonBlock: Schema.Attribute.Component<'solutions.button-block', true>;
    subTitle: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface SectionsWernEngine extends Struct.ComponentSchema {
  collectionName: 'components_sections_wern_engines';
  info: {
    displayName: 'wernEngine';
  };
  attributes: {
    badge: Schema.Attribute.String;
    buttonContantBlock: Schema.Attribute.Component<
      'sections.button-contant-block',
      true
    >;
    subtitle: Schema.Attribute.Text;
    title: Schema.Attribute.String;
    wrenEngineDetails: Schema.Attribute.Component<
      'sections.wern-engine-details',
      true
    >;
  };
}

export interface SectionsWernEngineDetails extends Struct.ComponentSchema {
  collectionName: 'components_sections_wern_engine_details';
  info: {
    displayName: 'wernEngineDetails';
  };
  attributes: {
    badge: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
  };
}

export interface SectionsWhaywrenAi extends Struct.ComponentSchema {
  collectionName: 'components_sections_whaywren_ais';
  info: {
    displayName: 'whaywrenAI';
  };
  attributes: {};
}

export interface SectionsWhyWrenAi extends Struct.ComponentSchema {
  collectionName: 'components_sections_why_wren_ais';
  info: {
    displayName: 'whyWrenAI';
  };
  attributes: {
    badge: Schema.Attribute.String;
    buttonContantBlock: Schema.Attribute.Component<
      'sections.bottom-content-block',
      true
    >;
    subTitle: Schema.Attribute.Text;
    title: Schema.Attribute.String;
    whyWrenAIDetails: Schema.Attribute.Component<
      'sections.why-wren-ai-details',
      true
    >;
  };
}

export interface SectionsWhyWrenAiDetails extends Struct.ComponentSchema {
  collectionName: 'components_sections_why_wren_ai_details';
  info: {
    displayName: 'whyWrenAIDetails';
  };
  attributes: {
    description: Schema.Attribute.Text;
    icon: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    title: Schema.Attribute.String;
  };
}

export interface SectionsWhyWrenSection extends Struct.ComponentSchema {
  collectionName: 'components_sections_why_wren_sections';
  info: {
    displayName: 'WrenAI';
  };
  attributes: {
    description: Schema.Attribute.String;
    subTitle: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface SectionsWhyWrenSectionList extends Struct.ComponentSchema {
  collectionName: 'components_sections_why_wren_section_lists';
  info: {
    displayName: 'WhyWrenSectionList';
  };
  attributes: {
    description: Schema.Attribute.Text;
    icon: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    >;
    title: Schema.Attribute.String;
  };
}

export interface SectionsWrenAi extends Struct.ComponentSchema {
  collectionName: 'components_sections_wren_ais';
  info: {
    displayName: 'wrenAI';
  };
  attributes: {
    description: Schema.Attribute.Text;
    subTitle: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface SectionsWrenEngine extends Struct.ComponentSchema {
  collectionName: 'components_sections_wren_engines';
  info: {
    displayName: 'wrenEngine';
  };
  attributes: {
    badge: Schema.Attribute.String;
    buttonBlock: Schema.Attribute.Component<'sections.button-block', true>;
    subtitle: Schema.Attribute.Text;
    title: Schema.Attribute.String;
    wrenEngineDetails: Schema.Attribute.Component<
      'sections.wren-engine-details',
      true
    >;
  };
}

export interface SectionsWrenEngineAi extends Struct.ComponentSchema {
  collectionName: 'components_sections_wren_engine_ais';
  info: {
    displayName: 'wrenEngineAI';
  };
  attributes: {
    description: Schema.Attribute.Text;
    subTitle: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface SectionsWrenEngineDetails extends Struct.ComponentSchema {
  collectionName: 'components_sections_wren_engine_details';
  info: {
    displayName: 'wrenEngineDetails';
  };
  attributes: {
    badge: Schema.Attribute.String;
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
    leftImage: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
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

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seos';
  info: {
    description: 'SEO metadata component';
    displayName: 'SEO';
  };
  attributes: {
    canonicalURL: Schema.Attribute.String;
    keywords: Schema.Attribute.String;
    metaDescription: Schema.Attribute.Text;
    metaImage: Schema.Attribute.Media<'images'>;
    metaRobots: Schema.Attribute.String;
    metaTitle: Schema.Attribute.String;
    metaViewport: Schema.Attribute.String;
    structuredData: Schema.Attribute.JSON;
  };
}

export interface SharedTag extends Struct.ComponentSchema {
  collectionName: 'components_shared_tags';
  info: {
    description: 'Tag component for blog posts';
    displayName: 'Tag';
  };
  attributes: {
    color: Schema.Attribute.String;
    name: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedWhyWrenSection extends Struct.ComponentSchema {
  collectionName: 'components_shared_why_wren_sections';
  info: {
    displayName: 'WhyWrenSection';
  };
  attributes: {
    badge: Schema.Attribute.String;
    title: Schema.Attribute.String;
    WhyWrenSectionDetails: Schema.Attribute.Component<
      'sections.why-wren-section-list',
      true
    >;
  };
}

export interface SolutionsButtonBlock extends Struct.ComponentSchema {
  collectionName: 'components_solutions_button_blocks';
  info: {
    displayName: 'buttonBlock';
  };
  attributes: {
    label: Schema.Attribute.String & Schema.Attribute.Required;
    url: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SolutionsButtonContantBlock extends Struct.ComponentSchema {
  collectionName: 'components_solutions_button_contant_blocks';
  info: {
    displayName: 'buttonContantBlock';
  };
  attributes: {
    label: Schema.Attribute.String & Schema.Attribute.Required;
    url: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SolutionsEnterpriseFeatures extends Struct.ComponentSchema {
  collectionName: 'components_solutions_Enterprise_Features_items';
  info: {
    displayName: 'Enterprise Features Item';
  };
  attributes: {
    icon: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    position: Schema.Attribute.String;
    subTitle: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface SolutionsEnterprisefeaturesBlock
  extends Struct.ComponentSchema {
  collectionName: 'components_solutions_EnterpriseFeatures_blocks';
  info: {
    displayName: 'Enterprise Features';
  };
  attributes: {
    badge: Schema.Attribute.String;
    button: Schema.Attribute.Component<'shared.button', true>;
    description: Schema.Attribute.RichText;
    EnterpriseFeaturesItems: Schema.Attribute.Component<
      'solutions.enterprise-features',
      true
    >;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    subtitle: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface SolutionsPublicRoadmap extends Struct.ComponentSchema {
  collectionName: 'components_solutions_public_roadmaps';
  info: {
    displayName: 'publicRoadmap';
  };
  attributes: {
    badge: Schema.Attribute.String;
    buttonBlock: Schema.Attribute.Component<'button-block.button-block', true>;
    subTitle: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface SolutionsSolutionsTab extends Struct.ComponentSchema {
  collectionName: 'components_solutions_blocks';
  info: {
    displayName: 'Solutions Tabs';
  };
  attributes: {
    badge: Schema.Attribute.String;
    button: Schema.Attribute.Component<'shared.button', true>;
    description: Schema.Attribute.RichText;
    descriptionDetail: Schema.Attribute.Blocks;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    subtitle: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface SolutionsWhyWrenAi extends Struct.ComponentSchema {
  collectionName: 'components_solutions_why_wren_ais';
  info: {
    displayName: 'whyWrenAI';
  };
  attributes: {
    badge: Schema.Attribute.String;
    buttonContantBlock: Schema.Attribute.Component<
      'solutions.button-contant-block',
      true
    >;
    subTitle: Schema.Attribute.Text;
    title: Schema.Attribute.String;
    whyWrenAIDetails: Schema.Attribute.Component<
      'solutions.why-wren-ai-details',
      true
    >;
  };
}

export interface SolutionsWhyWrenAiDetails extends Struct.ComponentSchema {
  collectionName: 'components_solutions_why_wren_ai_details';
  info: {
    displayName: 'whyWrenAIDetails';
  };
  attributes: {
    description: Schema.Attribute.Text;
    icon: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    title: Schema.Attribute.String;
  };
}

export interface WrenEngineAiWrenEngineAi extends Struct.ComponentSchema {
  collectionName: 'components_wren_engine_ai_wren_engine_ais';
  info: {
    displayName: 'wrenEngineAI';
  };
  attributes: {
    description: Schema.Attribute.Text;
    subTitle: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'blog-detail.blog-detail': BlogDetailBlogDetail;
      'bottom-content-block.bottom-content-block': BottomContentBlockBottomContentBlock;
      'bottom-content-block.btn-bottom-content-block': BottomContentBlockBtnBottomContentBlock;
      'button-block.button-block': ButtonBlockButtonBlock;
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
      'sections.bottom-content-block': SectionsBottomContentBlock;
      'sections.button': SectionsButton;
      'sections.button-block': SectionsButtonBlock;
      'sections.button-contant-block': SectionsButtonContantBlock;
      'sections.cta-section': SectionsCtaSection;
      'sections.feature-grid': SectionsFeatureGrid;
      'sections.hero-section': SectionsHeroSection;
      'sections.logos-section': SectionsLogosSection;
      'sections.open-source-project': SectionsOpenSourceProject;
      'sections.public-roadmap': SectionsPublicRoadmap;
      'sections.wern-engine': SectionsWernEngine;
      'sections.wern-engine-details': SectionsWernEngineDetails;
      'sections.whaywren-ai': SectionsWhaywrenAi;
      'sections.why-wren-ai': SectionsWhyWrenAi;
      'sections.why-wren-ai-details': SectionsWhyWrenAiDetails;
      'sections.why-wren-section': SectionsWhyWrenSection;
      'sections.why-wren-section-list': SectionsWhyWrenSectionList;
      'sections.wren-ai': SectionsWrenAi;
      'sections.wren-engine': SectionsWrenEngine;
      'sections.wren-engine-ai': SectionsWrenEngineAi;
      'sections.wren-engine-details': SectionsWrenEngineDetails;
      'shared.bottom-content-block': SharedBottomContentBlock;
      'shared.button': SharedButton;
      'shared.content-block': SharedContentBlock;
      'shared.link': SharedLink;
      'shared.seo': SharedSeo;
      'shared.tag': SharedTag;
      'shared.why-wren-section': SharedWhyWrenSection;
      'solutions.button-block': SolutionsButtonBlock;
      'solutions.button-contant-block': SolutionsButtonContantBlock;
      'solutions.enterprise-features': SolutionsEnterpriseFeatures;
      'solutions.enterprisefeatures-block': SolutionsEnterprisefeaturesBlock;
      'solutions.public-roadmap': SolutionsPublicRoadmap;
      'solutions.solutions-tab': SolutionsSolutionsTab;
      'solutions.why-wren-ai': SolutionsWhyWrenAi;
      'solutions.why-wren-ai-details': SolutionsWhyWrenAiDetails;
      'wren-engine-ai.wren-engine-ai': WrenEngineAiWrenEngineAi;
    }
  }
}
