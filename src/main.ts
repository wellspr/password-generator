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

const getCharsInRange = (ranges: number[][], excludedChars: string[]) => {
    const chars = [];

    for (const [start, end] of ranges) {
        for (let i = start; i <= end; i++) {
            let char = String.fromCharCode(i);
            if (!excludedChars.includes(char)) {
                chars.push(char);
            }
        }
    }

    return chars;
};

const charGroups = {
    symbols: () => [
        [33, 47],
        [58, 64],
        [91, 96],
        [123, 126],
    ],
    numbers: () => [[48, 57]],
    lower: () => [[97, 122]],
    upper: () => [[65, 90]],
};

const generatePassword = (
    numChars: number,
    includesNumbers: boolean,
    includesLowerCaseLetters: boolean,
    includesUpperCaseLetters: boolean,
    includesSymbols: boolean,
) => {
    const excludedChars = (document
        .getElementById("chars-to-exclude") as HTMLInputElement) 
        .value.replace(/\s/g, "")
        .split("");
    
    let rangesToUse = [];

    if (includesNumbers) rangesToUse.push(...charGroups.numbers());
    if (includesLowerCaseLetters) rangesToUse.push(...charGroups.lower());
    if (includesUpperCaseLetters) rangesToUse.push(...charGroups.upper());
    if (includesSymbols) rangesToUse.push(...charGroups.symbols());

    let passwdChars = getCharsInRange(rangesToUse, excludedChars);

    const n = passwdChars.length;

    if (n === 0) return "";

    let password = "";

    const maxSafeValue = Math.floor(4294967296 / n) * n;

    const buffer = new Uint32Array(1);

    for (let i = 0; i < numChars; i++) {
        let randomValue;

        do {
            window.crypto.getRandomValues(buffer);
            randomValue = buffer[0];
        } while (randomValue >= maxSafeValue);

        let randomIndex = randomValue % n;
        const randomChar = passwdChars[randomIndex];
        password += randomChar;
    }
    return password;
};

let includesNumbers = true;
let includesLowerCaseLetters = true;
let includesUpperCaseLetters = true;
let includesSymbols = true;

// Checkboxes
const numbersCheckbox = document.getElementById("numbers-check") as HTMLInputElement;

numbersCheckbox.checked = true;

numbersCheckbox.addEventListener("change", (e) => {
    includesNumbers = (e.target as HTMLInputElement).checked;

    if (includesNumbers) {
        (document.querySelector(".config-option .numbers") as HTMLImageElement).src =
            "icons/square-check.svg";
    } else {
        (document.querySelector(".config-option .numbers") as HTMLImageElement).src =
            "icons/square.svg";
    }
});
const lclettersCheckbox = document.getElementById("lcletters-check") as HTMLInputElement;
lclettersCheckbox.checked = true;
lclettersCheckbox.addEventListener("change", (e) => {
    includesLowerCaseLetters = (e.target as HTMLInputElement).checked;

    if (includesLowerCaseLetters) {
        (document.querySelector(".config-option .lcletters") as HTMLImageElement).src =
            "icons/square-check.svg";
    } else {
        (document.querySelector(".config-option .lcletters") as HTMLImageElement).src =
            "icons/square.svg";
    }
});
const uclettersCheckbox = document.getElementById("ucletters-check") as HTMLInputElement;
uclettersCheckbox.checked = true;
uclettersCheckbox.addEventListener("change", (e) => {
    includesUpperCaseLetters = (e.target as HTMLInputElement).checked;

    if (includesUpperCaseLetters) {
        (document.querySelector(".config-option .ucletters") as HTMLImageElement).src =
            "icons/square-check.svg";
    } else {
        (document.querySelector(".config-option .ucletters") as HTMLImageElement).src =
            "icons/square.svg";
    }
});
const symbolsCheckbox = document.getElementById("symbols-check") as HTMLInputElement;
symbolsCheckbox.checked = true;
symbolsCheckbox.addEventListener("change", (e) => {
    includesSymbols = (e.target as HTMLInputElement).checked;

    if (includesSymbols) {
        (document.querySelector(".config-option .symbols") as HTMLImageElement).src =
            "icons/square-check.svg";
    } else {
        (document.querySelector(".config-option .symbols") as HTMLImageElement).src =
            "icons/square.svg";
    }
});

const passwordInput = document.getElementById("password-input") as HTMLInputElement;
const passwordLengthInput = document.getElementById("password-length-input") as HTMLInputElement;

const provideFreshPassword = () => {
    const passwordLength = Number(passwordLengthInput.value);

    const password = generatePassword(
        passwordLength,
        includesNumbers,
        includesLowerCaseLetters,
        includesUpperCaseLetters,
        includesSymbols,
    );
    passwordInput.value = password;
};

provideFreshPassword();

const buttonCopy = document.querySelector(".button__copy") as HTMLButtonElement;

//let textCopied = false;
const buttonCopyLabel = document.querySelector(".button__copy .label") as HTMLElement;
const buttonCopyImage = document.querySelector(".button__copy img") as HTMLImageElement;

buttonCopy.addEventListener("click", () => {
    navigator.clipboard.writeText(passwordInput.value).then(() => {
        //textCopied = true;
        buttonCopyLabel.innerHTML = "Copied!";
        buttonCopyImage.src = "icons/check.svg";
        buttonCopy.classList.add("button__copy--copied");
    });
});

const buttonRegenerate = document.querySelector(".button__regenerate") as HTMLButtonElement;

buttonRegenerate.addEventListener("click", () => {
    provideFreshPassword();
    //textCopied = false;
    buttonCopyLabel.innerHTML = "Copy";
    buttonCopyImage.src = "icons/clipboard.svg";
    buttonCopy.classList.remove("button__copy--copied");
});

const buttonIncreaseLength = document.querySelector(".button__plus") as HTMLButtonElement;
buttonIncreaseLength.addEventListener("click", () => {
    console.log("increase");
    passwordLengthInput.value = String(Number(passwordLengthInput.value) + 1);
});

const buttonDecreaseLength = document.querySelector(".button__minus") as HTMLButtonElement;
buttonDecreaseLength.addEventListener("click", () => {
    console.log("decrease");
    passwordLengthInput.value = String(Number(passwordLengthInput.value) - 1);
});
