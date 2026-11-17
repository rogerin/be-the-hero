# Dependency security update — 17 November 2026

This repository contains three separate npm projects. Install and audit each project in its own directory. The update uses Node.js 24.15 or newer in the Node 24 release line; Node.js 25 is outside the supported engine ranges of the current Expo and test packages.

## Changes

| Project | Change | Reason |
| --- | --- | --- |
| `api/` | Updated Express to 4.22.3, Knex to 3.3.0, SQLite3 to 6.0.1, and regenerated the lockfile. Replaced invalid `cors(*)` with `cors()` and changed `npm start` to use Node instead of undeclared `nodemon`. | Removes the vulnerable Express, Knex, and old SQLite dependency trees while keeping the existing HTTP routes and permissive CORS behavior. |
| `frontend/` | Replaced `react-scripts` with Vite 8, React 19, and Vitest 5; regenerated the lockfile. | The old development server pinned `selfsigned` and `node-forge@0.9.0`, and the outdated build tree carried many other advisories. Vite removes that dependency path. |
| `mobile/` | Updated Expo SDK 36 to 58, React to the SDK expected 19.3.0, React Native to 0.88.1, and added a lockfile. Scoped `@expo/fingerprint`'s `minimatch` to 11.0.9. | Expo 36 is affected by published advisories. The scoped override addresses the `minimatch` advisory in the current Expo dependency tree while retaining Expo fingerprint behavior. |

Expo SDK 58 raises the minimum supported native platforms to Android 7 and iOS 16.4. See the [Expo SDK version table](https://docs.expo.dev/versions/latest/) before building for older devices. Native store builds require a separate Android or iOS build environment.

## Verification

Run these commands from each project directory:

```sh
# api/
npm ci
npm audit
node --check src/index.js
npm start

# frontend/
npm ci
npm audit
npm test
npm run build

# mobile/
npm ci
npm audit
npx expo install --check
npx expo export --platform all
```

The API's existing `npm test` script is a placeholder that always exits with an error. Its routes were checked by running the server and requesting `GET /ongs` and `GET /incidents`; both returned HTTP 200 with JSON arrays and `Access-Control-Allow-Origin: *`. The frontend UI test and production build passed. Expo's dependency check, fingerprint generation, and web, Android, and iOS JavaScript exports passed. These checks do not replace native device tests or production deployment validation.

Local `npm audit` found no vulnerabilities in the regenerated lockfiles at the time of this update. GitHub's alerts for the default branch remain open until GitHub evaluates a merged dependency graph; review the draft pull request and its checks before merging.
