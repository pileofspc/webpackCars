// import ModalAddNewReminder from "components/modal_addNewReminder";
import Modal from "@components/Modal/Modal";

let modal = new Modal();

const reminder = document.querySelector('.reminder');
const addButton = reminder.querySelector('.reminder__add');

addButton.addEventListener('click', (evt) => {
    document.body.prepend(modal.mainNode)
})