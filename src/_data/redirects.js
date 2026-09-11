// Old URLs kept alive after pages moved. GitHub Pages cannot issue real 301s,
// so each old path gets a small noindex stub that forwards to its new home.
module.exports = [
  // Swedish pages, previously unprefixed (before English became the default)
  { from: "/tjanster/", to: "/sv/tjanster/" },
  { from: "/tjanster/systemutveckling/", to: "/sv/tjanster/systemutveckling/" },
  { from: "/tjanster/design-till-kod/", to: "/sv/tjanster/design-till-kod/" },
  { from: "/tjanster/losningsarkitektur/", to: "/sv/tjanster/losningsarkitektur/" },
  { from: "/tjanster/power-platform/", to: "/sv/tjanster/power-platform/" },
  { from: "/for-byraer/", to: "/sv/partner/" },
  { from: "/sa-arbetar-vi/", to: "/sv/sa-arbetar-vi/" },
  { from: "/samhallsnytta/", to: "/sv/samhallsnytta/" },
  { from: "/om/", to: "/sv/om/" },
  { from: "/kontakt/", to: "/sv/kontakt/" },
  // English pages, previously under /en/
  { from: "/en/", to: "/" },
  { from: "/en/services/", to: "/services/" },
  { from: "/en/services/custom-software/", to: "/services/custom-software/" },
  { from: "/en/services/design-to-code/", to: "/services/design-to-code/" },
  { from: "/en/services/solution-architecture/", to: "/services/solution-architecture/" },
  { from: "/en/services/power-platform/", to: "/services/power-platform/" },
  { from: "/en/for-agencies/", to: "/partners/" },
  { from: "/en/how-we-work/", to: "/how-we-work/" },
  { from: "/en/social-impact/", to: "/social-impact/" },
  { from: "/en/about/", to: "/about/" },
  { from: "/en/contact/", to: "/contact/" },
  // Agency pages widened to cover Microsoft partners as well
  { from: "/for-agencies/", to: "/partners/" },
  { from: "/sv/for-byraer/", to: "/sv/partner/" }
];
