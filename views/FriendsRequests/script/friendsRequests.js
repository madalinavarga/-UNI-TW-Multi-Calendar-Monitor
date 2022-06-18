onInit()

function onInit(){
    fetch("/userFriendsRequests", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        }.then((response) => {
            return response.json();
          })
          .then((users) => {
      
            for (i = 0; i < users.length; i++) {
                createRequest(i, users[i]);
            }
          })
      })
}

function createRequest(i,user){
    
}