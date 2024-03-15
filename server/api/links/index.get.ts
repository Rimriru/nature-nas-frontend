import { links } from '../../models/index';

export default defineEventHandler(async (evt) => {
  try {
    const linksData = links.find();
    return linksData;
  } catch (error: any) {
    throw createError({
      status: error.statusCode,
      message: error.message
    });
  }
});
