import PropTypes from 'prop-types';

import { FaSearchengin } from 'react-icons/fa';
import { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
  StyledForm,
  StyledBtnLabel,
  StyledHeader,
  StyledInput,
  StyledSearchBtn,
} from './Searchbar.styled';

export const Searchbar = ({ onSubmit }) => {
  const [searchQuery, setSearchQuery] = useState('');

  // state = {
  //   searchQuery: '',
  // };

  const handleChange = e => {
    setSearchQuery(e.currentTarget.value.toLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (searchQuery.trim() === '') {
      return toast.warn('Plese enter what you are looking for', {
        theme: 'colored',
        pauseOnHover: true,
      });
    }

    onSubmit(searchQuery);
    setSearchQuery('');
    e.currentTarget.reset();
  };

  return (
    <StyledHeader>
      <StyledForm onSubmit={handleSubmit}>
        <StyledSearchBtn type="submit">
          <FaSearchengin size={30} />
          <StyledBtnLabel>Search</StyledBtnLabel>
        </StyledSearchBtn>
        <StyledInput
          type="text"
          autocomplete="off"
          autoFocus
          value={searchQuery}
          onChange={handleChange}
          placeholder="Search images and photos"
        />
      </StyledForm>
    </StyledHeader>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
