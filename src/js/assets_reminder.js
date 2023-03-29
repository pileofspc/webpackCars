import ModalAddNewReminder from "components/modal_addNewReminder";

let modal = new ModalAddNewReminder();

const reminder = document.querySelector('.reminder');
const addButton = reminder.querySelector('.reminder__add');

addButton.addEventListener('click', (evt) => {
    modal.prepend(document.body);
})