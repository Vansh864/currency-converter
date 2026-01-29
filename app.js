const selects = document.querySelectorAll("select");
const input = document.querySelector("input");
const button = document.querySelector("button");
const URL = "https://v6.exchangerate-api.com/v6/5bdbb27aacec5d6101348d38/latest/USD"; //from USD

const updateFlag = (name, country) => {
    document.querySelector(`.${name}-flag`).setAttribute("src", `https://flagsapi.com/${country}/flat/64.png`);
};

for(let country in countryList) { //to add all options
    let option = document.createElement("option");
    option.innerText = country;
    option.setAttribute("value", country);
    selects[0].append(option);
    selects[1].append(option.cloneNode(true));
}

selects[0].value = "USD";
selects[1].value = "INR";

for(let select of selects) {
    select.addEventListener("change", () => {
        updateFlag(select.name, countryList[select.value]);
    });
}

button.addEventListener("click", async () => {
    document.querySelector(".res").innerText  = `${input.value} ${selects[0].value} = ${input.value * ((await (await fetch(`https://v6.exchangerate-api.com/v6/5bdbb27aacec5d6101348d38/latest/${selects[0].value}`)).json()).conversion_rates[selects[1].value])} ${selects[1].value}`;
    console.log();
});