import { ParseResponse } from './parse';
import { shiftTime } from './shiftTime';

export function toUTC(parsedTime: ParseResponse): ParseResponse {
    return shiftTime(parsedTime, 0);
}
