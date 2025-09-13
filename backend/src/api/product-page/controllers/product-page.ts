/**
 * product-page controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::product-page.product-page', () => ({
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
        productHero: { populate: '*' },
        WhatIsWrenAI: {
          on: {
            'product.whatiswrenai-block': {
              populate: {
                image: true,
                WhatisWrenAIItem: {
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
        productHero: { populate: '*' },
        WhatIsWrenAI: {
          on: {
            'product.whatiswrenai-block': {
              populate: {
                image: true,
                WhatisWrenAIItem: {
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
}))
