/**
 * home-page controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::home-page.home-page', () => ({
  async find(ctx) {
    const existingPopulate =
      ctx && (ctx as any).query && typeof (ctx as any).query.populate === 'object'
        ? (ctx as any).query.populate
        : {}
    ;
    (ctx as any).query = {
      ...(ctx as any).query,
      populate: {
        ...existingPopulate,
        hero: { populate: '*' },
        TrustedBy: { populate: '*' },
        caseStudies: { populate: '*' },
        trustedByDataTeams: { populate: '*' },
        getStartedWithWrenAI: { populate: '*' },
        coreCapabilities: {
          on: {
            'home.core-capabilities': {
              populate: {
                learnMore: { populate: '*' },
                coreCapabilitieList: {
                  populate: {
                    image: true,
                  },
                },
              },
            },
          },
        },
        UseCases: {
          on: {
            'home.use-cases': {
              populate: {
                useCasesItems: {
                  populate: {
                    image: true,
                  },
                },
              },
            },
          },
        },
      },
    }
    // @ts-ignore
    return await super.find(ctx)
  },

  async findOne(ctx) {
    const existingPopulate =
      ctx && (ctx as any).query && typeof (ctx as any).query.populate === 'object'
        ? (ctx as any).query.populate
        : {}
    ;
    (ctx as any).query = {
      ...(ctx as any).query,
      populate: {
        ...existingPopulate,
        hero: { populate: '*' },
        TrustedBy: { populate: '*' },
        caseStudies: { populate: '*' },
        trustedByDataTeams: { populate: '*' },
        getStartedWithWrenAI: { populate: '*' },
        coreCapabilities: {
          on: {
            'home.core-capabilities': {
              populate: {
                learnMore: { populate: '*' },
                coreCapabilitieList: {
                  populate: {
                    image: true,
                  },
                },
              },
            },
          },
        },
        UseCases: {
          on: {
            'home.use-cases': {
              populate: {
                useCasesItems: {
                  populate: {
                    image: true,
                  },
                },
              },
            },
          },
        },
      },
    }
    // @ts-ignore
    return await super.findOne(ctx)
  },
}))
