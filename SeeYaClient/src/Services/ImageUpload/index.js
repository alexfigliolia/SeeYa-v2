import Axios from 'axios';
import Store from 'Store';
import User from 'Services/User';
import { imageUploadError } from 'Actions/User';

const { dispatch, getState } = Store;

export default class ImageUpload {

  static signature = null;
  static interval = null;

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
    dispatch({ type: 'UPLOADING_NEW_USER_IMAGE' });
    try {
      this.fakeProgressDuringUserUpdate();
      const { data } = await Axios({
        method: 'POST',
        url: `https://api.cloudinary.com/v1_1/${this.signature.cloudname}/auto/upload`,
        data: this.createCloudinaryPayload(file),
        onUploadProgress: this.recordUploadProgress
      });
      const { secure_url } = data;
      if (!secure_url) {
        throw new Error('The response payload is missing "secure_url"');
      }
      User.updateUser({ image: secure_url });
    } catch (error) {
      console.log('CLOUDINARY_UPLOAD_ERROR', error);
      dispatch(imageUploadError());
    }
  }

  static createCloudinaryPayload(file) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('api_key', this.signature.apikey);
    formData.append('timestamp', this.signature.timestamp);
    formData.append('signature', this.signature.signature);
    formData.append('eager', 'c_pad,h_300,w_400|c_crop,h_200,w_260|c_pad,h_300,w_800');
    formData.append('folder', 'seeya');
    return formData;
  }

  static recordUploadProgress({ loaded, total }) {
    dispatch({
      type: 'USER_IMAGE_UPLOAD_PROGRESS',
      progress: Math.round((loaded * 75) / total)
    });
  }

  static fakeProgressDuringUserUpdate() {
    dispatch({ type: 'INCREMENT_USER_IMAGE_UPLOAD_PROGRESS' });
    this.interval = setInterval(() => {
      dispatch({ type: 'INCREMENT_USER_IMAGE_UPLOAD_PROGRESS' });
    }, 250);
  }

  static clearFakeProgressInterval() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }
}