let currentImages = [];
let currentIndex = 0;

async function loadProject() {
    // 1. Get the project ID from the URL (e.g., project.html?id=tragwerk)
    const urlParams = new URLSearchParams(window.location.search);
    const projectId = urlParams.get('id');

    // 2. Fetch your JSON file
    const response = await fetch('projects.json');
    const data = await response.json();

    // 3. Find the specific project
    const project = data.projects.find(p => p.id === projectId);

    if (project) {
        // Update Sidebar
        document.getElementById('proj-title').innerText = project.title;
        document.getElementById('proj-loc').innerText = project.location;
        document.getElementById('proj-year').innerText = project.year;
        document.getElementById('proj-role').innerText = project.role;
        document.getElementById('proj-desc').innerText = project.description;

        // Setup Slider
        currentImages = project.images;
        updateSlider();
    }
}

function updateSlider() {
    const wrapper = document.getElementById('slider-images');
    const counter = document.getElementById('image-counter');
    
    // Using your 'website-fotos/' folder prefix
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

// Initialize on load
loadProject();