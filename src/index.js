import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import Notiflix from 'notiflix';

let debounce = require('lodash.debounce');

const DEBOUNCE_DELAY = 300;
const searchBox = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

let searchQuery = '';

function onSearchTextInput(e) {
  searchQuery = searchBox.value.trim();
  //   e.preventDefault();

  fetchCountries(e, searchQuery)
    .then(countries => {
      return countries;
    })
    .then(countries => renderInterface(countries))
    .catch(err => {
      console.log(err);
      Notiflix.Notify.failure('Oops, there is no country with that name');
      countryList.innerHTML = '';
      countryInfo.innerHTML = '';
    });
}

function renderInterface(coutries) {
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
    return;
  }
}

searchBox.addEventListener(
  'input',
  debounce(onSearchTextInput, DEBOUNCE_DELAY)
);
