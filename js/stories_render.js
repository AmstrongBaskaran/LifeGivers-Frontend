document.addEventListener('DOMContentLoaded', async () => {
    const storiesContainer = document.getElementById('dynamic-stories-container');
    const API_BASE_URL = 'http://127.0.0.1:8000';

    async function fetchStories() {
        try {
            const response = await fetch(`${API_BASE_URL}/success-stories/`);
            if (!response.ok) throw new Error('Failed to fetch stories');

            const stories = await response.json();

            // Clear loading/existing text
            storiesContainer.innerHTML = '';

            if (stories.length === 0) {
                storiesContainer.innerHTML = '<p style="text-align:center; width:100%; color:#666;">No stories yet.</p>';
                return;
            }

            // Limit to first 2 stories for the layout if desired, or show all
            // The user originally had 2. Let's show up to 2.
            const storiesToShow = stories.slice(0, 2);

            storiesToShow.forEach(story => {
                const storyCard = document.createElement('div');
                storyCard.className = 's_story';
                storyCard.innerHTML = `
                    <div class="story_container1">
                        <h3>${story.title}</h3>
                    </div>
                    <div class="story_container2">
                        <p>${story.content}</p>
                    </div>
                `;
                storiesContainer.appendChild(storyCard);
            });

        } catch (error) {
            console.error('Error fetching stories:', error);
            storiesContainer.innerHTML = '<p style="text-align:center; width:100%; color:red;">Failed to load stories.</p>';
        }
    }

    fetchStories();
});
