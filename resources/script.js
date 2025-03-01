let divisors = {
    "thousand": 1e3,
    "million": 1e6,
    "billion": 1e9,
    "trillion": 1e12
}


function getValue() {
    let userInput = document.querySelector("input#user-input").value;
    let unitMultiple = document.querySelector("select#unit-select").value;
    let value = userInput * +unitMultiple;

    // Show the inter-div
    document.querySelector(".inter-div").style.display = "block";

    // Get all divs inside inter-div
    let convertedValues = document.querySelectorAll(".inter-div span");
    // Update each value
    convertedValues.forEach((span, index) => {
        span.textContent = `${(value / divisors[span.getAttribute('class')]).toLocaleString()} ${span.getAttribute('class')}`;
    });

    // Show the currency conversion options
    document.querySelector(".currency-conversion").style.display = "block";
}

function convertCurrency() {
    let currency = document.querySelector("select#currency-select").value;
    let value = document.querySelector(".inter-div span").textContent.split(' ')[0].replace(/,/g, '');
    // The replace(/,/g, '') part is removing all commas from the value string
    let unit = document.querySelector(".inter-div span").textContent.split(' ')[1];

    // Mock currency conversion rates
    let conversionRates = {
        "USD": 0.013,
        "EUR": 0.011,
        "GBP": 0.0095
    };

    let currencyValue = value * divisors[unit] * conversionRates[currency];
    // debugger
    document.querySelector("#currency-value").textContent = formatCurrencyValue(currencyValue);
    document.querySelector(".currency-result").style.display = "block";
}


// Format the currency value based on its unit
function formatCurrencyValue(num) {
    console.log(typeof num)
    if (num === 0) return `0 ${currency}`;
    const log = num.toString().length;

    if (log < 3) {
        return `${num.toLocaleString()}`;
    } else if (log >= 3 && log <= 6) {
        return `${num} thousand`;
    } else if (log > 6 && log <= 9) {
        return `${(num / 1e6).toFixed(2)} million`;
    } else if (log > 9 && log <= 12) {
        return `${(num / 1e9).toFixed(2)} billion`;
    } else {
        return `${(num / 1e12).toFixed(2)} trillion`;
    }
}