import { test, expect, describe } from 'vitest';

import { verifyAndNormalize } from './verifyAndNormalize.ts';

describe('verifyAndNormalize', () => {
  test('should normalize Persian digits', () => {
    expect(verifyAndNormalize('۱۲۳۴۵۶۷۸۹۰')).toBe('1234567890');
  });

  test('should normalize Arabic digits', () => {
    expect(verifyAndNormalize('١٢٣٤٥٦٧٨٩٠')).toBe('1234567890');
  });

  test('should normalize Arabic characters', () => {
    expect(verifyAndNormalize('ي ك')).toBe('ی ک');
  });

  test('should handle mixed input', () => {
    expect(verifyAndNormalize('مبلغ ۱۲۰۰۰ ریال')).toBe('مبلغ 12000 ریال');
  });

  test('should handle empty string', () => {
    expect(verifyAndNormalize('')).toBe('');
  });
});
