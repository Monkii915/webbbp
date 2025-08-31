const mariadb = require('mariadb');
const pool = mariadb.createPool({
    host: 'localhost',
    user: 'admin',
    password: 'adminpass',
    database: 'web'
});

module.exports = {
    connect: async () => {
        try {
            await pool.getConnection();
            console.log('Connected to MariaDB');
        } catch (err) {
            console.error('MariaDB connection error:', err);
        }
    },
    getUser: async (username, password) => {
        let conn;
        try {
            conn = await pool.getConnection();
            const rows = await conn.query(
                'SELECT username, role FROM users WHERE username=? AND password=?',
                [username, password]
            );
            return rows[0] || null;
        } catch (err) {
            console.error('getUser error:', err);
            return null;
        } finally {
            if (conn) conn.release();
        }
    },
    logAccess: async (username, ip) => {
        let conn;
        try {
            console.log(`Intentando loguear acceso: ${username}, IP: ${ip}`);
            conn = await pool.getConnection();
            const result = await conn.query(
                'INSERT INTO access_logs (username, ip) VALUES (?, ?)',
                [username, ip]
            );
            console.log('Resultado de la inserción:', result);
            console.log(`Access logged for ${username} from ${ip}`);
        } catch (err) {
            console.error('logAccess error:', err);
        } finally {
            if (conn) conn.release();
        }
    }
};