// Fetch and display Platform Stats (Manual + Dynamic)
document.addEventListener('DOMContentLoaded', async () => {
    const API_BASE_URL = 'http://127.0.0.1:8000';
    try {
        // 1. Fetch Manual Stats (Impacted lives, Success rate, etc)
        const platformResp = await fetch(`${API_BASE_URL}/platform-stats/`);

        // 2. Fetch Real Donation Stats (Dynamic Total)
        const dynamicStatsResp = await fetch(`${API_BASE_URL}/stats/`);

        const safeSetText = (id, text) => {
            const el = document.getElementById(id);
            if (el) el.innerText = text;
        };

        if (platformResp.ok) {
            const stats = await platformResp.json();
            safeSetText('stat-lives-impacted', stats.lives_impacted);
            safeSetText('stat-successful-campaigns', stats.successful_campaigns);
            safeSetText('stat-success-rate', stats.success_rate);
        }

        if (dynamicStatsResp.ok) {
            const dynamicData = await dynamicStatsResp.json();
            // Format the dynamic total donation to Indian Currency format
            const formattedTotal = '₹' + dynamicData.total_donations.toLocaleString('en-IN');
            safeSetText('stat-funds-raised', formattedTotal);
        }

    } catch (error) {
        console.error('Error fetching platform stats:', error);
    }
});
