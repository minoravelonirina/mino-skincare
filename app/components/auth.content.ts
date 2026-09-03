import { type Dictionary, t } from "intlayer";

const authContent = {
  key: "auth",
  content: {
    login: {
      title: t({ en: "Welcome back", fr: "Bon retour" }),
      subtitle: t({
        en: "Sign in to your account to continue",
        fr: "Connectez-vous à votre compte pour continuer",
      }),
      email: t({ en: "Email address", fr: "Adresse email" }),
      emailPlaceholder: t({ en: "you@example.com", fr: "vous@exemple.com" }),
      password: t({ en: "Password", fr: "Mot de passe" }),
      passwordPlaceholder: t({ en: "Enter your password", fr: "Entrez votre mot de passe" }),
      submit: t({ en: "Sign in", fr: "Se connecter" }),
      forgot: t({ en: "Forgot password?", fr: "Mot de passe oublié ?" }),
      noAccount: t({ en: "Don't have an account?", fr: "Vous n'avez pas de compte ?" }),
      signup: t({ en: "Sign up", fr: "Créer un compte" }),
      success: t({ en: "Login successful!", fr: "Connexion réussie !" }),
      error: t({ en: "Login failed. Please try again.", fr: "Échec de la connexion. Veuillez réessayer." }),
    },
    register: {
      title: t({ en: "Create an account", fr: "Créer un compte" }),
      subtitle: t({
        en: "Join us and start exploring",
        fr: "Rejoignez-nous et commencez à explorer",
      }),
      firstName: t({ en: "First name", fr: "Prénom" }),
      lastName: t({ en: "Last name", fr: "Nom" }),
      email: t({ en: "Email address", fr: "Adresse email" }),
      emailPlaceholder: t({ en: "you@example.com", fr: "vous@exemple.com" }),
      password: t({ en: "Password", fr: "Mot de passe" }),
      passwordPlaceholder: t({ en: "Create a password", fr: "Créez un mot de passe" }),
      confirmPassword: t({ en: "Confirm password", fr: "Confirmer le mot de passe" }),
      submit: t({ en: "Create account", fr: "Créer mon compte" }),
      hasAccount: t({ en: "Already have an account?", fr: "Vous avez déjà un compte ?" }),
      signin: t({ en: "Sign in", fr: "Se connecter" }),
      success: t({ en: "Account created successfully!", fr: "Compte créé avec succès !" }),
      mismatch: t({ en: "Passwords do not match", fr: "Les mots de passe ne correspondent pas" }),
      error: t({ en: "Registration failed. Please try again.", fr: "Échec de l'inscription. Veuillez réessayer." }),
    },
  },
} satisfies Dictionary;

export default authContent;
