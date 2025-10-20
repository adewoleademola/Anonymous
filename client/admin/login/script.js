document.getElementById("loginForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    const payload = {
        email,
        password
    };

    try {
        const response = await fetch("http://192.168.0.100:5000/api/admin/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            const errorData = await response.json();
            alert("Login failed: " + errorData.message);
            return;
        }

        const resp = await response.json();
        const data = resp.data;
        console.log(data);
        localStorage.setItem("admin", JSON.stringify(data));

        // Redirect or perform further actions
        window.location.href = "../index.html";
    } catch (error) {
        console.error("Error:", error);
        alert("Something went wrong. Please try again.");
    }
});
