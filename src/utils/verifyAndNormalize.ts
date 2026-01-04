const PERSIAN_KAF = 1705;
const PERSIAN_YE = 1740;
const PERSIAN_ZERO = 1776;
const PERSIAN_NINE = 1785;
const ARABIC_KAF = 1603;
const ARABIC_YEH = 1610;
const ARABIC_ZERO = 1632;
const ARABIC_NINE = 1641;

function verifyAndNormalize(value: string): string {
  /* [TODO] unnecessary? */
  // if (!value) {
  //   return '';
  // }

  let result = '';
  for (let i = 0; i < value.length; i++) {
    const code = value.codePointAt(i);
    let char = value[i];

    if (code === undefined) {
      result += char;
      continue;
    }

    if (code >= PERSIAN_ZERO && code <= PERSIAN_NINE) {
      char = String(code - PERSIAN_ZERO);
    } else if (code >= ARABIC_ZERO && code <= ARABIC_NINE) {
      char = String(code - ARABIC_ZERO);
    } else if (code === ARABIC_YEH) {
      char = String.fromCodePoint(PERSIAN_YE);
    } else if (code === ARABIC_KAF) {
      char = String.fromCodePoint(PERSIAN_KAF);
    }

    result += char;
  }

  return result;
}

export { verifyAndNormalize };
