import JWT from 'jsonwebtoken';
// import DB from 'Database';

export default async request => {
  try {
    const token = request.headers.authorization.split(' ')[1];
    const { id } = JWT.verify(token, process.env.JWT);
    if (!!id) {
      return true;
    }
    // const user = await DB.User.getUserByID(id);
    // if (id === user.dataValues.id) {
    //   next();
    //   return;
    // }
    throw new Error('User not authenticated');
  } catch (error) {
    throw new Error('User not authenticated');
  }
};