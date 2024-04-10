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

// Function to render job listings on the page
function renderJobListings(jobs) {
    // Clear existing job listings
    jobListings.innerHTML = '';

    // Loop through each job listing and create HTML elements to display them
    jobs.forEach(job => {
        const listing = document.createElement('li');
        listing.classList.add('job-listing');
        listing.innerHTML = `
            <h2>${job.jobTitle}</h2>
            <p><strong>Company:</strong> ${job.companyName}</p>
            <p><strong>Industry:</strong> ${job.jobIndustry}</p>
            <p><strong>Type:</strong> ${job.jobType}</p>
            <p><strong>Location:</strong> ${job.jobGeo}</p>
            <p><strong>Description:</strong> ${job.jobExcerpt}</p>
            <a href="${job.url}" target="_blank">Learn More</a>
        `;
        jobListings.appendChild(listing);
    });
}