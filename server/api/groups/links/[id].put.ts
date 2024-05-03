import { groups } from '../../../models/index';
import { BAD_REQUEST_ERROR_MESSAGE, UNAUTHORIZED_ERROR_MESSAGE } from '~/utils/errorMessages';
import type { LinkGroup } from '~/types/LinkDataFromDb';

export default defineEventHandler(async (event) => {
  const groupId = getRouterParam(event, 'id');
  const { linkId } = await readBody(event);
  const jwt = getCookie(event, 'jwt');

  if (!groupId || !linkId) {
    throw createError({
      status: 400,
      message: BAD_REQUEST_ERROR_MESSAGE
    });
  }

  try {
    if (jwt) {
      const newLinkGroup = await groups
        .findByIdAndUpdate(groupId, { $addToSet: { links: linkId } }, { new: true })
        .populate('links');
      return newLinkGroup as unknown as LinkGroup;
    } else {
      throw createError({
        status: 401,
        message: UNAUTHORIZED_ERROR_MESSAGE
      });
    }
  } catch (error: any) {
    throw createError({
      status: error.statusCode,
      message: error.message
    });
  }
});
