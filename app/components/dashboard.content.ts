import { type Dictionary, t } from "intlayer";

const dashboardContent = {
  key: "dashboard",
  content: {
    title: t({ en: "My account", fr: "Mon compte" }),
    loading: t({ en: "Loading...", fr: "Chargement..." }),
    welcome: t({ en: "Welcome back", fr: "Bon retour" }),
    email: t({ en: "Email", fr: "Email" }),
    userID: t({ en: "User ID", fr: "Identifiant" }),
    role: t({ en: "Role", fr: "Rôle" }),
    roleCustomer: t({ en: "Customer", fr: "Client" }),
    roleAdmin: t({ en: "Administrator", fr: "Administrateur" }),
    accountInfo: t({ en: "Account information", fr: "Informations du compte" }),
    protectedTitle: t({ en: "Protected information", fr: "Informations protégées" }),
    protectedHint: t({
      en: "This section displays data only accessible to authenticated users.",
      fr: "Cette section affiche des données accessibles uniquement aux utilisateurs connectés.",
    }),
    lastAccess: t({ en: "Last accessed", fr: "Dernier accès" }),
    logout: t({ en: "Log out", fr: "Se déconnecter" }),
    goToShop: t({ en: "Back to the boutique", fr: "Retour à la boutique" }),
    secretUnavailable: t({ en: "No protected data available.", fr: "Aucune donnée protégée disponible." }),
    dashboard: t({ en: "Dashboard", fr: "Tableau de bord" }),
    navigate: t({ en: "Navigation", fr: "Navigation" }),
    overview: t({ en: "Overview", fr: "Aperçu" }),
    orders: t({ en: "My orders", fr: "Mes commandes" }),
    favorites: t({ en: "Favorites", fr: "Favoris" }),
    settings: t({ en: "Settings", fr: "Paramètres" }),
    memberSince: t({ en: "Member since", fr: "Membre depuis" }),
    statusOnline: t({ en: "Online", fr: "En ligne" }),
  },
} satisfies Dictionary;

export default dashboardContent;
