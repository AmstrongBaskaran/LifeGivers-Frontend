document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.querySelector('.s_container2');
    const inputs = signupForm.querySelectorAll('input');

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

    // Validate inputs: Phone (10 digits), Password (min 6 chars), Confirm Password match
    const validateField = (input) => {
        const id = input.id;
        const value = input.value.trim();
        let isValid = true;

        clearError(id);

        if (!value) {
            showError(id, `${input.previousElementSibling.textContent.replace(':', '')} is required`);
            isValid = false;
        } else if (id === 'phone' && !/^\d{10}$/.test(value)) {
            showError(id, 'Enter a valid 10-digit phone number');
            isValid = false;
        } else if (id === 'password' && value.length < 6) {
            showError(id, 'Password must be at least 6 characters');
            isValid = false;
        } else if (id === 'confirmPassword') {
            const password = document.getElementById('password').value;
            if (value !== password) {
                showError(id, 'Passwords do not match');
                isValid = false;
            }
        }

        return isValid;
    };

    inputs.forEach(input => {
        input.addEventListener('input', () => validateField(input));
        input.addEventListener('blur', () => validateField(input));
    });

    // Handle Registration Form Submission
    signupForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        let isFormValid = true;
        inputs.forEach(input => {
            if (!validateField(input)) {
                isFormValid = false;
            }
        });

        if (!isFormValid) return;

        const fullname = document.getElementById('fullname').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const password = document.getElementById('password').value;

        const role = document.getElementById('role').value;

        // Create User Data Object to send to Backend
        // Note: Role is not sent, so it defaults to "user" in backend
        const userData = {
            fullname: fullname,
            phone_number: phone,
            password: password,
            role: role
        };

        const submitBtn = document.getElementById('signin_btn');
        const originalBtnText = submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.textContent = 'Creating Account...';

        const API_BASE_URL = 'http://127.0.0.1:8000';
        try {
            // Call Register API (Method: POST)
            const response = await fetch(`${API_BASE_URL}/users/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });

            const result = await response.json();

            if (response.ok) {
                alert("Registration Successful!");
                window.location.href = 'login.html';
            } else {
                if (result.detail && result.detail.includes('already exists')) {
                    showError('phone', 'Phone number already registered');
                } else {
                    alert("Registration Failed: " + (result.detail || "Unknown error"));
                }
            }
        } catch (error) {
            console.error("Error during signup:", error);
            alert("An error occurred. Please make sure the backend server is running.");
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = originalBtnText;
        }
    });
});
