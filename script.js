// Sample data for job opportunities
const jobOpportunities = [
    { id: 'job1', title: 'Sorter - East Facility', description: '', date: 'June 18, 2024', time: '2:00 PM - 10:00 PM', location: '789 Industrial Pkwy, Downtown', certifications: { driversLicense: false, forkliftCertified: false }, published: true, urgency: 'High', applicants:10, laborHours: 8, weatherForecast: 'Sunny, 75°F' },
    { id: 'job2', title: 'Package Handler - Downtown Hub', description: '', date: 'June 15, 2024', time: '8:00 AM - 4:00 PM', location: '123 Main St, Springfield', certifications: { driversLicense: false, forkliftCertified: false }, published: true, urgency: 'Low', applicants: 10, laborHours: 8, weatherForecast: 'Cloudy, 60°F' },
    { id: 'job3', title: 'Driver Assistant - North Station', description: '', date: 'June 20, 2024', time: '9:00 AM - 5:00 PM', location: '456 Oak Rd, Northville', certifications: { driversLicense: true, forkliftCertified: false }, published: true, urgency: 'Normal', applicants: 5, laborHours: 10, weatherForecast: 'Rain, 71°F' }
];

let savedJobs = [];

// Sample data for claimed jobs
const claimedJobs = [
    { id: 'job1', title: 'Sorter - East Facility', description: '', date: 'June 18, 2024', time: '2:00 PM - 10:00 PM', location: '789 Industrial Pkwy, Easttown', certifications: { driversLicense: false, forkliftCertified: false }, published: true, workersAssigned: 10, completionStatus: 'In Progress', weatherForecast: 'Rain, 71°F' },
    { id: 'job2', title: 'Package Handler - Downtown Hub', description: '', date: 'June 15, 2024', time: '8:00 AM - 4:00 PM', location: '123 Main St, Springfield', certifications: { driversLicense: false, forkliftCertified: false }, published: true, workersAssigned: 10, completionStatus: 'In Progress', weatherForecast: 'Rain, 71°F' }
];

// Function to populate job lists
function populateJobs() {
    updateJobDisplay([...jobOpportunities, ...claimedJobs]);
}

// Function to create a job item
function createJobItem(job, isClaimed) {
    const template = document.getElementById('job-item-template');
    const jobItem = template.content.cloneNode(true);

    // Populate job details
    jobItem.querySelector('.job-title').textContent = job.title;
    jobItem.querySelector('.job-description').textContent = job.description || '';
    jobItem.querySelector('.job-date-time').textContent = `${job.date} | ${job.time}`;
    jobItem.querySelector('.job-location').textContent = job.location;
    jobItem.querySelector('.job-certifications').textContent = `Certifications: ${job.certifications.driversLicense ? 'Driver\'s License, ' : ''}${job.certifications.forkliftCertified ? 'Forklift Certified' : ''}`;

    const additionalInfo = jobItem.querySelector('.job-additional-info');
    if (isClaimed) {
        additionalInfo.querySelector('.job-workers-assigned').textContent = `Workers Assigned: ${job.workersAssigned || 0}`;
        additionalInfo.querySelector('.job-completion-status').textContent = `Status: ${job.completionStatus || 'Not Started'}`;
        additionalInfo.querySelector('.job-urgency').remove();
        additionalInfo.querySelector('.job-applicants').remove();
        additionalInfo.querySelector('.job-labor-hours').remove();
    } else {
        additionalInfo.querySelector('.job-urgency').textContent = `Urgency: ${job.urgency}`;
        additionalInfo.querySelector('.job-urgency').dataset.urgency = job.urgency;
        additionalInfo.querySelector('.job-applicants').textContent = `Applicants: ${job.applicants}`;
        additionalInfo.querySelector('.job-labor-hours').textContent = `Estimated Labor Hours: ${job.laborHours}`;
        additionalInfo.querySelector('.job-workers-assigned').remove();
        additionalInfo.querySelector('.job-completion-status').remove();
    }
    additionalInfo.querySelector('.job-weather-forecast').textContent = `Weather: ${job.weatherForecast}`;

    const actionsContainer = jobItem.querySelector('.job-actions');
    if (!job.published && !isClaimed) {
        const publishButton = document.createElement('button');
        publishButton.textContent = 'Publish';
        publishButton.onclick = () => publishSavedJob(job.id);
        actionsContainer.appendChild(publishButton);
    }
    if (isClaimed) {
        const reportButton = document.createElement('button');
        reportButton.textContent = 'View Report';
        reportButton.className = 'report-btn';
        reportButton.onclick = () => showReport(job.id);
        actionsContainer.appendChild(reportButton);
    }

    return jobItem.querySelector('.job-item');
}

