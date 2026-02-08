/**
 * profile_verify.js
 * Admin logic for viewing pending fundraiser lists.
 */

document.addEventListener('DOMContentLoaded', async () => {
  const container = document.getElementById('fundraisers-container');
  const noFundraisers = document.getElementById('no-fundraisers');
  const API_BASE_URL = 'https://life-givers-backend.vercel.app';

  try {
    // Fetch only PENDING fundraisers for verification
    const response = await fetch(`${API_BASE_URL}/fundraiser/status/pending`);
    const fundraisers = await response.json();

    if (fundraisers.length === 0) {
      noFundraisers.style.display = 'block';
      return;
    }

    fundraisers.forEach(fundraiser => {
      // Create a list item (box) for each pending fundraiser
      const box = document.createElement('div');
      box.className = 'box';

      // Use campaign image or fallback
      const imgUrl = fundraiser.campaign_image_url || '../assets/fundraiser_img.avif';
      const target = fundraiser.target_amount ? fundraiser.target_amount.toLocaleString('en-IN') : '0';

      box.innerHTML = `
                <div class="images">
                  <img src="${imgUrl}" alt="${fundraiser.patient_name}" />
                </div>
                <div class="cont">
                  <div class="cont1">
                    <h4>${fundraiser.patient_name}</h4>
                    <p>Age: ${fundraiser.patient_age}</p>
                  </div>
                  <div class="cont2">
                    <div class="cls">
                      <h4>Hospital:</h4>
                      <p>${fundraiser.hospital_name}</p>
                    </div>
                    <div class="cls">
                      <h4>Category:</h4>
                      <p>${fundraiser.category}</p>
                    </div>
                    <div class="cls">
                      <h4>Target:</h4>
                      <p>₹${target}</p>
                    </div>
                  </div>
                </div>
                <div class="btn">
                  <a href="./verify.html?id=${fundraiser.fundraiser_id}" class="verify-btn">Verify</a>
                </div>
            `;

      container.appendChild(box);
    });
  } catch (error) {
    console.error('Error loading fundraisers:', error);
    container.innerHTML = '<p style="color: red; text-align: center; padding: 20px;">Error loading data. Backend check pannunga!</p>';
  }
});
