const valore = localStorage.getItem('valore');
if(valore == undefined){
    alert('Non è presente un valore nel local storage, probabilmente avrai caricato questa pagina prima di quella precedente!');
    setTimeout(function() {
        window.location.href = "sender.html"; //se l'utente apre prima quessta pagina,
                                              //viene riportato a quella principale
                                              //ho usato la setTimeout() perchè ho ipotizato che
                                              //in caso di errore, prima di caricare la pagina principale
                                              //vengano eseguite azioni lato server (ovviamente è solo un esempio,
                                              //in questo contesto è totalmente inutile)
                                              //tecnicamente parlando, inoltre, bisognerebbe anche flushare il contenuto
                                              //del local storage ogni volta 
                                            
                                            
    }, 1000);
}

function carica() {

    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        const xmlDoc = this.responseXML;
  
        const nome = xmlDoc.getElementsByTagName("nome")[0].childNodes[0].nodeValue;
        const cognome = xmlDoc.getElementsByTagName("cognome")[0].childNodes[0].nodeValue;
        const eta = xmlDoc.getElementsByTagName("eta")[0].childNodes[0].nodeValue;
        const residenza = xmlDoc.getElementsByTagName("residenza")[0].childNodes[0].nodeValue;
        const immagine = xmlDoc.getElementsByTagName("immagine")[0].childNodes[0].nodeValue;
        const esperienze = xmlDoc.getElementsByTagName("esperienza"); //ho fatto in modo che una persona potesse avere
        const formazione = xmlDoc.getElementsByTagName("formazione"); //più esperienze, più titoli di studio e più lingue
        const lingue = xmlDoc.getElementsByTagName("lingua");
  
        let listaEsperienze = "";
        for (let i = 0; i < esperienze.length; i++) {
          const azienda = esperienze[i].getElementsByTagName("azienda")[0].childNodes[0].nodeValue;
          const ruolo = esperienze[i].getElementsByTagName("ruolo")[0].childNodes[0].nodeValue;
          const periodo = esperienze[i].getElementsByTagName("periodo")[0].childNodes[0].nodeValue;
          const descrizione = esperienze[i].getElementsByTagName("descrizione")[0].childNodes[0].nodeValue;
          listaEsperienze +=  `
            <li>
              <h3>${ruolo}</h3>
              <p>${azienda} |  ${periodo}</p>
              <p>${descrizione}</p>
            </li>`
        }

        let listaFormazione = "";
        for (let i = 0; i < formazione.length; i++) {
          const istituto = formazione[i].getElementsByTagName("istituto")[0].childNodes[0].nodeValue;
          const titolo = formazione[i].getElementsByTagName("titolo")[0].childNodes[0].nodeValue;
          const anno = formazione[i].getElementsByTagName("anno")[0].childNodes[0].nodeValue;
          listaFormazione += `
            <li>
              <h3>${istituto}</h3>
              <p>${titolo} - Conseguito/a nell'anno: ${anno}</p>
            </li>`
        }

        let listaLingue = "";
        for (let i = 0; i < lingue.length; i++) {
          let nomeLingua = lingue[i].getElementsByTagName("nome")[0].childNodes[0].nodeValue;
          let livello = lingue[i].getElementsByTagName("livello")[0].childNodes[0].nodeValue;
          listaLingue += `<li>${nomeLingua} - Livello ${livello}</li>`;
        }
  
        let cv = `
          <div class="contenitore">
            <div class="info">
              <img src="${immagine}" alt="Foto di ${nome} ${cognome}">
              <h1>${nome} ${cognome}</h1>
              <h1>${eta} anni - ${residenza}</h1>
            </div>
  
            <div class="contenitore-2">
              <h2>Esperienze Lavorative</h2>
              <ol>
                ${listaEsperienze}
              </ol>
            </div>
  
            <div class="contenitore-2">
              <h2>Formazione</h2>
              <ol>
                ${listaFormazione}
              </ol>
            </div>
  
            <div class="contenitore-2">
              <h2>Lingue</h2>
              <ol>
                ${listaLingue}
              </ol>
            </div>
          </div>`
  
        document.title = `Cv di ${nome} ${cognome}`;
        document.getElementById("cv").innerHTML = cv;
        
      }
    }
    
    if(valore==0){
        xhttp.open("GET", "/scuola/anagrafica4.0/dati/xml_dati/shiva.xml", true); } //volevo fare 2 funzioni separate ma non andava
    else if(valore==1)                                          //e non riuscivo a trovare l'errore
        xhttp.open("GET", "/scuola/anagrafica4.0/dati/xml_dati/rondo.xml", true);
    else if(valore==2)
        xhttp.open("GET", "/scuola/anagrafica4.0/dati/xml_dati/tony.xml", true);

    xhttp.send();
  }

