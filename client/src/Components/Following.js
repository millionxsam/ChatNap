export default function Following() {
  return (
    <>
      <div className="main-box">
        <h1>Following</h1>
        <ul className="list">
          <li>
            <img src="/chatnap-logo.png" alt="" />
            <div>
              <h2>Name</h2>
              <p>Bio</p>
            </div>
            <button>Unfollow</button>
          </li>
        </ul>
      </div>
    </>
  );
}
