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

export function parseSync(
    isoString: string,
    { strict = false, raise = false },
): ParseResponse | null {
    const match = parsingRegex.exec(isoString);

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
            (result.rawShift.hours * 60 + result.rawShift.minutes) * result.rawShift.sign,
    };
}

export function parse(isoString: string) {
    return new Promise<ParseResponse>((resolve, reject) => {
        try {
            resolve(parseSync(isoString, { raise: true }) as ParseResponse);
        } catch (error) {
            reject(error);
        }
    });
}