// Helper function to get weather forecast (mock data)
function getWeatherForecast(location) {
    // In a real application, this would call a weather API
    const forecasts = ['Sunny, 75°F', 'Cloudy, 68°F', 'Rainy, 62°F', 'Partly Cloudy, 70°F'];
    return forecasts[Math.floor(Math.random() * forecasts.length)];
}

// Function to publishSaved job
function publishSavedJob(jobId) {
    const jobIndex = savedJobs.findIndex(job => job.id === jobId);
    if (jobIndex !== -1) {
        const job = savedJobs[jobIndex];
        job.published = true;
        jobOpportunities.push(job);
        savedJobs.splice(jobIndex, 1);
        updateJobDisplay([...jobOpportunities, ...savedJobs, ...claimedJobs]);
        alert('Job published successfully!');
    }
}

// Function to toggle notifications
function toggleNotifications() {
    const notificationDropdown = document.getElementById('notification-dropdown');
    const alertIcon = document.querySelector('.alert-icon');
    const countElement = alertIcon.querySelector('.count');

    if (notificationDropdown.style.display === 'none' || notificationDropdown.style.display === '') {
        notificationDropdown.style.display = 'block';
        // Reset the counter to 0
        countElement.textContent = '0';
        // Hide the count element when it's 0
        countElement.style.display = 'none';
    } else {
        notificationDropdown.style.display = 'none';
    }
}

function addNotification(title, message) {
    const notificationDropdown = document.getElementById('notification-dropdown');
    const alertIcon = document.querySelector('.alert-icon');
    const countElement = alertIcon.querySelector('.count');

    // Create new notification item
    const notificationItem = document.createElement('div');
    notificationItem.className = 'notification-item';
    notificationItem.innerHTML = `
        <h4>${title}</h4>
        <p>${message}</p>
    `;
    notificationDropdown.appendChild(notificationItem);

    // Update the counter
    let currentCount = parseInt(countElement.textContent);
    countElement.textContent = currentCount + 1;
    countElement.style.display = 'block';
}

// Function to toggle user dropdown
function toggleDropdown() {
    const dropdownMenu = document.getElementById('dropdown-menu');
    dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
}

// Function to toggle job form
function toggleForm() {
    const formContainer = document.getElementById('job-form');
    formContainer.classList.toggle('hidden');
}

// Function to toggle editing mode
let isEditing = false;
function toggleEditing() {
    isEditing = !isEditing;
    const editBtn = document.querySelector('.btn-edit');
    editBtn.textContent = isEditing ? 'Save Changes' : 'Edit Opportunities';

    const jobItems = document.querySelectorAll('.job-item h3, .job-item p');
    jobItems.forEach(item => {
        item.contentEditable = isEditing;
        item.classList.toggle('editable', isEditing);
    });

    if (!isEditing) {
        saveChanges();
    }
}

// Function to save changes
function saveChanges() {
    // In a real application, you would send the updated data to a server here
    alert('Changes saved.');
}

