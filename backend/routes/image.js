import {
  getImages,
  postImage
} from '../controllers/image';
import multipart from 'connect-multiparty';
const multipartMiddleware = multipart();

export default (router) => {
  /**
   * get all images
   */
  router.route('/images').get(getImages);


  /**
   * follow a user
   */
  router.route('/image').post(multipartMiddleware,postImage);
};