import { useCallback } from 'react';
import { doc, getDoc } from "firebase/firestore";
import { useFirestore } from './useFirebase';


export interface IUserData {
   email: string
   firstName: string
   lastName: string
   organizationId?: string
}

export const useGetUserData =
   async (uid: string) => {

      const db = useFirestore()
      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {

         console.log("Document data:", docSnap.data());
         return docSnap.data() as IUserData

      } else {

         console.log("No such document!");
      }
   }
