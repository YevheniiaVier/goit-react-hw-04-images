import PropTypes from 'prop-types';

import { GalleryImage, GalleryItem } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ src, alt, id, onImgClick }) => {
  return (
    <GalleryItem>
      <GalleryImage onClick={onImgClick} src={src} alt={alt} id={id} />
    </GalleryItem>
  );
};

ImageGalleryItem.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
};
