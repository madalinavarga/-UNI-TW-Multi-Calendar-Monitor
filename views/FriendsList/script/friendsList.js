// Functie de pe: https://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid
function uuidv4() {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );
}

async function LoginWithTwitter() {
  const parameters = new URLSearchParams({
    oauth_callback: "http://localhost:4000/login/twitter",
    oauth_consumer_key: "QU1abW9IRTNLSnRYYVdIVkdvWDU6MTpjaQ",
    oauth_nonce: uuidv4(),
    oauth_signature_method: "HMAC-SHA1",
    oauth_timestamp: Math.floor(Date.now() / 1000),
    oauth_version: "1.0",
  })

  const reponse = await fetch(
    "https://api.twitter.com/twitter/oauth/request_token",
    {
      method: "POST",
      headers: new Headers({
        'Authorization': `OAuth oauth_consumer_key="QU1abW9IRTNLSnRYYVdIVkdvWDU6MTpjaQ", oauth_nonce="${uuidv4()}", oauth_signature_method="HMAC-SHA1", oauth_timestamp="${Math.floor(Date.now() / 1000)}", oauth_version="1.0"`, 
    }), 
    }
  );
  const data = response.json();
  console.log(response, data);
}

LoginWithTwitter();
