/**
 * @typedef { {thresold: number, text: string, display: string} } Interpretation
 */

/**
 * @type {Interpretation[]}
 */
const interpretations = [
  {
    threshold: 1,
    text:
      "Toutes les lettres du texte fourni sont identiques. L'index de coïncidence n'est <span>pas pertinent</span>.",
    display: 'warning',
  },
  {
    threshold: 0.1,
    text:
      'Les lettres sont très redondantes et ne suggèrent <span>aucun chiffrement particulier</span>.',
    display: 'warning',
  },
  {
    threshold: 0.06,
    text:
      "L'indice est proche de celui d'un texte en anglais ou en français. Il est probable qu'il s'agisse d'un chiffrement <span>monoalphabétique</span>.",
    display: 'success',
  },
  {
    threshold: 0.02,
    text:
      "La répartition des lettres s'approche de l'aléatoire. Il s'agit peut-être d'un chiffrement <span>polyalphabétique</span>.",
    display: 'success',
  },
  {
    threshold: 0,
    text:
      'Le texte présente peu de redondance et ne suggère <span>aucun chiffrement particulier</span>.',
    display: 'warning',
  },
  {
    threshold: -1,
    text:
      "Chaque lettre du texte fourni est unique. L'index de coïncidence n'est <span>pas pertinent</span>.",
    display: 'warning',
  },
];

export default interpretations;
