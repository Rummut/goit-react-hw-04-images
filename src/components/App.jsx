import { useEffect, useState } from 'react';
import { Searchbar } from './searchbar/Searchbar';
import { ImageGallery } from './image-gallery/ImageGallery';
import { Button } from './button/Button';
import { AppStyled, MainStyled } from './App.styled';
import { FetchImages } from './api-request/Api-requst';
import { Loader } from './loader/Loader';

export const App = () => {
  const [values, setValues] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        setIsLoading(true);
        const { hits, total } = await FetchImages({
          page: page,
          values: values,
        });
        setImages(prevState => [...prevState, ...hits]);
        setTotal(total);
      } catch (error) {
        console.log('error');
      } finally {
        setIsLoading(false);
      }
    };
    if (values !== '') {
      fetchImages();
    }
  }, [page, values]);

  const changeValues = newValues => {
    setValues(newValues);
    setImages([]);
    setPage(1);
  };

  const handleLoadMore = () => {
    setPage(prevState => prevState + 1);
  };

  return (
    <AppStyled>
      <Searchbar onSubmit={changeValues} />
      <MainStyled>
        <ImageGallery imageState={images} />
        {isLoading && <Loader />}
        {images.length < total && <Button onClick={handleLoadMore} />}
      </MainStyled>
    </AppStyled>
  );
};
