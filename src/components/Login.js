import React, { useState } from "react";
import { auth} from "../Firebase.js"; // doğru yolu kendi projenin yapısına göre ayarla
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";


function Login() {
  const [userMail, setUserMail] = useState("");
  const [userPass, setUserPass] = useState("");
  const navigate = useNavigate();

  const signInSubmitting = async (event) => {
    event.preventDefault()
    try {
      await signInWithEmailAndPassword(
        auth,
        userMail,
        userPass
      );


      navigate("/");
    } catch (error) {
      if (error.code === "auth/user-not-found") {
        alert("Kullanıcı bulunamadı. Kayıt olmak ister misin?");
        // İstersen burada navigate('/signup') de yapabilirsin
      } else {
        alert(error.message);
      }
    }
  };


  return (
    <div className="login-container">
      <form className="signFormDiv" id="signInForm" onSubmit={signInSubmitting}>
        <h2 className="form-title">Giriş Yap</h2>

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
          className={userPass ? "filled" : ""
          }
        />

        <button type="submit" className="btn-submit">
          Giriş Yap
        </button>
      </form>
    </div>
  );
}

export default Login;
