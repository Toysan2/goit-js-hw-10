import axios from 'axios';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import Notiflix from 'notiflix';

axios.defaults.headers.common['x-api-key'] =
  'live_0E5x8jdCKMbi1c183G5nEN0dasXbtPsXcjYussnwbwZa4Ti1yZEPAkgeFAFlbGoC';

export function showLoader() {
  document.body.style.backgroundColor = 'black';
  document.querySelector('.cat').style.display = 'block';
  $('.cat').fadeIn(3000);
}

export function hideLoader() {
  $('.cat').fadeOut(3000, () => {
    document.querySelector('.cat').style.display = 'none';
    document.body.style.backgroundColor = '';
  });
}

function showError() {
  Notiflix.Notify.Failure('An error occurred while fetching data.');
  document.querySelector('.loader').classList.add('hidden');
}

export async function fetchBreeds() {
  try {
    const response = await axios.get('https://api.thecatapi.com/v1/breeds');
    return response.data;
  } catch (error) {
    showError();
    throw error;
  }
}

export async function fetchCatByBreed(breedId) {
  try {
    const response = await axios.get(
      `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`
    );
    return response.data[0];
  } catch (error) {
    showError();
    throw error;
  }
}

function populateBreedSelect(breeds) {
  const select = document.querySelector('.breed-select');
  select.innerHTML = breeds
    .map(breed => `<option value="${breed.id}">${breed.name}</option>`)
    .join('');
}

function initializeSlimSelect() {
  new SlimSelect({
    select: '.breed-select',
  });
}

function updateCatImage(catInfo) {
  const catImageContainer = document.getElementById('cat-image-container');
  const imgElement = document.createElement('img');
  imgElement.src = catInfo.url;
  imgElement.alt = catInfo.breeds[0].name;

  imgElement.width = 600;
  imgElement.height = 600;
  imgElement.style.objectFit = 'cover';

  catImageContainer.innerHTML = '';
  catImageContainer.appendChild(imgElement);
}

export async function initializeCatApp() {
  showLoader();

  const loadingPromise = new Promise(resolve => {
    setTimeout(resolve, 1000);
  });

  try {
    const breedsPromise = fetchBreeds();
    await Promise.all([breedsPromise, loadingPromise]);
    const breeds = await breedsPromise;
    populateBreedSelect(breeds);
    initializeSlimSelect();
  } catch (error) {
    showError();
    console.error(error);
  } finally {
    hideLoader();
  }

  document
    .querySelector('.breed-select')
    .addEventListener('change', async event => {
      const breedId = event.target.value;
      showLoader();
      try {
        const catInfo = await fetchCatByBreed(breedId);
        populateCatInfo(catInfo);
      } catch (error) {
        showError();
        console.error(error);
      } finally {
        hideLoader();
      }
    });
}

function populateCatInfo(catInfo) {
  updateCatImage(catInfo);

  const catInfoDiv = document.querySelector('.cat-info');
  catInfoDiv.innerHTML = `
    <h2>${catInfo.breeds[0].name}</h2>
    <p>${catInfo.breeds[0].description}</p>
    <p><strong>Temperament: </strong>${catInfo.breeds[0].temperament}</p>
  `;
}
