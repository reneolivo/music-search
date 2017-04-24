import jQuery from 'jquery';
import app from '../../app';

class ModalCmp {
  $onInit() {
    this.isOpen = true;
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
