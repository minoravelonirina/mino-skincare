// import { Locales, type IntlayerConfig } from "intlayer";

// const config: IntlayerConfig = {
//   internationalization: {
//     locales: [
//       Locales.ENGLISH,
//       Locales.FRENCH,
//     ],
//     defaultLocale: Locales.ENGLISH,
//   },
// };

// export default config;


import { type IntlayerConfig, Locales } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.ENGLISH,
  },
  dictionary: {
    importMode: "dynamic",
  },
  editor: {
    enabled: false,
    applicationURL: "http://localhost:3000",
  },
};

export default config;
