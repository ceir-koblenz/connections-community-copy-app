# HCL Connections Community Templating
 
This project was developed by a team of students at the [Center for Enterprise Information Research](https://ceir.de/) at the [University of Koblenz](https://www.uni-koblenz-landau.de/en/campus-koblenz/fb4/iwvi/rgschubert). The *HCL Connections Community Templating App* is a Node.js application for copying communities including the content, such as wiki pages, blog posts, files and others. It makes use of Connections' APIs and basic authentication. 

<img src="https://user-images.githubusercontent.com/40888514/157401964-a7f54d50-878c-4b8b-80a6-b09c27b2a8be.png" height="200px"/> <img src="https://user-images.githubusercontent.com/40888514/157451777-6f5b1471-0d05-4a42-a29a-8237bebea814.png" height="200px"/> <img src="https://user-images.githubusercontent.com/40888514/157451797-867e407f-7ba6-46fe-a58b-126a676ffb4e.png" height="200px"/> <img src="https://user-images.githubusercontent.com/40888514/157451811-4a647e9c-5a7b-45de-bef9-cac3a4088f2a.png" height="200px"/>


All credit goes to the students, who developed this application: Janos Justen, Lisa Küppers, Dominik Lienen, Tim Merzhäuser, Lennard Metzler, Manuel Musialik and Andreas Weber. The project was supervised by [Julian Mosen](https://www.uni-koblenz-landau.de/en/campus-koblenz/fb4/iwvi/rgschubert/team/julian-mosen/julian-mosen) and [Prof. Dr. Petra Schubert](https://www.uni-koblenz-landau.de/en/campus-koblenz/fb4/iwvi/rgschubert/team/petra-schubert).

## Set up project locally for development

Set up project locally for development
After the repository has been cloned, execute `npm install` in the repository directory via the console. This will install all dependencies defined in the package.json.

To run the application locally, the development proxy server must be configured. To do this, copy the file "proxy.conf.json.template", name the copy "proxy.conf.json" and enter a valid authentication for the copied version. To do this, use for example https://www.blitter.se/utils/basic-authentication-header-generator/ (username+password are those you use to log in to the IBM Connections test system.

Start the development server with `npm start`. If changes are made to the source files, the application reloads automatically.



## Change the URL of the test system

The url of the test system is entered under `src/assets` in the `config.json`, and in 3 places in the `proxy.conf.json`. Furthermore, adapted to the test system, the Basic Auth Token has to be regenerated (see above)

## Project structure

Development is done in the `src/app` directory. Newly created components (`ng generate component xyz`) have to be moved to the corresponding subfolder in `/components`. Auxiliary classes for certain functions (e.g. XML parser) are located in the `/helpers` directory. Models, which represent entities of the Connections-Api (e.g. a community) can be found in` /models`, Angular Services in `/services`.

## Build

`ng build --prod` executes the build; the created artifacts end up in the `dist/` folder The `--prod` flag executes a production build. The relative path under which the application is productively hosted must be entered in the `angular.json` in the configuration of the production build under `baseHref`.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

The project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.0.0.

