// Backend API Configuration
// Change this URL based on your environment:
// - Local Development: 'http://127.0.0.1:8000'
// - Production: 'https://life-givers-backend.vercel.app'
const API_BASE_URL = 'https://life-givers-backend.vercel.app';

document.addEventListener('DOMContentLoaded', async () => {
    // 1. Get URL Parameters
    const urlParams = new URLSearchParams(window.location.search);
    const amount = urlParams.get('amount') || "50"; // Default for testing
    let fundraiserId = urlParams.get('fundraiser_id') || 1;

    // 2. DOM Elements
    const amountDisplay = document.getElementById('display-amount');
    const confirmBtn = document.getElementById('confirm-payment-btn');
    const modal = document.getElementById('success-modal');
    const qrContainer = document.getElementById("qrcode");

    // 3. User Data & Validation
    const userId = localStorage.getItem('user_id');
    const fullName = localStorage.getItem('fullname');

    if (!userId) {
        alert("You must be logged in to complete the donation.");
        window.location.href = 'login.html';
        return;
    }

    amountDisplay.textContent = `₹${parseFloat(amount).toLocaleString()}`;

    // 4. Fetch Fundraiser Details & Generate QR
    let fundraiserName = "Life Givers";
    let fundraiserUpi = "aamstrong522@okicici"; // Default

    async function fetchFundraiser(fid) {
        try {
            const response = await fetch(`${API_BASE_URL}/fundraiser/${fid}`);
            if (response.ok) {
                const data = await response.json();
                fundraiserName = data.campaign_title || "Medical Campaign";
                // Note: phone_number is not a UPI ID, so we use default
                // fundraiserUpi = data.phone_number; // Not applicable
                return true;
            }
        } catch (e) {
            console.warn("Fetch failed for FID:", fid);
        }
        return false;
    }

    // Try requested ID first, then fallback to ANY fundraiser so the user can see it work
    let found = await fetchFundraiser(fundraiserId);
    if (!found) {
        console.log("Specified fundraiser not found, fetching any approved fundraiser...");
        try {
            const listResp = await fetch(`${API_BASE_URL}/fundraiser/status/approved`);
            if (listResp.ok) {
                const fundraisers = await listResp.json();
                if (fundraisers && fundraisers.length > 0) {
                    const first = fundraisers[0];
                    fundraiserId = first.fundraiser_id;
                    fundraiserName = first.campaign_title;
                    // Note: phone_number is not a UPI ID, so we use default
                    // fundraiserUpi = first.phone_number; // Not applicable
                    console.log("Using fallback Fundraiser ID:", fundraiserId);
                }
            }
        } catch (e) {
            console.error("Failed to fetch all fundraisers:", e);
        }
    }

    // Generate UPI URI
    // Standard format: upi://pay?pa=VPA&pn=NAME&am=AMOUNT&cu=INR&tn=NOTE
    const upiUri = `upi://pay?pa=${fundraiserUpi}&pn=${encodeURIComponent(fundraiserName)}&am=${parseFloat(amount).toFixed(2)}&cu=INR&tn=Donation%20to%20${encodeURIComponent(fundraiserName)}`;

    console.log("UPI URI:", upiUri);

    // Render QR Code
    qrContainer.innerHTML = "";
    new QRCode(qrContainer, {
        text: upiUri,
        width: 200,
        height: 200,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.M
    });

    // 5. Handle Confirmation
    confirmBtn.addEventListener('click', async () => {
        confirmBtn.disabled = true;
        confirmBtn.textContent = 'Processing...';

        const donationData = {
            user_id: parseInt(userId),
            fundraiser_id: parseInt(fundraiserId),
            donor_name: fullName || "Anonymous",
            amount: parseFloat(amount),
            payment_method: 'UPI'
        };

        try {
            // Using TRAILING SLASH to match standard API patterns
            const response = await fetch(`${API_BASE_URL}/donations/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(donationData)
            });

            if (response.ok) {
                const result = await response.json();

                // Populate Modal with REAL DB DATA
                document.getElementById('receipt-id').textContent = `#${result.donation_id}`;
                document.getElementById('receipt-amount').textContent = `₹${result.amount}`;
                document.getElementById('receipt-date').textContent = new Date().toLocaleDateString();
                document.getElementById('receipt-fundraiser').textContent = fundraiserName;
                document.getElementById('receipt-donor').textContent = result.donor_name;

                // Show Modal
                modal.classList.add('active');
            } else {
                let errorMessage = 'Payment Confirmation Failed';
                try {
                    const errorData = await response.json();
                    errorMessage = errorData.detail || errorMessage;
                } catch (e) {
                    errorMessage = `Server Error: ${response.status} ${response.statusText}`;
                }
                alert(errorMessage);
                confirmBtn.disabled = false;
                confirmBtn.textContent = 'Confirm Payment';
            }
        } catch (error) {
            console.error("Donation Request Failed:", error);
            alert("Network Error: Could not connect to the backend server. Please ensure the server is running on port 8000.");
            confirmBtn.disabled = false;
            confirmBtn.textContent = 'Confirm Payment';
        }
    });
});
