const oracledb = require('oracledb');

async function run() {

    let connection;
    try {

        connection = await oracledb.getConnection({ user: "student", password: "STUDENT", connectionString: "localhost" });
        console.log("Successfully connected to Oracle Database");
        const command_users = `BEGIN
        EXECUTE IMMEDIATE 'CREATE TABLE users
        (id NUMBER,
        firstName VARCHAR(20) NOT NULL,
        lastName VARCHAR(20) NOT NULL,
        email VARCHAR(50) NOT NULL,
        role NUMBER NOT NULL,
        CONSTRAINT users_pk PRIMARY KEY (id)
        )';
        exception when others then
          if SQLCODE = -955 then null; else raise; end if;
      END;`;
        const friends_command = `BEGIN
        EXECUTE IMMEDIATE 'CREATE TABLE friendship
        (user_id NUMBER , 
        friend_id NUMBER ,
        start_friendship date NOT NULL, 
        CONSTRAINT friends_pk PRIMARY KEY ( user_id,friend_id ),
        CONSTRAINT friends_fk_user FOREIGN KEY (user_id) REFERENCES users(id),
        CONSTRAINT friends_fk_friend FOREIGN KEY (friend_id) REFERENCES users(id)
        ) ';
        exception when others then if SQLCODE = -955 then null; else raise; end if;
        END;`
        connection.execute(command_users);
        connection.execute(friends_command);

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