import Notiflix from 'notiflix';
import { fetchBreeds, fetchCatByBreed } from './cat-api.js';
import initializeSlimSelect from './slim-select.js';

const loader = document.querySelector('.loader');
const catInfo = document.querySelector('.cat-info');
const selectElement = document.querySelector('.breed-select');

const showLoader = () => {
  loader.style.display = 'block';
};

const hideLoader = () => {
  loader.style.display = 'none';
};

const displayCatInfo = async breedId => {
  console.log('displayCatInfo triggered for breedId:', breedId);
  showLoader();
  catInfo.classList.add('hidden');
  try {
    const response = await fetchCatByBreed(breedId);
    const catData = response.data[0];
    catInfo.innerHTML = `
            <img src="${catData.url}" alt="${catData.breeds[0].name}" width="300">
            <h2>${catData.breeds[0].name}</h2>
            <p><strong>Description:</strong> ${catData.breeds[0].description}</p>
            <p><strong>Temperament:</strong> ${catData.breeds[0].temperament}</p>
        `;
    catInfo.classList.remove('hidden');
  } catch (error) {
    console.error('Error in displayCatInfo:', error);
    Notiflix.Notify.Failure('Oops! Something went wrong. Please try again.');
  } finally {
    hideLoader();
  }
};

selectElement.addEventListener('change', event => {
  const selectedBreedId = event.target.value;
  console.log('Selected breed ID from native event:', selectedBreedId);
  if (selectedBreedId) {
    displayCatInfo(selectedBreedId);
  }
});

initializeSlimSelect(fetchBreeds, () => {
  Notiflix.Notify.Failure(
    'Oops! Something went wrong while fetching the breeds. Please try again.'
  );
});
