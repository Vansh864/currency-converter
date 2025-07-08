const base_URL = "https://v6.exchangerate-api.com/v6/5bdbb27aacec5d6101348d38/latest/INR"; //INR is base currency

const dropdown = document.querySelectorAll("select");
const imgFrom = document.querySelector(".img-from");
const imgTo = document.querySelector(".img-to");
const button = document.querySelector("button");
const input = document.querySelector("input");
const result = document.querySelector(".result");


const updateFlag = (countryName, select) => {
    if(select == "from") {
        imgFrom.src = `https://flagsapi.com/${countryName}/flat/64.png`;
    }
    if(select == "to") {
        imgTo.src = `https://flagsapi.com/${countryName}/flat/64.png`;
    }
};

const currencyChange = async () => {
    let fromCurrencyCode = dropdown[0].value;
    let toCurrencyCode = dropdown[1].value;
    let URL = `https://v6.exchangerate-api.com/v6/5bdbb27aacec5d6101348d38/latest/${fromCurrencyCode}`;
    let conversion_rates = (await (await fetch(URL)).json()).conversion_rates;
    let baseValue = conversion_rates[toCurrencyCode];
    result.innerText = `${input.value} ${fromCurrencyCode} = ${(input.value)*baseValue} ${toCurrencyCode}`;
};

for(let select of dropdown) {
    for(let currencyCode in countryList) {
        let newOption = document.createElement("option");
        newOption.setAttribute("value", currencyCode);
        newOption.innerText = currencyCode;
        select.append(newOption);
    }
}
dropdown[0].value = "USD";
dropdown[1].value = "INR";
currencyChange();

for(let select of dropdown) {
    select.addEventListener("change", () => {
        updateFlag(countryList[select.value], select.name);
    });
}

button.addEventListener("click", () => {
    currencyChange();
});