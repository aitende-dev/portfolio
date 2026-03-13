let currentImages = [];
let currentIndex = 0;

async function loadProject() {
    // 1. Get the ID from the URL (e.g., project-detail.html?id=urban-housing)
    const urlParams = new URLSearchParams(window.location.search);
    const projectId = urlParams.get('id');

    try {
        const response = await fetch('projects.json');
        const data = await response.json();

        // 2. Find the project
        const project = data.projects.find(p => p.id === projectId);

        if (project) {
            // Update Text Content
            document.getElementById('proj-title').innerText = project.title;
            document.getElementById('proj-loc').innerText = project.location;
            document.getElementById('proj-year').innerText = project.year;
            document.getElementById('proj-role').innerText = project.role;
            document.getElementById('proj-desc').innerHTML = `<p>${project.description}</p>`;

            // 3. Set Images (We use ALL images here, ignoring hiddenFromGallery)
            currentImages = project.images;
            updateSlider();
            
            // Set Page Title for Browser Tab
            document.title = `${project.title} | Anneke Iten de Leon`;
        } else {
            document.getElementById('proj-title').innerText = "Project Not Found";
        }
    } catch (error) {
        console.error("Error fetching project data:", error);
    }
}

function updateSlider() {
    const wrapper = document.getElementById('slider-images');
    const counter = document.getElementById('image-counter');
    
    // Path includes your "website-fotos" folder
    wrapper.innerHTML = `<img src="website-fotos/${currentImages[currentIndex]}" alt="Project Image">`;
    counter.innerText = `${currentIndex + 1} / ${currentImages.length}`;
}

function nextImage() {
    currentIndex = (currentIndex + 1) % currentImages.length;
    updateSlider();
}

function prevImage() {
    currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
    updateSlider();
}

// Support for Arrow Keys
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') nextImage();
    if (e.key === 'ArrowLeft') prevImage();
});

loadProject();