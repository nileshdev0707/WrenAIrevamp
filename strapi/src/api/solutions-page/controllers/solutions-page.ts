/**
 * solutions-page controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::solutions-page.solutions-page', () => ({
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
        hero: {
          on: {
            'sections.hero-section': {
              populate: {
                buttons: { populate: '*' },
                image: true,
                backgroundimage: true,
              },
            },
          },
        },
        SolutionsTab: {
          populate: {
            image: true,
            button: { populate: '*' },
          },
        },
        EnterpriseFeaturesBlock: {
          on: {
            'solutions.enterprisefeatures-block': {
              populate: {
                image: true,
                button: { populate: '*' },
                EnterpriseFeaturesItems: {
                  populate: {
                    icon: true,
                  },
                },
              },
            },
          },
        },
        ContentBlock: {
          populate: {
            image: true,
            contentBlockButton: { populate: '*' },
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
        hero: {
          on: {
            'sections.hero-section': {
              populate: {
                buttons: { populate: '*' },
                image: true,
                backgroundimage: true,
              },
            },
          },
        },
        SolutionsTab: {
          populate: {
            image: true,
            button: { populate: '*' },
          },
        },
        EnterpriseFeaturesBlock: {
          on: {
            'solutions.enterprisefeatures-block': {
              populate: {
                image: true,
                button: { populate: '*' },
                EnterpriseFeaturesItems: {
                  populate: {
                    icon: true,
                  },
                },
              },
            },
          },
        },
        ContentBlock: {
          populate: {
            image: true,
            contentBlockButton: { populate: '*' },
          },
        },
      },
    }
    // @ts-ignore
    return await super.findOne(ctx)
  },
}));
