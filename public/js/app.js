document.getElementById('bookForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const trainId = document.getElementById('trainId').value;
    const seats = document.getElementById('seats').value;

    const response = await fetch('/api/bookings/book', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('authToken')}` // Use JWT token from localStorage
        },
        body: JSON.stringify({ trainId, seats })
    });

    const data = await response.json();
    if (response.ok) {
        alert('Seats booked successfully');
    } else {
        alert(data.error || 'Failed to book seats');
    }
});
