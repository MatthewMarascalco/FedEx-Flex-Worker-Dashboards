let isEditing = false;

function toggleDropdown() {
    const dropdownMenu = document.getElementById('dropdown-menu');
    dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
}

function toggleFilter() {
    document.getElementById('filter-panel').classList.toggle('active');
}

function toggleEditing() {
    isEditing = !isEditing;
    document.querySelectorAll('.job-item h3, .job-item p').forEach(element => {
        element.contentEditable = isEditing;
        element.classList.toggle('editable', isEditing);
    });
    const editBtn = document.querySelector('.btn-edit');
    if (isEditing) {
        editBtn.textContent = 'Save Changes';
    } else {
        editBtn.textContent = 'Edit Opportunities';
        saveChanges();
    }
}

function saveChanges() {
    document.querySelectorAll('.job-item h3, .job-item p').forEach(element => {
        element.contentEditable = false;
        element.classList.remove('editable');
    });
    alert('Changes saved.');
}

function toggleNotifications() {
    const notificationDropdown = document.getElementById('notification-dropdown');
    const alertIcon = document.querySelector('.alert-icon');
    const countElement = alertIcon.querySelector('.count');

    if (notificationDropdown.style.display === 'none' || notificationDropdown.style.display === '') {
        notificationDropdown.style.display = 'block';
        // Reset the count to 0 when notifications are viewed
        countElement.textContent = '0';
    } else {
        notificationDropdown.style.display = 'none';
    }
}

function toggleForm() {
    const form = document.getElementById('job-form');
    form.classList.toggle('hidden');
}

function saveJob() {
    alert('Save functionality would be implemented here.');
}

function publishJob() {
    const jobTitle = document.getElementById('jobTitle').value;
    const jobDate = document.getElementById('date').value;
    const startTime = document.getElementById('startTime').value;
    const endTime = document.getElementById('endTime').value;
    const location = document.getElementById('location').value;

    if (!jobTitle || !jobDate || !startTime || !endTime || !location) {
        alert('Please fill in all fields before publishing.');
        return;
    }

    const jobList = document.getElementById('job-list');
    const newJob = document.createElement('div');
    newJob.className = 'job-item';
    newJob.innerHTML = `
        <h3>${jobTitle}</h3>
        <p>${jobDate} | ${startTime} - ${endTime}</p>
        <p>${location}</p>
    `;

    jobList.appendChild(newJob);

    document.getElementById('job-form').reset();
    toggleForm();

    alert('Job opportunity published successfully!');
}

function applyFilters() {
    alert('Filters applied');
    toggleFilter();
}

function showReport(jobId) {
    const reportPanel = document.getElementById('report-panel');
    const reportContent = document.getElementById('report-content');
    
    // Simulated data - in a real application, this would come from a database
    const reportData = {
        'job1': {
            title: 'Sorter - East Facility',
            employee: {
                name: 'John Doe',
                contact: '555-0101',
                email: 'john.doe@example.com'
            },
            performance: {
                punctuality: 95,
                attendance: 98,
                efficiency: 92,
                qualityOfWork: 90
            },
            notes: 'Excellent team player, always willing to take on additional tasks.'
        },
        'job2': {
            title: 'Package Handler - Downtown Hub',
            employee: {
                name: 'Jane Smith',
                contact: '555-0202',
                email: 'jane.smith@example.com'
            },
            performance: {
                punctuality: 90,
                attendance: 95,
                efficiency: 88,
                qualityOfWork: 93
            },
            notes: 'Very detail-oriented, but could improve on speed.'
        },
        'job3': {
            title: 'Driver Assistant - North Station',
            employee: {
                name: 'Emily Johnson',
                contact: '555-0303',
                email: 'emily.johnson@example.com'
            },
            performance: {
                punctuality: 85,
                attendance: 92,
                efficiency: 95,
                qualityOfWork: 89
            },
            notes: 'Great with customers, needs improvement on punctuality.'
        }
    };

    const job = reportData[jobId];
    
    reportContent.innerHTML = `
    <div class="report-item">
        <h3>${job.title}</h3>
        <h4>Employee Information</h4>
        <p><strong>Name:</strong> ${job.employee.name}</p>
        <p><strong>Contact:</strong> ${job.employee.contact}</p>
        <p><strong>Email:</strong> ${job.employee.email}</p>
        
        <h4>Performance Metrics</h4>
        <p><strong>Punctuality:</strong> ${job.performance.punctuality}%</p>
        <p><strong>Attendance:</strong> ${job.performance.attendance}%</p>
        <p><strong>Efficiency:</strong> ${job.performance.efficiency}%</p>
        <p><strong>Quality of Work:</strong> ${job.performance.qualityOfWork}%</p>
        
        <h4>Manager's Notes</h4>
        <p>${job.notes}</p>
    </div>
    `;

    reportPanel.classList.add('active');
}

function closeReport() {
    const reportPanel = document.getElementById('report-panel');
    reportPanel.classList.remove('active');
}

function openGoogleMaps() {
    const mapUrl = 'https://www.google.com/maps';
    window.open(mapUrl, '_blank');
}

function logout() {
    window.location.href = 'index.html';
}

document.addEventListener('DOMContentLoaded', function() {
    const timeFilter = document.getElementById('time-filter');
    if (timeFilter) {
        timeFilter.addEventListener('change', function() {
            const selectedTime = this.value;
            document.querySelectorAll('.job-item').forEach(item => {
                const jobTime = item.getAttribute('data-time');
                if (jobTime >= selectedTime) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
            alert('Time filter applied: ' + selectedTime + '\nThis feature is not fully implemented in this demo.');
        });
    }

    const statusFilter = document.getElementById('status-filter');
    if (statusFilter) {
        statusFilter.addEventListener('change', function() {
            const selectedStatus = this.value;
            document.querySelectorAll('.job-item').forEach(item => {
                if (selectedStatus === 'all') {
                    item.style.display = 'block';
                } else if (item.classList.contains(selectedStatus)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
            alert('Status filter applied: ' + selectedStatus + '\nThis feature is not fully implemented in this demo.');
        });
    }

    const searchFilter = document.getElementById('search-filter');
    if (searchFilter) {
        searchFilter.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            document.querySelectorAll('.job-item').forEach(item => {
                const jobTitle = item.querySelector('h3').textContent.toLowerCase();
                const jobDescription = item.querySelector('p').textContent.toLowerCase();
                if (jobTitle.includes(searchTerm) || jobDescription.includes(searchTerm)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    }

    const logoutLink = document.querySelector('#dropdown-menu a[href="#"]:last-child');
    if (logoutLink) {
        logoutLink.addEventListener('click', function(e) {
            e.preventDefault();
            logout();
        });
    }
});