import PropTypes from 'prop-types';

import errorImage from '../../images/noImages.png';
import {
  StyledBox,
  ErrorImage,
  ErrorMessage,
} from './ImagesAbsenceView.styled';

export const ImageAbsenceView = ({ message }) => {
  return (
    <StyledBox>
      <ErrorMessage>{message}</ErrorMessage>
      <ErrorImage src={errorImage} alt="No images found" />
    </StyledBox>
  );
};

ImageAbsenceView.propTypes = {
  message: PropTypes.string.isRequired,
};
