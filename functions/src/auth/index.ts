import * as functions from "firebase-functions";

export const handleUserCreate = () => {
  functions.auth.user().onCreate((user) => {
    // ...
  });
}