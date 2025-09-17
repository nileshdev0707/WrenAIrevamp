/**
 * blog-page controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::blog-page.blog-page', () => ({
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
        featuredPosts: {
          populate: {
            featuredImage: true,
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
        featuredPosts: {
          populate: {
            featuredImage: true,
          },
        },
      },
    }
    // @ts-ignore
    return await super.findOne(ctx)
  },
}));
