// Select the form element
const form = document.getElementById('job-filter-form');

// Select the element to display job listings
const jobListings = document.getElementById('job-listings');

// Event listener for form submission
form.addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent default form submission behavior
    
    // Create FormData object from form data
    const formData = new FormData(form);

    // Convert FormData to query string
    const queryParams = new URLSearchParams(formData).toString();

    try {
        // Fetch job listings from API using query parameters
        const response = await fetch(`https://jobicy.com/api/v2/remote-jobs?${queryParams}`);
        
        // Extract JSON data from response
        const data = await response.json();

        // Render job listings on the page
        renderJobListings(data);
    } catch (error) {
        // Log any errors to the console
        console.error('Error fetching job listings:', error);
    }
});