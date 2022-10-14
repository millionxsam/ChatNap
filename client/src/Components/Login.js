import "../login.css";
import { Link } from "react-router-dom";

export default function Login() {
  window.onload = () => {
    const loginForm = document.querySelector(".login-container form");
    const emailInput = document.querySelector("input#email");
    const pwdInput = document.querySelector("input#pwd");
    const alertEle = document.querySelector(".login-container .alerts");

    document.querySelector("body").style.backgroundColor = "#083150";

    function loginAlert(text) {
      document.querySelector(
        ".login-container form input#email"
      ).style.marginTop = "3.05vh";

      alertEle.style.backgroundColor = "#FFCCCC";
      alertEle.innerHTML = `${text}`;

      setTimeout(() => (alertEle.style.backgroundColor = "transparent"), 1000);
    }

    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();

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
          const account = accounts.find(
            (account) => account.email === emailInput.value
          );

          if (!account)
            return loginAlert("No account was found with that email");

          if (account.pwd !== pwdInput.value)
            return loginAlert("Incorrect Password");

          localStorage.setItem("token", account.token);
          window.location.pathname = "/";
        });
    });
  };

  return (
    <>
      <div className="login-container">
        <h1 className="login-title">ChatNap</h1>
        <form>
          <h1>Login</h1>
          <p className="alerts"></p>
          <input placeholder="Email" type="email" id="email" />
          <input placeholder="Password" type="password" id="pwd" />
          <Link to="/signup">Create Account</Link>
          <button type="submit" className="login-btn">
            Login
          </button>
        </form>
      </div>
    </>
  );
}
