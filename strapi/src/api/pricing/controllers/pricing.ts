import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::pricing.pricing', () => ({
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
        tiers: { populate: '*' },
        TrustedBy: { populate: '*' },
        ContentBlock: { populate: '*' },
        frequentlyAskedQuestions: { populate: '*' },
        bottomContentBlock: { populate: '*' },
      },
    };
    // @ts-ignore
    return await super.find(ctx);
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
        tiers: { populate: '*' },
        TrustedBy: { populate: '*' },
        ContentBlock: { populate: '*' },
        frequentlyAskedQuestions: { populate: '*' },
        bottomContentBlock: { populate: '*' },
      },
    };
    // @ts-ignore
    return await super.findOne(ctx);
  },
}));


