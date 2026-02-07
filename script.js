document.addEventListener('DOMContentLoaded', function() {
    
    // Only run this code on the projects page
    const filters = document.getElementById('filters');
    if(!filters) return;

    const items = document.querySelectorAll('.gallery-item');
    const filterDesc = document.getElementById('filter-desc');
    
    // Description text map
    const descriptions = {
        'all': 'Showing all selected works.',
        'studio': 'Academic projects completed during Masters and Bachelors.',
        'internship': 'Professional work completed at design firms.',
        'personal': 'Competitions, photography, and personal research.',
        'other': 'Furniture design and fabrication experiments.'
    };

    filters.addEventListener('click', function(e) {
        if(e.target.tagName === 'LI') {
            
            // 1. Update Active State in Menu
            document.querySelectorAll('#filters li').forEach(li => li.classList.remove('active'));
            e.target.classList.add('active');

            // 2. Filter Images
            const category = e.target.getAttribute('data-filter');
            
            items.forEach(item => {
                if(category === 'all' || item.getAttribute('data-category') === category) {
                    item.style.display = 'block'; // Show
                } else {
                    item.style.display = 'none'; // Hide
                }
            });

            // 3. Update Description
            if(descriptions[category]) {
                filterDesc.innerHTML = `<p>${descriptions[category]}</p>`;
            }
        }
    });
});
