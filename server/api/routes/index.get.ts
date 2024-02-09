import { routes } from '../../models/index';
import type RouteDataFromDb from '~/components/PageCreation/PageCreation.types';

export default defineEventHandler(async () => {
  console.log('GET /api/routes');
  try {
    console.log('Find routes');
    const allCustomRoutes: RouteDataFromDb[] = await routes.find();
    return allCustomRoutes;
  } catch (error: any) {
    console.dir(error);
    throw createError({
      statusCode: 500,
      statusMessage: error.message
    });
  }
});
