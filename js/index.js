// Load approved fundraisers
document.addEventListener('DOMContentLoaded', async () => {
    const track = document.getElementById('fundraisers-track');
    const API_BASE_URL = 'https://life-givers-backend.vercel.app';
    try {
        // Fetch list of APPROVED fundraisers from the Backend
        const response = await fetch(`${API_BASE_URL}/fundraiser/status/approved`);
        const fundraisers = await response.json();

        if (fundraisers.length === 0) {
            track.innerHTML = '<p style="text-align: center; padding: 50px; color: #666; width: 100vw;">No fundraisers available yet. Be the first to start a campaign!</p>';
            // Stop animation if no data
            track.style.animation = 'none';
            track.style.justifyContent = 'center';
            return;
        }

        // Function to create a valid HTML Card element for each fundraiser
        const createCard = (fundraiser) => {
            const card = document.createElement('div');
            card.className = 'card';

            const imgUrl = fundraiser.campaign_image_url || './assets/herosec_img1.avif';

            // Truncate story for the new 3-line layout
            const storyText = fundraiser.story_text || "";
            const storyPreview = storyText.length > 140
                ? storyText.substring(0, 140) + '...'
                : storyText;

            console.log(`DEBUG: Rendering fundraiser ${fundraiser.fundraiser_id}: ${fundraiser.campaign_title}`);

            const target = fundraiser.target_amount ? fundraiser.target_amount.toLocaleString('en-IN') : '0';

            card.innerHTML = `
                <div class="cardimg">
                    <img src="${imgUrl}" alt="${fundraiser.campaign_title}" />
                </div>
                <div class="cardcontent">
                    <p class="card-loc">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                        ${fundraiser.location || 'India'}
                    </p>
                    <h4>${fundraiser.campaign_title}</h4>
                    <p class="card-desc">${storyPreview}</p>
                    
                    <div class="card-simple-amount">
                        <span class="goal-label">Goal Amount:</span>
                        <span class="goal-value">₹${target}</span>
                    </div>

                    <div class="cardbtn">
                        <a href="./pages/donate.html?id=${fundraiser.fundraiser_id}" class="card-donate-btn check-login">Donate Now</a>
                    </div>
                </div>
            `;

            // Make the entire card clickable
            card.style.cursor = 'pointer';
            card.addEventListener('click', (e) => {
                // Don't trigger if the actual donate button was clicked (it has its own link)
                // The .check-login delegation in header_auth.js will handle the button.
                if (!e.target.closest('.card-donate-btn')) {
                    const userId = localStorage.getItem('user_id');
                    const role = localStorage.getItem('role');

                    if (!userId) {
                        alert('Please Login first to access this feature!');
                        window.location.href = './pages/login.html';
                    } else if (role === 'admin') {
                        alert('Admins cannot Start Campaigns or Donate. Please login as a User.');
                    } else {
                        window.location.href = `./pages/donate.html?id=${fundraiser.fundraiser_id}`;
                    }
                }
            });

            return card;
        };

        // Append original cards
        fundraisers.forEach(fundraiser => {
            track.appendChild(createCard(fundraiser));
        });

        // Infinite scroll logic:
        // Only animate/scroll if there are more than 3 cards to fill the screen
        if (fundraisers.length <= 3) {
            track.style.animation = 'none';
            track.style.justifyContent = 'center';
            track.style.width = '100%';
        } else {
            // Duplicate the cards once for a seamless infinite loop
            fundraisers.forEach(fundraiser => {
                track.appendChild(createCard(fundraiser));
            });
            track.style.animation = 'scroll 30s linear infinite';
            track.style.justifyContent = 'flex-start';

            // Add hover listeners to pause/resume animation reliably
            track.addEventListener('mouseenter', () => {
                track.style.animationPlayState = 'paused';
            });
            track.addEventListener('mouseleave', () => {
                track.style.animationPlayState = 'running';
            });
        }

    } catch (error) {
        console.error('Error loading fundraisers:', error);
        track.innerHTML = '<p style="text-align: center; padding: 50px; color: #ff4d4d; width: 100vw;">Error loading fundraisers. Please try again later.</p>';
        track.style.animation = 'none';
        track.style.justifyContent = 'center';
    }

});
