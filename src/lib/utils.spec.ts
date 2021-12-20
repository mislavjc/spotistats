import { expect } from '@peeky/test';
import { millisToMinutesAndSeconds } from './utils';

describe('when', () => {
  test('check assertions with expect', () => {
    const trackLength = millisToMinutesAndSeconds(3000);
    console.log(trackLength);

    expect(42).toBe(42);
  });
});
