// Further reading:
// https://velesin.io/2016/08/23/unit-testing-angular-1-5-components/

export default function componentSpy(componentName) {
  const component = {};
  const name = componentName + 'Directive';

  componentSpy.$provide.decorator(name, ($delegate) => {
    $delegate[0].template = '';
    $delegate[0].controller = function controller() {
      component.bindings = this;
    };

    return $delegate;
  });

  return component;
};
