import { Route, Routes, Link } from "react-router-dom";
import Home from "./Home";
import "../index.css";
import Following from "./Following.js";
import Chats from "./Chats.js";
import "../media/css/all.css";
import Profile from "./Profile";

function App() {
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

export default App;
