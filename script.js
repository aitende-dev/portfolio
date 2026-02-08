/**
 * Project: Anneke Iten de Leon Portfolio
 * Functionality: Masonry Gallery, Shuffling, Filtering, and Slider
 */

let allProjects = []; // Stores the master list from JSON
let currentProjectImages = []; // Stores images for the currently open project
let currentImageIndex = 0; // Tracks which image is visible in the slider

// 1. INITIAL LOAD
// Fetch the projects from your JSON file
fetch('projects.json')
    .then(response => {
        if (!response.ok) throw new Error("JSON not found");
        return response.json();
    })
    .then(data => {
        allProjects = data.projects;
        // Load the gallery immediately in 'all' mode (randomized)
        renderWall('all');
    })
    .catch(err => console.error("Error loading project data:", err));

// 2. THE GALLERY WALL (Masonry + Randomizer)
function renderWall(category) {
    const grid = document.getElementById('gallery-grid');
    if (!grid) return; // Exit if not on the gallery page

    let imagesPool = [];

    // Filter projects based on the active category
    const activeProjects = category === 'all' 
        ? allProjects 
        : allProjects.filter(p => p.category.toLowerCase() === category.toLowerCase());

    // Loop through projects and extract images
    activeProjects.forEach(p => {
        p.images.forEach(img => {
            // Check if this specific image should be hidden from the main wall
            const isHidden = p.hiddenFromGallery && p.hiddenFromGallery.includes(img);
            if (!isHidden) {
                imagesPool.push({ id: p.id, title: p.title, path: img });
            }
        });
    });

    // SHUFFLE LOGIC (Fisher-Yates)
    // This is what makes the "Museum Wall" different every time
    for (let i = imagesPool.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [imagesPool[i], imagesPool[j]] = [imagesPool[j], imagesPool[i]];
    }

    // Inject HTML into the masonry grid
    grid.innerHTML = imagesPool.map(item => `
        <div class="project-card" onclick="openProject('${item.id}')">
            <img src="website-fotos/${item.path}" alt="${item.title}">
            <div class="overlay">
                <span class="project-hover-title">${item.title}</span>
            </div>
        </div>
    `).join('');
}

// 3. MANUAL RESHUFFLE FUNCTION
function reshuffle() {
    // Find which category button is currently active
    const activeBtn = document.querySelector('.filter-btn.active');
    const currentCategory = activeBtn ? activeBtn.innerText.toLowerCase() : 'all';
    
    // Re-run the render logic (which triggers the shuffle)
    renderWall(currentCategory);
}

// 4. FILTERING LOGIC
function filterGallery(cat, btn) {
    // UI: Update active state of buttons
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    
    // Logic: Re-render the wall for the selected category
    renderWall(cat);
}

// 5. PROJECT DETAIL OVERLAY (The 30/70 Slider)
function openProject(id) {
    const p = allProjects.find(item => item.id === id);
    if (!p) return;

    // Fill Sidebar Metadata
    document.getElementById('det-title').innerText = p.title;
    document.getElementById('det-loc').innerText = p.location;
    document.getElementById('det-year').innerText = p.year;
    document.getElementById('det-role').innerText = p.role;
    document.getElementById('det-desc').innerText = p.description;

    // Set up the image slider
    currentProjectImages = p.images;
    currentImageIndex = 0;
    updateSlider();

    // Show overlay and prevent background scrolling
    const detailView = document.getElementById('detail-view');
    detailView.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function updateSlider() {
    const container = document.getElementById('slider-images');
    const counter = document.getElementById('image-counter');
    
    const imgPath = currentProjectImages[currentImageIndex];
    container.innerHTML = `<img src="website-fotos/${imgPath}" alt="Project Image">`;
    
    // Update the counter text (e.g., 2 / 12)
    counter.innerText = `${currentImageIndex + 1} / ${currentProjectImages.length}`;
}

// Slider Navigation
function nextImage() {
    currentImageIndex = (currentImageIndex + 1) % currentProjectImages.length;
    updateSlider();
}

function prevImage() {
    currentImageIndex = (currentImageIndex - 1 + currentProjectImages.length) % currentProjectImages.length;
    updateSlider();
}

// Close the overlay
function closeProject() {
    document.getElementById('detail-view').classList.add('hidden');
    document.body.style.overflow = 'auto'; // Re-enable scrolling
}

// 6. KEYBOARD SUPPORT
document.addEventListener('keydown', (e) => {
    const detailView = document.getElementById('detail-view');
    // Only work if the project overlay is actually visible
    if (!detailView.classList.contains('hidden')) {
        if (e.key === 'ArrowRight') nextImage();
        if (e.key === 'ArrowLeft') prevImage();
        if (e.key === 'Escape') closeProject();
    }
});

// 7. UTILITY: EMAIL COPY (For Contact Section)
function copyEmail() {
    const email = "iten.an.alt@gmail.com";
    navigator.clipboard.writeText(email).then(() => {
        alert("Email copied to clipboard!");
    });
}