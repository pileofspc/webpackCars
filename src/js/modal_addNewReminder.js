import AirDatepicker from "air-datepicker";
import 'air-datepicker/air-datepicker.css';
import { Modal } from "./modal";

export class ModalAddNewReminder extends Modal {
    constructor() {
        super();
        this.modal.classList.add('modal-add-new-reminder');
        this.headerSpan.textContent = `New Reminder`;
        this.content.innerHTML = 
            `<form class="modal-add-new-reminder__form" action="" method="POST">
                <div class="modal-add-new-reminder__field modal-add-new-reminder__field_description">
                    <label class="modal-add-new-reminder__label" for="modal-add-new-reminder__description">
                        Description
                    </label>
                    <input class="modal-add-new-reminder__input" type="text" name="reminder-description" id="modal-add-new-reminder__description">
                </div>

                <div class="modal-add-new-reminder__field modal-add-new-reminder__field_due">
                    <label class="modal-add-new-reminder__label" for="modal-add-new-reminder__due">
                        Due
                    </label>
                    <input class="modal-add-new-reminder__input" type="text" name="reminder-due" id="modal-add-new-reminder__due">
                </div>

                <div class="modal-add-new-reminder__field modal-add-new-reminder__field_overdue">
                    <label class="modal-add-new-reminder__label" for="modal-add-new-reminder__overdue">
                        Overdue
                    </label>
                    <input class="modal-add-new-reminder__input" type="text" name="reminder-overdue" id="modal-add-new-reminder__overdue">
                </div>

                <div class="modal-add-new-reminder__field modal-add-new-reminder__field_notify">
                    <label class="modal-add-new-reminder__label" for="modal-add-new-reminder__notify">
                        Notify
                    </label>
                    <input class="modal-add-new-reminder__input" type="text" name="reminder-notify" id="modal-add-new-reminder__notify">
                </div>
                <button class="modal-add-new-reminder__submit" type="submit">Submit</button>
            </form>`;

        this.form = this.modal.querySelector('form');
        this.submit = this.modal.querySelector('.modal-add-new-reminder__submit');

        this.form.addEventListener('submit', (evt) => {
            this.modal.remove();
        });

        this.dueDate = this.modal.querySelector('#modal-add-new-reminder__due');
        this.overdueDate = this.modal.querySelector('#modal-add-new-reminder__overdue');
        
        new AirDatepicker(this.dueDate, {
            classes: 'datepicker',
            dateFormat: 'dd/MM/yy',
            autoClose: true
            });
        new AirDatepicker(this.overdueDate, {
            classes: 'datepicker',
            dateFormat: 'dd/MM/yy',
            autoClose: true
        });
    }
}