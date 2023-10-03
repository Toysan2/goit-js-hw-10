import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_0E5x8jdCKMbi1c183G5nEN0dasXbtPsXcjYussnwbwZa4Ti1yZEPAkgeFAFlbGoC';

export const fetchBreeds = async () => {
  console.log('Fetching breeds...');
  try {
    const response = await axios.get('https://api.thecatapi.com/v1/breeds');
    console.log('Fetched breeds:', response.data);
    return response;
  } catch (error) {
    console.error('Error fetching breeds:', error);
    throw error;
  }
};

export const fetchCatByBreed = async breedId => {
  console.log('Fetching cat by breed:', breedId);
  try {
    const response = await axios.get(
      `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`
    );
    console.log('Fetched cat:', response.data);
    return response;
  } catch (error) {
    console.error('Error fetching cat by breed:', error);
    throw error;
  }
};
