const STATIC_URL = 'https://restcountries.com/v3.1/name/';

/* Тебе нужны только следующие свойства:

name.official - полное имя страны
capital - столица
population - население
flags.svg - ссылка на изображение флага
languages - массив языков */

const FILTERS_PARAM = '?fields=name,capital,population,flags,languages';

export function fetchCountries(e) {
  // console.log('fetchCountries(name) function starts');
  const searchQuery = e.currentTarget.value;
  const url = `${STATIC_URL}${searchQuery}`;
  console.log(url);
  return fetch(`${STATIC_URL}${searchQuery}${FILTERS_PARAM}`).then(response => {
    if (response.ok) {
      return response.json();
    }
    throw new Error(response.statusText);
  });
  // .then(data => {
  //   console.log(data);
  //   return data;
  // })
  // .catch(err => console.log(err))
}
