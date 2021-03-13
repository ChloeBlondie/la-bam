export const sonorityOptions = [
  { value: 0, label: 'Doux' },
  { value: 1, label: 'Normal' },
  { value: 2, label: 'Dur' },
];
export const sizeOptions = [
  { value: 0, label: 'Court' },
  { value: 1, label: 'Moyen' },
  { value: 2, label: 'Long' },
  { value: 3, label: 'Très long' },
];

export const originalityOptions = [
  { value: 0, label: 'Courant' },
  { value: 1, label: 'Original' },
  { value: 2, label: 'Très original' },
  { value: 3, label: 'Déglingué' },
];

export const languageOptions = [
  { value: 0, dictionary: 'dictioFr', function: 'setDictioFr', label: 'Français', path: 'dictionaries/prenom.txt' },
  { value: 1, dictionary: 'dictioEn', function: 'setDictioEn', label: 'Anglais', path: 'dictionaries/english.txt' },
  { value: 2, dictionary: 'dictioDe', function: 'setDictioDe', label: 'Allemand', path: 'dictionaries/deutch.txt' },
  { value: 3, dictionary: 'dictioEs', function: 'setDictioEs', label: 'Espagnol', path: 'dictionaries/espanol.txt' },
  { value: 4, dictionary: 'dictioIt', function: 'setDictioIt', label: 'Italien', path: 'dictionaries/italiano.txt' }
];
