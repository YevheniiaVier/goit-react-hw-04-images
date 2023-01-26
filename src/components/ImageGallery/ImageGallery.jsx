import PropTypes from 'prop-types';

import { Gallery } from './ImageGallery.styled';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

export const ImageGallery = ({ id, gallery, onImgClick }) => {
  return (
    <Gallery id={id}>
      {gallery.map(({ webformatURL, id, tags }) => (
        <ImageGalleryItem
          onImgClick={onImgClick}
          key={id}
          id={id}
          src={webformatURL}
          alt={tags}
        />
      ))}
    </Gallery>
  );
};

ImageGallery.propTypes = {
  gallery: PropTypes.array.isRequired,
};