// Function to apply filters
function applyFilters() {
    const opportunityType = document.getElementById('opportunity-type').value;
    const location = document.getElementById('location-filter').value;
    const date = document.getElementById('date-filter').value;
    const time = document.getElementById('time-filter').value;

    let filteredJobs = [];

    if (opportunityType === 'both') {
        filteredJobs = [...jobOpportunities, ...claimedJobs];
    } else if (opportunityType === 'work') {
        filteredJobs = [...jobOpportunities];
    } else if (opportunityType === 'claimed') {
        filteredJobs = [...claimedJobs];
    }

    // Apply other filters
    filteredJobs = filteredJobs.filter(job => {
        // Location filter
        if (location && !job.location.toLowerCase().includes(location.toLowerCase())) return false;

        // Date filter
        if (date) {
            const jobDate = parseDate(job.date);
            if (jobDate !== date) return false;
        }

        // Time filter (unchanged)
        if (time) {
            const [startTime] = job.time.split(' - ');
            const [hours, minutes, period] = startTime.match(/(\d+):(\d+)\s*(AM|PM)/).slice(1);
            let jobStartHour = parseInt(hours);
            if (period === 'PM' && jobStartHour !== 12) jobStartHour += 12;
            if (period === 'AM' && jobStartHour === 12) jobStartHour = 0;
            
            if (time === 'morning' && (jobStartHour >= 12 || jobStartHour < 6)) return false;
            if (time === 'afternoon' && (jobStartHour < 12 || jobStartHour >= 17)) return false;
            if (time === 'evening' && (jobStartHour < 17 || jobStartHour >= 22)) return false;
        }

        return true;
    });

    // Update the displayed jobs
    updateJobDisplay(filteredJobs);
}

// Helper function to parse date string
// Helper function to parse date string
function parseDate(dateString) {
    const [month, day, year] = dateString.split(' ');
    const months = {
        'January': 0, 'February': 1, 'March': 2, 'April': 3, 'May': 4, 'June': 5,
        'July': 6, 'August': 7, 'September': 8, 'October': 9, 'November': 10, 'December': 11
    };
    return `${year}-${(months[month] + 1).toString().padStart(2, '0')}-${day.replace(',', '').padStart(2, '0')}`;
}

function populateJobList(containerElement, jobs, isClaimed) {
    containerElement.innerHTML = '';
    jobs.forEach(job => {
        const jobItem = createJobItem(job, isClaimed);
        containerElement.appendChild(jobItem);
    });
}

// Function to save job
function saveJob() {
    const newJob = createJobObject();
    if (newJob) {
        savedJobs.push(newJob);
        clearFormFields();
        toggleForm();
        updateJobDisplay([...jobOpportunities, ...savedJobs, ...claimedJobs]);
        alert('Job opportunity saved successfully!');
    }
}

// Function to clear form fields
function clearFormFields() {
    document.getElementById('jobTitle').value = '';
    document.getElementById('jobDescription').value = '';
    document.getElementById('date').value = '';
    document.getElementById('startTime').value = '';
    document.getElementById('endTime').value = '';
    document.getElementById('location').value = '';
    document.getElementById('drivers-license').checked = false;
    document.getElementById('forklift-certified').checked = false;
}

// Function to publish job
function publishJob() {
    const newJob = createJobObject();
    if (newJob) {
        newJob.published = true;
        jobOpportunities.push(newJob);
        clearFormFields();
        toggleForm();
        updateJobDisplay([...jobOpportunities, ...savedJobs, ...claimedJobs]);
        alert('Job opportunity published successfully!');
    }
}
function createJobObject() {
    const jobTitle = document.getElementById('jobTitle').value;
    const jobDescription = document.getElementById('jobDescription').value;
    const jobDate = document.getElementById('date').value;
    const startTime = document.getElementById('startTime').value;
    const endTime = document.getElementById('endTime').value;
    const location = document.getElementById('location').value;
    const driversLicense = document.getElementById('drivers-license').checked;
    const forkliftCertified = document.getElementById('forklift-certified').checked;

    if (!jobTitle || !jobDescription || !jobDate || !startTime || !endTime || !location) {
        alert('Please fill in all fields before saving or publishing.');
        return null;
    }

    const laborHours = calculateLaborHours(startTime, endTime);

    return {
        id: `job${Date.now()}`,
        title: jobTitle,
        description: jobDescription,
        date: formatDate(new Date(jobDate)),
        time: `${formatTime(startTime)} - ${formatTime(endTime)}`,
        location: location,
        certifications: {
            driversLicense: driversLicense,
            forkliftCertified: forkliftCertified
        },
        published: false,
        urgency: 'Normal',
        applicants: 0,
        laborHours: laborHours,
        weatherForecast: getWeatherForecast(location)
    };
}

