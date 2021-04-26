https://www.robinwieruch.de/webpack-setup-tutorial/

Iniziamo creando una cartella per la distribuzione. La cartella sarà usata per servire le nostre applicazioni successivamente da un web server locale o remoto in futuro. Serivere l'app rende possibile vederla nel browser o memorizzarla su un server di hosting esterno che la rende accessibile per chiunque mediante HTTP. Dopo ciò, la cartella dist sarà tutto di quello che avremo bisogno per pubblicare la nostra applicazione web. Per iiziare, creiamo la cartella di distribuzione ed un file HTML come punto di ingresso nell'applicazione nella cartella radice del nostro progetto dalla comand line:

mkidr dist
cd dist
touch index.html

è importante notare che il nome dell cartella dipende da noi: spesso, per convenzione,useremo dist, public o build. Inoltre possiamo dare al file HTML un nome noi; di solito, anche qui lo si chiama index.html perconvezioni.

A questo punto, inseriamo questo contenuto nel file dist/index.html che abbiamo creato:

<!DOCTYPE html>
<html>
  <head>
    <title>Hello Webpack</title>
  </head>
  <body>
    <div>
      <h1>Hello Webpack</h1>
    </div>
  </body>
</html>

Il file contiene tutto l'HTML che ci serve per visualizzare il nostro sito in un browser; notiamo che ancora non vi è del JavaScript.

AL momento, al struttura del nostro progetto dovrebbe essere simile a questa.

- dist/
-- index.html
- src/
-- index.js
- package.json

Potremmo chiederci perché non inseriamo tutti i file in una cartella. Questao avviene perché a breve ci assicureremo che tutti i file sorgenti di JavaScript dalla cartella src/ vengano "impatcchettati" (bundled) in un singolo file JavaScript che sarà piazzato automaticamente nella cartella dist. Mantenendo questa separazione delle cartelle, potremo assicurarci che tutto quello che abbiamo bisono per portare l'applicazione in produzione su un web server sia nella cartella dist/, e ttutto il codice sorgente sia nella cartella src/.


CAPIRE DA QUI CRA

https://dev.to/nikhilkumaran/don-t-use-create-react-app-how-you-can-set-up-your-own-reactjs-boilerplate-43l0