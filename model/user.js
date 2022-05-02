const bcrypt = require('bcrypt')

const { getConnectionDB } = require("./index")

class UserRequest {
    constructor(firstName, lastName, email, password) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
    }
}

class UserResponse {
    constructor(firstName, lastName, email) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
    }
}

async function createUser(user) {
    const connection = await getConnectionDB();

    const getIdResponse = await connection.execute(`select max(id) from users`, []);
    const maxId = parseInt(getIdResponse.rows.toString() || "0") + 1;

    console.log(maxId, user)
    const encryptedPassword = await bcrypt.hash(user.password, 10);
    const createResponse = await connection.execute(
        `insert into users values(:0, :1, :2, :3, :4, :5)`, [maxId, user.firstName, user.lastName, user.email, encryptedPassword, 1], { autoCommit: true }
    );

    console.log(createResponse.rows, createResponse.rowsAffected)
}


module.exports = {
    UserRequest,
    UserResponse,
    createUser
}