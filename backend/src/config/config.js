//Make sure this is consistent with the secrets passed into the mariadb container in db/secrets
module.exports = {
    port: 8080,
    db: {
        username: 'awesomeuser',
        password: 'password',
        database: 'bujufixdb',
        options: {
            dialect: 'mysql',
            dialectOptions: {
                socketPath: '/database/run/mysqld/mysqld.sock'
            }
        }
    }
}




