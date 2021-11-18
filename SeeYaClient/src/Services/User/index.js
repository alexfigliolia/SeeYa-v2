import Store from 'Store';
import GraphHTTP from 'Services/GraphHTTP';
import Queries from './Queries';

const { dispatch, getState } = Store;

export default class User {

  static async updateUser(update) {
    const { user: { serverID }, token } = getState().Authentication;
    try {
      const { UpdateUser } = await GraphHTTP.client({
        headers: {
          authorization: `bearer ${token}`
        },
        data: {
          query: Queries.UPDATE_USER,
          variables: {
            input: {
              id: serverID,
              clientMutationId: 'abc',
              ...update
            }
          }
        }
      });
      const { error, user } = UpdateUser;
      if (error) {
        dispatch({
          type: 'NOTIFY_ERROR',
          message: 'Something went wrong. Please try again'
        });
      } else {
        dispatch({
          type: 'NOTIFY_SUCCESS',
          message: 'Your profile photo updated successfully. Looking good!'
        });
        dispatch({ type: 'UPDATE_USER_OBJECT', user });
      }
    } catch (error) {
      console.log('UPDATE_USER_ERROR', error);
      dispatch({
        type: 'NOTIFY_ERROR',
        message: error.message
      });
    }
  }
}