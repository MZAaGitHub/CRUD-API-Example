const express = require('express');
const fs = require('fs'); // เพิ่ม module fs เพื่อใช้ในการอ่านและเขียนไฟล์
const path = require('path');

const app = express();
const port = 3001;

app.use(express.json());
app.use(express.static(path.join(__dirname, '/public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
})

// Route สำหรับการอ่านข้อมูลทั้งหมด
app.get('/api/users', (req, res) => {
    const data = getDataFromFile(); // อ่านข้อมูลจากไฟล์ JSON
    res.json(data.users);
});

// Route สำหรับการอ่านข้อมูลตาม id
app.get('/api/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const data = getDataFromFile(); // อ่านข้อมูลจากไฟล์ JSON
    const user = data.users.find((user) => user.id === id);
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
});

// Route สำหรับการสร้างข้อมูลใหม่
app.post('/api/users', (req, res) => {
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({ message: 'Name is required' });
    }
    const data = getDataFromFile(); // อ่านข้อมูลจากไฟล์ JSON
    const id = data.users.length + 1;
    const newUser = { id, name };
    data.users.push(newUser);
    writeDataToFile(data); // เขียนข้อมูลกลับไปยังไฟล์ JSON
    res.status(201).json(newUser);
});

// Route สำหรับการอัปเดตข้อมูลตาม id
app.put('/api/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { name } = req.body;
    const data = getDataFromFile(); // อ่านข้อมูลจากไฟล์ JSON
    const user = data.users.find((user) => user.id === id);
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    user.name = name;
    writeDataToFile(data); // เขียนข้อมูลกลับไปยังไฟล์ JSON
    res.json(user);
});

// Route สำหรับการลบข้อมูลตาม id
app.delete('/api/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const data = getDataFromFile(); // อ่านข้อมูลจากไฟล์ JSON
    const userIndex = data.users.findIndex((user) => user.id === id);
    if (userIndex === -1) {
        return res.status(404).json({ message: 'User not found' });
    }
    data.users.splice(userIndex, 1);
    writeDataToFile(data); // เขียนข้อมูลกลับไปยังไฟล์ JSON
    res.json({ message: 'User deleted successfully' });
});

// ฟังก์ชันสำหรับอ่านข้อมูลจากไฟล์ JSON
function getDataFromFile() {
    const rawData = fs.readFileSync('data.json');
    return JSON.parse(rawData);
}

// ฟังก์ชันสำหรับเขียนข้อมูลกลับไปยังไฟล์ JSON
function writeDataToFile(data) {
    const jsonData = JSON.stringify(data, null, 2);
    fs.writeFileSync('data.json', jsonData);
}

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);

});




// Export the Express API
module.exports = app
