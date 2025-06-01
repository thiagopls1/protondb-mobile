import { getAuth } from 'firebase/auth';
import {
  deleteDoc,
  updateDoc,
  doc,
  setDoc,
  getDoc,
  arrayRemove,
  arrayUnion,
} from 'firebase/firestore';
import { ForbiddenError, NotFoundError } from 'infra/errors';
import { db } from 'infra/firebase-connector.cjs';

async function get(userUid) {
  try {
    const ref = doc(db, 'users', userUid);
    const userDoc = await getDoc(ref);
    const user = userDoc.data();
    return user;
  } catch (error) {
    console.log(error);
  }
}

/* 
NOTE: We are not using addDoc because
we want to set doc's id.
*/
async function create(user) {
  try {
    const ref = doc(db, 'users', user.uid);
    // Map keys to avoid object schema modification
    await setDoc(ref, {
      devices: user.devices || [],
      username: user.username,
    });
  } catch (error) {
    console.log(error);
  }
}

async function update(user) {
  try {
    const ref = doc(db, 'users', user.uid);
    // Map keys to avoid object schema modification
    await updateDoc(ref, {
      devices: user.devices,
      username: user.username,
    });
  } catch (error) {
    console.log(error);
  }
}

async function _delete(userUid) {
  try {
    const currentAuth = getAuth();

    if (currentAuth.currentUser.uid !== userUid) {
      throw new ForbiddenError({
        message: 'Remoção de usuário não permitida',
        action: 'Só é possível remover o usuário que está autenticado',
      });
    }

    currentAuth.currentUser.delete();
    const ref = doc(db, 'users', userUid);
    await deleteDoc(ref);
  } catch (error) {
    console.log(error);
  }
}

async function deleteDevice(userUid, deviceIndex) {
  try {
    const ref = doc(db, 'users', userUid);
    const userDoc = await getDoc(ref);

    if (!userDoc.exists()) {
      throw new NotFoundError({
        message: 'Usuário não encontrado',
        action:
          'Entre em contato com o suporte ou tente realizar a ação com outro usuário',
      });
    }

    const userData = userDoc.data();
    await updateDoc(ref, {
      devices: arrayRemove(userData.devices[deviceIndex]),
      username: userData.username,
    });
  } catch (error) {
    console.log(error);
  }
}

async function createDevice(userUid, device) {
  try {
    const ref = doc(db, 'users', userUid);
    const userDoc = await getDoc(ref);

    if (!userDoc.exists()) {
      throw new NotFoundError({
        message: 'Usuário não encontrado',
        action:
          'Entre em contato com o suporte ou tente realizar a ação com outro usuário',
      });
    }

    const userData = userDoc.data;
    // Map keys to avoid object schema modification
    await updateDoc(ref, {
      ...userData,
      devices: arrayUnion(device),
    });
  } catch (error) {
    console.log(error);
  }
}

async function updateDevice(userUid, device, deviceIndex) {
  try {
    const ref = doc(db, 'users', userUid);
    const userDoc = await getDoc(ref);

    if (!userDoc.exists()) {
      throw new NotFoundError({
        message: 'Usuário não encontrado',
        action:
          'Entre em contato com o suporte ou tente realizar a ação com outro usuário',
      });
    }

    const userData = userDoc.data();
    userData.devices[deviceIndex] = device;
    await updateDoc(ref, userData);
  } catch (error) {
    console.log(error);
  }
}

const user = {
  get,
  create,
  update,
  delete: _delete,
  deleteDevice,
  createDevice,
  updateDevice,
};

export default user;
