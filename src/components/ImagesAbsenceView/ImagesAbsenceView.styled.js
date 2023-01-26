import styled from 'styled-components';

export const StyledBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export const ErrorMessage = styled.p`
  font-size: 20px;
  color: #293275;
  font-weight: bold;
`;

export const ErrorImage = styled.img.attrs(props => ({
  src: props.src,
  alt: props.alt,
}))`
  width: 260px;
`;
