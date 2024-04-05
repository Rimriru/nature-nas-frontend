import { linkGroups } from '../../../models/index';
import { BAD_REQUEST_ERROR_MESSAGE } from '~/utils/errorMessages';
import type { LinkGroup } from '~/types/LinkDataFromDb';

export default defineEventHandler(async (event) => {
  const groupId = getRouterParam(event, 'id');
  const { linkId } = await readBody(event);

  if (!groupId || !linkId) {
    throw createError({
      status: 400,
      message: BAD_REQUEST_ERROR_MESSAGE
    });
  }

  try {
    const newLinkGroup = await linkGroups
      .findByIdAndUpdate(groupId, { $addToSet: { links: linkId } }, { new: true })
      .populate('links');
    return newLinkGroup as unknown as LinkGroup;
  } catch (error: any) {
    throw createError({
      status: error.statusCode,
      message: error.message
    });
  }
});