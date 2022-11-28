
module.exports = {
    client: 'mysql',
    connection: {
        host: process.env.SQL_HOST || 'localhost',
        user: process.env.SQL_USER || 'root',
        password: process.env.SQL_PASSWORD || 'root',
        database: process.env.SQL_DATABASE || 'ecommerce'
    }
}