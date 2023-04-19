import Component from '@components/Component/Component';
import './Header.scss';

export default class Header extends Component {
    html = // html
        `<header class="header page__header">
            <div class="header__inner">
                <label class="searchbar header__searchbar">
                    <img src="assets/img/searchbar__icon.svg" alt="Search" class="searchbar__icon">
                        <form action="" method="get" class="searchbar__form">
                            <input class="searchbar__input" type="text" placeholder="Search or type">
                        </form>
                </label>
                <div class="header__user">
                    <a href="bell.html" class="notification-bell header__notification-bell">
                        <img src="assets/img/notification-bell.svg" alt="Bell" class="notification-bell__img">
                    </a>
                    <a href="profile.html" class="profile header__profile">
                        <img src="assets/img/avatar.jpg" alt="Avatar" class="profile__img">
                    </a>
                </div>
            </div>
        </header>`;

    constructor() {
        super();
        this._init(this.html);

        
    }
}