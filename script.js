const apiInfo = {
  api: 'https://api.ratesapi.io/api/',
  endpoint: 'latest'
}

const url = `${apiInfo.api}${apiInfo.endpoint}`


window.onload = () => {
  setupEventHandlers();
  setupEraseButton();
}

const setupEventHandlers = () => {
  const searchButton = document.querySelector('#search-button');  
  searchButton.addEventListener('click', handleSearchEvent);

  const inputText = document.querySelector('#currency-input');
  inputText.addEventListener('keyup', (event) => {
    if (event.keyCode === 13) {
      handleSearchEvent();
    }
  });
}

const setupEraseButton = () => {
  const eraseButton = document.querySelector('#erase');
  eraseButton.addEventListener('click', clearList);
}

const handleSearchEvent = () => {
  const currencyValue = document.querySelector('#currency-input').value.toUpperCase();

  if (currencyValue === '') {
    renderEmptyAlert()
  } else {
    clearList();
    fetchCurrency(currencyValue);
  }
}

const renderEmptyAlert = () => {
  window.alert('Por favor, insira alguma moeda!');
}

const div = document.querySelector('#exercises');

const clearList = () => {
  const currencyList = document.querySelector('#currency-list');
  currencyList.innerHTML = '';
}

const fetchCurrency = (currency) => {
  let endpoint = `${url}?base=${currency}`;
  const currencyFilter = document.querySelector('#currencyFilter').value;

  if (currencyFilter.length !== 0) {
  endpoint = `${endpoint}&symbols=${currencyFilter}`;
  }

  fetch(endpoint)
    .then((response) => response.json())
    .then((object) => {
      if (object.error) {
        throw new Error(object.error);
      } else {
        handleRates(object.rates);
      }
    })
    .catch((error) => handleError(error))
}

const handleError = (errorMessage) => {
  window.alert(errorMessage);
}

const handleRates = (rates) => {
  const ratesKeys = Object.keys(rates);
  const alphabeticallyRatesKeys = ratesKeys.sort();

    alphabeticallyRatesKeys.forEach((key) => {
      const multiplier = document.querySelector('#multiplier').value;
  
      if (multiplier === '') {
        const value = rates[key];
        renderRate(key, value);
      } else {
        const value = rates[key] * multiplier;
        renderRate(key, value);
      }    
    })
  }

const renderRate = (key, value) => {
  const currencyList = document.querySelector('#currency-list');
  const formattedValue = value.toFixed(2);

  const li = document.createElement('li');
  li.innerHTML = `<b>${key}:</b> ${formattedValue}`;

  currencyList.appendChild(li);
}
