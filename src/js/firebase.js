import * as firebase from 'firebase';

const config = {
	apiKey: "AIzaSyA5a79f_lieU_IcHeeDbQRoe1Z_o3uIduU",
	authDomain: "transactions-5e0da.firebaseapp.com",
	databaseURL: "https://transactions-5e0da.firebaseio.com",
	projectId: "transactions-5e0da",
	storageBucket: "transactions-5e0da.appspot.com",
	messagingSenderId: "686556748325"
};

const fire = firebase.initializeApp(config);


export default fire;