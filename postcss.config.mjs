// PostCSS ne sert qu'en local, où Turbopack est indisponible (binaire natif bloqué par Windows) : next build/dev --webpack.
// Sur Vercel (variable VERCEL présente), Turbopack traite Tailwind via next.config.ts.
const config = { plugins: process.env.VERCEL ? {} : { "@tailwindcss/postcss": {} } };
export default config;
