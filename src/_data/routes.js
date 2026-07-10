// Route map pairing Swedish and English versions of every page.
// Used for canonical URLs, hreflang pairs, and the language switcher.
module.exports = {
  home: { sv: "/", en: "/en/" },
  services: { sv: "/tjanster/", en: "/en/services/" },
  customSoftware: { sv: "/tjanster/systemutveckling/", en: "/en/services/custom-software/" },
  designToCode: { sv: "/tjanster/design-till-kod/", en: "/en/services/design-to-code/" },
  architecture: { sv: "/tjanster/losningsarkitektur/", en: "/en/services/solution-architecture/" },
  powerPlatform: { sv: "/tjanster/power-platform/", en: "/en/services/power-platform/" },
  agencies: { sv: "/for-byraer/", en: "/en/for-agencies/" },
  howWeWork: { sv: "/sa-arbetar-vi/", en: "/en/how-we-work/" },
  socialImpact: { sv: "/samhallsnytta/", en: "/en/social-impact/" },
  about: { sv: "/om/", en: "/en/about/" },
  contact: { sv: "/kontakt/", en: "/en/contact/" }
};
