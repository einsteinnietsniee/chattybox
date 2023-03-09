import { httpsCallable } from "firebase/functions";
import { useCallback } from "react";
import { IUserCreateArgs } from "~/types/user";
import { useFirestore, useFunctions } from "./useFirebase";

export function useUserMethods() {
  const db = useFirestore()
  const functions = useFunctions()

  const handleUserCreate = httpsCallable(functions, 'handleUserCreate')
  const handleCreateUserWithOrganization = useCallback(async (data: IUserCreateArgs) => {
    const result = await handleUserCreate(data);
    console.log('User and Organization were created', result)
  }, [db])

  return { handleCreateUserWithOrganization }
}