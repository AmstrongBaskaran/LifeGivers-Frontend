/**
 * Common validation utilities for the project
 */

const ValidationUtils = {
    showError: (inputId, message) => {
        let errorSpan = document.getElementById(`${inputId}-error`);
        const input = document.getElementById(inputId);

        if (!errorSpan && input) {
            // Create error span if it doesn't exist
            errorSpan = document.createElement('span');
            errorSpan.id = `${inputId}-error`;
            errorSpan.className = 'error-message';
            input.parentNode.appendChild(errorSpan);
        }

        if (errorSpan) {
            errorSpan.textContent = message;
            errorSpan.style.color = '#dc2626';
            errorSpan.style.fontSize = '12px';
            errorSpan.style.display = 'block';
            errorSpan.style.marginTop = '4px';
        }
        if (input) {
            input.classList.add('invalid');
            input.style.borderColor = '#dc2626';
        }
    },

    clearError: (inputId) => {
        const errorSpan = document.getElementById(`${inputId}-error`);
        const input = document.getElementById(inputId);
        if (errorSpan) {
            errorSpan.textContent = '';
        }
        if (input) {
            input.classList.remove('invalid');
            input.style.borderColor = '';
        }
    },

    validateRequired: (inputId, fieldName) => {
        const input = document.getElementById(inputId);
        if (!input || !input.value.trim()) {
            ValidationUtils.showError(inputId, `${fieldName} is required`);
            return false;
        }
        ValidationUtils.clearError(inputId);
        return true;
    },

    validatePhone: (inputId) => {
        const input = document.getElementById(inputId);
        if (!input) return true;
        const value = input.value.trim();
        if (!value) {
            ValidationUtils.showError(inputId, 'Phone number is required');
            return false;
        }
        if (!/^\d{10}$/.test(value)) {
            ValidationUtils.showError(inputId, 'Enter a valid 10-digit phone number');
            return false;
        }
        ValidationUtils.clearError(inputId);
        return true;
    },

    validateEmail: (inputId) => {
        const input = document.getElementById(inputId);
        if (!input) return true;
        const value = input.value.trim();
        if (!value) return true; // Optional email
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
            ValidationUtils.showError(inputId, 'Enter a valid email address');
            return false;
        }
        ValidationUtils.clearError(inputId);
        return true;
    },

    validateNumber: (inputId, fieldName, min = 0) => {
        const input = document.getElementById(inputId);
        if (!input) return true;
        const value = input.value.trim();
        if (!value) {
            ValidationUtils.showError(inputId, `${fieldName} is required`);
            return false;
        }
        if (isNaN(value) || parseFloat(value) <= min) {
            ValidationUtils.showError(inputId, `Enter a valid ${fieldName} (greater than ${min})`);
            return false;
        }
        ValidationUtils.clearError(inputId);
        return true;
    },

    validateCheckbox: (inputId, fieldName) => {
        const input = document.getElementById(inputId);
        if (!input || !input.checked) {
            ValidationUtils.showError(inputId, `Please agree to the ${fieldName}`);
            return false;
        }
        ValidationUtils.clearError(inputId);
        return true;
    }
};

// Export to window object for global access
window.ValidationUtils = ValidationUtils;
