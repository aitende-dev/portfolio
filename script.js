let allProjects = [];

fetch('projects.json')
    .then(response => response.json())
    .then(data => {
        allProjects = data.projects;
        renderWall('all');
    });

function renderWall(category) {
    const grid = document.getElementById('gallery-grid');
    let imagesPool = [];

    const activeProjects = category === 'all' 
        ? allProjects 
        : allProjects.filter(p => p.category.toLowerCase() === category.toLowerCase());

    activeProjects.forEach(p => {
        p.images.forEach(img => {
            const isHidden = p.hiddenFromGallery && p.hiddenFromGallery.includes(img);
            if (!isHidden) {
                imagesPool.push({ id: p.id, title: p.title, path: img });
            }
        });
    });

    // Shuffle
    for (let i = imagesPool.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [imagesPool[i], imagesPool[j]] = [imagesPool[j], imagesPool[i]];
    }

    grid.innerHTML = imagesPool.map(item => `
        <div class="project-card" onclick="openProject('${item.id}')">
            <img src="website-fotos/${item.path}" alt="${item.title}">
            <div class="overlay">
                <div class="project-hover-title">${item.title}</div>
            </div>
        </div>
    `).join('');
}

function openProject(id) {
    const p = allProjects.find(item => item.id === id);
    if (!p) return;

    document.getElementById('det-title').innerText = p.title;
    document.getElementById('det-loc').innerText = p.location;
    document.getElementById('det-year').innerText = p.year;
    document.getElementById('det-role').innerText = p.role;
    document.getElementById('det-desc').innerText = p.description;
    
    document.getElementById('det-images').innerHTML = p.images.map(img => 
        `<img src="website-fotos/${img}" alt="${p.title}">`
    ).join('');
    
    document.getElementById('detail-view').classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function closeProject() {
    document.getElementById('detail-view').classList.add('hidden');
    document.body.style.overflow = 'auto';
}

function showPage(pageId) {
    document.querySelectorAll('.content-page').forEach(p => p.classList.add('hidden'));
    document.getElementById('page-' + pageId).classList.remove('hidden');
    document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
    document.getElementById('link-' + pageId).classList.add('active');
    document.getElementById('detail-view').classList.add('hidden');
    document.body.style.overflow = 'auto';
}

function filterGallery(cat, btn) {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderWall(cat);
}

function copyEmail() {
    navigator.clipboard.writeText('iten.an.alt@gmail.com');
    alert('Email copied');
}