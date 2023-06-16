import sql from 'mssql';
import config from '../db/config.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const loginRequired = (req, res, next) => {
    if (req.user) {
        next();
    } else {
        return res.status(401).json({ message: 'Unauthorized user!' });
    }
};


export const register = async (req, res) => {
    const { userName, email, password} = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);

    try {
        let pool = await sql.connect(config.sql);
        const result = await pool.request()
            .input('userName', sql.VarChar, userName)
            .query('SELECT * FROM users WHERE userName = @userName');
        
        const user = result.recordset[0];
        if (user) {
            res.status(409).json({ error: 'User already exists' });
        } else {
            await pool.request()
                .input('userName', sql.VarChar, userName)
                .input('hashedpassword', sql.VarChar, hashedPassword)
                .input('email', sql.VarChar, email)
              
                .query('INSERT INTO users ( userName, email, password) VALUES (@userName, @email, @hashedpassword)');
            res.status(200).send({ message: 'User created successfully' });
        }

    } catch (error) {

        res.status(500).json({ error: 'An error occurred while creating the user' });
    } finally {

        sql.close();
    }

};

export const login = async (req, res) => {
    const { userName, password } = req.body;
    let pool = await sql.connect(config.sql);

    const result = await pool.request()
        .input('userName', sql.VarChar, userName)
        .query('SELECT * FROM users WHERE userName = @userName');

    const user = result.recordset[0];
  
    if (!user) {

        res.status(401).json({ error: 'Authentication failed. Wrong credentials.' });
    } 
    else {

        if (!bcrypt.compareSync(password, user.password)) {

            res.status(401).json({ error: 'Authentication failed. Wrong credentials.' });
        } else {

            const token = `JWT ${jwt.sign({ userName: user.userName, mail: user.email }, config.jwt_secret)}`;
            res.status(200).json({ mail: user.email, userName: user.userName, id: user.userid, token: token });
        }
    }
};