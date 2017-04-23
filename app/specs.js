import 'angular';
import jQuery from 'jquery';
import 'angular-mocks';
import './lib/web-driver';
import componentSpy from './lib/component-spy';

global.componentSpy = componentSpy;

beforeEach(angular.mock.module('music-search', function($provide) {
  componentSpy.$provide = $provide;
}));

afterEach(() => jQuery('body').empty());

const tests = require.context(".", true, /\.spec\.js$/);
tests.keys().forEach(tests);
