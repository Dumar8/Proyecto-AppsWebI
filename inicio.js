function toggleNotifications() {
    const notifications = document.getElementById('notifications');
    if (notifications.style.display === 'none' || notifications.style.display === '') {
        notifications.style.display = 'block';
    } else {
        notifications.style.display = 'none';
    }
}

document.addEventListener('click', function(event) {
    const notifications = document.getElementById('notifications');
    const notificationIcon = document.querySelector('.notification-icon');
    if (!notificationIcon.contains(event.target)) {
        notifications.style.display = 'none';
    }
});
