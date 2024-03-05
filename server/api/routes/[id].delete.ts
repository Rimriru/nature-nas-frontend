import { routes, links } from '../../models/index';

export default defineEventHandler(async (evt) => {
  const id = getRouterParam(evt, 'id');
  try {
    console.log('Delete route');
    const deletedRoute = await routes.findByIdAndDelete(id);
    if (deletedRoute) {
      await links.deleteMany({ route: deletedRoute });
    }
    return { deletedRoute, message: `Страница с ссылками удалена` };
  } catch (error: any) {
    console.error(error);
    throw createError({
      status: error.statusCode,
      message: error.message
    });
  }
});
