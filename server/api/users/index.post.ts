import { users } from '../../models/index';

interface RequestBody {
  username: string;
  password: string;
};

interface userDataFromDb {
  _id: string;
  username: string;
  password: string;
};

export default defineEventHandler(async (evt) => {
  console.log("POST /api/users");
  const { username, password } = await readBody<RequestBody>(evt);
  try {
    console.log("Create user");
    const newUserData = await users.create({
      password,
      username
    });
    return newUserData;
  } catch (error: any) {
    console.dir(error);
    throw createError({
      statusCode: 500,
      statusMessage: error.message
    });
  }
});