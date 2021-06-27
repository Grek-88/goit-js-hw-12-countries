import fetchCountries from "./js/fetchCountries.js";
const debounce = require('lodash.debounce');

import notify from "./js/notify.js";

import templateList from './teamplate/list.hbs';
import templateMarkupCountry from './teamplate/country.hbs';


const refs = {
    form: document.querySelector('.form'),
    input: document.querySelector('#countries')
};

refs.input.addEventListener('input', debounce(onSeach, 500));
refs.form.addEventListener('submit', e=>e.preventDefault());

function onSeach(ev) {

    let searchQuery = ev.target.value;
    console.dir(ev.target.value);

    fetchCountries(searchQuery).then(data => {
        if (data.length > 10) {
            notify();
        } else if (data.length >= 2 && data.length <= 10) {
            clearMarcup();
            addElList(data);
        } else {
            clearMarcup();
            addMarkupCountry(data);
        }
    }).catch(error => notify());
}

function addElList(data) {
    refs.form.insertAdjacentHTML('afterend', templateList(data));
}

function clearMarcup() {
    const list = document.getElementById('list');
    const marcupCountry = document.querySelector('.container');

    if (marcupCountry) { marcupCountry.innerHTML = ' '; };
    if (list) { list.innerHTML = ''; };
    }

function addMarkupCountry(data) {
    refs.form.insertAdjacentHTML('afterend', templateMarkupCountry(...data));
}