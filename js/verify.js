/**
 * verify.js
 * Admin logic for individual fundraiser document verification & approval.
 */

document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const fundraiserId = urlParams.get('id');
    const API_BASE_URL = 'https://life-givers-backend.vercel.app';

    if (!fundraiserId) {
        showError('No fundraiser ID provided in URL');
        return;
    }

    try {
        // Fetch full details of the specific fundraiser by ID
        const response = await fetch(`${API_BASE_URL}/fundraiser/${fundraiserId}`);

        if (!response.ok) {
            throw new Error('Fundraiser records not found on server');
        }

        const fundraiser = await response.json();
        displayFundraiser(fundraiser);

        // Event Listeners for Buttons
        document.getElementById('approve-btn').addEventListener('click', () => updateStatus('approved'));
        document.getElementById('reject-btn').addEventListener('click', () => updateStatus('rejected'));

    } catch (error) {
        console.error('Fetch Error:', error);
        showError(error.message);
    }

    /**
     * Display fundraiser details in the UI
     */
    function displayFundraiser(data) {
        document.getElementById('loading').style.display = 'none';
        document.getElementById('fundraiser-details').style.display = 'block';

        // Basic Information
        document.getElementById('campaign-title').textContent = data.campaign_title || 'N/A';
        document.getElementById('category').textContent = data.category || 'N/A';
        document.getElementById('target-amount').textContent = '₹' + (data.target_amount ? data.target_amount.toLocaleString('en-IN') : '0');
        document.getElementById('location').textContent = data.location || 'N/A';

        // Patient Information
        document.getElementById('patient-name').textContent = data.patient_name || 'N/A';
        document.getElementById('patient-age').textContent = data.patient_age || 'N/A';
        document.getElementById('relation').textContent = data.patient_relation || 'N/A';
        document.getElementById('hospital-name').textContent = data.hospital_name || 'N/A';

        // Editable Story
        document.getElementById('story-editor').value = data.story_text || '';

        // Payment / Financial Info
        document.getElementById('bank-account').textContent = data.bank_account_number || 'N/A';
        document.getElementById('ifsc').textContent = data.ifsc_code || 'N/A';
        document.getElementById('phone_number').textContent = data.phone_number || 'Not provided';
        document.getElementById('pan').textContent = data.pan_number || 'Not provided';

        // Document Proof Links
        const setProofLink = (id, url) => {
            const card = document.getElementById(id);
            if (url && card) {
                card.querySelector('.proof-preview').innerHTML =
                    `<a href="${url}" target="_blank" class="document-link">View Original File</a>`;
            }
        };

        setProofLink('medical-proof', data.medical_report_url);
        setProofLink('hospital-proof', data.hospital_report_url);
        setProofLink('id-proof', data.id_proof_url);
        setProofLink('campaign-image', data.campaign_image_url);
    }

    /**
     * Update campaign status (Approve/Reject)
     */
    async function updateStatus(status) {
        // Confirm action with Admin
        if (!confirm(`Are you sure you want to ${status.toUpperCase()} this fundraiser?`)) return;

        const approveBtn = document.getElementById('approve-btn');
        const rejectBtn = document.getElementById('reject-btn');
        const storyText = document.getElementById('story-editor').value;

        // UI Feedback
        approveBtn.disabled = true;
        rejectBtn.disabled = true;
        const originalText = approveBtn.textContent;
        approveBtn.textContent = 'Processing...';

        try {
            let url = `${API_BASE_URL}/fundraiser/${fundraiserId}/status?status=${status}`;

            // Send modified story only on approval
            if (status === 'approved') {
                url += `&story_text=${encodeURIComponent(storyText)}`;
            }

            const response = await fetch(url, { method: 'PATCH' });
            // Alert success and return to list
            if (!response.ok) throw new Error('Failed to update status on server');

            alert(`Campaign has been ${status} successfully.`);
            window.location.href = './profile_verify.html';

        } catch (error) {
            console.error('Update Error:', error);
            alert('Error updating status: ' + error.message);
            approveBtn.disabled = false;
            rejectBtn.disabled = false;
            approveBtn.textContent = originalText;
        }
    }

    function showError(message) {
        document.getElementById('loading').style.display = 'none';
        const errDiv = document.getElementById('error-message');
        errDiv.style.display = 'block';
        document.getElementById('error-text').textContent = message;
    }
});
