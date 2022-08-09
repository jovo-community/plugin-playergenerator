# Jovo Community Plugin - Player Generator

![logo](logo.svg)

## Overview

This plugin for the [Jovo Framework](https://github.com/jovotech/jovo-framework) allows you to generate player profile values for display name, avatar URLs and color.

## Supports

- Jovo Framework 4.x
- Platforms: any (alexa, googleAssistant, core, web, etc.)

## RIDR Lifecycle

This plugin is registered as part of the `before.dialogue.start` [middleware](https://www.jovo.tech/docs/middlewares#ridr-middlewares) and is meant to be used in component handlers, hooks and other plugins after that point.


## Install

Install the plugin into your Jovo project:

`npm install @jovo-community/plugin-playergenerator --save`

Register the plugin in:

app.js:

```javascript
const { PlayerGenerator } = require('@jovo-community/plugin-playergenerator');

const app = new App({
  plugins: [
    new PlayerGenerator({/*...*/}),
  ],
});
```

app.ts:

```typescript
import { PlayerGenerator } from '@jovo-community/plugin-playergenerator';

const app = new App({
  plugins: [
    new PlayerGenerator({/*...*/}),   
  ],
});
```

## Configuration

The plugin has the following values:

```typescript
new PlayerGenerator({
      displayName: {
        list1: ['red', 'green'],
        list2: ['apple', 'car'],
        suffixDigits: 4,
        maxLength: 25,
        fallbackName: 'unknown',
      },
      avatar: {
        count: 50,
        urlPattern: 'https://example.com/images/avatar{{index}}.png.',
      },
}),
```

- `displayName`: Configuration values for the Display Name. See [displayName](#displayname) for more information.
- `avatar`: Configuration values for the Avatar URL. See [avatar](#avatar) for more information.

### displayName

The generated display name includes a random value from list1, a random value from list2 and an (optional) random number 0-5 digits (padded with 0s).

The displayName includes:

- `list1`: Required. An array of strings used in name generation. Default value is an array of over 150 strings.
- `list2`: Required. An array of strings used in name generation. Default value is an array of over 250 strings.
- `suffixDigits`: Required. Range 0-5. When 0, no number suffix (which increases the chance of non-unique names). Numbers are padded with 0s. Default value is 4.
- `maxLength`: Required. The min value is 5. If the total length of the displayName is greater than this, then the generator will try 10 times to generate a name that fits the length. If that fails, then the `fallbackName` is used. Default value is 25.
- `fallbackName`: Required. Name to use if display name generated from lists is greater than `maxLength`. If `fallbackName` is greater than `maxLength` the display name (with optional numbers) will be truncated. Default value is 'unknown'.


### avatar

The images for avatars must be stored with a public URL and include a number between 0 and n in the path to uniquely identify them. ex: https://example.com/images/avatar1.png

The avatar includes:

- `count`: Required. The count of avatar images. The generator will randomly pick a number between 0 and `count` - 1. Default value is 0.
- `urlPattern`: Required. The pattern that all avatar URLs follow and must include the `{{index}}` placeholder for the random number. ex: `https://example.com/images/avatar{{index}}.png`. Default value is '' (empty string) which means 'no avatar'.


## Usage

Access features of this plugin using `this.$playergen`.

The following functions are available:

- `generateDisplayName()`: Generates the display name.
- `generateAvatarUrl()`: Generates the avatar URL.
- `generateHexColor()`: Generates a hex color value.
- `generateProfile()`: Generates the profile.

The profile is in the format:

```typescript
{
  "displayName": "Weary Crocodile 05877";
  "avatarUrl": "https://example.com/images/avatar1.png";
  "color": "#ff02de";
}
```

## Jovo Debugger
If using the Jovo Debugger, you must add `$playergen` to the list of properties the debugger ignores:

```ts
// app.dev.ts

new JovoDebugger({
  ignoredProperties: ['$app', '$handleRequest', '$platform', '$playergen'],
}),
```

# License

MIT