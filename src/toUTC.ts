import { ParseResponse } from './parse';
import { shiftTime } from './shiftTime';

/**
 * Will convert automatically the given parsed time object to the UTC timezone.
 *
 * @param parsedTime Parsed time object
 * @returns UTC parsed time object
 */
export function toUTC(parsedTime: ParseResponse): ParseResponse {
    return shiftTime(parsedTime, 0);
}
