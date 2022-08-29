export default function Chats() {
  return (
    <>
      <div className="main-box">
        <h1>Chats</h1>
        <ul className="list">
          <li>
            <img src="/chatnap-logo.png" alt="" />
            <div>
              <h2>Name</h2>
              <p>Bio</p>
            </div>
            <button className="remove-chat">
              <i class="fa-solid fa-x"></i>
            </button>
          </li>
        </ul>
      </div>
    </>
  );
}
