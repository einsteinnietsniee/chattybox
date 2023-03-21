import { collection, addDoc, writeBatch, doc, setDoc, runTransaction } from "firebase/firestore";
import { useCallback } from "react";
import { useFirestore } from "./useFirebase";

type TRole = 'owner' | 'admin' | 'supervisor' | 'agent';

interface IUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: TRole[];
}

interface IOrganization {
  name: string;
}

interface IUserCreateArgs {
  user: IUser;
  organization: IOrganization
}

export function useUserMethods() {
  const db = useFirestore()

  const handleCreateUserWithOrganization = useCallback(async ({
    user,
    organization,
  }: IUserCreateArgs) => {
    try {
      const newUserRef = doc(db, 'users', user.id);

      await runTransaction(db, async (transaction) => {
        const newUser = await transaction.get(newUserRef);
        if (newUser.exists()) {
          throw "Document already exist!";
        }

        transaction.set(newUserRef, { firstName: user.firstName, lastName: user.lastName, email: user.email });

        const newOrganizationRef = doc(collection(db, 'organizations'));
        transaction.set(newOrganizationRef, { name: organization.name, agents: [user.id] })
      });
      console.log('User and Organization were created')
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }, [db])

  const handleCreateUser = useCallback(async ({
    email,
    firstName,
    lastName,
    id,
  }: IUser) => {
    try {
      await setDoc(doc(db, "users", id), {
        email,
        firstName,
        lastName,
      })
    } catch (error) {
      console.error('ERROR creating user', error)
    }
  }, [db])

  // const handleCreateOrganization = useCallback(async(organizationName: string, id: string) => {
  //   try {
  //     const newOrganizationRef = doc(collection(db, 'organizations'));
  //     await setDoc(doc(db, "organizations", id), {
  //       organizationName
  //     })
  //   } catch (error) {
  //     console.error('ERROR creating organization', error)
  //   }
  // }, [])

  return { handleCreateUserWithOrganization, handleCreateUser }
}