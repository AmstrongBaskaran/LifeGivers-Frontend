document.addEventListener('DOMContentLoaded', () => {
    const fullname = localStorage.getItem('fullname');
    const userId = localStorage.getItem('user_id');
    const headerBtn = document.getElementById('headerbtn');

    // 1. Handle Header UI (Welcome/Logout)
    // If user is logged in (fullname exists), show Welcome message and Logout button
    if (fullname && headerBtn) {
        headerBtn.innerHTML = `
        <span style="margin-right: 15px; color: #000100ff; font-weight: bold;">Welcome, ${fullname}</span>
        <button id="logout-btn" class="nav-btn" style="cursor: pointer; background:#00b386;; color: white; border: none; padding: 8px 15px; border-radius: 5px;">Logout</button>
      `;

        // Logout Logic: Clear LocalStorage and Redirect to Home
        document.getElementById('logout-btn').addEventListener('click', () => {
            localStorage.clear();
            // Check current path - if in 'pages' folder, go up one level
            const isSubPage = window.location.pathname.includes('/pages/');
            window.location.href = isSubPage ? '../index.html' : './index.html';
        });
    }

    // 2. Global Check-Login Handler (Using Event Delegation for static & dynamic elements)
    // Restricts access to "Start Campaign" and "Donate" links
    document.addEventListener('click', (e) => {
        // Find if the clicked element or any of its parents has 'check-login' class
        const targetLink = e.target.closest('.check-login');

        if (targetLink) {
            const role = localStorage.getItem('role'); // Get user role
            const userId = localStorage.getItem('user_id');

            if (!userId) {
                e.preventDefault();
                alert('Please Login first to access this feature!');
                const isSubPage = window.location.pathname.includes('/pages/');
                window.location.href = isSubPage ? './login.html' : './pages/login.html';
            } else if (role === 'admin') {
                e.preventDefault();
                alert('Admins cannot Start Campaigns or Donate. Please login as a User.');
            }
        }
    });
});
