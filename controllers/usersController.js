const { getConnectionDB } = require('../model')

async function getAllUsers(req, res) {
    const connection = await getConnectionDB();
    const result = await connection.execute(`select * from users`, []);
    res.write(result.rows.toString());
}

module.exports = {
    getAllUsers
}