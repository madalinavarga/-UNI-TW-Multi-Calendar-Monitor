const fs = require("fs");
const jwt = require("jsonwebtoken");
const { userModel } = require("../model/user");
const bcrypt = require("bcrypt");

//GET
function getViewHTML(req, res) {
  res.write(fs.readFileSync("./views/Login/login.html"));
}

//POST
async function loginUser(req, res) {
  return new Promise((resolve) => {
    let body = "";

    req.on("data", function (data) {
      body += data;
    });

    req.on("end", async function () {
      try {
        const data = JSON.parse(body);
        const user = await userModel.findOne(
          { email: data.email },
          "firstName lastName password email role"
        );
        if (user != null) {
          if (await bcrypt.compare(data.password, user.password)) {
            const token = jwt.sign({ user }, "student");
            /*
            res.setHeader("Content-Type", "application/json");
            res.writeHead(200, {
              "Set-Cookie": `token=${token}; HttpOnly`,*/
            res.writeHead(302, {
              Location: `/`,
              "Set-Cookie": `token=${token}; HttpOnly; path=/`,
            });

            res.end();
            return;
          }
        }
        res.writeHead(400);
      } catch (error) {
        console.log(error);
        res.writeHead(500);
      } finally {
        resolve(); //continue, no more await
      }
    });
  });
}

async function loginUserWithGoogle(req, res) {
  const queryParams = {
    code: new URLSearchParams(req.params).get("code"),
    client_id:
      "1098497934240-41hpe6qpi67seng5ln8ees5e8re6abs4.apps.googleusercontent.com",
    client_secret: "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",
    redirect_uri: "http://localhost:4000/login/google",
    grant_type: "authorization_code",
  };

  const response = await fetch(
    "https://oauth2.googleapis.com/token?" + new URLSearchParams(queryParams),
    {
      method: "POST",
    }
  );

  const data = await response.json();
  const userData = JSON.parse(atob(data.id_token.split(".")[1]));

  const user = await userModel.findOne({ email: userData.email });
  if (!user) {
    res.writeHead(302, {
      Location: `/login?failed=true`,
    });
    return;
  }
  /*
  const token = jwt.sign({ user }, "student");
  res.writeHead(302, {
    Location: `/`,
    "Set-Cookie": `token=${token}; HttpOnly; path=/`,
  });
  */
}

async function loginUserWithTwitter(req, res) {
  // if redirect from twitter,redirect back to friends list with twitter id as cookie
  if (req.params) {
    const response = await fetch(
      `https://api.twitter.com/oauth/access_token?${req.params}`,
      {
        method: "POST",
      }
    );
    const data = await response.text();
    const params = new URLSearchParams(data);
    const twittername = params.get("screen_name");
    const user = await userModel.findOneAndUpdate(
      { email: req.email },
      { twitterName: twittername }
    );

    res.writeHead(302, {
      Location: `/friendsList`,
      "Set-Cookie": `twitterId=${params.get("user_id")}; path=/`,
    });
  }
  // if not redirect from twitter, go to twitter login first
  else {
    const response = await fetch(
      "https://twitter.com/oauth/request_token?oauth_consumer_key=D8ALg4MyQluL8bZLoh1MAeU4b&oauth_signature_method=HMAC-SHA1&oauth_timestamp=1655488547&oauth_nonce=dR8xrS&oauth_version=1.0A&oauth_callback=http%253A%252F%252Flocalhost%253A4000%252Flogin%252Ftwitter&oauth_signature=l3tcoOxMLRXMvgogxLFClea%2Fik8%3D&oauth_consumer_key=D8ALg4MyQluL8bZLoh1MAeU4b&oauth_signature_method=HMAC-SHA1&oauth_timestamp=1655498624&oauth_nonce=dR8xrS&oauth_version=1.0A&oauth_callback=http%253A%252F%252Flocalhost%253A4000%252Flogin%252Ftwitter&oauth_signature=%2BdDu7veF57mu5G5HgQGJ%2BqXVr7k%3D"
    );
    const token = await response.text();
    res.writeHead(302, {
      Location: `https://api.twitter.com/oauth/authenticate?${token}`,
    });
  }
}

async function loginUserWithReddit(req, res) {
  if (req.params) {
    //get the access token for user
    const code = new URLSearchParams(req.params).get("code");
    const encodedHeader = Buffer.from(
      "cOHrhdlitvRtDiNlVNhwcA:1qvAAVSVtbP-_iyDCHqM65M6dTjdxQ"
    ).toString("base64");
    let response = await fetch("https://www.reddit.com/api/v1/access_token", {
      method: "POST",
      body: `grant_type=authorization_code&code=${code}&redirect_uri=http://localhost:4000/login/reddit`,
      headers: {
        authorization: `Basic ${encodedHeader}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    let body = await response.json();
    console.log(body);
    //get user information
    response = await fetch(`https://oauth.reddit.com/api/v1/me/friends`, {
      method: "GET",
      headers: { authorization: `bearer ${body.access_token}` },
    });
    let user = await response.json();
    console.log(user);
  } else {
    const rootUrl = "https://www.reddit.com/api/v1/authorize";
    const queryParams = {
      client_id: "cOHrhdlitvRtDiNlVNhwcA",
      response_type: "code",
      state: "hello",
      redirect_uri: "http://localhost:4000/login/reddit",
      duration: "permanent",
      scope: `identity,mysubreddits,read,rss support, friends\\`,
    };
    res.writeHead(302, {
      Location: `${rootUrl}?${new URLSearchParams(queryParams)}`,
    });
  }

  // if (req.params) {
  //
  //   await fetch("https://www.reddit.com/api/v1/acces_token", {
  //     method: "POST",
  //     body: `grant_type=authorization_code&code=${code}&redirect_uri=http://localhost:4000/login/reddit`,
  //     headers: {
  //       authorization: `Basic ${encodedHeader}`,
  //       "Content-Type": "application/x-www-form-urlencoded",
  //     },
  //   })
  //     .then((response) => {
  //       return response.json();
  //     })
  //     .then((data) => console.log(data));
  // console.log(body);
  // response = await fetch("https://oauth.reddit.com/api/v1/me", {
  //   method: "GET",
  //   header : {authorization: `bearer ${body.access_token}`}
  // });
  // }
}

module.exports = {
  getViewHTML,
  loginUser,
  loginUserWithGoogle,
  loginUserWithTwitter,
  loginUserWithReddit,
};
