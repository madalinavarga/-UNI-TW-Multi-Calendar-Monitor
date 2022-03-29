const oracledb = require('oracledb');

async function run() {

    let connection;

    try {

        connection = await oracledb.getConnection({ user: "student", password: "STUDENT", connectionString: "localhost" });

        console.log("Successfully connected to Oracle Database");
        const result = await connection.execute(`SELECT nume from studenti where id>29`);
        console.log(result);

    } catch (err) {
        console.error(err);
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (err) {
                console.error(err);
            }
        }
    }
}

run();