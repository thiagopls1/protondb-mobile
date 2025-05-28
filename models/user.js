/*
 * This module will:
 * - Handle user's auth
 *  - Create account
 *  - Authenticate user
 * - Get user's data from
 *   - Steam
 *   - Firebase
 * */

import { ServiceError } from 'infra/errors';
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
    /[A-Z]/.test(password),
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
  let user;
  try {
    user = await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    const serviceErrorObject = new ServiceError({
      message: 'Erro ao autenticar o usuário',
      cause: error,
    });
    // Log error and throw it again
    // When calling this function, we should wrap into a try...catch
    console.error(serviceErrorObject);
  } finally {
    // Being an error or not, returns user
    return user;
  }
}

async function signUp(email, password) {
  let user;
  try {
    if (!isCredentialsValid(email, password)) {
      return user;
    }
    user = await createUserWithEmailAndPassword(auth, email, password);
  } catch (error) {
    // Create error and add the cause
    const serviceErrorObject = new ServiceError({
      message: 'Erro ao criar o usuário',
      cause: error,
    });
    // Log error
    console.error(serviceErrorObject);
  } finally {
    // Being an error or not, returns user
    return user;
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

// function getAuthInstance() {
//   let authInstance;
//   try {
//     getAuth();
//   } catch (error) {
//     const serviceErrorObject = new ServiceError({
//       message: 'Erro ao adquirir uma instância de autenticação',
//       cause: error,
//     });
//     console.error(serviceErrorObject);
//   } finally {
//     return authInstance;
//   }
// }

const user = {
  isCredentialsValid,
  authenticate,
  signUp,
  logout,
  // getAuthInstance,
};

export default user;
