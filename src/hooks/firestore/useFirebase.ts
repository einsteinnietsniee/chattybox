import { initializeApp, getApps } from 'firebase/app'
import { connectAuthEmulator, getAuth } from 'firebase/auth'
import { connectFirestoreEmulator, getFirestore  } from 'firebase/firestore'
import { connectFunctionsEmulator, getFunctions } from 'firebase/functions'
import { connectStorageEmulator, getStorage } from 'firebase/storage'
import { firebaseConfig } from '~/configs/fireabase'

const EMULATOR_ENABLED = 'EMULATOR_ENABLED';

function enableEmulator() {
  localStorage.setItem(EMULATOR_ENABLED, 'true')
}

function isEmulatorEnabled() {
  if (typeof localStorage === 'undefined') return false

  const enabled = localStorage.getItem(EMULATOR_ENABLED)
  return enabled ?? JSON.parse(enabled!)
}

function init() {
  const app = initializeApp(firebaseConfig)


  if (isEmulatorEnabled()) {
    const auth = getAuth(app)
    const db = getFirestore(app)
    const functions = getFunctions(app)
    const storage = getStorage(app)

    connectAuthEmulator(auth, 'http://localhost:9099')
    connectFirestoreEmulator(db, 'localhost', 8080)
    connectFunctionsEmulator(functions, 'localhost', 5001)
    connectStorageEmulator(storage, 'localhost', 9199)
  }

  return app
}

function useFirebase() {
  const apps = getApps();

  if (apps.length > 0) {
    return apps[0]
  }

  return init();
}

export function useAuth() {
  const app = useFirebase()
  const auth = getAuth(app)

  return auth
}

export function useFirestore() {
  const app = useFirebase()
  const db = getFirestore(app)

  return db
}

export function useFunctions() {
  const app = useFirebase()
  const functions = getFunctions(app)

  return functions
}

export function useStorage() {
  const app = useFirebase()
  const storage = getStorage(app)

  return storage
}

export default useFirebase

if (typeof window !== 'undefined') {
  window.enableEmulator = enableEmulator
}
