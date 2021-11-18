import { Router } from 'express';
import { v2 as Cloudinary } from 'cloudinary';

const Config = Cloudinary.config({
  cloud_name: process.env.IMAGE_CLOUD_NAME,
  api_key: process.env.IMAGE_CLOUD_KEY,
  api_secret: process.env.IMAGE_CLOUD_SECRET,
  secure: true
});

const ImageRouter = Router();

ImageRouter.get('/upload-signature', (req, res) => {
  const { api_secret, cloud_name, api_key } = Config;
  const timestamp = Math.round((new Date).getTime() / 1000);
  const signature = Cloudinary.utils.api_sign_request({
    eager: 'c_pad,h_300,w_400|c_crop,h_200,w_260|c_pad,h_300,w_800',
    folder: 'seeya',
    timestamp,
  }, api_secret);
  res.json({
    signature,
    timestamp,
    cloudname: cloud_name,
    apikey: api_key
  });
})

export default ImageRouter;