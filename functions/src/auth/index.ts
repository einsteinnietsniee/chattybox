import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import {IUserCreateArgs} from "../types/user";

admin.initializeApp();

export const userCreateHandler = async (data: IUserCreateArgs, context: functions.https.CallableContext) => {
  const {user, organization} = data;
  const firestore = admin.firestore();
  const newUserRef = firestore.doc(`users/${context.auth?.token.uid}`);

  await firestore.runTransaction(async (transaction) => {
    const newUser = await transaction.get(newUserRef);
    if (!newUser.exists) {
      throw new functions.https.HttpsError("already-exists", "Document already exist!");
    }

    transaction.set(newUserRef, {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    });

    const newWidgetRef = firestore.collection("widgets").doc();
    transaction.set(newWidgetRef, {name: "Default Widget"});

    const newOrganizationRef = firestore.collection("organizations").doc();
    transaction.set(newOrganizationRef, {
      name: organization.name,
      agents: [user.id],
      widgets: [newWidgetRef.id],
    });

    return {
      result: "Success",
    };
  });
};
