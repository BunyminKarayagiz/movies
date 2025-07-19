import React, { useState } from "react";
import {auth,db} from "../Firebase.js";
import { createUserWithEmailAndPassword } from 'firebase/auth';
import '../styles/SignUp.css';
import { useNavigate } from 'react-router-dom';
import { isMailValid,isPasswordStrong } from "../helpers/validFunctions.js";
import { setDoc,doc} from "firebase/firestore";

function SignUp() {
  const [userMail, setUserMail] = useState("");
  const [userPass, setUserPass] = useState("");
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();



  const signUpSubmitting = async (event) => {
    event.preventDefault();

    if (!isMailValid(userMail) || !isPasswordStrong(userPass)) {
      alert("Mail is not valid Or Password is not strong"); 
      return;
    }

    try {
      const userLogUp = await createUserWithEmailAndPassword(auth,userMail,userPass);  
      const userId = userLogUp.user.uid;
      const userFireBaseMail = userLogUp.user.email;

      await setDoc(doc(db, "users", userId), {
        createdAt: new Date().toUTCString(),
        email: userFireBaseMail,
        displayName: userName, // ya kayıt formundan al
        watchList: [],
        role:'user'
      });
      navigate('/login');
    } catch (error) {
      alert(error.message);
    }
  };  

   return (
    <div className="form-container">
      <form className="signFormDiv" onSubmit={signUpSubmitting} noValidate>
        <h2 className="form-title">Üye Ol</h2>

        <label htmlFor="name">Name</label>
        <input
          id="uname"
          type="text"
          placeholder="İsminizi Giriniz"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          required
          className={userName ? "filled" : ""}
        />

        <label htmlFor="email">E-posta</label>
        <input
          id="email"
          type="email"
          placeholder="E-posta adresinizi girin"
          value={userMail}
          onChange={(e) => setUserMail(e.target.value)}
          required
          className={userMail ? "filled" : ""}
        />

        <label htmlFor="password">Şifre</label>
        <input
          id="password"
          type="password"
          placeholder="Şifrenizi girin"
          value={userPass}
          onChange={(e) => setUserPass(e.target.value)}
          required
          className={userPass ? "filled" : ""}
        />

        <button type="submit" className="btn-submit">Kayıt Ol</button>
      </form>
    </div>
  );
}

export default SignUp;
