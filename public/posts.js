// This script deals with everything about posts
fetch("/db/all")
  .then((res) => res.json())
  .then((entries) => {
    const accounts = entries.filter((e) => e.id.startsWith("account-"));
    let a = accounts.find((acc) => JSON.parse(acc.value).token === token);
    const account = a ? JSON.parse(a.value) : undefined;

    const postBtn = document.querySelector("button#postbtn");
    const postTxt = document.querySelector("textarea#posttxt");
    const commentSelect = document.querySelector("#comments");
    const selectedComment = document.querySelector("#comments #selected");
    const commentDialog = document.querySelector("#comments dialog");
    const commentOptions = document.querySelectorAll(
      "#comments dialog .option"
    );

    if (postBtn) {
      commentSelect.value = "enabled";

      commentSelect.addEventListener("click", () => {
        commentDialog.toggleAttribute("hidden");
      });

      commentOptions.forEach((op) => {
        op.addEventListener("click", () => {
          const value = op.getAttribute("data-value");
          commentSelect.value = value;

          selectedComment.querySelector("i.fa-solid").classList =
            op.querySelector("i.fa-solid").classList;

          selectedComment.querySelector("div").innerHTML =
            op.querySelector("div").innerHTML;
        });
      });

      postBtn.addEventListener("click", (e) => {
        fetch("/db/all")
          .then((res) => res.json())
          .then((entries) => {
            const accounts = entries.filter((e) => e.id.startsWith("account-"));
            let a = accounts.find((a) => JSON.parse(a.value).token === token);
            const account = a ? JSON.parse(a.value) : undefined;
            if (!account) return (window.location = "/login");

            let content = postTxt.value;
            if (!content) return;

            let commentable = commentSelect.value;
            if (!commentable) return;

            const post = {
              content,
              author: account.tag,
              likes: [],
              commentable,
              comments: [],
              id: `${Date.now() * Math.floor(Math.random() * 1000)}`,
            };

            fetch(`/db/set/post-${post.id}/${JSON.stringify(post)}`);

            postTxt.value = "";
            e.target.style.backgroundColor = "var(--success)";

            setTimeout(() => (window.location = `/@${account.tag}`), 1000);
          });
      });
    }

    const postsContainer = document.querySelector(".postsContainer");
    let p = [];

    if (window.location.pathname.startsWith("/post/")) {
      let id = window.location.pathname.split("/");
      id = id[id.length - 1];

      p.push(
        JSON.parse(entries.find((e) => e.id === `post-${id}`).value) || null
      );
    }

    const tag = window.location.pathname.split("@")[1];
    const posts = window.location.pathname.startsWith("/@")
      ? entries
          .filter(
            (e) =>
              e.id.startsWith("post-") && JSON.parse(e.value).author === tag
          )
          .map((e) => JSON.parse(e.value))
          .reverse()
      : window.location.pathname.startsWith("/post/")
      ? p
      : [];

    posts.forEach((post) => {
      let user = JSON.parse(
        accounts.find((acc) => JSON.parse(acc.value).tag === post.author).value
      );

      postsContainer.innerHTML += `
<div class="post">
  <div class="left">
    <img src="/chatnap-logo.png" alt="" />
  </div>
  <div class="right">
    <h2>${user.username}</h2>
    <p${
      window.location.pathname.startsWith("/post/")
        ? ""
        : ` onClick="window.location = '/post/${post.id}'" style = "cursor: pointer"`
    }>${post.content}</p>
    <div class="info">
      <div title="Like" id="like" onClick="likePost('${post.id}')">
        <i class="fa-sharp fa-regular fa-heart" id="heart"></i>
        <label for="heart">${post.likes.length}</label>
      </div>
      <div title="Comment" id="comment">
        <i class="fa-sharp fa-regular fa-comment" id="comment"></i>
        <label for="comment">${post.comments.length}</label>
      </div>
      <div onClick="sharePost('${post.id}', this)" title="Copy link" id="share">
        <i
          class="fa-regular fa-share-from-square"
        >
          <dialog>Post URL copied</dialog>
        </i>
      </div>
    </div>
  </div>
</div>`;
    });
  });

function likePost(id) {
  fetch("/db/all")
    .then((res) => res.json())
    .then((entries) => {
      const accounts = entries.filter((e) => e.id.startsWith("account-"));
      let a = accounts.find((acc) => JSON.parse(acc.value).token === token);
      const account = a ? JSON.parse(a.value) : undefined;
      const post = JSON.parse(entries.find((p) => p.id === `post-${id}`).value);
      const likesEle = document.querySelector("#like label");

      if (post.likes.includes(account.id)) {
        post.likes = post.likes.filter((l) => l !== account.id);
        likesEle.innerHTML = post.likes.length;
      } else {
        post.likes.push(account.id);
        likesEle.innerHTML = post.likes.length;
      }

      fetch(`db/set/post-${id}/${JSON.stringify(post)}`);

      document.getElementById("heart").classList.toggle("fa-sharp");
      document.getElementById("heart").classList.toggle("fa-solid");
    });
}

function sharePost(id, target) {
  navigator.clipboard.writeText(`/post/${id}`);

  target = target.querySelector("i");
  target.style.color = "var(--success)";

  const dialog = target.querySelector("dialog");
  dialog.show();
}
