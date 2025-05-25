import { auth } from 'infra/firebase-connector';
import { signInWithEmailAndPassword } from 'firebase/auth';

async function tryRemoveUser(email, password) {
  try {
    const authInstance = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    await authInstance?.user?.delete();
  } catch (error) {}
}

const orchestrator = {
  tryRemoveUser,
};

export default orchestrator;
