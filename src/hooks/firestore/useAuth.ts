'use client'
import { useRouter } from "next/navigation"
import { useCallback, useEffect, useState } from 'react';
import {
  AuthError,
  AuthErrorCodes,
  User,
  UserCredential,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from 'firebase/auth'
import { FunctionsErrorCode } from 'firebase/functions'
import { useUserMethods } from './useUserData';
import { useAuth } from "./useFirebase";
import useLoadingState from "../useLoadingState";

type TAuthErrorCodeValues = typeof AuthErrorCodes[keyof typeof AuthErrorCodes];

const ERROR_MESSAGES: Partial<Record<TAuthErrorCodeValues | FunctionsErrorCode, string>> = {
  [AuthErrorCodes.CREDENTIAL_MISMATCH]: 'Incorrect email or password',
  'functions/already-exists': 'User already exists',
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
  const { error, loading, handleStartLoading, handleStopLoading, handleError } = useLoadingState()
  const router = useRouter()
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
      handleStartLoading()

      try {
        const credentials: UserCredential = await createUserWithEmailAndPassword(auth, email, password)
        await Promise.all([
          updateProfile(credentials.user, {
            displayName: `${firstName} ${lastName}`,
          }),
          handleCreateUserWithOrganization({
            user: { email, firstName, lastName, id: credentials.user.uid, role: ['owner'] },
            organization: { name: organizationName }
          })
        ])
        router.push('/workspace')
      } catch (error) {
        const err = error as unknown as AuthError;
        console.log('CHECK', { code: err.code, message: err.message, err })
        const message = ERROR_MESSAGES[err.code as TAuthErrorCodeValues] ?? 'Something went wrong'

        handleError(message)
      }

      handleStopLoading()
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
        router.push('/workspace')
      } catch (error) {
        const err = error as unknown as AuthError;
        const message = ERROR_MESSAGES[err.code as TAuthErrorCodeValues] ?? 'Something went wrong'

        handleError(message)
      }
    },
    [auth, google]
  )

  return { error, loading, handleEmailSignUp, handleGoogleSignUp }
}

export function useSignIn() {
  const { error, loading, handleStartLoading, handleStopLoading, handleError } = useLoadingState()
  const router = useRouter()
  const auth = useAuth()
  const google = useGoogleProvider()

  const handleEmailSignIn = useCallback(
    async (email: string, password: string) => {
      handleStartLoading()

      try {
        const credentials = await signInWithEmailAndPassword(auth, email, password)
        console.log('CREDENTIALS', credentials)
        router.push('/workspace')
      } catch (error) {
        const err = error as unknown as AuthError;
        const message = ERROR_MESSAGES[err.code as TAuthErrorCodeValues] ?? 'Something went wrong'

        handleError(message)
      }

      handleStopLoading()
    },
    [auth]
  )

  const handleGoogleSignIn = useCallback(
    async () => {
      handleStartLoading()

      try {
        const result = await signInWithPopup(auth, google)
        console.log('RES', result)
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        const user = result.user;
        console.log('GOOGLE SIGNIN', token, user, credential)
        router.push('/workspace')
      } catch (error) {
        const err = error as unknown as AuthError;
        const message = ERROR_MESSAGES[err.code as TAuthErrorCodeValues] ?? 'Something went wrong'

        handleError(message)
      }

      handleStopLoading()
    },
    [auth, google]
  )

  return { error, loading, handleEmailSignIn, handleGoogleSignIn }
}