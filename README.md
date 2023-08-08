## Notes

This was my first time learning and using NextJS, Tailwind and Cypress. I chose these as the Tech Stack as these are fairly popular and I wanted to learn to use these.

NextJS has short load times, and improved SEO

Tailwind has some benefits of purging unused utility styles in the final bundle

## Running Locally

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

- `app/layout.tsx` contains the entry point for the app.
- `app/page.tsx` contains the `<main>`, `<header>` and `<footer> nodes that structure the DOM`
- `app/form/` contains the form component, fetch request and validation logic

Extra Feature:

- Thought I'd throw in dark mode as a little extra.

## Tests

### Jest

```bash
npm run test
```

### Cypress e2e

```bash
npm run e2e
```
