import { promises as fs } from 'fs';

export default defineEventHandler(async (event) => {
  const name = getRouterParam(event, 'name');

  try {
    await fs.unlink(`public/assets/images/${name}`);
  } catch (error: any) {
    return createError({
      status: error.statusCode,
      message: error.message
    });
  }
});