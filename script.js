/* Reveal */

const observer = new IntersectionObserver(entries => {

  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add("visible");
    }
  });

},{ threshold:0.2 });

document.querySelectorAll(".fade")
.forEach(el => observer.observe(el));


/* GitHub */

const username = "yashSuthar20702";
const grid = document.getElementById("projectsGrid");

fetch(`https://api.github.com/users/${username}/repos?sort=updated`)
  .then(res => res.json())
  .then(repos => {

    repos
      .filter(r => !r.fork)
      .forEach(repo => {

        const card = document.createElement("div");
        
        card.className = "card glass";

        card.innerHTML = `
          <h3>${repo.name}</h3>
          <p>${repo.description || "No description available."}</p>
          <div class="project-meta">
            ★ ${repo.stargazers_count} | Forks ${repo.forks_count}
          </div>
        `;

        card.onclick = () => {
          window.open(repo.html_url,"_blank");
        };

        grid.appendChild(card);

      });

  });