// Toggle Menu
const menuToggle = document.getElementById('menuToggle');
const menu = document.getElementById('menu');

menuToggle.addEventListener('click', () => {
    menu.classList.toggle('active');
});

// Close Menu When Clicking Outside
document.addEventListener('click', (event) => {
    const isClickInsideMenu = menu.contains(event.target);
    const isClickOnMenuToggle = menuToggle.contains(event.target);

    if (!isClickInsideMenu && !isClickOnMenuToggle && menu.classList.contains('active')) {
        menu.classList.remove('active');
    }
});

// Fork Check Logic
document.getElementById('checkFork').addEventListener('click', async () => {
    const username = document.getElementById('username').value.trim();
    const message = document.getElementById('message');
    const forkRepoButton = document.getElementById('forkRepo');

    if (!username) {
        message.innerText = 'Please enter a GitHub username.';
        return;
    }

    try {
        // Check if the user has forked the repo
        const forksResponse = await fetch(`https://api.github.com/repos/Demon-Slayer2/DEMONS-SLAYER-XMD/forks`);
        const forks = await forksResponse.json();
        const userFork = forks.find(fork => fork.owner.login === username);

        if (!userFork) {
            message.innerText = 'You have not forked the repo.';
            forkRepoButton.style.display = 'block';
            return;
        }

        // Get the latest commit hash of the original repo
        const originalRepoResponse = await fetch('https://api.github.com/repos/Demon-Slayer2/DEMONS-SLAYER-XMD/commits/main');
        const originalRepoCommit = await originalRepoResponse.json();
        const originalRepoHash = originalRepoCommit.sha;

        // Get the latest commit hash of the user's fork
        const userRepoResponse = await fetch(`https://api.github.com/repos/${username}/DEMONS-SLAYER-XMD/commits/main`);
        const userRepoCommit = await userRepoResponse.json();
        const userRepoHash = userRepoCommit.sha;

        // Compare commit hashes
        if (originalRepoHash !== userRepoHash) {
            message.innerText = 'Please sync your fork before deploying for updates.';
            forkRepoButton.style.display = 'block';
        } else {
            message.innerText = 'Your fork is up-to-date! Redirecting to Heroku...';
            setTimeout(() => {
                window.location.href = 'https://dashboard.heroku.com/new?template=https://github.com/betingrich4/Whatsapp';
            }, 2000);
        }
    } catch (error) {
        message.innerText = 'An error occurred. Please try again.';
        console.error(error);
    }
});

// Redirect to fork the repo
document.getElementById('forkRepo').addEventListener('click', () => {
    window.location.href = 'https://github.com/Demon-Slayer2/DEMONS-SLAYER-XMD/fork';
});
