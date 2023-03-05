import { initializeApp, getApps } from 'firebase/app'
import { getFirestore  } from 'firebase/firestore'
import { firebaseConfig } from '~/configs/fireabase'

function useFirebase() {
  const apps = getApps();

  if (apps.length > 0) {
    return apps[0]
  }

  return initializeApp(firebaseConfig);
}

export function useFirestore() {
  const app = useFirebase()

  return getFirestore(app)
}

export default useFirebase
