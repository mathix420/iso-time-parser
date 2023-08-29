import { ParseResponse } from './parse';

/**
 * Will apply the given time shift to a parsed time object.
 *
 * Useful when you have times in different timezones.
 *
 * @param parsedTime Parsed time object you want to apply the time shift to
 * @param offsetMinutes Offset in minutes (can be negative as well)
 * @returns The shifted time object
 */
export function shiftTime(parsedTime: ParseResponse, offsetMinutes: number): ParseResponse {
    const shift = offsetMinutes - parsedTime.shiftInMinutes;
    const minutesRaw = parsedTime.minutes + (shift % 60);
    const nbHours = minutesRaw / 60;

    let remaining = 0;
    if (nbHours < 0) {
        remaining = -1;
    } else if (nbHours > 1) {
        remaining = 1;
    }

    const hours = (240 + parsedTime.hours + ((shift / 60) >> 0) + remaining) % 24;
    const minutes = (600 + minutesRaw) % 60;

    return {
        ...parsedTime,
        hours,
        minutes,
        rawShift: {
            hours: (Math.abs(offsetMinutes) / 60) >> 0,
            minutes: Math.abs(offsetMinutes) % 60,
            sign: offsetMinutes > 0 ? -1 : 1,
        },
        shiftInMinutes: offsetMinutes,
    };
}
