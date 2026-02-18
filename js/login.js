document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login_container');
    const inputs = loginForm.querySelectorAll('input');
    const API_BASE_URL = 'https://life-givers-backend.vercel.app';

    // Helper function to display error messages below the input field
    const showError = (inputId, message) => {
        const errorSpan = document.getElementById(`${inputId}-error`);
        const input = document.getElementById(inputId);
        if (errorSpan) {
            errorSpan.textContent = message;
            input.classList.add('invalid');
        }
    };

    const clearError = (inputId) => {
        const errorSpan = document.getElementById(`${inputId}-error`);
        const input = document.getElementById(inputId);
        if (errorSpan) {
            errorSpan.textContent = '';
            input.classList.remove('invalid');
        }
    };

    // Validate individual input fields (Phone: 10 digits, Password: required)
    const validateField = (input) => {
        const id = input.id;
        const value = input.value.trim();
        let isValid = true;

        clearError(id);

        if (!value) {
            showError(id, `${input.previousElementSibling.textContent.replace(':', '')} is required`);
            isValid = false;
        } else if (id === 'phonenumber' && !/^\d{10}$/.test(value)) {
            showError(id, 'Enter a valid 10-digit phone number');
            isValid = false;
        }

        return isValid;
    };

    inputs.forEach(input => {
        input.addEventListener('input', () => validateField(input));
        input.addEventListener('blur', () => validateField(input));
    });

    // Handle Logic Form Submission
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        let isFormValid = true;
        inputs.forEach(input => {
            if (!validateField(input)) {
                isFormValid = false;
            }
        });

        if (!isFormValid) return;

        const phone = document.getElementById('phonenumber').value;
        const password = document.getElementById('password').value;

        const loginData = {
            phone_number: phone,
            password: password
        };

        const submitBtn = loginForm.querySelector('.login_btn');
        const originalBtnText = submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.textContent = 'Logging In...';

        try {
            // Send Login credentials to the Backend API
            const response = await fetch(`${API_BASE_URL}/users/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginData)
            });

            const result = await response.json();

            if (response.ok) {
                alert("Login Successful! Welcome " + result.fullname);

                // Store User Details in LocalStorage for session management
                localStorage.setItem('access_token', result.access_token);
                localStorage.setItem('user_id', result.user_id);
                localStorage.setItem('fullname', result.fullname);

                // Store Role to handle permissions (Admin vs User)
                localStorage.setItem('role', result.role);

                // Redirect based on User Role
                if (result.role === "admin") {
                    window.location.href = './dashboard.html';
                } else {
                    window.location.href = '../index.html';
                }
            } else {
                alert("Login Failed: " + (result.detail || "Invalid credentials"));
            }
        } catch (error) {
            console.error("Error during login:", error);
            alert("An error occurred. Please make sure the backend server is running.");
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = originalBtnText;
        }
    });
});
