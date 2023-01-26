import axios from 'axios';

const API_KEY = '31477938-fd248c01ea14c0dbe5bfc1d84';
const BASE_URL = 'https://pixabay.com/api';

export const fetchImages = async (searchQuery, page) => {
  const url = `${BASE_URL}/?key=${API_KEY}&q=${searchQuery}&image_type=photo&orientation=horizontal&page=${page}&per_page=12`;
  try {
    const response = await axios.get(url);
    return response.data.hits;
  } catch (error) {
    return new Error(`No images for ${searchQuery}. Please try something else`);
  }
};
