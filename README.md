[![.github/workflows/actions.yaml](https://github.com/mariestigen-edu/pgr6301-webutvikling-apidesign-eksamen/actions/workflows/actions.yaml/badge.svg)](https://github.com/mariestigen-edu/pgr6301-webutvikling-apidesign-eksamen/actions/workflows/actions.yaml)

# PG6301 eksamen

Grade: A

[Heroku](https://pg6301-exam-1170.herokuapp.com/) - 
[Test rapport](https://github.com/mariestigen-edu/pgr6301-webutvikling-apidesign-eksamen/commit/cd5affda1c229d6cc6a68ed373a554705e45a25b) - 
[Github](https://github.com/mariestigen-edu/pgr6301-webutvikling-apidesign-eksamen)

## Tips

* Bruk versjoner av alle dependencies som vi brukte på forelesningene. Det skjer hele tiden endringer i JavaScript-land og noen ganger vil siste versjon oppføre seg forskjellig - ikke kast bort verdifull eksamenstid. Du kan kopiere package.json fra innlevering eller en øving
* Spesielt: React 18 kom i løpet av semesteret. Alt vi har vist er på React 17. Kjør på React 17 nå med mindre du har brukt en del tid på versjon 18 den siste måneden. Det er vesentlige problemer!
* Start med å løse det kritiske: Deployment til Heroku
* Ikke bli sittende med ting du ikke får til mens det er enklere ting du kunne ha gjort. Spesielt tester har overraskende mye vrient med seg. Legg det til siden og løs andre ting om du har problemer
* Les de funksjonelle kravene grundig og test at løsningen din oppfyller dem
* Les læringsmålene beskrevet i eksamensteksten grundig og sjekk at løsningen din demonstrere at du behersker disse

Dette er versjonene vi brukte under forelesningene om som er validert som ok:

```
"jest": "^27.5.1",
"react": "^17.0.2",
"react-dom": "^17.0.2",
"react-router-dom": "^6.2.2"
```


## Egenutfylling av funksjonelle krav

* [x] *legg inn krav fra eksamentekst*
  * [x] Anonyme brukere skal se nyhetssaker når de kommer inn
  * [x] Når en nyhetssak publiseres, skal alle brukere se den (websockets)
  * [x] Brukere kan logge seg inn (google)
  * [x] En bruker som er logget inn kan se sin profilside
  * [x] En bruker skal fortsette å være innlogget ved refresh
  * [x] En innlogget bruker skal kunne se detaljer om nyhetssaken
  * [x] Journalister skal kunne logge inn via Active Directory
  * [x] Journalister skal kunne skrive nye artikler
  * [x] Nyhetsartikkel skal inneholde en katogori, tittel, og tekst
    * Jeg valgte å gå for checkboxes, da en artikkel kan ha flere katogorier.
  * [x] Hvis det allerede eksisterer en nyhetsartikkel, skal serveren svare med 400
  * [x] Brukeren skal ikke kunne sende en artikkel som mangler tittel, kategori, eller tekst
  * [ ] En redaksjonell bruker skal kunne redigere en artikkel se selv har publisert
    * Denne rakk jeg ikke.
  * [x] Alle feil fra server skal presenteres til bruker på en pen måte, med mulighet for brukeren og prøve igjen
    * Jeg tror dette skal stemme - men det er helt sikkert noen edge-cases jeg ikke har kommet borti selv under testing.
    
* [ ] *legg inn krav fra eksamentekst*
  * Det eneste jeg vet mangler er mulighet for redigering, samt litt høyere test-coverage.

## Egenutfylling av tekniske krav

* [x] Oppsett av package.json, parcel, express, prettier
* [x] React Router
* [x] Express app
* [x] Kommunikasjon mellom frontend (React) og backend (Express)
* [x] Deployment til Heroku
* [x] Bruk av MongoDB
* [x] OpenID Connect
* [x] Web Sockets
* [x] Jest med dokumentert testdekning
  * Det eneste "hovedkravet" som mangler, er mer enn 50% test-dekning på server. Hoveddelen av dette er på
    Login-nivå, som vi fikk beskjed om at det ikke var forventet at vi kom til å teste. Nesten alle komponenter og kode som ikke har med login å gjøre har godt over 50% dekning.
    Selv om testnivået er lavere enn jeg håpet på, håper jeg at det viser nok forventet kunnskap om testing i jest
    til at det kan telle på eksamen.
    
    Jeg måtte pushe en liten oppdatering etter minuttene på github hadde gått ut (endre fra localhost til window.location.host for websockets), men linken er til siste Jest-coverage rapport. 
 
