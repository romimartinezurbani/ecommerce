import { useState, useEffect } from 'react';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import { app } from '../config/firebase';

const storage = getStorage(app);

export const useFirebaseImage = (imageName) => {
  const [imgUrl, setImgUrl] = useState('');

  useEffect(() => {
    if (imageName) {
      const imgRef = ref(storage, `images/${imageName}`);
      getDownloadURL(imgRef)
        .then((url) => setImgUrl(url))
        .catch((error) => console.error('Error al cargar la imagen:', error));
    }
  }, [imageName]);

  return imgUrl;
};
