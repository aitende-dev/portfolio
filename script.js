// Variable to store the full project data once fetched
let allProjects = [];

// 1. Initial Fetch: Load data from JSON and set up the page
fetch('projects.json')
    .then(response => response.json())
    .then(data => {
        allProjects = data.projects;
        renderGallery(allProjects); // Initial render showing 'All'
    })
    .catch(error => console.error('Error loading projects:', error));

// 2. Updated Filter Function
function filterGallery(category, buttonElement) {
    // Update active button styling
    const buttons = document.querySelectorAll('.filter-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    
    // Check if buttonElement exists (passed from HTML) or use event.target
    const activeBtn = buttonElement || event.target;
    activeBtn.classList.add('active');

    // Filter the projects data
    const filteredProjects = category === 'all' 
        ? allProjects 
        : allProjects.filter(project => project.category.toLowerCase() === category.toLowerCase());

    // Re-render the gallery with the filtered list
    renderGallery(filteredProjects);
}

// 3. Render Function (Injects HTML into the grid)
function renderGallery(projectsToDisplay) {
    const grid = document.getElementById('gallery-grid');
    if (!grid) return;

    // Build the gallery HTML
    grid.innerHTML = projectsToDisplay.map(project => `
        <div class="project-card" onclick="openProject('${project.id}')">
            <img src="website-fotos/${project.images[0]}" alt="${project.title}">
            <div class="overlay">
                <div class="project-hover-title">${project.title}</div>
            </div>
        </div>
    `).join('');
}