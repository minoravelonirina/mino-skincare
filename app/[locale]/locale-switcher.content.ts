import { type Dictionary, t } from "intlayer";

const localeSwitcherContent = {
	key: "locale-switcher",
	content: {
		title: t({
			en: "Language",
			fr: "Langue",
		}),
		selectLanguage: t({
			en: "Select Language",
			fr: "Sélectionner la langue",
		}),
		currentLanguage: t({
			en: "Current language",
			fr: "Langue actuelle",
		}),
		changeLanguage: t({
			en: "Change language",
			fr: "Changer de langue",
		}),
	},
} satisfies Dictionary;

export default localeSwitcherContent;




