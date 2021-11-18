import JWT from 'jsonwebtoken';
// import DB from 'Database';
import AsyncMiddleware from './AsyncMiddleware';

export default AsyncMiddleware(async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const { id } = JWT.verify(token, process.env.JWT);
    if (!!id) {
      next();
      return;
    }
    // const user = await DB.User.getUserByID(id);
    // if (id === user.dataValues.id) {
    //   next();
    //   return;
    // }
    throw new Error('User not authenticated');
  } catch (error) {
    res.status(401).json({
      error: new Error('User not authenticated')
    });
  }
});