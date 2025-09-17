/**
 * docs-page controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::docs-page.docs-page', () => ({
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
        ContentBlock: {
          populate: {
            image: true,
            contentBlockButton: { populate: '*' },
          },
        },
        BottomContentBlock: {
          on: {
            'shared.bottom-content-block': {
              populate: {
                image: true,
                btnBottomContentBlock: { populate: '*' },
              },
            },
          },
        },
        publicRoadmap: {
          populate: {
            buttonBlock: { populate: '*' },
          },
        },
        openSourceProject: {
          on: {
            'sections.open-source-project': {
              populate: {
                image: true,
                WrenAI: { populate: '*' },
                wrenEngineAI: { populate: '*' },
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
        ContentBlock: {
          populate: {
            image: true,
            contentBlockButton: { populate: '*' },
          },
        },
        BottomContentBlock: {
          on: {
            'shared.bottom-content-block': {
              populate: {
                image: true,
                btnBottomContentBlock: { populate: '*' },
              },
            },
          },
        },
        publicRoadmap: {
          populate: {
            buttonBlock: { populate: '*' },
          },
        },
        openSourceProject: {
          on: {
            'sections.open-source-project': {
              populate: {
                image: true,
                WrenAI: { populate: '*' },
                wrenEngineAI: { populate: '*' },
              },
            },
          },
        },
      },
    }
    // @ts-ignore
    return await super.findOne(ctx)
  },
}));
