import { useParams } from "react-router-dom";

export default function Profile() {
  const { tag } = useParams();
  return (
    <>
      <div className="main-box">
        <div className="profile-container">
          <img src="/chatnap-logo.png" alt="" />
          <h1 className="profile-name">
            {tag}
            <p>Bio</p>
          </h1>
        </div>
        <div className="posts-container"></div>
      </div>
    </>
  );
}
