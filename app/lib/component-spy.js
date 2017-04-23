// Further reading:
// https://velesin.io/2016/08/23/unit-testing-angular-1-5-components/

export default function componentSpy(componentName, definitions = {}) {
  const component = {};
  const name = componentName + 'Directive';

  componentSpy.$provide.decorator(name, ($delegate) => {
    Object.assign($delegate[0], definitions);

    $delegate[0].template = '';
    $delegate[0].controller = function() {
      component.bindings = this;
    };

    return $delegate;
  });

  return component;
};
