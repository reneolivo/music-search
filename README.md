# music-search
A music search app using the Spotify API


### Instructions

1. Run `npm install`. Make sure to install *dev-dependencies*.
2. View the application and make changes run: `npm run start:dev`.
3. Build productions files: `npm run build`.
4. Run on production: `npm start`.
5. Run the tests execute: `npm run test`.
6. for **TDD** run `npm run test:dev`.


### Description

The project was created using **AngularJS**, **SASS** as the style processor, **Pug** for templating, **Jasmine** and **Karma** for Unit Testing, and **Webpack** as the orchestrator.

The application is divided into small components that are ease to modify. They can be found at <a href="app/components">/app/components</a>. Each component's folder has a *.scss* file that is loaded automatically, a *.pug* file for the view, a *.spec.js* for testing, and the actual component *.js*.

For Unit Testing I used a *component based testing* using a "Web Driver" (<a href="app/lib/web-driver.js">/app/lib/web-driver.js</a>) that allows to check not only the controllers, but also the bindings and interactions just like a normal user would by clicking certain properties of the component. An example of its use can be found at <a href="app/components/modal/modal.spec.js">/app/components/modal/modal.spec.js</a>.

Since Unit Tests should be isolated as much as possible, I created a component spy function (<a href="app/lib/component-spy.js">/app/lib/component-spy.js</a>) that allows to replace a component for a dummy version, but it still allows to check if the component under test is passing the right bindings to the child component, as well as listening to its triggered events.
