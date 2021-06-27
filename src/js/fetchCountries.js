export default function fetchCountries(searchQuery) {
const BASE_URL = 'https://restcountries.eu/rest/v2/name/';

    return fetch(`${BASE_URL}${searchQuery}`)
        .then(response => response.json())
        .then(data => {return data});
}