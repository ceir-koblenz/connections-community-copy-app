# CommunityTemplating

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.0.0.

## Projekt einrichten

Nachdem das Repository geklont wurde, im Repositoryverzeichnis über die Konsole `npm install` ausführen.
Dies installiert alle in der package.json definierten Abhängigkeiten.

Um die Anwendung lokal laufen lassen zu können, muss der Entwicklungs-Proxyserver konfiguriert werden.
Dazu die Datei "proxy.conf.json.template" kopieren, die Kopie "proxy.conf.json" nennen und ein gültiges 
Authentifizierungstoken eintragen. Dazu bspw. https://www.blitter.se/utils/basic-authentication-header-generator/ verwenden
(Nutzername+Passwort sind die, mit denen ihr euch auf https://c55.bas.uni-koblenz.de einloggt. Diese entsprechen NICHT
euren Anmeldedaten bei uniconnect!)

Gestartet wird der Entwicklungsserver mit `npm start`.

## Projektstruktur

Entwickelt wird im `src/app` Verzeichnis. Neu erstellte Komponenten (`ng generate component xyz`) sind in den entsprechenden Unterordner
in `/components` zu verschieben. Hilfsklassen für bestimmte Funktionen (bspw. XML-Parser) sind im `/helpers` Verzeichnis untergebracht.
Models, welche Entitäten der Connections-Api repräsentieren (bspw. eine Community), sind unter `/models` zu finden, Angular Services unter
`/services`.

## Development server

Run `npm start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

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
