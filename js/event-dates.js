document.addEventListener('DOMContentLoaded', function() {
    // Dynamic date updates for events
    function updateEventDates() {
        const eventDates = document.querySelectorAll('.event-date');
        const today = new Date();
        
        eventDates.forEach(dateEl => {
            const dayEl = dateEl.querySelector('.day');
            const monthEl = dateEl.querySelector('.month');
            
            if (dayEl && monthEl) {
                const eventDate = new Date(today.getFullYear(), getMonthNumber(monthEl.textContent), parseInt(dayEl.textContent));
                const timeDiff = eventDate.getTime() - today.getTime();
                const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
                
                if (daysDiff <= 7 && daysDiff > 0) {
                    dateEl.classList.add('upcoming');
                    dateEl.style.animation = 'pulse 2s infinite';
                }
            }
        });
    }

    function getMonthNumber(monthName) {
        const months = {
            'JAN': 0, 'FEB': 1, 'MAR': 2, 'APR': 3, 'MAY': 4, 'JUN': 5,
            'JUL': 6, 'AUG': 7, 'SEP': 8, 'OCT': 9, 'NOV': 10, 'DEC': 11
        };
        return months[monthName] || 0;
    }

    // Run the date updates
    updateEventDates();
});