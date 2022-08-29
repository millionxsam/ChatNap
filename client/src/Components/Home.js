export default function Home() {
  return (
    <>
      <div className="main-box">
        <h1>Home</h1>
        <div className="post-box">
          <img src="/chatnap-logo.png" alt="" />
          <div className="post-container">
            <div className="post-text-box">
              <textarea
                placeholder="Post Something..."
                cols="30"
                rows="10"
                className="post-text"
              ></textarea>
            </div>
            <div className="post-btns">
              <div className="comments">
                <input id="comments" type="checkbox" />
                <label htmlFor="comments">Comments</label>
              </div>
              <button>Post</button>
            </div>
          </div>
        </div>
        <div className="recent"></div>
      </div>
    </>
  );
}
