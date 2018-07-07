export const SET_IMAGES = 'SET_IMAGES';
export const ADD_IMAGE = 'ADD_IMAGE';

export function addImage(IMAGE) {
  return {
    type: ADD_IMAGE,
    data: IMAGE
  };
}
export function setImages(images) {
  return {
    type: SET_IMAGES,
    data: images
  };
}

export function handleResponse(response) {
  if (response.ok) {
    return response.json();
  } else {
    let error = new Error();
    error.response = response;
    throw error;
  }
}
export function postImage(data) {
  return (dispatch) => {
    const dataUpload = new FormData();
    dataUpload.append('image', data.src);
    dataUpload.append('title', data.title);
    dataUpload.append('description', data.description);
    return fetch('/api/image', {
      method: 'post',
      body: dataUpload
    })
      .then(handleResponse)
      .then((data) => {
        dispatch(addImage(data));
      });
  };
}

/**
 * get all images
 *
 * @export
 * @returns data images
 */
export function getImages() {
  return (dispatch) => {
    return fetch('/api/images')
      .then((res) => res.json())
      .then((data) => dispatch(setImages(data.images)));
  };
}
