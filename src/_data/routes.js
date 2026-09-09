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
  agencies: { en: "/for-agencies/", sv: "/sv/for-byraer/" },
  howWeWork: { en: "/how-we-work/", sv: "/sv/sa-arbetar-vi/" },
  socialImpact: { en: "/social-impact/", sv: "/sv/samhallsnytta/" },
  about: { en: "/about/", sv: "/sv/om/" },
  contact: { en: "/contact/", sv: "/sv/kontakt/" }
};
