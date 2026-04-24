// Lighthouse CI configuration
// Run desktop audit (no CPU/network throttling) — appropriate for a B2B agency site
// where the primary audience is on desktop.
module.exports = {
  ci: {
    collect: {
      settings: {
        preset: 'desktop',
      },
    },
  },
};
