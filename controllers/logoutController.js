function logout(req, res) {
  res.writeHead(302, {
    Location: `/`,
    "Set-Cookie": `token=123; HttpOnly; path=/; expires=01-Jan-1970 00:00:01 GMT;`,
  });
}

module.exports = {
  logout: logout,
};
