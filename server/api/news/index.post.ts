import { news } from '~/server/models';
import { UNAUTHORIZED_ERROR_MESSAGE } from '~/utils/errorMessages';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const jwt = getCookie(event, 'jwt');

  try {
    if (jwt) {
      const createdNewsItem = await news.create(body);
      setResponseStatus(event, 201);
      return createdNewsItem;
    } else {
      throw createError({
        status: 401,
        message: UNAUTHORIZED_ERROR_MESSAGE
      });
    }
  } catch (error: any) {
    return createError({
      status: error.statusCode,
      message: error.message
    });
  }
});
