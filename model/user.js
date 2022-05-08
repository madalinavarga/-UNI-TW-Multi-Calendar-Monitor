const bcrypt = require('bcrypt');
const { reset } = require('nodemon');

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
    if (existingEmail(!user.email)) console.log("nu exista")
    const getIdResponse = await connection.execute(`select max(id) from users`, []);
    const maxId = parseInt(getIdResponse.rows.toString() || "0") + 1;

    console.log(maxId, user)
    const encryptedPassword = await bcrypt.hash(user.password, 10);
    const createResponse = await connection.execute(
        "insert into users values(:0, :1, :2, :3, :4, :5)", [maxId, user.firstName, user.lastName, user.email, encryptedPassword, 1], { autoCommit: true }
    );

    console.log(createResponse.rows, createResponse.rowsAffected)
}

async function existingEmail(email) {
    const connection = await getConnectionDB();
    const selectResponse = await connection.execute(
        "select count(*) from users where email='" + email + "'", []
    );
    console.log(selectResponse.rows[0][0])
    if (selectResponse.rows[0][0] > 0)
        return true;
    return false;
}

async function findUserByEmail(email) {
    const connection = await getConnectionDB();
    const selectResponse = await connection.execute(
        "select firstName,lastName,email from users where email='" + email + "'", []
    );
    console.log(selectResponse.rows[0])
    const user = new UserResponse(...selectResponse.rows[0]);
    console.log(user)
    return user;
}

async function checkUser(email, password) {
    const connection = await getConnectionDB();
    const selectResponse = await connection.execute(
        "select password from users where email='" + email + "'", []
    );
    if (selectResponse.rows != "")
        if (await bcrypt.compare(password, selectResponse.rows[0][0])) {
            return true;
            //fac User Model 
            //get userByEmail
            //jwt => criptare si trimitere 
        }
    return false;
}


module.exports = {
    UserRequest,
    UserResponse,
    createUser,
    checkUser,
    findUserByEmail
}