// Helper function to calculate labor hours
function calculateLaborHours(startTime, endTime) {
    const start = new Date(`2000-01-01T${startTime}`);
    const end = new Date(`2000-01-01T${endTime}`);
    let hours = (end - start) / (1000 * 60 * 60);
    
    // If end time is earlier than start time, assume it's the next day
    if (hours < 0) {
        hours += 24;
    }
    
    return hours;
}
function formatDate(date) {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}
function formatTime(timeString) {
    const [hours, minutes] = timeString.split(':');
    const date = new Date(2000, 0, 1, hours, minutes);
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
}

function updateJobDisplay(jobs) {
    const jobList = document.getElementById('job-list');
    const claimedJobsList = document.getElementById('claimed-jobs-list');

    jobList.innerHTML = '';
    claimedJobsList.innerHTML = '';

    jobs.forEach(job => {
        const jobItem = createJobItem(job, job.hasOwnProperty('workersAssigned'));
        if (job.hasOwnProperty('workersAssigned')) {
            claimedJobsList.appendChild(jobItem);
        } else {
            jobList.appendChild(jobItem);
        }
    });
}

// Function to show report
function showReport(jobId) {
    const reportPopup = document.getElementById('report-popup');
    const reportContent = document.getElementById('report-content');
    
    // Sample report data - in a real application, this would come from a server
    const reportData = {
        'job1': {
            title: 'Sorter - East Facility',
            date: 'June 18, 2024',
            time: '2:00 PM - 10:00 PM',
            unclaimed: 10,
            total: 20,
            employees: [
                { name: 'Jane Smith', phone: '(662) 555-5555', email: 'jane.smith@example.com', punctuality: 98, attendance: 98, comments: 'Reliable' },
                { name: 'John Doe', phone: '(662) 555-5555', email: 'jon.doe@example.org', punctuality: 99, attendance: 99, comments: 'Slow but steady' },
                { name: 'Edward Luke', phone: '(662) 555-5555', email: 'ed.luke123@example.net', punctuality: 90, attendance: 90, comments: 'Born leader' },
                { name: 'Sterling Bob', phone: '(662) 555-5555', email: 'sterling.bab@example.usa', punctuality: 91, attendance: 91, comments: 'Quiet but productive' },
                { name: 'Heather Brown', phone: '(662) 555-5555', email: 'heather.brown@example.us', punctuality: 87, attendance: 87, comments: '' },
                { name: 'Robert Pearl', phone: '(662) 555-5555', email: 'robertp@example.com', punctuality: 55, attendance: 55, comments: '' },
                { name: 'Albert Moe', phone: '(662) 555-5555', email: 'am124@example.com', punctuality: 90, attendance: 90, comments: '' },
                { name: 'Billy Bob', phone: '(662) 555-5555', email: 'bb@example.com', punctuality: 89, attendance: 89, comments: '' },
                { name: 'Joe Moore', phone: '(662) 555-5555', email: 'joeamoore@example.com', punctuality: 99, attendance: 99, comments: '' },
                { name: 'Clyde Weber', phone: '(662) 555-5555', email: 'clyde@example.com', punctuality: 100, attendance: 100, comments: '' }
            ]
        },
        'job2': {
            title: 'Package Handler - Downtown Hub',
            date: 'June 15, 2024',
            time: '8:00 AM - 4:00 PM',
            unclaimed: 5,
            total: 15,
            employees: [
                { name: 'Alice Johnson', phone: '(662) 555-5556', email: 'alice.j@example.com', punctuality: 95, attendance: 97, comments: 'Fast learner' },
                { name: 'Bob Smith', phone: '(662) 555-5557', email: 'bob.smith@example.org', punctuality: 92, attendance: 94, comments: 'Team player' }
                // Add more employees as needed
            ]
        }
    };

    const report = reportData[jobId];
    
    if (report) {
        reportContent.innerHTML = `
            <div class="report-summary">
                <h3>${report.title}</h3>
                <p>${report.date} | ${report.time}</p>
                <p>${report.unclaimed} Unclaimed / ${report.total} Total</p>
            </div>
            <table class="report-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Email</th>
                        <th>Punct. %</th>
                        <th>Atten. %</th>
                        <th>Manager Comments</th>
                    </tr>
                </thead>
                <tbody>
                    ${report.employees.map(emp => `
                        <tr>
                            <td>${emp.name}</td>
                            <td>${emp.phone}</td>
                            <td>${emp.email}</td>
                            <td>${emp.punctuality}</td>
                            <td>${emp.attendance}</td>
                            <td>${emp.comments}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;
        reportPopup.style.display = 'block';
    } else {
        alert('Report not found for this job.');
    }
}

