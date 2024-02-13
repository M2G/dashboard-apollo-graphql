import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

//@TODO to json file
const resources = {
  en: {
    translation: {
      alert: {
        warning: 'Warning, you are about to perform an irreversible action',
      },
      field: {
        createdAt: 'Created at',
        email: 'Email',
        firstname: 'First name',
        password: 'Password',
        lastname: 'Last name',
        updateAt: 'Update at',
        oldPassword: 'Old password',
        newPassword: 'New password',
        confirmPassword: 'Confirm password',
        verifyPassword: 'Verify password',
      },
      fieldError: {
        emailRequired: 'Email is required',
        passwordRequired: 'Password is required',
        confirmPasswordRequired: 'Confirm password is required',
        oldPasswordRequired: 'Old password is required',
        emailInvalid: 'Email is invalid',
        passwordLength: 'Password must be at least 6 characters',
        passwordMatch: 'Passwords does not match',
      },
      form: {
        createAccount: 'Create account',
        forgotPassword: 'Forgot password',
        pleaseAuthenticate: 'Please authenticate',
        changePassword: 'Change Password',
        resetPassword: 'Reset password',
        toContinue: 'to continue',
        userProfile: 'User Profile',
        save: 'Save',
        signup: 'Signup',
        haveAnAccount: 'Have an account ?',
        signin: 'Signin',
        home: 'Home',
        submit: 'Submit',
        profile: 'Profile',
        wantToSeeYour: 'Want to see your ?',
      },
      navbar: {
        concerts: 'Concerts',
        home: 'Home',
        profil: 'Profil',
        users: 'Users',
      },
    },
  },
  fr: {
    translation: {
      alert: {
        warning:
          "Attention, vous êtes sur le point d'effectuer une action irréversible",
      },
      field: {
        createdAt: 'Créé à',
        email: 'Email',
        firstName: 'Prénom',
        lastName: 'Nom de famille',
        oldPassword: 'Ancien Mot de passe',
        password: 'Mot de passe',
        updateAt: 'Mise à jour à',
      },
      fieldError: {
        emailRequired: 'Email requis',
        passwordRequired: 'Mot de passe requis',
        confirmPasswordRequired: 'Confirmer le mot de passe requis',
        oldPasswordRequired: 'Ancien mot de passe requis',
        emailInvalid: 'Email invalide',
        passwordLength: 'Le mot de passe doit comporter au moins 6 caractères',
        passwordMatch: 'Les mots de passe ne correspondent pas',
      },
      form: {
        createAccount: 'Créer un compte',
        forgotPassword: 'Mot de passe oublié',
        pleaseAuthenticate: 'Veuillez vous authentifier',
        resetPassword: 'Réinitialiser le mot de passe',
        toContinue: 'Continuer',
        userProfile: "Profil de l'utilisateur",
        save: 'Sauvegarder',
        signup: 'Signup',
        haveAnAccount: 'Vous avez un compte ?',
        signin: 'Signin',
        home: 'Home',
        submit: 'Soumettre',
        profile: 'Profile',
        wantToSeeYour: 'Voulez-vous voir votre ?',
      },
      navbar: {
        concerts: 'Concerts',
        home: 'Accueil',
        profil: 'Profil',
        users: 'Utilisateurs',
      },
    },
  },
};

// @see https://github.com/i18next/react-i18next/blob/master/example/react/src/i18n.js
(i18n as any).use(initReactI18next).init({
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
  // keySeparator: false,
  lng: 'en',
  resources,
});

export default i18n;
