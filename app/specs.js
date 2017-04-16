import 'angular';
import jQuery from 'jquery';
import 'angular-mocks';
import './lib/web-driver';

beforeEach(angular.mock.module('music-search'));

afterEach(() => jQuery('body').empty());

const tests = require.context(".", true, /\.spec\.js$/);
tests.keys().forEach(tests);
