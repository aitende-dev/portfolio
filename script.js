function filterProjects(category) {
    // 1. Manage the 'active' class on buttons
    const buttons = document.querySelectorAll('.filter-buttons button');
    buttons.forEach(btn => {
        // We check if the button text includes the category, strictly for UI highlighting
        // This is a simple way to toggle the active class
        btn.classList.remove('active');
        if(btn.innerText.toLowerCase().includes(category) || 
           (category === 'all' && btn.innerText.toLowerCase().includes('all'))) {
            btn.classList.add('active');
        }
    });

    // 2. Filter the projects
    const projects = document.querySelectorAll('.project-card');

    projects.forEach(project => {
        // Get the category of the project from the data-attribute
        const projectCategory = project.getAttribute('data-category');

        if (category === 'all' || projectCategory === category) {
            project.style.display = 'block'; // Show
        } else {
            project.style.display = 'none'; // Hide
        }
    });
}