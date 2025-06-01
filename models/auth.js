import {
  BadRequestError,
  ConflictError,
  ServiceError,
  UnauthorizedError,
} from 'infra/errors';
import { auth } from 'infra/firebase-connector';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from 'firebase/auth';

function isCredentialsValid(email, password) {
  // All policies should be a boolean
  // If needed to add any new policy, add into it's respective array
  const passwordPolicies = [
    /[A-Z]/.test(password),
    /[a-z]/.test(password),
    /[0-9]/.test(password),
    password.length >= 6,
  ];

  const emailPolicies = [email.includes('@')];

  // Every checks if all policies are true
  return [...passwordPolicies, ...emailPolicies].every(
    (policySatisfied) => policySatisfied
  );
}

async function authenticate(email, password) {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    if (
      error.message.includes('auth/invalid-email') ||
      error.message.includes('auth/invalid-credential')
    ) {
      throw new UnauthorizedError({
        message: 'Falha ao fazer login',
        action: 'Insira um e-mail ou senha válidos',
        cause: error,
      });
    }

    throw new ServiceError({
      message: 'Ocorreu um erro ao realizar o login',
      action: 'Contate o suporte para mais detalhes',
      cause: error,
    });
  }
}

async function signUp(email, password) {
  try {
    if (!isCredentialsValid(email, password)) {
      throw new BadRequestError({
        message: 'Credenciais inválidas!',
        action:
          'Insira credenciais válidas. O e-mail deve conter um @, e a senha deve possuir' +
          'no mínimo 6 caractéres, com números e letras maiúsculas e minúsculas',
      });
    }
    const user = await createUserWithEmailAndPassword(auth, email, password);
    return user;
  } catch (error) {
    if (error instanceof BadRequestError) {
      throw error;
    }

    if (error.message.includes('auth/email-already-in-use')) {
      throw new ConflictError({
        message: 'Email já em uso',
        action: 'Insira um e-mail diferente',
        cause: error,
      });
    }

    // Create error and add the cause
    throw new ServiceError({
      message: 'Erro ao criar uma conta',
      cause: error,
    });
  }
}

async function logout() {
  try {
    signOut(auth);
  } catch (error) {
    const serviceErrorObject = new ServiceError({
      message: 'Erro ao fazer sign-out',
      cause: error,
    });
    console.error(serviceErrorObject);
  }
}

const _auth = {
  isCredentialsValid,
  authenticate,
  signUp,
  logout,
};

export default _auth;
