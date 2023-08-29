import { useState } from 'react';
import { ImageGalleryItemStyled, ImageStyled } from './ImageGalleryItem.styled';
import { ModalImage } from 'components/modal/Modal';

export const ImageGalleryItem = ({ imageState }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => setIsModalOpen(prevState => !prevState);

  return (
    <>
      <ImageGalleryItemStyled onClick={toggleModal}>
        <ImageStyled src={imageState.webformatURL} alt={imageState.tags} />
      </ImageGalleryItemStyled>
      <ModalImage
        modalState={isModalOpen}
        imageState={imageState}
        toggleModal={toggleModal}
      />
    </>
  );
};
