const express = require('express');
const app = express();

require('dotenv').config();

const PORT = process.env.PORT || 3000;
const email_pass = process.env.EMAIL_PASS

app.get('/', (req, res) => {
    res.send(`Hello, your password is ${email_pass}!`);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});