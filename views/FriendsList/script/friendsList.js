const cookies = document.cookie.split(";");

let twitterId = cookies.find((cookie) => cookie.includes("twitterId"));
if (!twitterId) {
  window.location.href = "/login/twitter";
}