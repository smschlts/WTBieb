# WorkingTalent Bibliotheek
Dit is een bibliotheek applicatie voor WorkingTalent.

## Vereisten
* Java JDK 11
* Webserver
* Databaseserver

## Getting started
Ga naar `..\WTBieb\src\main\resources` en maak daarin een nieuw bestand aan met de naam `application.properties`.  
In dit bestand komen de databasegegevens van de applicatie te staan. Ook kunnen hierin inloggegevens voor de admin en voorbeeldaccounts worden opgeslagen.  

Voorbeeld:

```
spring.datasource.url=jdbc:mysql://localhost:3306/databasenaam?useUnicode=true&useJDBCCompliantTimezoneShift=true&useLegacyDatetimeCode=false&serverTimezone=UTC
spring.datasource.driverClassName=com.mysql.jdbc.Driver
spring.datasource.username=root
spring.datasource.password=
spring.jpa.database_platform=org.hibernate.dialect.MySQL5Dialect
spring.jpa.hibernate.ddl-auto=create-drop

server.port=8082

admin.naam=Ad Min
admin.email=ad@min.nl
admin.wachtwoord=hunter2
user.wachtwoord=jager2
```
  
**_LET OP_**
* Gebruik deze inloggegevens **_niet_** in een productieomgeving
* Gebruik `spring.jpa.hibernate.ddl-auto=update` in een productieomgeving, zodat databasegegevens niet verloren zullen gaan bij het herstarten van de applicatie.
