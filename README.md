# Diffsearch

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

## Development mode:
Install Angular CLI globally.

`npm i -g @angular/cli`

In directory DiffSearch-UI:  
installing the project dependencies  
npm install  

run:  
`ng serve`  
or  
`npm start`  

The frontend starts at:  
http://localhost:4200

Note:  
The backend server `Diffsearch` must be started in this case either without `-gurl` option or with `-gurl http://localhost:4200`
(http://localhost:4200 is the default)  

## Production mode / deployment:

In directory DiffSearch-UI:  
build:  
`npm run build -- --prod`  

Fallback configuration (Apache):  
(Realize the routing after a refresh of the pages)  

Add a .htaccess file to the directory where index.html is located  
(DiffSearch-UI/dist/diffsearch)

.htaccess:  

`RewriteEngine On`  
`# If an existing asset or directory is requested go to it as it is`  
`RewriteCond %{DOCUMENT_ROOT}%{REQUEST_URI} -f [OR]`  
`RewriteCond %{DOCUMENT_ROOT}%{REQUEST_URI} -d`  
`RewriteRule ^ - [L]`  

`# If the requested resource doesn't exist, use index.html`  
`RewriteRule ^ /index.html`  



## Content:
 
- DiffSearch-UI/src/**main.ts** - start point of the application
- DiffSearch-UI/src/**index.html** - entry point of the application
- DiffSearch-UI/src/app/**app.component.(html/sccs/ts)** - main component of the application (including currently applied navigation)
- DiffSearch-UI/src/app/**app.module.ts** - main modul of the application (application modul)
- DiffSearch-UI/src/app/**app-routing.module.ts** - router module
- DiffSearch-UI/src/app/**diffsearch** - contains home component
- DiffSearch-UI/src/app/**about** - contains about component
- DiffSearch-UI/src/app/**nav** - contains navigation component (currently not applied, alternative to navigation in app.component.html )
- DiffSearch-UI/src/app/**query** - contains query section component (Language selection, qery input, examples)
- DiffSearch-UI/src/app/**result** - contains result section component (display of the code changes)
- DiffSearch-UI/src/app/**query.service.ts** - query service (http connection to server)
- DiffSearch-UI/src/app/**example.service.ts** - example service (service for example interface)
- DiffSearch-UI/src/app/**resultdata.ts** - interface for result data
- DiffSearch-UI/src/app/**examples.ts** - interface for examples data
- DiffSearch-UI/src/**\_theme.scss** - theming functions, colour scheme
- DiffSearch-UI/src/**proxy.conf.json** - proxy configuration file
- DiffSearch-UI/src/**styles.scss** - global styles
