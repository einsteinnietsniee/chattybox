'use client'
import { useCallback, useEffect, useState } from 'react';
import {
  User,
  UserCredential,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from 'firebase/auth'

import useFirebase from "./useFirebase";
import { useUserMethods } from './useUserData';

function useAuth() {
  const app = useFirebase()
  return getAuth(app)
}

export function useGetUser() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const auth = useAuth()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user)
      } else {
        setUser(null)
      }
      setLoading(false)
    })

    return unsubscribe
  }, [])

  return {
    loading,
    user,
  }
}

export function useEmailVerification() {
  const { user, loading } = useGetUser()

  if (loading) {
    return null
  }

  if (!user) {
    throw new Error('User is not logged in!')
  }

  return [user.emailVerified, () => sendEmailVerification(user)]
}

export function usePasswodReset() {
  const auth = useAuth()

  const handlePasswordReset = useCallback(
    async (email: string) => {
      try {
        await sendPasswordResetEmail(auth, email)
        return 'Ok!'
      } catch (error) {
        console.error(error)
      }
    },
    [auth]
  )

  return handlePasswordReset
}

function useGoogleProvider() {
  const auth = useAuth()
  const provider = new GoogleAuthProvider()
  auth.useDeviceLanguage()

  return provider
}

interface ISignUpArgs {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  organizationName: string;
}

export function useSignUp() {
  const auth = useAuth()
  const google = useGoogleProvider()
  const { handleCreateUserWithOrganization } = useUserMethods()

  const handleEmailSignUp = useCallback(
    async ({
      email,
      password,
      firstName,
      lastName,
      organizationName,
    }: ISignUpArgs) => {
      try {
        const credentials: UserCredential = await createUserWithEmailAndPassword(auth, email, password)
        await updateProfile(credentials.user, {
          displayName: `${firstName} ${lastName}`,
        })
        handleCreateUserWithOrganization({
          user: { email, firstName, lastName, id: credentials.user.uid, role: ['owner'] },
          organization: { name: organizationName }
        })
      } catch (error) {
        console.error(error)
      }
    }, [auth]
  )

  const handleGoogleSignUp = useCallback(
    async () => {
      try {
        const result = await signInWithPopup(auth, google)
        console.log('RES', result)
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        const user = result.user;
        console.log('GOOGLE SIGNIN', token, user, credential)
      } catch (error) {
        console.error(error)
      }
    },
    [auth, google]
  )

  return { handleEmailSignUp, handleGoogleSignUp }
}

export function useSignIn() {
  const auth = useAuth()
  const google = useGoogleProvider()

  const handleEmailSignIn = useCallback(
    async (email: string, password: string) => {
      try {
        const credentials = await signInWithEmailAndPassword(auth, email, password)
        console.log('CREDENTIALS', credentials)
        return credentials
      } catch (error) {
        console.error(error)
      }
    },
    [auth]
  )

  const handleGoogleSignIn = useCallback(
    async () => {
      try {
        const result = await signInWithPopup(auth, google)
        console.log('RES', result)
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        const user = result.user;
        console.log('GOOGLE SIGNIN', token, user, credential)
      } catch (error) {
        console.error(error)
      }
    },
    [auth, google]
  )

  return { handleEmailSignIn, handleGoogleSignIn }
}