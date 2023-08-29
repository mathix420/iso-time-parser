import { ParseResponse } from './parse';
import { shiftTime } from './shiftTime';

/**
 * Will convert automatically the given parsed time object to the local timezone.
 *
 * @param parsedTime Parsed time object
 * @returns Local timezone parsed time object
 */
export function toLocalTime(parsedTime: ParseResponse): ParseResponse {
    const localOffset = new Date().getTimezoneOffset();
    return shiftTime(parsedTime, localOffset);
}
