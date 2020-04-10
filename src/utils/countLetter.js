/**
 * Return the number of occurences of the letter in the given text
 * @param {string} text
 * @param {string} letter
 * @returns {number}
 */
function countLetter(text, letter) {
  const regExp = new RegExp(letter, 'g');
  const matches = text.match(regExp);
  return matches ? matches.length : 0;
}

export default countLetter;
