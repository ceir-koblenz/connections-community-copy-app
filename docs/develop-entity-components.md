## Neue Komponenten für Entitäten anlegen

Folgendes ist zu implementieren, wenn eine neue Komponente für eine Entität (Blogeintrag, Wiki-App, ...) angelegt werden soll:

- die Komponente an sich  (Kommandozeile "ng generate component XYZ"). Die Komponente bekommt üblicherweise einen EntityLink als Input-Parameter, der die Url der anzuzeigenden Entität enthält. Je nach Anwendungsfall ist jedoch auch eine Id als Input denkbar; die Komponente muss dann die passende Url selbst zusammenbauen (siehe bspw. Community-Komponente oder Servicedokument-Komponente)

- das Model der abzubildenden Entität. Dieses soll alle für uns relevanten Eigenschaften enthalten (bspw. Id, Titel, Beschreibung der Entität) sowie Links, die Verknüpfungen zu weiteren abhängigen Entitäten enthalten (in Form von EntityLinks<AbhängigeEntität>). Beispiel: Eine Forums-Entität enthält EntityLinks zu den Themen, die im Forum enthalten sind.
- das Model implementiert das Interface IEntityModel
- das Model definiert eine statische Load()-Methode, welche als Input-Parameter den ApiClientService sowie die zu ladende Url enthält. Innerhalb der Methode wird der XML-String der anzuzeigenden Entität via ApiClientService geladen, geparst sowie eine neue Instanz des Models erstellt, befüllt und zurückgegeben.

- einen XmlParser für den Entitätstyp. Dieser erbt vom EntityXmlParserAbstract. Selbst zu implementieren ist die fillFromObject()-Methode. Der erste Parameter dieser Methode ist die zu befüllende Instanz des Models, der zweite Parameter das von der Api geladene Objekt. Hier müssen jetzt die gewünschten Eigenschaften des untypisierten Objekt (Typ "any") auf das zu befüllende Model gemappt werden. (Hier hilft der Debugger oder eine Ausgabe auf der Konsole dabei, die Eigenschaftsnamen herauszubekommen...)