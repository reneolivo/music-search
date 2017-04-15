import app from '../../app';

app.component('modal', {
  transclude: {
    cover: '?modalCover',
    title: '?modalTitle',
    content: 'modalContent'
  },
  template: require('./modal.pug')()
});
