import { ParseResponse } from './parse';
import { shiftTime } from './shiftTime';

export function toLocalTime(parsedTime: ParseResponse): ParseResponse {
    const localOffset = new Date().getTimezoneOffset();
    return shiftTime(parsedTime, localOffset);
}
