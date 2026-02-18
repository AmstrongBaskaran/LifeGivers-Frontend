document.addEventListener('DOMContentLoaded', async () => {
    const totalFundraisersEl = document.getElementById('total-fundraisers');
    const verifiedFundraisersEl = document.getElementById('verified-fundraisers');
    const totalDonationsEl = document.getElementById('total-donations');
    const pendingFundraisersEl = document.getElementById('pending-fundraisers');

    const API_BASE_URL = 'https://life-givers-backend.vercel.app';

    // -- Existing Dynamic Stats --
    async function fetchStats() {
        try {
            const response = await fetch(`${API_BASE_URL}/stats/`);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const data = await response.json();

            totalFundraisersEl.textContent = (data.total_fundraisers || 0).toLocaleString();
            verifiedFundraisersEl.textContent = (data.verified_fundraisers || 0).toLocaleString();
            pendingFundraisersEl.textContent = (data.pending_fundraisers || 0).toLocaleString();
            totalDonationsEl.textContent = '₹' + (data.total_donations || 0).toLocaleString('en-IN');

        } catch (error) {
            console.error('Error fetching dashboard stats:', error);
        }
    }

    // Initial fetch
    fetchStats();
    // Refresh every 5 seconds
    setInterval(fetchStats, 5000);


    // -- Platform Stats Management (PURELY MANUAL ONES) --
    const statsForm = document.getElementById('stats-form');
    const editLives = document.getElementById('edit-lives-impacted');
    const editCampaigns = document.getElementById('edit-successful-campaigns');
    const editRate = document.getElementById('edit-success-rate');

    async function fetchPlatformStats() {
        try {
            const response = await fetch(`${API_BASE_URL}/platform-stats/`);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const stats = await response.json();

            editLives.value = stats.lives_impacted || '';
            editCampaigns.value = stats.successful_campaigns || '';
            editRate.value = stats.success_rate || '';

        } catch (error) {
            console.error('Error fetching platform stats:', error);
        }
    }

    fetchPlatformStats();

    statsForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const updatedStats = {
            lives_impacted: editLives.value,
            successful_campaigns: editCampaigns.value,
            success_rate: editRate.value
        };

        try {
            const response = await fetch(`${API_BASE_URL}/platform-stats/`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedStats)
            });

            if (response.ok) {
                alert('Platform stats updated successfully!');
            } else {
                alert('Failed to update stats.');
            }
        } catch (error) {
            console.error('Error updating platform stats:', error);
            alert('Error updating stats.');
        }
    });


    // -- Success Stories Management --
    const storyForm = document.getElementById('story-form');
    const storyTitleInput = document.getElementById('story-title');
    const storyContentInput = document.getElementById('story-content');
    const storiesList = document.getElementById('stories-list');

    async function fetchStories() {
        try {
            const response = await fetch(`${API_BASE_URL}/success-stories/`);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const stories = await response.json();

            storiesList.innerHTML = '';

            if (Array.isArray(stories)) {
                stories.forEach(story => {
                    const item = document.createElement('div');
                    item.style = "background: #f8fafc; padding: 15px; border-radius: 12px; border: 1px solid #e2e8f0; display: flex; justify-content: space-between; align-items: start;";
                    item.innerHTML = `
                        <div style="flex: 1;">
                            <h5 style="margin: 0; color: #1e293b; font-size: 16px;">${story.title}</h5>
                            <p style="margin: 5px 0 0 0; color: #64748b; font-size: 14px; line-height: 1.4;">${story.content ? (story.content.substring(0, 100) + (story.content.length > 100 ? '...' : '')) : ''}</p>
                        </div>
                        <button onclick="deleteStory(${story.id})" style="background: #fee2e2; color: #ef4444; border: none; padding: 8px 12px; border-radius: 8px; font-weight: 600; cursor: pointer; margin-left: 15px; font-size: 13px;">Delete</button>
                    `;
                    storiesList.appendChild(item);
                });
            }
        } catch (error) {
            console.error('Error fetching stories:', error);
        }
    }

    // Global delete function
    window.deleteStory = async (id) => {
        if (!confirm('Are you sure you want to delete this story?')) return;

        try {
            const response = await fetch(`${API_BASE_URL}/success-stories/${id}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                fetchStories();
            } else {
                alert('Failed to delete story');
            }
        } catch (error) {
            console.error('Error deleting story:', error);
        }
    };

    fetchStories();

    storyForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const storyData = {
            title: storyTitleInput.value,
            content: storyContentInput.value
        };

        try {
            const response = await fetch(`${API_BASE_URL}/success-stories/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(storyData)
            });

            if (response.ok) {
                storyTitleInput.value = '';
                storyContentInput.value = '';
                fetchStories();
                alert('Story added successfully!');
            } else {
                alert('Failed to add story');
            }
        } catch (error) {
            console.error('Error adding story:', error);
            alert('Error adding story');
        }
    });

});
