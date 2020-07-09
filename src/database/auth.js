import fire from "../config/firebse"


async function login_listener() {
     fire.auth().onAuthStateChanged(user => {
        if (user) {
            return user
        } else {
            return null
        }
    })
}

async function login(email, password) {
    try{
        return await fire.auth().signInWithEmailAndPassword(email, password);
    }catch (e) {
        return e;
    }

    // fire.auth().signInWithEmailAndPassword(email, password).then((user) => {
    //     console.log(user);
    //     return user;
    // }).catch(err => {
    //     return err;
    // });
}

function signOut() {
    fire.auth().signOut();
}

async function signUp(email, password,username) {
    try {
        let user=await fire.auth().createUserWithEmailAndPassword(email, password);
        console.log(user["user"]["uid"]);
        //
        await fire.firestore().collection('user-data').doc(`${user["user"]["uid"]}`).set({
           cart:[],
           tele:"",
           username:username
        });
        return user;
    }catch (e) {
        return e;
    }
    // fire.auth().createUserWithEmailAndPassword(email, password).then(user => {
    //     console.log(user);
    //     return user
    // }).catch(err => {
    //     return err;
    // });
}

export const Auth = {login_listener, login, signOut, signUp};