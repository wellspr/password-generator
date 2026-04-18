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

export const getCharsInRange = (ranges: number[][], excludedChars: string[]) => {
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

export const charGroups = {
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

export const generatePassword = (
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