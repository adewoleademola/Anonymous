document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('form');

    form.addEventListener('submit', async function (event) {
        event.preventDefault(); // Prevent page reload

        // Capture input values
        const firstName = form.elements[0].value.trim();
        const lastName = form.elements[1].value.trim();
        const mobile = form.elements[2].value.trim();
        const email = form.elements[3].value.trim();
        const password = form.elements[4].value;
        const confirmPassword = form.elements[5].value;

        // Basic validation
        if (!firstName || !lastName || !email || !password || !mobile) {
            alert('Please fill in all required fields.');
            return;
        }

        if (password !== confirmPassword) {
            alert('Passwords do not match.');
            return;
        }

        const payload = {
            firstName,
            lastName,
            email,
            password,
            mobile
        };

        try {
            const response = await fetch('http://192.168.0.100:5000/api/admin/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            const result = await response.json();

            if (response.ok) {
                alert('Registration successful!');
                form.reset();
                window.location.href = "../login/index.html";
                // Redirect or additional logic can go here
            } else {
                alert(`Error: ${result.message || 'Something went wrong.'}`);
            }
        } catch (error) {
            console.error('Request failed:', error);
            alert('Failed to connect to server. Please try again later.');
        }
    });
});
