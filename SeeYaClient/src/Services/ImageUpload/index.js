import Axios from 'axios';
import Store from 'Store';
import User from 'Services/User';

const { dispatch, getState } = Store;

export default class ImageUpload {

  static signature = null;

  static async getSignature() {
    try {
      const { data } = await Axios({
        method: 'GET',
        url: 'http://localhost:3001/api/images/upload-signature',
        headers: {
          authorization: `bearer ${getState().Authentication.token}`
        }
      });
      this.signature = data;
    } catch (error) {
      console.log('GET_SIGNATURE_ERROR', error);
      this.signature = null;
    }
  }

  static async upload(file) {
    if (!this.signature) {
      dispatch({
        type: 'IMAGE_UPLOAD_ERROR',
        error: 'Please try again in a few minutes'
      });
      return;
    }
    const formData = new FormData();
    formData.append('file', file);
    formData.append('api_key', this.signature.apikey);
    formData.append('timestamp', this.signature.timestamp);
    formData.append('signature', this.signature.signature);
    formData.append('eager', 'c_pad,h_300,w_400|c_crop,h_200,w_260|c_pad,h_300,w_800');
    formData.append('folder', 'seeya');
    try {
      const { data } = await Axios({
        method: 'POST',
        url: `https://api.cloudinary.com/v1_1/${this.signature.cloudname}/auto/upload`,
        data: formData,
        onUploadProgress: ({ loaded, total }) => {
          dispatch({
            type: 'IMAGE_UPLOAD_PROGRESS',
            progress: Math.round((loaded * 100) / total)
          });
        }
      });
      const { secure_url } = data;
      User.updateUser({ image: secure_url });
    } catch (error) {
      console.log('CLOUDINARY_UPLOAD_ERROR', error);
      dispatch({
        type: 'NOTIFY_ERROR',
        message: 'Something went wrong during the upload. Please try again in a few minutes'
      });
    }
  }
}