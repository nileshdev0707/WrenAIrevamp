/**
 * blog controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::blog.blog' as any, () => ({
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
        featuredImage: true,
        categories: true,
        relatedPosts: {
          populate: {
            featuredImage: true,
            categories: true,
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
        featuredImage: true,
        categories: true,
        relatedPosts: {
          populate: {
            featuredImage: true,
            categories: true,
          },
        },
      },
    }
    // @ts-ignore
    return await super.findOne(ctx)
  },
}));
