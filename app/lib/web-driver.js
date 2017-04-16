import jQuery from 'jquery';
import angular from 'angular';
import app from '../app';

class WebDriver {
  constructor(element, scope) {
    this.element = element;
    this.scope = scope;
  }

  digest(callback) {
    this.scope.$digest();
    callback();

    return this;
  }

  click(childName) {
    this.element.find(childName).click();

    return this;
  }

  sendKeys(childName, value) {
    const child = this.element.find(childName);
    child.val(value);
    child.triggerHandler('change');

    return this;
  }

  setModelValue(childName, value) {
    const child = this.element.find(childName);
    const scope = child.isolateScope();
    scope.vm.ngModel.$setViewValue(value);

    return this;
  }

  componentScope(callback) {
    const scope = this.element.isolateScope().vm;

    callback(scope);

    return this;
  }

  submit(childName) {
    const form = this.element.find(childName);
    form.triggerHandler('submit');

    return this;
  }
}


app.service('WebDriver', [
  '$compile',
  '$rootScope',
  function($compile, $rootScope) {
    return function(htmlString, scopeData = {}) {
      let scope = $rootScope.$new(scopeData);
      Object.assign(scope, scopeData);

      let element = $compile(htmlString)(scope);
      element = angular.element(element);

      return new WebDriver(element, scope);
    }
  }
]);
