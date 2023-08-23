const loginBtn = document.querySelector(".login-container button#login");
const SignupBtn = document.querySelector(".login-container button#signup");
const emailEle = document.querySelector(".login-container #email");
const pwEle = document.querySelector(".login-container #pw");
const verPwEle = document.querySelector(".login-container #verPw");
const tagEle = document.querySelector(".login-container #tag");
const userEle = document.querySelector(".login-container #username");
const errorEle = document.querySelector(".login-container .error");

const token = localStorage.getItem("token");

fetch("/db/all")
  .then((res) => res.json())
  .then((entries) => {
    const accounts = entries.filter((e) => e.id.startsWith("account-"));
    let a = accounts.find((a) => JSON.parse(a.value).token === token);
    const account = a ? JSON.parse(a.value) : undefined;

    //Everything in here happens if you're on the login screen -->
    if (loginBtn) {
      loginBtn.addEventListener("click", () => {
        const email = emailEle.value;
        const pw = pwEle.value;

        if (!email) return loginError("You need to include an email");
        if (!pw) return loginError("You need to include a password");

        let a = accounts.find(
          (a) =>
            JSON.parse(a.value).email === email && JSON.parse(a.value).pw === pw
        );

        let acc = a ? JSON.parse(a.value) : undefined;
        if (!acc) return loginError("Your email or password is incorrect");

        localStorage.setItem("token", acc.token);
        window.location = "/";
      });
    }

    //Everything in here happens if you're on the signup screen -->
    if (SignupBtn) {
      SignupBtn.addEventListener("click", () => {
        const email = emailEle.value;
        const pw = pwEle.value;
        const verPw = verPwEle.value;
        const tag = tagEle.value;
        const username = userEle.value;

        if (!email) return loginError("You need to include an email");
        if (!pw) return loginError("You need to include a password");
        if (!verPw) return loginError("You need to confirm your password");
        if (pw !== verPw) return loginError("Passwords do not match");
        if (!tag) return loginError("You need to include a tag");
        if (!username) return loginError("You need to include a username");

        fetch("/uuid")
          .then((res) => res.text())
          .then((id) => {
            let acc = {
              email,
              pw,
              tag,
              username,
              followers: [],
            };

            acc.id = `${Date.now() * Math.floor(Math.random() * 1000)}`;

            const token = `${Date.now()}${randomInt(100, 999)}${id}${
              accounts.length
            }`;
            console.log(token);
            acc.token = token;

            fetch(`/db/set/account-${acc.tag}/${JSON.stringify(acc)}`);

            localStorage.setItem("token", acc.token);

            window.location = "/";
          });
      });
    }

    // Everything inside here happens if you're NOT on the login or signup screen -->
    if (!["/login", "/signup"].includes(window.location.pathname)) {
      const profileBtn = document.querySelector("#profilebtn");
      profileBtn.href = account ? `/@${account.tag}` : "/login";
    }
  });

// Functions -->
function loginError(text) {
  errorEle.innerHTML = text;
}

function randomInt(a, b) {
  if (a > b) {
    // Swap a and b to ensure a is smaller.
    var c = a;
    a = b;
    b = c;
  }
  return Math.floor(Math.random() * (b - a + 1) + a);
}
