import firebase from 'firebase'

// Connect to firebase with Google Auth enabled
var firebaseConfig = {
  apiKey: "AIzaSyDxm72D8cPn6kUMtGkRSeUn6Pj0KXVUrok",
  authDomain: "runstudiorun-9d16e.firebaseapp.com",
  projectId: "runstudiorun-9d16e",
  storageBucket: "runstudiorun-9d16e.appspot.com",
  messagingSenderId: "500904488424",
  appId: "1:500904488424:web:9c451994b180155487c85d"
};

firebase.initializeApp(firebaseConfig)

const auth = firebase.auth()
const provider = new firebase.auth.GoogleAuthProvider()

export { auth, provider }