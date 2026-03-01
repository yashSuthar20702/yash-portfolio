document.addEventListener('DOMContentLoaded', () => {
    // 1. Better Scroll Reveal
    const revealCallback = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    };
    const observer = new IntersectionObserver(revealCallback, { threshold: 0.1 });
    document.querySelectorAll('.fade').forEach(el => observer.observe(el));

    // 2. High-Accuracy Clock
    const updateTime = () => {
        const timeEl = document.querySelector('.local-time');
        if (timeEl) {
            const now = new Date();
            const timeStr = now.toLocaleTimeString('en-US', { 
                timeZone: 'America/Toronto',
                hour: '2-digit', 
                minute: '2-digit',
                second: '2-digit'
            });
            timeEl.textContent = `${timeStr} EST`;
        }
    };
    setInterval(updateTime, 1000);
    updateTime();

    // 3. Optimized GitHub Fetch
    const projectsGrid = document.getElementById("projectsGrid");
    const username = "yashSuthar20702";

    if (projectsGrid) {
        fetch(`https://api.github.com/users/${username}/repos?sort=stars&per_page=8`)
            .then(res => res.json())
            .then(repos => {
                projectsGrid.innerHTML = repos
                    .filter(repo => !repo.fork && repo.name !== username)
                    .map(repo => `
                        <div class="glass fade">
                            <span class="edu-tag">${repo.language || 'Project'}</span>
                            <h3 style="margin: 10px 0; text-transform: capitalize; color:var(--accent)">
                                ${repo.name.replace(/-/g, ' ')}
                            </h3>
                            <p style="font-size: 14px; color: var(--text-dim); margin-bottom: 25px; min-height: 45px;">
                                ${repo.description || "Scalable mobile application architecture built with production-grade standards."}
                            </p>
                            <a href="${repo.html_url}" target="_blank" style="color: var(--text); text-decoration: none; font-weight: 700; font-size: 12px; border-bottom: 1px solid var(--accent);">
                                SOURCE CODE →
                            </a>
                        </div>
                    `).join('');
                
                // Observe new dynamic elements
                document.querySelectorAll('#projectsGrid .fade').forEach(el => observer.observe(el));
            })
            .catch(() => projectsGrid.innerHTML = "<p>Failed to load projects. Check GitHub link.</p>");
    }
});