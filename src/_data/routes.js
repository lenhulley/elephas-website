// Route map pairing English and Swedish versions of every page.
// English is the default language and owns the unprefixed paths; Swedish lives under /sv/.
// Used for canonical URLs, hreflang pairs, and the language switcher.
module.exports = {
  home: { en: "/", sv: "/sv/" },
  services: { en: "/services/", sv: "/sv/tjanster/" },
  customSoftware: { en: "/services/custom-software/", sv: "/sv/tjanster/systemutveckling/" },
  designToCode: { en: "/services/design-to-code/", sv: "/sv/tjanster/design-till-kod/" },
  architecture: { en: "/services/solution-architecture/", sv: "/sv/tjanster/losningsarkitektur/" },
  powerPlatform: { en: "/services/power-platform/", sv: "/sv/tjanster/power-platform/" },
  integration: { en: "/services/integration/", sv: "/sv/tjanster/integrationer/" },
  dataMigration: { en: "/services/data-migration/", sv: "/sv/tjanster/datamigrering/" },
  legacyModernisation: { en: "/services/legacy-modernisation/", sv: "/sv/tjanster/modernisering/" },
  aiSolutions: { en: "/services/ai/", sv: "/sv/tjanster/ai-losningar/" },
  accessibility: { en: "/services/accessibility/", sv: "/sv/tjanster/tillganglighet/" },
  advisory: { en: "/services/technology-advisory/", sv: "/sv/tjanster/teknikradgivning/" },
  agencies: { en: "/for-agencies/", sv: "/sv/for-byraer/" },
  howWeWork: { en: "/how-we-work/", sv: "/sv/sa-arbetar-vi/" },
  socialImpact: { en: "/social-impact/", sv: "/sv/samhallsnytta/" },
  about: { en: "/about/", sv: "/sv/om/" },
  contact: { en: "/contact/", sv: "/sv/kontakt/" }
};
