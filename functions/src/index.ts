import * as functions from "firebase-functions";
import { userCreateHandler } from "./auth";

export const handleUserCreate = functions.https.onCall(userCreateHandler);
