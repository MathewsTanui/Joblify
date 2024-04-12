// CORS proxy configuration
const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
const apiUrl = 'https://jobicy.com/api/v2/remote-jobs?tag=javascript';

document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('#job-filter-form');
    const jobListings = document.querySelector('#job-listings');

    form.addEventListener('submit', async function(event) {
        event.preventDefault(); // Prevent default form submission behavior
        
        // Create FormData object from form data
        const formData = new FormData(form);

        // Convert FormData to query string
        const queryParams = new URLSearchParams(formData).toString();

        try {
            // Fetch job listings from API using the proxy
            const response = await fetch(`${proxyUrl}${apiUrl}?${queryParams}`, {
                method: 'GET', // Specify the GET method
                headers: {
                    'Content-Type': 'application/json'
                },
                mode: 'cors'
            });
            
            // Check if the response is OK
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            // Extract JSON data from response
            const data = await response.json();

            // Render job listings on the page
            renderJobListings(data);

        } catch (error) {
            // Display an error message to the user
            jobListings.innerHTML = '<p>Error fetching job listings. Please try again later.</p>';
            // Log any errors to the console
            console.error('Error fetching job listings:', error);
        }
    });

    // Function to render job listings on the page
    function renderJobListings(jobs) {
        // Clear existing job listings
        jobListings.innerHTML = '';

        // If there are no job listings, display a message
        if (jobs.length === 0) {
            jobListings.innerHTML = '<p>No job listings found.</p>';
        } else {
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
    }
});

