import Store from 'Store';
import GraphHTTP from 'Services/GraphHTTP';
import Queries from './Queries';
import { imageUploadError, imageUploadSuccess } from 'Actions/User';

const { dispatch, getState } = Store;

export default class User {

  static async updateUser(update) {
    const isImageUploading = 'image' in update;
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
        this.dispatchError(isImageUploading);
      } else {
        this.dispatchSuccess(isImageUploading);
        dispatch({ type: 'UPDATE_USER_OBJECT', user });
      }
    } catch (error) {
      console.log('UPDATE_USER_ERROR', error);
      this.dispatchError(isImageUploading, error.message);
    }
  }

  static dispatchError(isImageUploading, message = '') {
    if (isImageUploading) {
      dispatch(imageUploadError());
    } else {
      dispatch({
        type: 'NOTIFY_ERROR',
        message: message || 'Something went wrong. Please try again'
      });
    }
  }

  static dispatchSuccess(isImageUploading) {
    if (isImageUploading) {
      dispatch(imageUploadSuccess());
    } else {
      dispatch({
        type: 'NOTIFY_SUCCESS',
        message: 'Your profile photo updated successfully. Looking good!'
      });
    }
  }
}