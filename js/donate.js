document.addEventListener('DOMContentLoaded', async () => {
    let selectedAmount = null;
    let selectedMethod = null;
    const customAmountInput = document.getElementById('custom-amount');
    const amtButtons = document.querySelectorAll('.amt-btn');
    const payButtons = document.querySelectorAll('.pay-btn');
    const donateBtn = document.getElementById('donate-now-btn');

    // --- Dynamic Content Loading ---
    const urlParams = new URLSearchParams(window.location.search);
    let fundraiserId = urlParams.get('id');

    async function loadCampaign(id) {
        try {
            const response = await fetch(`http://127.0.0.1:8000/fundraiser/${id}`);
            if (response.ok) {
                const data = await response.json();
                fillCampaignDetails(data);
            }
        } catch (error) {
            console.error('Error fetching fundraiser details:', error);
        }
    }

    function fillCampaignDetails(data) {
        const titleEl = document.getElementById('campaign-title');
        const locEl = document.getElementById('campaign-location');
        const priceEl = document.getElementById('campaign-target');
        const imgEl = document.getElementById('campaign-image');
        const storyEl = document.getElementById('campaign-story');

        if (titleEl) titleEl.textContent = data.campaign_title;
        if (locEl) locEl.textContent = data.location;
        if (priceEl) priceEl.textContent = 'Goal Amount: ₹' + data.target_amount.toLocaleString('en-IN');
        if (imgEl) imgEl.src = data.campaign_image_url || '../assets/herosec_img1.avif';
        if (storyEl) storyEl.textContent = data.story_text;

        // Update global fundraiserId in case it was auto-picked
        window.currentFundraiserId = data.fundraiser_id;
    }

    if (fundraiserId) {
        loadCampaign(fundraiserId);
    } else {
        // --- AUTO-PICK MODE ---
        // If no ID is in URL (e.g. from Index header "Donate"), pick the first approved one
        try {
            const response = await fetch('http://127.0.0.1:8000/fundraiser/status/approved');
            if (response.ok) {
                const approvedList = await response.json();
                if (approvedList.length > 0) {
                    fillCampaignDetails(approvedList[0]);
                } else {
                    const titleEl = document.getElementById('campaign-title');
                    if (titleEl) titleEl.textContent = 'No active campaigns found.';
                }
            }
        } catch (error) {
            console.error('Error fetching approved list:', error);
        }
    }

    amtButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            amtButtons.forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');
            selectedAmount = btn.dataset.amount;
            customAmountInput.value = '';
            ValidationUtils.clearError('custom-amount');
        });
    });

    customAmountInput.addEventListener('input', () => {
        amtButtons.forEach(b => b.classList.remove('selected'));
        selectedAmount = customAmountInput.value;
        if (selectedAmount) {
            ValidationUtils.clearError('custom-amount');
        }
    });

    payButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            payButtons.forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');
            selectedMethod = btn.dataset.method;
            ValidationUtils.clearError('payment-method');
        });
    });

    donateBtn.addEventListener('click', () => {
        const amount = customAmountInput.value || selectedAmount;

        let isValid = true;
        if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
            ValidationUtils.showError('custom-amount', 'Please select or enter a valid amount');
            isValid = false;
        } else {
            ValidationUtils.clearError('custom-amount');
        }

        if (!selectedMethod) {
            const errorSpan = document.getElementById('payment-method-error');
            errorSpan.textContent = 'Please select a payment method';
            errorSpan.style.color = '#dc2626';
            errorSpan.style.display = 'block';
            isValid = false;
        }

        if (isValid) {
            openQRBox(amount, selectedMethod, window.currentFundraiserId || fundraiserId);
        }
    });

    function openQRBox(amount, method, fundraiserId) {
        // Create a dynamic QR Code modal
        const box = document.createElement('div');
        box.id = 'qr-box';
        box.innerHTML = `
            <div class="qr-white-box">
                <h3>Scan QR Code</h3>
                <img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=UPI:lifegivers@upi" alt="QR Scanner" class="qr-img">
                <p>Amount: ₹${parseFloat(amount).toLocaleString('en-IN')}</p>
                
                <div class="form-group" style="margin-bottom: 15px; text-align: left;">
                    <label for="donor-name-input" style="display: block; margin-bottom: 5px; font-weight: 500;">Name (Optional)</label>
                    <input type="text" id="donor-name-input" placeholder="Enter your name" style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px;">
                </div>

                <button id="submit-donate">Submit</button>
            </div>
        `;
        document.body.appendChild(box);

        // Submit button click
        document.getElementById('submit-donate').onclick = async () => {
            const donorName = document.getElementById('donor-name-input').value.trim();
            await saveDonation(amount, method, fundraiserId, box, donorName);
        };

        // Click outside to close
        box.onclick = (e) => {
            if (e.target === box) {
                box.remove();
            }
        };
    }

    async function saveDonation(amount, method, fundraiserId, box, donorName) {
        const submitBtn = document.getElementById('submit-donate');
        submitBtn.disabled = true;
        submitBtn.textContent = 'Submitting...';

        try {
            // Get user ID if logged in
            let userId = localStorage.getItem('user_id');


            // Donation data
            const donationData = {
                user_id: userId,
                fundraiser_id: fundraiserId ? parseInt(fundraiserId) : null,
                donor_name: donorName || 'Anonymous',
                amount: parseFloat(amount),
                payment_method: method
            };

            // Save to database
            // Save Donation record to Backend Database
            const response = await fetch('http://127.0.0.1:8000/donations/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(donationData)
            });

            if (response.ok) {
                const result = await response.json();

                // Close box
                box.remove();

                // Show success
                alert('Donated Successfully!');

                // Reset form
                customAmountInput.value = '';
                amtButtons.forEach(b => b.classList.remove('selected'));
                payButtons.forEach(b => b.classList.remove('selected'));
                selectedAmount = null;
                selectedMethod = null;
            } else {
                alert('Failed to donate. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error occurred. Please check backend server.');
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Submit';
        }
    }
});
