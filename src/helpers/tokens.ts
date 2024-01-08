
export const generateValidationCode = ():string =>{
    const minDigits = 4;
    const maxDigits = 6;

    const randomNumber = Math.floor(Math.random() * (Math.pow(10, maxDigits) - Math.pow(10, minDigits)) + Math.pow(10, minDigits));
    return randomNumber.toString();
}