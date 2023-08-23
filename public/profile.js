// This script will run when you're on viewing a profile (/@tag)
fetch("db/all")
  .then((res) => res.json())
  .then((entries) => {
    const tag = window.location.pathname.split("@")[1];
    const accounts = entries.filter((e) => e.id.startsWith("account-"));

    let a = accounts.find((acc) => JSON.parse(acc.value).tag === tag);

    const account = a ? JSON.parse(a.value) : undefined;
    const profileHead = document.querySelector(".profile .profileHead");

    if (!account) return (window.location = "/");

    profileHead.querySelector(".user .info h2").innerHTML = account.username;
    profileHead.querySelector(".user .info p").innerHTML = "@" + account.tag;
    profileHead.querySelector(".user .info p#followers").innerHTML =
      (account.followers ? account.followers.length : 0) + " Followers";
  });
