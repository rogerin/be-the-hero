# Be The Hero frontend

The frontend uses React and Vite. Use Node.js 24.15 or newer in the Node 24 release line.

```sh
npm ci
npm start       # development server at http://localhost:5173
npm test        # run the UI test once
npm run build   # production files in dist/
npm audit
```

The former Create React App toolchain was replaced because its pinned dependencies included vulnerable development server packages. The existing page, static assets, manifest, and service worker unregistration remain available. See [the dependency update notes](../SECURITY_UPDATES.md) for migration details.
