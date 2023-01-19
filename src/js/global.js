export default {
    tooltip: document.querySelector('.tooltip'),
    database: {
        miles: {
            day: {
                stats: [15, 25, 32, 0, 10, 20, 5],
                // subtitles: ['3 AM', '7 AM', '10 AM', '2 PM', '5 PM', '9 PM', '12 PM']
            },
            week: {
                stats: [0, 12, 70, 5, 15, 53, 28],
                // subtitles: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            month: {
                stats: [90, 67, 52, 23, 2, 81, 0],
                // subtitles: ['5', '10', '14', '18', '22', '26', '30'],
            },
        },
        cars: {
            day: {
                stats: [15, 25, 32, 0, 10, 20, 5, 21, 15, 38],
                // subtitles: ['7 AM', '9 AM', '11 AM', '1 PM', '3 PM', '5 PM', '7 PM', '9 PM']
            },
            week: {
                stats: [0, 12, 70, 5, 15, 53, 28, 12, 18, 52],
                // subtitles: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'Mon']
            },
            month: {
                stats: [90, 67, 52, 23, 2, 81, 0, 31, 19, 39],
                // subtitles: ['4', '8', '12', '16', '20', '24', '28', '30'],
            },
        },
        activity: {
            day: {
                stats: [15, 25, 32, 0, 10, 20, 5, 21, 15, 38, 50, 28],
                // subtitles: ['7 AM', '9 AM', '11 AM', '1 PM', '3 PM', '5 PM', '7 PM', '9 PM']
            },
            week: {
                stats: [0, 12, 70, 5, 15, 53, 28, 12, 18, 52, 50, 28],
                // subtitles: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'Mon']
            },
            month: {
                stats: [90, 67, 52, 23, 2, 81, 0, 31, 19, 39, 50, 28],
                // subtitles: ['4', '8', '12', '16', '20', '24', '28', '30'],
            },
        },
        meters: {
            'energy': 0,
            'range': 20,
            'break-fluid': 50,
            'tire-wear': 80
        },
        unreadNotifications: true,
    }
}