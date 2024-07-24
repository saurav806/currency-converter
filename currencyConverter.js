const fromCurrency = document.getElementById("fromCurrency");
const toCurrency = document.getElementById("toCurrency");
const convertButton = document.getElementById("convert-btn");

const fetchCountry = async () => {
  try {
    const response = await fetch(
      "https://restcountries.com/v3.1/all?fields=name,currencies,flag"
    );
    const countryData = await response.json();

    const currencies = [];

    countryData.forEach((country) => {
      const countryCurrencies = country.currencies;
      if (countryCurrencies) {
        Object.keys(countryCurrencies).forEach((currency) => {
          if (!currencies.some((curr) => curr.code === currency)) {
            currencies.push({
              code: currency,
              flag: country.flag,
              countryName: country.name.common,
            });
          }
        });
      }
    });

    currencies.forEach(({ code, flag, countryName }) => {
      const optionFrom = document.createElement("option");
      optionFrom.value = code;
      optionFrom.innerHTML = `${flag} ${code} - ${countryName}`;
      fromCurrency.appendChild(optionFrom);

      const optionTo = document.createElement("option");
      optionTo.value = code;
      optionTo.innerHTML = `${flag} ${code} - ${countryName}`;
      toCurrency.appendChild(optionTo);
    });
  } catch (error) {
    console.log({ message: error });
  }
};

const convertCurrency = async () => {
  try {
    const fromCurrencyValue = fromCurrency.value;
    const toCurrencyValue = toCurrency.value;

    const response = await fetch(
      `https://v6.exchangerate-api.com/v6/ecaffedae3b9a1574edcfc47/pair/${fromCurrencyValue}/${toCurrencyValue}`
    );
    const data = await response.json();
    const rate = data.conversion_rate;

    const inputValue = document.getElementById("input");
    const result = document.getElementById("result");

    const amount = inputValue.value;
    const convertedValue = amount * rate;
    console.log(convertedValue);
    inputValue.value = "";

    convertedValue
      ? (result.innerText = `${amount} ${fromCurrencyValue} = ${convertedValue} ${toCurrencyValue}`)
      : (result.innerText = "Please chose the country");

  } catch (error) {
    console.log(error);
  }
};

convertButton.addEventListener("click", convertCurrency);

fetchCountry();
