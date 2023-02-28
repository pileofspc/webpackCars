import api from '/src/07_shared/api.js';

export class NotificationBellApi {
    check() {
        return api.database.unreadNotifications ? true : false;
    }
}
