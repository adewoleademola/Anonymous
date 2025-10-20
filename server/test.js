const axios = require('axios');

const BASE_URL = 'http://localhost:5000/api';

// async function testSendMessage() {
//     try {
//         const payload = {
//             category: 'Feedback',
//             subject: 'Library Issue',
//             description: 'The library has limited seating.',
//             location: 'Main Campus',
//             date: '2025-07-01'
//         };

//         const response = await axios.post(`${BASE_URL}/messages/send-message`, payload);
//         console.log('Send Message Response:', response.data);
//     } catch (error) {
//         console.error('Error sending message:', error.response?.data || error.message);
//     }
// }

async function testGetMessages() {
    try {
        const response = await axios.get(`${BASE_URL}/messages/all`, {
            headers: {
                adminId: 'john.doe@example.com' // Replace with a valid admin ID
            }
        });
        console.log('Get Messages Response:', response.data);
    } catch (error) {
        console.error('Error fetching messages:', error.response?.data || error.message);
    }
}

// async function createAdmin() {
//     try {
//         const payload = {
//             firstName: 'John',
//             lastName: 'Doe',
//             email: 'john.doe@example.com',
//             password: 'securepass123',
//             mobile: '1234567890'
//         };

//         const response = await axios.post(`${BASE_URL}/admin/signup`, payload);
//         console.log('Create Admin Response:', response.data);
//     } catch (error) {
//         console.error('Create Admin Error:', error.response?.data || error.message);
//     }
// }

// async function loginAdmin() {
//     try {
//         const payload = {
//             email: 'john.doe@example.com',
//             password: 'securepass123'
//         };

//         const response = await axios.post(`${BASE_URL}/signin`, payload);
//         console.log('Admin Login Response:', response.data);
//     } catch (error) {
//         console.error('Admin Login Error:', error.response?.data || error.message);
//     }
// }

// Run the tests
(async () => {
    // await testSendMessage();
    await testGetMessages();
    // await createAdmin();
    // await loginAdmin();
})();
