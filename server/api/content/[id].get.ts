import { contents } from '../../models/index';
import type Content from '~/types/ContentDataFromDb';

export default defineEventHandler(async (evt) => {
  const id = getRouterParam(evt, 'id');
  try {
    const content = await contents.findOne({ route: id });
    return content as unknown as Content;
  } catch (error: any) {
    throw createError({
      status: error.statusCode,
      message: error.message
    });
  }
});
