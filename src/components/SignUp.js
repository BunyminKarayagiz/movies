import React, { useState } from "react";
import { auth } from '../Firebase.js'; // doğru yolu kendi projenin yapısına göre ayarla
import { createUserWithEmailAndPassword } from 'firebase/auth';
import '../styles/SignUp.css';
import { useNavigate } from 'react-router-dom';
import { isMailValid,isPasswordStrong } from "../helpers/validFunctions.js";

function SignUp() {
  const [userMail, setUserMail] = useState("");
  const [userPass, setUserPass] = useState("");
  const navigate = useNavigate();



  const signUpSubmitting = async (event) => {
    event.preventDefault();

    if (!isMailValid(userMail) || !isPasswordStrong(userPass)) {
      alert("Mail is not valid Or Password is not strong");
      return;
    }

    try {
      const userLogUp = await createUserWithEmailAndPassword(auth,userMail,userPass);
      console.log("Kayit Basarili", userLogUp.user);
      navigate('/login');
    } catch (error) {
      alert(error.message);
    }
  };

   return (
    <div className="form-container">
      <form className="signFormDiv" onSubmit={signUpSubmitting} noValidate>
        <h2 className="form-title">Üye Ol</h2>

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
