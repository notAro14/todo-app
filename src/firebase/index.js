import firebase from 'firebase/app'
import 'firebase/auth'
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBYlQYtcqhZMweYW3a3AQthRzSpVC06IUs',
  authDomain: 'malagasy-saas.firebaseapp.com',
  databaseURL: 'https://malagasy-saas.firebaseio.com',
  projectId: 'malagasy-saas',
  storageBucket: 'malagasy-saas.appspot.com',
  messagingSenderId: '850237133050',
  appId: '1:850237133050:web:e3c1884d1411917ec73943',
  measurementId: 'G-X6P3CNE48T',
}
// Initialize Firebase

const app = firebase.initializeApp(firebaseConfig)
export const auth = app.auth()
export default app
// firebase.analytics();
