import '../css/cat-loader.css';
import {
  fetchBreeds,
  fetchCatByBreed,
  showLoader,
  hideLoader,
} from './cat-api.js';

const breedSelectElement = document.getElementById('breed-select');
const catInfoElement = document.querySelector('.cat-info');
const catImageFrameElement = document.querySelector('.cat-image-frame');
const catElement = document.querySelector('.cat');
const centerContainerElement = document.querySelector('.center-container');

const initializeCatApp = async () => {
  showLoader();
  try {
    const breeds = await fetchBreeds();
    breeds.forEach(breed => {
      const option = document.createElement('option');
      option.value = breed.id;
      option.text = breed.name;
      breedSelectElement.add(option);
    });

    catImageFrameElement.style.display = 'none';
  } catch (error) {
    console.error('Error initializing app:', error);
  } finally {
    hideLoader();
  }

  breedSelectElement.addEventListener('change', async event => {
    showLoader();
    catElement.style.display = 'none';
    centerContainerElement.classList.add('moved-container');
    try {
      catImageFrameElement.style.display = 'block';

      const breedId = event.target.value;
      const catData = await fetchCatByBreed(breedId);
      const {
        url,
        breeds: [breedInfo],
      } = catData;

      const catImageContainerElement = document.getElementById(
        'cat-image-container'
      );

      catImageContainerElement.innerHTML = `<img src="${url}" alt="${breedInfo.name}" style="width: 100%; height: 100%; object-fit: cover;">`;
      catInfoElement.innerHTML = `
                <h1>${breedInfo.name}</h1>
                <p>${breedInfo.description}</p>
                <p><strong>Temperament: </strong>${breedInfo.temperament}</p>
            `;
    } catch (error) {
      console.error('Error fetching cat by breed:', error);
    } finally {
      hideLoader();
    }
  });
};

initializeCatApp();
