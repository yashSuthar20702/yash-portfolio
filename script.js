document.addEventListener('DOMContentLoaded', () => {
    // 1. Scroll Reveal Logic
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('visible');
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade').forEach(el => observer.observe(el));

    // 2. Live Time for Ontario (EST)
    function updateLocalTime() {
        const timeElement = document.querySelector('.local-time');
        if (timeElement) {
            const options = { 
                timeZone: 'America/Toronto',
                hour: '2-digit', 
                minute: '2-digit',
                hour12: true 
            };
            const timeString = new Intl.DateTimeFormat('en-US', options).format(new Date());
            timeElement.textContent = `${timeString} EST`;
        }
    }
    setInterval(updateLocalTime, 1000);
    updateLocalTime();

    // 3. Dynamic GitHub Project Fetching
    const grid = document.getElementById("projectsGrid");
    const username = "yashSuthar20702";

    if (grid) {
        fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`)
            .then(res => res.json())
            .then(repos => {
                grid.innerHTML = "";
                repos
                    .filter(repo => !repo.fork && repo.name !== username)
                    .forEach(repo => {
                        const card = document.createElement("div");
                        card.className = "card glass fade"; 
                        card.innerHTML = `
                            <div style="margin-bottom:15px;"><span class="badge">${repo.language || 'Software'}</span></div>
                            <h3 style="margin-bottom: 10px; color: var(--accent); text-transform: capitalize;">${repo.name.replace(/-/g, ' ')}</h3>
                            <p style="font-size: 14px; color: var(--text-secondary); margin-bottom: 20px;">${repo.description || "A clean, production-ready implementation of mobile architecture."}</p>
                            <a href="${repo.html_url}" target="_blank" style="color: var(--text-primary); text-decoration: none; font-weight: 700; font-size: 12px; text-transform: uppercase;">View Source Code →</a>
                        `;
                        grid.appendChild(card);
                        observer.observe(card); // Re-observe for animation
                    });
            })
            .catch(err => console.error("GitHub fetch failed:", err));
    }
});