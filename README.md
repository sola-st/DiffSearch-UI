# DiffSearch-UI

## General information about the angular project

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.1.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

# Diffsearch-UI

Install Angular CLI globally.

npm i -g @angular/cli

In DiffSearch-UI:  
installing the project dependencies  
npm install  

run:
ng serve --proxy-config src/proxy.conf.json  
or  
npm start -- --proxy-config src/proxy.conf.json  

The frontend starts at:  
http://localhost:4200

## Content:
 
main.ts - start point of the application  
index.html - entry point of the application  
app.component.(html/sccs/ts) - main component of the application  
app.module.ts - main modul of the application (application modul)  
app-routing.module.ts - router module  
nav - contains navigation component  
diffsearch - contains home component  
query - contains query section component (Language selection, qery input, examples)  
result - contains result section component (display of the code changes)  
query.service.s - query service (http connection to server)  
example.service.ts - example service (service for example interface)  
resultdata.ts - interface for result data  
examples.ts - interface for examples data  
_theme.scss - theming functions, colour scheme  
