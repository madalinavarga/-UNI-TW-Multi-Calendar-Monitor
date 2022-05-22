function getGoogleAuthURL() {
  const rootUrl = 'https://accounts.google.com/o/oauth2/v2/auth';
  const options = {
    redirect_uri: `http://localhost:4000`,
    client_id: "1098497934240-41hpe6qpi67seng5ln8ees5e8re6abs4.apps.googleusercontent.com",
    access_type: 'offline',
    response_type: 'code',
    prompt: 'consent',
    scope: [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email',
    ].join(' '),
  };

  return `${rootUrl}?${new URLSearchParams(options)}`;
}

module.exports = {
  getGoogleAuthURL
}