// server.js
const express = require('express');
const multer = require('multer');
const path = require('path');
const mysql = require('mysql2');

const app = express();
const PORT = 3000;

// ডেটাবেস কানেকশন
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'friends_website'
});

// মিডলওয়্যার
app.use(express.json());
app.use(express.static('public'));

// ছবি আপলোড সেটআপ
const storage = multer.diskStorage({
    destination: './uploads/',
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage });

// পোস্ট তৈরি API
app.post('/api/posts', upload.single('image'), (req, res) => {
    const { name, content } = req.body;
    const imagePath = req.file ? req.file.filename : null;
    
    const sql = 'INSERT INTO posts (user_id, content, image_path) VALUES (?, ?, ?)';
    // এখানে user_id আসলে লগিন ইউজারের হতে হবে
    
    db.execute(sql, [1, content, imagePath], (err, result) => {
        if(err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json({ 
                success: true, 
                message: 'পোস্ট তৈরি হয়েছে!',
                postId: result.insertId 
            });
        }
    });
});

// পোস্ট দেখার API
app.get('/api/posts', (req, res) => {
    const sql = 'SELECT * FROM posts ORDER BY created_at DESC';
    db.execute(sql, (err, results) => {
        if(err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(results);
        }
    });
});

app.listen(PORT, () => {
    console.log(`সার্ভার চালু হয়েছে: http://localhost:${PORT}`);
});