/*
    https://stackoverflow.com/questions/5245368/how-can-i-convert-ascii-code-to-character-in-javascript
    --> https://stackoverflow.com/a/42126603

    https://theasciicode.com.ar/
*/

/*  
    Symbols (excluded space - 32): 
        33 - 47, 58 - 64, 91 - 96, 123 - 126
    Numbers: 
        48 - 57
    Lowercase Letters: 
        97 - 122
    Uppercase Letters: 
        65 - 90 
*/

const getSymbolsFromASCii = (excludedChars) => {
    const symbols = [];

    for (let i = 33; i <= 47; i++) {
        let char = String.fromCharCode(i);
        if (!Object.values(excludedChars).includes(char)) {
            symbols.push(char);
        }
    }
    for (let i = 58; i <= 64; i++) {
        let char = String.fromCharCode(i);
        if (!Object.values(excludedChars).includes(char)) {
            symbols.push(char);
        }
    }
    for (let i = 91; i <= 96; i++) {
        let char = String.fromCharCode(i);
        if (!!Object.values(excludedChars).includes(char)) {
            symbols.push(char);
        }
    }
    for (let i = 123; i <= 126; i++) {
        let char = String.fromCharCode(i);
        if (!!Object.values(excludedChars).includes(char)) {
            symbols.push(char);
        }
    }

    return symbols;
};

const getNumbersFromASCii = (excludedChars) => {
    const numbers = [];

    for (let i = 48; i <= 57; i++) {
        let char = String.fromCharCode(i);
        if (!Object.values(excludedChars).includes(char)) {
            numbers.push(char);
        }
    }

    return numbers;
};

const getLowercaseLettersFromASCii = (excludedChars) => {
    const lcletters = [];

    for (let i = 97; i <= 122; i++) {
        let char = String.fromCharCode(i);
        if (!Object.values(excludedChars).includes(char)) {
            lcletters.push(char);
        }
    }

    return lcletters;
}

const getUppercaseLettersFromASCii = (excludedChars) => {
    const ucletters = [];

    for (let i = 65; i <= 90; i++) {
        let char = String.fromCharCode(i);
        if (!Object.values(excludedChars).includes(char)) {
            ucletters.push(char);
        }
    }

    return ucletters;
}

const getCharsFromASCii = (excludedChars) => {
    const chars = [];

    for (let i = 33; i <= 126; i++) {
        let char = String.fromCharCode(i);
        if (!Object.values(excludedChars).includes(char)) {
            chars.push(char);
        }
    }

    return chars;
}

const frequencyTest = () => {
    let frequency = {};

    passwdChars.forEach(char => {
        frequency[char] = 0;
    });

    for (let i = 0; i < 1000000; i++) {
        let randomIndex = Math.floor(Math.random() * passwdChars.length);
        const randomChar = passwdChars[randomIndex];
        frequency[randomChar] += 1;
    }

    console.log(frequency);
    console.log(1000000 / passwdChars.length)
}

const generatePassword = (numChars, includesNumbers, includesLowerCaseLetters, includesUpperCaseLetters, includesSymbols) => {
    let requiredChars = [];

    const excludedChars = document.getElementById("chars-to-exclude").value.replace(/ /g, "").split("");

    if (includesNumbers) {
        requiredChars.push(getNumbersFromASCii(excludedChars));
    }
    if (includesLowerCaseLetters) {
        requiredChars.push(getLowercaseLettersFromASCii(excludedChars));
    }
    if (includesUpperCaseLetters) {
        requiredChars.push(getUppercaseLettersFromASCii(excludedChars));
    }
    if (includesSymbols) {
        requiredChars.push(getSymbolsFromASCii(excludedChars));
    }

    let passwdChars = requiredChars.flat();

    let password = "";
    for (let i = 0; i < numChars; i++) {
        let randomIndex = Math.floor(Math.random() * passwdChars.length);
        const randomChar = passwdChars[randomIndex];
        password += randomChar;
    }
    return password;
}


let includesNumbers = true;
let includesLowerCaseLetters = true;
let includesUpperCaseLetters = true;
let includesSymbols = true;

// Checkboxes
const numbersCheckbox = document.getElementById("numbers-check");
numbersCheckbox.checked = true;
numbersCheckbox.addEventListener("change", (e) => {
    includesNumbers = e.target.checked;
});
const lclettersCheckbox = document.getElementById("lcletters-check");
lclettersCheckbox.checked = true;
lclettersCheckbox.addEventListener("change", (e) => {
    includesLowerCaseLetters = e.target.checked;
});
const uclettersCheckbox = document.getElementById("ucletters-check");
uclettersCheckbox.checked = true;
uclettersCheckbox.addEventListener("change", (e) => {
    includesUpperCaseLetters = e.target.checked;
});
const symbolsCheckbox = document.getElementById("symbols-check");
symbolsCheckbox.checked = true;
symbolsCheckbox.addEventListener("change", (e) => {
    includesSymbols = e.target.checked;
});

const passwordInput = document.getElementById("password-input");
const passwordLengthInput = document.getElementById("password-length-input");

const provideFreshPassword = () => {
    const passwordLength = passwordLengthInput.value;
    const password = generatePassword(passwordLength, includesNumbers, includesLowerCaseLetters, includesUpperCaseLetters, includesSymbols);
    passwordInput.value = password;
};

provideFreshPassword();

const buttonCopy = document.querySelector(".button__copy");

buttonCopy.addEventListener("click", () => {
    navigator.clipboard.writeText(passwordInput.value);
});

const buttonRegenerate = document.querySelector(".button__regenerate");

buttonRegenerate.addEventListener("click", () => {
    provideFreshPassword();
});