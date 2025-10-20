document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('complaintForm');
    const socket = io('http://192.168.0.100:5000');

    form.addEventListener('submit', async function (event) {
        event.preventDefault(); // Prevent default form submission

        const formData = {
            matricNumber: form.elements[0].value.trim(),
            category: form.elements[1].value.trim(),
            subject: form.elements[2].value.trim(),
            description: form.elements[3].value.trim(),
            location: form.elements[4].value.trim(),
            date: form.elements[5].value
        };

        try {
            const response = await fetch('http://192.168.0.100:5000/api/messages/send-message', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                socket.emit('send_message', formData);
                alert('Complaint submitted successfully!');
                form.reset();
            } else {
                alert('Failed to submit complaint. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again later.' + error);
        }
    });
});
