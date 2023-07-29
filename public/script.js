
//const apiUrl = 'https://crud-api-example.onrender.com/api/users';
//const apiUrl = 'http://localhost:3001/api/users';

// const apiUrl = 'https://javascript-test.onrender.com/api/users';
//const apiUrl = 'https://crud-api-example.vercel.app/api/users';
const apiUrl = 'http://localhost:3001/api/users';

// Function สำหรับเรียก API และแสดงผลข้อมูลในหน้าเว็บ
function getUsers() {
    fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
            const userList = document.getElementById('userList');
            userList.innerHTML = '';
            data.forEach((user) => {
                const listItem = document.createElement('li');
                listItem.textContent = `${user.id}: ${user.name}`;
                userList.appendChild(listItem);
            });
        })
        .catch((error) => console.error('Error fetching users:', error));
}

// Function สำหรับสร้างผู้ใช้งานใหม่
function createUser(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name }),
        })
        .then((response) => response.json())
        .then(() => {
            getUsers(); // เมื่อสร้างผู้ใช้งานเสร็จให้โหลดข้อมูลใหม่
            document.getElementById('createUserForm').reset();
        })
        .catch((error) => console.error('Error creating user:', error));
}

// Function สำหรับอัปเดตชื่อผู้ใช้งาน
function updateUser(event) {
    event.preventDefault();
    const userId = document.getElementById('userId').value;
    const updatedName = document.getElementById('updatedName').value;
    fetch(`${apiUrl}/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: updatedName }),
        })
        .then((response) => response.json())
        .then(() => {
            getUsers(); // เมื่ออัปเดตชื่อผู้ใช้งานเสร็จให้โหลดข้อมูลใหม่
            document.getElementById('updateUserForm').reset();
        })
        .catch((error) => console.error('Error updating user:', error));
}

// Function สำหรับลบผู้ใช้งาน
function deleteUser(event) {
    event.preventDefault();
    const deleteUserId = document.getElementById('deleteUserId').value;
    fetch(`${apiUrl}/${deleteUserId}`, {
            method: 'DELETE',
        })
        .then((response) => response.json())
        .then(() => {
            getUsers(); // เมื่อลบผู้ใช้งานเสร็จให้โหลดข้อมูลใหม่
            document.getElementById('deleteUserForm').reset();
        })
        .catch((error) => console.error('Error deleting user:', error));
}

document.getElementById('createUserForm').addEventListener('submit', createUser);
document.getElementById('updateUserForm').addEventListener('submit', updateUser);
document.getElementById('deleteUserForm').addEventListener('submit', deleteUser);

// เมื่อโหลดหน้าเว็บให้โหลดข้อมูลผู้ใช้งาน
getUsers();

