Vediamo come efettuare il setup di un progetto JavaScript (ed in particolare React) da zero. Dopo di questo, possiamo continuare avanzando il progetto in una applicazione frontend o backend. Nel caso si decida di andare per una applicazione frontend, faremo il setup nel modo "moderno", non effettuando il linking dei file JavaScript nei file HTML, ma usando un projehct bundler che automatizza questo processo. Qusto è uno dei modi più popolari per iniziare con un progetto JavaScript al giorno d'oggi.

Iniziamo con la nostra applicazione JavaScript. Per ogni nuovo progetto JavaScrpipt, ci deve essere una cartella per allocare la configurazione del progetto, ma ancora più importante il suo codice sorgente. Questa cartella di solito è in un'altra cartella dove tutti i progetti JavaScript risiedono. Per lanciare il nostro nuovo progetto, creiamo la cartella dello stesso via command line o mediante il nostro file explorer. Ad esempio:

```sh
mkdir new-project
cd new-project
```

Ora che abbiamo la nostra cartella di progetto, inizializziamo il progetto mediante node. Utilizzeremo, per farlo, yarn (anche se è possibile farlo in maniera analoga con npm). Usare i package manager ha due benefici: il primo è quello di installare delle librerie, che sono rilasciate sotto forma di package Node.js, direttamente da node package manager. Il secondo è la possibilità di aggiungere script per lanciare, testare, o effettuare il deploy del nostro progetto in una fase successiva del suo ciclo divita. Prima di poter usare npm sulla riga di comando, dobbiamo aver installato ovviamente sia Node.js sia yarn. Dopo di questo, possiamo inizializzare il progetto usando la seguente riga di comando:

```sh
yarn init --yes
```

Usando questo comando, stiamo dicendo a yarn che deve usare gli argomenti di default. Se non usiamo il flag, dovremo specificare manualmente le informazioni base circa il nostro progetto.

Ora, dato che abbiamo usato yarn per inizializzare il progetto, dovremmo avere un file package.json che dovrebbe essere riempito con dei valori di default. Se vogliamo cambiarli, possiamo vederli e cambiarli in questo modo:

```sh
yarn config list

yarn config set init.author.name "Angelo Cardellicchio"
yarn config set init.author.email "a.cardellicchio@gmail.com"
yarn config set init.author.url "programiq.it"
yarn config set init.license "MIT"
```

Dopo aver fatto il setup del nostro progetto, possiamo installare delle librerie (ovvero dei package node) mediante npm. Una volta installata la nostra prma libreria mediante npm nel nostro progetto, dovrebbe essere mostrata nel file package.json come dipendenza. Vedremo inoltre una cartella node_modules/, dove tutte le librerie installate saranno mantenute come codice sorgente.

A questo punto, sulla riga di comando o nel nostro explorer, creiamo una cartella src/ per il codice sorgente del nostro progetto. In questa cartella,c reiamo un file src/index.js, come ingresso del nostro progetto.

```sh
mkdir src
cd src
touch index.js
```

Il nome index.hjs è basato su una convenzzione usata da Node.js per il nome dei fiel. Ovviamente, possiamo scegliere di non aderirvi, anche se questo sta a noi.

A questo punto, possiamo scrivere il nostro codice JavaScript. Aprimao il file index.js, e scriviamo la seguente riga di comando.

```js
console.log('Hello, world.');
```

A questo punto possiamo eseguire questo file con Node.js dalla cartella radice del nostro progetto:

```sh
node src/index.js
```

Il log dovrebbe apparire nella console del nostro browser (ricordiamoci di premere F12) dopo che lo script viene eseguito. A questo punto, possiamo spostare lo script nel file package.json, perché è qui che i nostri script di rogetto saranno collocati. Come detto in precedenza, è uno dei benefici del progetto npm definire questi script nel file package.json:

```json
{
    ...
    "scripts": {
        "start": "node src/index.js",
        "test": "echo \"Error: no test specified\" && exit 1"
    },
    ...
}
```

Sulla riga di comando, eseguiamo nuovamente lo script, ma questa volta eseguendo npm start. Ogni volta che cambiamo lo script di start sottostante negli script del file package.json, dobbiamo scrivere solo npm start sulla riga di comando senza specificare lo script sottostante.

Abbiamo finito.
