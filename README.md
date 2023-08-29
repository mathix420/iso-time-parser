# iso-time-parser

[ISO 8601](https://www.wikiwand.com/fr/ISO_8601) Time parser (not date, nor duration)

[![wakatime](https://wakatime.com/badge/github/mathix420/iso-time-parser.svg)](https://wakatime.com/badge/github/mathix420/iso-time-parser) [![Maintainability](https://api.codeclimate.com/v1/badges/4bead95feb66403d44c1/maintainability)](https://codeclimate.com/github/mathix420/iso-time-parser/maintainability) [![Test Coverage](https://api.codeclimate.com/v1/badges/4bead95feb66403d44c1/test_coverage)](https://codeclimate.com/github/mathix420/iso-time-parser/test_coverage) [![Bubdle Size](https://badgen.net/bundlephobia/minzip/iso-time-parser)](https://bundlephobia.com/package/iso-time-parser)

## Installation

```bash
npm i iso-time-parser
```

## Usage/Example

[Full Documentation](https://mathix420.github.io/iso-time-parser/)

**Example:**

```typescript
import { parse, toLocalTime, toUTC } from 'iso-time-parser';

// Local time is Central European Summer Time (CEST) in this example
// Pulled from `new Date().getTimezoneOffset()`

parse('T11:22:33,4444Z').then(console.log);
// {
//   hours: 11,
//   minutes: 22,
//   seconds: 33,
//   fracSec: 4444,
//   rawShift: { hours: 0, minutes: 0, sign: 1 },
//   shiftInMinutes: 0
// }

parse('T11:22:33,4444Z').then(toLocalTime).then(console.log);
// {
//   hours: 13,
//   minutes: 22,
//   seconds: 33,
//   fracSec: 4444,
//   rawShift: { hours: 2, minutes: 0, sign: -1 },
//   shiftInMinutes: -120
// }

parse('T11:22:33,4444+03:45').then(toLocalTime).then(console.log);
// {
//   hours: 9,
//   minutes: 37,
//   seconds: 33,
//   fracSec: 4444,
//   rawShift: { hours: 1, minutes: 45, sign: 1 },
//   shiftInMinutes: 105
// }

parse('T11:22:33,4444+03:45').then(toUTC).then(console.log);
// {
//   hours: 7,
//   minutes: 37,
//   seconds: 33,
//   fracSec: 4444,
//   rawShift: { hours: 3, minutes: 45, sign: 1 },
//   shiftInMinutes: 225
// }
```

## Development

**Install deps**

```bash
npm i
```

**Build/bundle package**

```bash
npm run build
```

**Build docs**

```bash
npx typedoc src/index.ts
```

**Bump version**

```bash
npm version {major, minor, patch}
```

**Publish**

```bash
npm publish --access public
```
