import { Route, Routes, Link } from "react-router-dom";
import Home from "./Home";
import Following from "./Following.js";
import Chats from "./Chats.js";
import "../media/css/all.css";
import Profile from "./Profile";
import "../index.css";

function App() {
  const dbLists = ["accounts", "posts"];

  dbLists.forEach((list) => {
    return fetch("https://ChatNap-Backend.millionxsam.repl.co/api/dbget", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: list,
      }),
    })
      .then((res) => res.json())
      .then((exists) => {
        if (!exists) {
          console.log(exists);
          fetch("https://ChatNap-Backend.millionxsam.repl.co/api/dbset", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id: `${list}`,
              value: JSON.stringify([]),
            }),
          });
        }
      });
  });

  const loggedToken = localStorage.getItem("token");
  if (
    !loggedToken ||
    window.location.pathname === "/login" ||
    window.location.pathname === "/signup"
  ) {
    if (
      window.location.pathname !== "/login" &&
      window.location.pathname !== "/signup"
    )
      window.location.pathname = "/login";

    return;
  } else {
    return (
      <>
        <div className="sidebar">
          <div className="logo">
            <Link to="/">ChatNap</Link>
          </div>
          <ul>
            <Link to="/">
              <li>Home</li>
            </Link>
            <Link to="/">
              <li>Profile</li>
            </Link>
            <Link to="/following">
              <li>Following</li>
            </Link>
            <Link to="/chats">
              <li>Chats</li>
            </Link>
          </ul>
        </div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/following" element={<Following />} />
          <Route path="/chats" element={<Chats />} />
          <Route path="/@:tag" element={<Profile />} />
        </Routes>
        <div className="communities">
          <div>Communities</div>
          <h2>Coming Soon!</h2>
        </div>
      </>
    );
  }
}

export default App;
