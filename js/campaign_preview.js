/**
 * campaign_preview.js
 * Logic for the campaign preview page.
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Retrieve Data
    const campaignDataStr = localStorage.getItem('campaign_preview_data');

    if (!campaignDataStr) {
        alert('No campaign data found. Redirecting to start campaign.');
        window.location.href = './campaign.html';
        return;
    }

    const campaignData = JSON.parse(campaignDataStr);
    const API_BASE_URL = 'https://life-givers-backend.vercel.app'; // Keep this consistent

    // 2. Populate UI
    document.getElementById('prev-title').textContent = campaignData.campaign_title;
    document.getElementById('prev-category').textContent = campaignData.category;
    document.getElementById('prev-amount').textContent = '₹' + campaignData.target_amount;
    document.getElementById('prev-location').textContent = campaignData.location;

    document.getElementById('prev-patient-name').textContent = campaignData.patient_name;
    document.getElementById('prev-age').textContent = campaignData.patient_age;
    document.getElementById('prev-relation').textContent = campaignData.patient_relation;
    document.getElementById('prev-hospital').textContent = campaignData.hospital_name;

    document.getElementById('prev-story').textContent = campaignData.story_text;

    document.getElementById('prev-account').textContent = campaignData.bank_account_number;
    document.getElementById('prev-ifsc').textContent = campaignData.ifsc_code;
    document.getElementById('prev-phone').textContent = campaignData.phone_number;
    document.getElementById('prev-pan').textContent = campaignData.pan_number;

    // 3. Render Images
    const imagesContainer = document.getElementById('prev-images');
    imagesContainer.innerHTML = ''; // Clear previous

    const imageFields = [
        { key: 'medical_report_url', label: 'Medical Report' },
        { key: 'hospital_report_url', label: 'Hospital Bill' },
        { key: 'id_proof_url', label: 'ID Proof' },
        { key: 'campaign_image_url', label: 'Campaign Image' }
    ];

    imageFields.forEach(field => {
        if (campaignData[field.key]) {
            const imgBox = document.createElement('div');
            imgBox.classList.add('preview-img-box');

            // Check if it's a PDF (Base64 usually starts with data:application/pdf)
            if (campaignData[field.key].startsWith('data:application/pdf')) {
                imgBox.innerHTML = `<span style="font-size: 0.8rem; text-align: center;">${field.label}<br>(PDF)</span>`;
            } else {
                const img = document.createElement('img');
                img.src = campaignData[field.key];
                img.alt = field.label;
                imgBox.appendChild(img);
            }
            imagesContainer.appendChild(imgBox);
        }
    });

    // 4. Handle Edit
    document.getElementById('editBtn').addEventListener('click', () => {
        // Just go back. We assume the browser or a clever implementation in campaign.js 
        // will refill the form from this data if we wanted to be super fancy,
        // but for now, navigating back is the simplest "Edit" action.
        // A better approach would be to have campaign.js check for this data on load.
        window.location.href = './campaign.html';
    });

    // 5. Handle Confirm & Submit
    const confirmBtn = document.getElementById('confirmBtn');

    confirmBtn.addEventListener('click', async () => {
        confirmBtn.disabled = true;
        confirmBtn.textContent = 'Submitting...';

        try {
            const response = await fetch(`${API_BASE_URL}/fundraiser`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(campaignData)
            });

            if (!response.ok) {
                if (response.status === 413) {
                    throw new Error('Images are too large. Please go back and use smaller files.');
                }
                const error = await response.json();
                throw new Error(error.detail || 'Failed to create campaign');
            }

            // Success!
            alert('Congratulations! Your campaign has been submitted for review.');

            // Clear the temporary data
            localStorage.removeItem('campaign_preview_data');

            // Redirect to home or dashboard
            window.location.href = '../index.html';

        } catch (error) {
            console.error('Submission Error:', error);
            if (error.message.includes('Failed to fetch')) {
                alert('Connection Error: Please check if the backend is running and CORS is allowed.');
            } else {
                alert('Submission Failed: ' + error.message);
            }
            confirmBtn.disabled = false;
            confirmBtn.textContent = 'Confirm & Submit';
        }
    });

});
