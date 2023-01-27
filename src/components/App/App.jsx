import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';

import { Searchbar } from 'components/Searchbar/Searchbar';
import { Container } from './App.styled';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Modal } from 'components/Modal/Modal';
import { Button } from 'components/Button/Button';
import { Loader } from 'components/Loader/Loader';
import { ImageAbsenceView } from 'components/ImagesAbsenceView/ImagesAbsenceView';
import { fetchImages } from 'api/imagesApi';

export const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [gallery, setGallery] = useState([]);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('idle');
  const [showModal, setShowModal] = useState(false);
  const [clickedImg, setClickedImg] = useState({});
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    if (gallery.length > 12 && page !== 1) {
      onSmoothScroll();
    }
  }, [gallery, page]);

  useEffect(() => {
    if (searchQuery === '') {
      return;
    }
    setStatus('pending');
    setShowButton(false);
    fetchImages(searchQuery, page)
      .then(response => {
        setGallery(prevState => [...prevState, ...response]);
        setStatus('resolved');
        setShowButton(true);
        if (response.length === 0) {
          setGallery([]);
          setShowButton(false);
          return onSearchError(searchQuery);
        }
        if (response.length <= 11) {
          setShowButton(false);
          onSearchEndNotice();
        } else {
          setShowButton(true);
        }
      })
      .catch(error => {
        setError(error);
        setStatus('rejected');
      });
  }, [page, searchQuery]);

  const handleSearchFormSubmit = searchText => {
    if (searchQuery === searchText) {
      return onDoubleSearchNotice();
    }
    setSearchQuery(searchText);
    setPage(1);
    setGallery([]);
  };

  const loadMore = () => {
    setPage(prevState => prevState + 1);
  };
  const toggleModal = () => {
    setShowModal(prevState => !prevState);
  };

  const onImgClick = e => {
    const clickedImgId = Number(e.currentTarget.id);
    const foundImg = gallery.find(element => element.id === clickedImgId);
    setClickedImg(foundImg);
    toggleModal();
  };

  return (
    <Container>
      <Searchbar onSubmit={handleSearchFormSubmit} />
      {status === 'pending' && <Loader />}
      {status === 'rejected' && <ImageAbsenceView message={error.message} />}
      {gallery[0] && (
        <ImageGallery id="gallery" gallery={gallery} onImgClick={onImgClick} />
      )}
      {status === 'pending' && gallery[0] && <Loader />}
      {showButton && (
        <Button type="button" text="Load more" onClick={loadMore} />
      )}
      {showModal && (
        <Modal onClose={toggleModal} clickedImg={clickedImg}></Modal>
      )}
      <ToastContainer autoClose={2000} />
    </Container>
  );
};

function onSearchEndNotice() {
  return toast.warn(
    `We're sorry, but you've reached the end of search results.`,
    {
      theme: 'colored',
      pauseOnHover: true,
    }
  );
}

function onSearchError(searchQuery) {
  return Promise.reject(
    new Error(`No images for ${searchQuery}. Please try something else`)
  );
}

function onSmoothScroll() {
  const { height: cardHeight } = document
    .querySelector('#gallery')
    .firstElementChild.getBoundingClientRect();
  window.scrollBy({
    top: cardHeight * 3,
    behavior: 'smooth',
  });
}

function onDoubleSearchNotice() {
  return toast.warn(
    `Please enter new text for search, the result of current search is already shown`,
    {
      theme: 'colored',
      pauseOnHover: true,
    }
  );
}
