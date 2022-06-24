import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import Notiflix from 'notiflix';

let debounce = require('lodash.debounce');

const DEBOUNCE_DELAY = 300;
const searchBox = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

// const STATIC_URL = 'https://restcountries.com/v3.1/name/'; //delete

function onSearchTextInput(e) {
  //   e.preventDefault();
  //   console.log('onSearchTextInput function starts');
  //   console.log(STATIC_URL);
  //   console.log(e.currentTarget.value);
  //   console.log(searchBox.value);
  //   const searchQuery = searchBox.value;
  //   console.log(fetchCountries(e));
  fetchCountries(e)
    .then(countries => {
      console.log(countries);
      console.log(countries[0]);
      console.log(countries[0].name.official);
      console.log(countries[0].capital);
      console.log(countries[0].population);
      console.log(countries[0].flags);
      console.log(countries[0].languages);
      return countries;
      //   console.log(countries[0].name.common);
    })
    .then(countries => renderInterface(countries))
    .catch(err => {
      console.log(err);
      Notiflix.Notify.failure('Oops, there is no country with that name');
      countryList.innerHTML = '';
      countryInfo.innerHTML = '';
    });
}

// let debouncedOnSearchTextInput = debounce(onSearchTextInput, DEBOUNCE_DELAY);
// console.log(debouncedOnSearchTextInput);

function renderInterface(coutries) {
  // console.log('renderInterface starts');
  countryList.innerHTML = '';
  countryInfo.innerHTML = '';

  if (coutries.length > 10) {
    return Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
  }
  if (coutries.length > 1 && coutries.length <= 10) {
    const markup = coutries
      .map(counry => {
        return `<li>
        <img src="${counry.flags.svg}" width="50" >
        ${counry.name.official}</li>`;
      })
      .join(' ');
    countryList.innerHTML = markup;
    return;
  }

  if (coutries.length == 1) {
    const markupC = `<p><img src="${coutries[0].flags.svg}" width="100" >
        ${coutries[0].name.official}</p>
        <p>Capital: ${coutries[0].capital}</p>
        <p>Population: ${coutries[0].population}</p>
        <p>Languages: ${Object.values(coutries[0].languages).join(', ')}</p>
        `;
    countryInfo.innerHTML = markupC;
    // console.log(coutries[0].languages.values(coutries[0]));
    return;
  }
}

searchBox.addEventListener('input', onSearchTextInput);
