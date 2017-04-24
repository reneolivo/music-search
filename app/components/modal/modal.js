import jQuery from 'jquery';
import app from '../../app';

class ModalCmp {
  $onInit() {
    this.isOpen = true;
  }

  close($event) {
    const target = jQuery($event.target);

    if (target.hasClass('modal-background')) {
      this.isOpen = false;
    }
  }
}

app.component('modal', {
  transclude: {
    cover: '?modalCover',
    title: '?modalTitle',
    content: 'modalContent'
  },
  template: require('./modal.pug')(),
  bindings: {
    isOpen: '=?',
  },
  controller: ModalCmp,
  controllerAs: 'vm',
});
