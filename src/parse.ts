export const parsingRegex =
    /^T?(?<hours>\d{2})(?::?(?<minutes>\d{2}))?(?::?(?<seconds>\d{2}))?(?:,(?<fracSec>\d+))?(?:(?<shiftSign>[+-])(?<shiftHours>\d{1,2})(?::?(?<shiftMinutes>\d{1,2}))?|(?<utc>Z))?$/;

export type ParseResponse = {
    hours: number;
    minutes: number;
    seconds: number;
    fracSec: number;
    rawShift: {
        sign: -1 | 1;
        hours: number;
        minutes: number;
    };
    shiftInMinutes: number;
};

/**
 * On default behavior, this function will return `null` in case of parsing failure.
 *
 * If `strict` is set to `true` then this function will fail if an implicit time offset is given.
 *
 * If `raise` is set to `true` then this function will throw and error when a failure occurs.
 * @param isoString ISO 8601 time string
 * @param options
 * @returns The parsed response
 */
export function parseSync(
    isoString: string,
    options: { strict?: boolean; raise?: boolean },
): ParseResponse | null {
    const match = parsingRegex.exec(isoString);
    const { strict = false, raise = false } = options || {};

    if (!match?.groups) {
        if (raise) {
            throw Error('Failed to parse');
        }

        return null;
    }

    const { hours, minutes, seconds, fracSec, shiftSign, shiftHours, shiftMinutes, utc } =
        match.groups;

    // Failed to parse
    if (!hours?.length) {
        if (raise) {
            throw Error('Missing hours');
        }

        return null;
    }

    if (strict && !utc?.length && !shiftSign?.length) {
        if (raise) {
            throw Error('Implicit time offset');
        }

        return null;
    }

    const result = {
        hours: parseInt(hours),
        minutes: minutes ? parseInt(minutes) : 0,
        seconds: seconds ? parseInt(seconds) : 0,
        fracSec: fracSec ? parseInt(fracSec) : 0,
        rawShift: {
            hours: shiftHours ? parseInt(shiftHours) : 0,
            minutes: shiftMinutes ? parseInt(shiftMinutes) : 0,
            sign: (shiftSign === '-' ? -1 : 1) as ParseResponse['rawShift']['sign'],
        },
    };

    return {
        ...result,
        shiftInMinutes:
            (result.rawShift.hours * 60 + result.rawShift.minutes) * result.rawShift.sign * -1,
    };
}

/**
 * On default behavior, this function will return `null` in case of parsing failure.
 *
 * This function uses `parseSync` under the hood.
 * @param isoString ISO 8601 time string
 * @param strict If set to `true` this function will fail if an implicit time offset is given
 * @returns Promise returning either the parsed response or an error message
 */
export function parse(isoString: string, strict: boolean = false) {
    return new Promise<ParseResponse>((resolve, reject) => {
        try {
            resolve(parseSync(isoString, { raise: true, strict }) as ParseResponse);
        } catch (error) {
            reject(error);
        }
    });
}
