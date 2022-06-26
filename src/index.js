import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import Notiflix from 'notiflix';

const debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 300;
const searchBox = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');
let searchQuery = '';

searchBox.addEventListener(
  'input',
  debounce(onSearchTextInput, DEBOUNCE_DELAY)
);

function onSearchTextInput() {
  searchQuery = searchBox.value.trim();

  if (!searchQuery) {
    clearList();
    clearInfo();
    return;
  }

  fetchCountries(searchQuery)
    .then(countries => {
      return countries;
    })
    .then(countries => renderInterface(countries))
    .catch(err => {
      console.log(err);
      failNotyfyDisplay();
      clearList();
      clearInfo();
    });
}

function clearList() {
  countryList.innerHTML = '';
}

function clearInfo() {
  countryInfo.innerHTML = '';
}

function failNotyfyDisplay() {
  return Notiflix.Notify.failure('Oops, there is no country with that name');
}

function toManyNotifyDisplay() {
  return Notiflix.Notify.info(
    'Too many matches found. Please enter a more specific name.'
  );
}

function renderInterface(coutries) {
  clearList();
  clearInfo();

  if (coutries.length > 10) {
    return toManyNotifyDisplay();
  }

  if (coutries.length > 1 && coutries.length <= 10) {
    return renderList(coutries);
  }

  if (coutries.length == 1) {
    return renderInfo(coutries[0]);
  }
}

function renderList(coutriesList) {
  countryList.innerHTML = coutriesList
    .map(coutriesList => {
      return `<li>
        <img src="${coutriesList.flags.svg}" width="50" >
        ${coutriesList.name.official}</li>`;
    })
    .join(' ');
}

function renderInfo(coutry) {
  countryInfo.innerHTML = `<p><img src="${coutry.flags.svg}" width="100" >
        ${coutry.name.official}</p>
        <p>Capital: ${coutry.capital}</p>
        <p>Population: ${coutry.population}</p>
        <p>Languages: ${Object.values(coutry.languages).join(', ')}</p>
        `;
}