// Function to close report
function closeReport() {
    const reportPopup = document.getElementById('report-popup');
    reportPopup.style.display = 'none';
}

function showAlertDetails(alertType) {
    const popup = document.getElementById('alert-details-popup');
    const title = document.getElementById('alert-details-title');
    const content = document.getElementById('alert-details-content');
    
    // Set the title based on the alert type
    title.textContent = getAlertTitle(alertType);
    
    // Get and display the alert details
    const details = getAlertDetails(alertType);
    content.innerHTML = details;
    
    // Show the popup
    popup.style.display = 'block';
}

function closeAlertDetails() {
    const popup = document.getElementById('alert-details-popup');
    popup.style.display = 'none';
}

function getAlertTitle(alertType) {
    switch(alertType) {
        case 'unclaimed-24': return 'Unclaimed Jobs (24 hours)';
        case 'unclaimed-48': return 'Unclaimed Jobs (48 hours)';
        case 'shifts-coverage': return 'Shifts Needing Coverage';
        case 'time-off': return 'Pending Time-Off Requests';
        default: return 'Alert Details';
    }
}

function getAlertDetails(alertType) {
    // In a real application, this data would come from your backend
    const alertData = {
        'unclaimed-24': [
            { title: 'Package Handler - Downtown', date: 'June 16, 2024' },
            { title: 'Sorter - North Facility', date: 'June 16, 2024' }
        ],
        'unclaimed-48': [
            { title: 'Driver Assistant - West Route', date: 'June 15, 2024' },
            { title: 'Warehouse Associate - East Hub', date: 'June 15, 2024' }
        ],
        'shifts-coverage': [
            { title: 'Night Shift Sorter', date: 'June 18, 2024', employee: 'John Doe' },
            { title: 'Afternoon Driver', date: 'June 19, 2024', employee: 'Jane Smith' },
            { title: 'Morning Package Handler', date: 'June 20, 2024', employee: 'Bob Johnson' }
        ],
        'time-off': [
            { employee: 'Alice Brown', startDate: 'June 25, 2024', endDate: 'June 30, 2024' },
            { employee: 'Charlie Davis', startDate: 'July 1, 2024', endDate: 'July 5, 2024' },
            { employee: 'Eva White', startDate: 'July 10, 2024', endDate: 'July 12, 2024' },
            { employee: 'Frank Miller', startDate: 'July 15, 2024', endDate: 'July 16, 2024' },
            { employee: 'Grace Taylor', startDate: 'July 20, 2024', endDate: 'July 25, 2024' }
        ]
    };

    const data = alertData[alertType] || [];
    let detailsHTML = '<ul>';

    switch(alertType) {
        case 'unclaimed-24':
        case 'unclaimed-48':
            data.forEach(job => {
                detailsHTML += `<li>${job.title} - ${job.date}</li>`;
            });
            break;
        case 'shifts-coverage':
            data.forEach(shift => {
                detailsHTML += `<li>${shift.title} - ${shift.date} (${shift.employee})</li>`;
            });
            break;
        case 'time-off':
            data.forEach(request => {
                detailsHTML += `<li>${request.employee}: ${request.startDate} to ${request.endDate}</li>`;
            });
            break;
    }

    detailsHTML += '</ul>';
    return detailsHTML;
}

function navigateTo(page) {
    window.location.href = page;
}


// Function to open Google Maps
function openGoogleMaps() {
    window.open('https://www.google.com/maps', '_blank');
}

// Function to handle logout
function logout() {
    // In a real application, you would handle the logout process here
    alert('Logging out...');
    window.location.href = 'index.html'; // Redirect to login page
}

// Initialize the dashboard when the page loads
document.addEventListener('DOMContentLoaded', function() {
    populateJobs();
    
    // Add event listener to the Apply Filters button
    document.querySelector('button[onclick="applyFilters()"]').addEventListener('click', applyFilters);
});
