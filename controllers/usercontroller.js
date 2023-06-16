import sql from 'mssql';
import config from '../db/config.js'

export const makeComment = async(req, res) =>{
    //destructuring variables  to add to the comment database table
    const { comment } = req.body;
    const { userId } = req.params;
    const {  postId } = req.body;

    try{
        let pool = await sql.connect(config.sql);
            await pool.request()
                .input('userId', sql.VarChar, userId)
                .input('comment', sql.VarChar, comment)
                .input('postId', sql.VarChar, postId)
             
                .query('INSERT INTO comments ( content, postId, userId) VALUES (@comment, @postId, @userId)');
            res.status(200).send({ message: 'Made a comment successfully' });
        

    } catch (error) {

        res.status(500).json({ error: 'An error occurred while creating the user' });
    } finally {

        sql.close();
    }

};

export const makePost = async(req, res) =>{
     //destructuring variables  to add to the database post table
     const { content } = req.body;
     const {  title } = req.body;
     const { userId } = req.params;
 
     try{
         let pool = await sql.connect(config.sql);
             await pool.request()
                 .input('userId', sql.VarChar, userId)
                 .input('content', sql.VarChar, content)
                 .input('title', sql.VarChar, title)
              
                 .query('INSERT INTO posts ( title, content, userId) VALUES (@comment, @content, @userId)');
             res.status(200).send({ message: 'Posted successfully' });
         
 
     } catch (error) {
 
         res.status(500).json({ error: 'An error occurred while making a post' });
     } finally {
 
         sql.close();
     }
 

};
