const STATIC_URL = 'https://restcountries.com/v3.1/name/';

const FILTERS_PARAM = '?fields=name,capital,population,flags,languages';

export function fetchCountries(e, searchQuery) {
  const url = `${STATIC_URL}${searchQuery}`;
  console.log(url);
  return fetch(`${STATIC_URL}${searchQuery}${FILTERS_PARAM}`).then(response => {
    if (response.ok) {
      return response.json();
    }
    throw new Error(response.statusText);
  });
}
