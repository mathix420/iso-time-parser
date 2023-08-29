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
    const shift = offsetMinutes + parsedTime.shiftInMinutes;
    const utcMinutesRaw = parsedTime.minutes - (shift % 60);
    const utcMinutesRemaining = utcMinutesRaw / 60;

    let remaining = 0;
    if (utcMinutesRemaining < 0) {
        remaining = -1;
    } else if (utcMinutesRemaining > 60) {
        remaining = 1;
    }

    const utcHours = (240 + parsedTime.hours - ((shift / 60) >> 0) + remaining) % 24;
    const utcMinutes = (600 + utcMinutesRaw) % 60;

    return {
        ...parsedTime,
        hours: utcHours,
        minutes: utcMinutes,
        rawShift: {
            hours: (Math.abs(shift) / 60) >> 0,
            minutes: Math.abs(shift) % 60,
            sign: shift >= 0 ? 1 : -1,
        },
        shiftInMinutes: shift,
    };
}
