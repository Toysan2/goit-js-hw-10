import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import Notiflix from 'notiflix';

const loadBreeds = async (fetchFunction, instance) => {
  let breedsData;
  try {
    const response = await fetchFunction();
    breedsData = response.data;
    const options = breedsData.map(breed => ({
      text: breed.name,
      value: breed.id,
    }));
    instance.setData(options);
  } catch (error) {
    Notiflix.Notify.Failure(
      'Failed to load breeds. Please try reloading the page.'
    );
  }
};

const initializeSlimSelect = fetchFunction => {
  const slimSelectInstance = new SlimSelect({
    select: '.breed-select',
  });

  loadBreeds(fetchFunction, slimSelectInstance);
};

export default initializeSlimSelect;
