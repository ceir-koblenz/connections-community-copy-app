# CommunityTemplating
 
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.0.0.

## Projekt einrichten

Nachdem das Repository geklont wurde, im Repositoryverzeichnis über die Konsole `npm install` ausführen.
Dies installiert alle in der package.json definierten Abhängigkeiten.

Um die Anwendung lokal laufen lassen zu können, muss der Entwicklungs-Proxyserver konfiguriert werden.
Dazu die Datei "proxy.conf.json.template" kopieren, die Kopie "proxy.conf.json" nennen und ein gültiges 
Authentifizierungstoken eintragen. Dazu bspw. https://www.blitter.se/utils/basic-authentication-header-generator/ verwenden
(Nutzername+Passwort sind die, mit denen ihr euch auf dem IBM Connections-Testsystem einloggt. Diese entsprechen NICHT
euren Anmeldedaten bei uniconnect!)

Gestartet wird der Entwicklungsserver mit `npm start`. Bei Änderungen an den Quelldateien lädt die Anwendung automatisch neu.

## Ändern der URL des Testsystems

Die Url des Testsystems wird unter `src/assets` in der `config.json` eingetragen, sowie an 3 Stellen in der `proxy.conf.json`.
Zudem ist, angepasst an das Testsystem, das Basic Auth Token erneut zu generieren (siehe oben)

## Projektstruktur

Entwickelt wird im `src/app` Verzeichnis. Neu erstellte Komponenten (`ng generate component xyz`) sind in den entsprechenden Unterordner
in `/components` zu verschieben. Hilfsklassen für bestimmte Funktionen (bspw. XML-Parser) sind im `/helpers` Verzeichnis untergebracht.
Models, welche Entitäten der Connections-Api repräsentieren (bspw. eine Community), sind unter `/models` zu finden, Angular Services unter
`/services`.

## Build

`ng build` führt den Build aus; die erstellten Artefakte landen im `dist/`-Ordner. Das `--prod` Flag führt einen Produktivbuild aus.
Die relative Pfad, unter dem die Anwendung produktiv gehostet wird, ist in der `angular.json` in der configuration des production-Builds
unter `baseHref` einzutragen.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
