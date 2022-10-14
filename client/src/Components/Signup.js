import "../login.css";
import { Link } from "react-router-dom";
import EmailValidator from "email-validator";
import { v4 as uuidv4 } from "uuid";

export default function Signup() {
  window.onload = () => {
    const signupForm = document.querySelector(".signup-container form");
    const emailInput = document.querySelector("input#email");
    const pwdInput = document.querySelector("input#pwd");
    const pwdCnfrmInput = document.querySelector("input#pwd-confirm");
    const alertEle = document.querySelector(".signup-container .alerts");

    document.querySelector("body").style.backgroundColor = "#083150";

    function loginAlert(text) {
      document.querySelector(
        ".signup-container form input#email"
      ).style.marginTop = "3.05vh";

      alertEle.style.backgroundColor = "#FFCCCC";
      alertEle.innerHTML = `${text}`;

      setTimeout(() => (alertEle.style.backgroundColor = "transparent"), 1000);
    }

    signupForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const email = emailInput.value;
      const pwd = pwdInput.value;
      const pwdCnfrm = pwdCnfrmInput.value;

      if (!EmailValidator.validate(email))
        return loginAlert("Invalid Email Provided");

      if (pwd.length < 7)
        return loginAlert("Password needs to be at least 7 characters");

      if (pwd === pwd.toLowerCase())
        return loginAlert(
          "Password needs to have lowercase and upper case characters"
        );

      if (pwd === pwd.toUpperCase())
        return loginAlert(
          "Password needs to have lowercase and upper case characters"
        );

      if (pwd !== pwdCnfrm) return loginAlert("Passwords do not match");

      fetch("https://ChatNap-Backend.millionxsam.repl.co/api/dbget", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: "accounts",
        }),
      })
        .then((res) => res.json())
        .then((accounts) => {
          const token =
            uuidv4() +
            "-" +
            Date.now() +
            "-" +
            Math.floor(Math.random() * 100000000000) +
            100000000;

          accounts.push({
            email,
            pwd,
            token,
          });

          console.log(accounts);
        });
    });
  };

  return (
    <>
      <div className="signup-container">
        <h1 className="login-title">ChatNap</h1>
        <form>
          <h1>Create Account</h1>
          <p className="alerts"></p>
          <input placeholder="Email" type="email" id="email" />
          <input placeholder="Password" type="password" id="pwd" />
          <input
            placeholder="Confirm Password"
            type="password"
            id="pwd-confirm"
          />
          <Link to="/login">Log In</Link>
          <button type="submit" className="login-btn">
            Next
          </button>
        </form>
      </div>
    </>
  );
}
