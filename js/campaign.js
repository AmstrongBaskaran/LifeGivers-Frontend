/**
 * campaign.js
 * Logic for the multi-step fundraiser campaign form.
 */

document.addEventListener('DOMContentLoaded', () => {
    // ---------------------------------------------------------
    // 1. Initialization & State
    // ---------------------------------------------------------
    let currentStep = 1;
    const totalSteps = 6;
    const imgData = {}; // Stores Base64 strings of uploaded images
    const API_BASE_URL = 'https://life-givers-backend.vercel.app';

    // UI Elements
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');
    const campaignForm = document.getElementById('campaignForm');
    const stepCountText = document.getElementById('step-count');
    const progressBarFill = document.getElementById('progress-bar-fill');

    // Authentication Check
    const userId = localStorage.getItem('user_id');
    const fullname = localStorage.getItem('fullname');

    // Check if user is logged in before allowing campaign creation
    if (!fullname || !userId) {
        alert('Please login first to start a campaign!');
        window.location.href = './login.html';
        return;
    }

    // ---------------------------------------------------------
    // 2. Event Listeners
    // ---------------------------------------------------------

    // Prevent form from refreshing on accidental Enter key
    campaignForm.addEventListener('submit', (e) => e.preventDefault());

    // File Upload Handler (Converts images to Base64 with compression)
    const fileInputs = ['medical_report_url', 'hospital_report_url', 'id_proof_url', 'campaign_image_url'];
    const uploadedFiles = {}; // Track which files have been uploaded

    // Unified file processor for Images (Compressed) and PDFs (Original)
    async function processFile(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            // If it's a PDF, we just return the Base64 without compression
            if (file.type === 'application/pdf') {
                reader.readAsDataURL(file);
                reader.onload = () => resolve(reader.result);
                reader.onerror = (e) => reject(e);
                return;
            }

            // If it's an image, we use the compression logic
            reader.readAsDataURL(file);
            reader.onload = (event) => {
                const img = new Image();
                img.src = event.target.result;
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    let width = img.width;
                    let height = img.height;

                    const MAX_SIZE = 1200;
                    if (width > height) {
                        if (width > MAX_SIZE) {
                            height *= MAX_SIZE / width;
                            width = MAX_SIZE;
                        }
                    } else {
                        if (height > MAX_SIZE) {
                            width *= MAX_SIZE / height;
                            height = MAX_SIZE;
                        }
                    }

                    canvas.width = width;
                    canvas.height = height;
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0, width, height);
                    resolve(canvas.toDataURL('image/jpeg', 0.7));
                };
                img.onerror = (e) => reject(e);
            };
        });
    }

    fileInputs.forEach(id => {
        const input = document.getElementById(id);
        const nameDisplay = document.getElementById(`name-${id}`);
        const uploadBox = input.closest('.upload');

        input.addEventListener('change', async (e) => {
            if (e.target.files.length > 0) {
                const file = e.target.files[0];
                nameDisplay.textContent = 'Processing...';

                try {
                    const fileData = await processFile(file);
                    imgData[id] = fileData;
                    nameDisplay.textContent = file.name + ' (Ready)';

                    // Mark as uploaded and disable the upload box
                    uploadedFiles[id] = true;
                    uploadBox.classList.add('uploaded');
                    uploadBox.style.pointerEvents = 'none';
                    uploadBox.style.opacity = '0.6';
                } catch (err) {
                    console.error('Compression failed:', err);
                    nameDisplay.textContent = 'Error processing image';
                }
            }
        });
    });

    // Next Button Click
    nextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        // Validate inputs for the current step before proceeding
        if (!validateStep(currentStep)) return;

        if (currentStep < totalSteps) {
            currentStep++;
            updateUI();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            handleFinalSubmission();
        }
    });

    // Previous Button Click
    prevBtn.addEventListener('click', () => {
        if (currentStep > 1) {
            currentStep--;
            updateUI();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });

    // ---------------------------------------------------------
    // 3. UI Update Logic
    // ---------------------------------------------------------
    function updateUI() {
        // Toggle Active Divs
        document.querySelectorAll('.campaign_div').forEach(div => div.classList.remove('active'));
        document.getElementById(`step-${currentStep}`).classList.add('active');

        // Update Progress Bar
        const percentage = (currentStep / totalSteps) * 100;
        progressBarFill.style.width = `${percentage}%`;
        stepCountText.textContent = `Step ${currentStep} to ${totalSteps}`;

        // Update Step Names (Navigation items)
        document.querySelectorAll('.progress_name p').forEach((p, idx) => {
            if (idx + 1 <= currentStep) p.classList.add('active');
            else p.classList.remove('active');
        });

        // Toggle Buttons Visibility
        prevBtn.style.display = (currentStep === 1) ? 'none' : 'block';
        nextBtn.textContent = (currentStep === totalSteps) ? 'Submit Campaign' : 'Next';

        // Button Alignment
        nextBtn.style.marginLeft = (currentStep === 1) ? 'auto' : '0';
    }

    // ---------------------------------------------------------
    // 4. Validation Logic
    // ---------------------------------------------------------
    function validateStep(step) {
        // Using ValidationUtils from form_validation_utils.js
        switch (step) {
            case 1:
                return (
                    ValidationUtils.validateRequired('campaign_content1', 'Campaign Title') &&
                    ValidationUtils.validateRequired('category', 'Category') &&
                    ValidationUtils.validateNumber('target_amount', 'Target Amount', 0) &&
                    ValidationUtils.validateRequired('location', 'Location')
                );
            case 2:
                return (
                    ValidationUtils.validateRequired('patient_name', 'Patient Name') &&
                    ValidationUtils.validateNumber('patient_age', 'Age', 0) &&
                    ValidationUtils.validateRequired('relation', 'Relation') &&
                    ValidationUtils.validateRequired('hospital_name', 'Hospital Name')
                );
            case 3:
                return ValidationUtils.validateRequired('fundraiser_story', 'Story');
            case 4:
                // Specific check for mandatory images
                if (!imgData.medical_report_url || !imgData.id_proof_url) {
                    document.getElementById('uploads-error').textContent = 'Please upload at least Medical Report and ID Proof.';
                    return false;
                }
                document.getElementById('uploads-error').textContent = '';
                return true;
            case 5:
                // Step 5: Payment Details Validation
                return (
                    ValidationUtils.validateRequired('bank_account', 'Bank Account') &&
                    ValidationUtils.validateRequired('ifsc', 'IFSC Code') &&
                    ValidationUtils.validateRequired('pan_num', 'Pan Number') &&
                    ValidationUtils.validateRequired('phone_number', 'Phone Number')
                );
            case 6:
                return (
                    ValidationUtils.validateCheckbox('terms', 'Terms & Conditions') &&
                    ValidationUtils.validateCheckbox('verify_chk', 'Verification Agreement')
                );
            default:
                return true;
        }
    }

    // ---------------------------------------------------------
    // 5. Backend Communication (Submission)
    // ---------------------------------------------------------
    async function handleFinalSubmission() {
        // Prepare the payload (JSON object) for the Backend
        const payload = {
            user_id: parseInt(userId),
            campaign_title: document.getElementById('campaign_content1').value,
            target_amount: parseFloat(document.getElementById('target_amount').value),
            category: document.getElementById('category').value,
            location: document.getElementById('location').value,
            patient_name: document.getElementById('patient_name').value,
            patient_age: parseInt(document.getElementById('patient_age').value),
            patient_relation: document.getElementById('relation').value,
            hospital_name: document.getElementById('hospital_name').value,
            story_text: document.getElementById('fundraiser_story').value,
            bank_account_number: document.getElementById('bank_account').value,
            ifsc_code: document.getElementById('ifsc').value,
            phone_number: document.getElementById('phone_number').value,
            pan_number: document.getElementById('pan_num').value,
            agreed_terms: document.getElementById('terms').checked,
            // Include images directly in the payload
            medical_report_url: imgData.medical_report_url || null,
            hospital_report_url: imgData.hospital_report_url || null,
            id_proof_url: imgData.id_proof_url || null,
            campaign_image_url: imgData.campaign_image_url || null
        };

        // Loading State
        nextBtn.disabled = true;
        nextBtn.textContent = 'Uploading & Submitting...';

        try {
            // Send everything in ONE request
            const response = await fetch(`${API_BASE_URL}/fundraiser`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                if (response.status === 413) {
                    throw new Error('Images are too large. Please use smaller files.');
                }
                const error = await response.json();
                throw new Error(error.detail || 'Failed to create campaign');
            }

            alert('Congratulations! Your campaign has been submitted for review.');
            window.location.href = '../index.html';

        } catch (error) {
            console.error('Submission Error:', error);
            if (error.message.includes('Failed to fetch')) {
                alert('Connection Error: Please check if the backend is running and CORS is allowed.');
            } else {
                alert('Submission Failed: ' + error.message);
            }
            nextBtn.disabled = false;
            nextBtn.textContent = 'Submit Campaign';
        }
    }
});
