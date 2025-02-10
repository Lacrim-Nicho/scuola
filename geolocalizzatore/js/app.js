const mappa = L.map('map').setView([0, 0], 2); // Posizione predefinita

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
}).addTo(mappa);


function rimuoviErrore() {
    const divErrore = document.querySelector('.error-message');
    if (divErrore) {
        divErrore.remove();
    }
}

function trovami() {
    rimuoviErrore();  // rimuove eventuali messaggi di errore precedenti
    
    const posizioneMemorizzata = localStorage.getItem('position'); // se la posizione è già presente nel localStorage, la carica direttamente da lì
    if (posizioneMemorizzata) {
        const posizione = JSON.parse(posizioneMemorizzata);
        mostraPosizione(posizione);
        return;
    }

    const opzioni = {
        timeout: 10000 
    };

    navigator.geolocation.getCurrentPosition(mostraPosizione, gestisciErrori, opzioni);
}

function mostraPosizione(posizione) {
    const latitudine = posizione.coords.latitude;
    const longitudine = posizione.coords.longitude;

    localStorage.setItem('position', JSON.stringify(posizione)); // memorizza la posizione nel localStorage, così da averla già salvata
                                                                // al riavvio della pagina

    setTimeout(() => { //l'aggiunta di un timeout è fondamentale per prevenire errrori
        mappa.setView([latitudine, longitudine], 13);
        L.marker([latitudine, longitudine]).addTo(mappa)
    }, 500);
}

function gestisciErrori(errore) {
    let messaggioErrore = "";
    switch (errore.code) {
        case errore.PERMISSION_DENIED:
            messaggioErrore = "L'utente ha negato la richiesta di geolocalizzazione.";
            break;
        case errore.POSITION_UNAVAILABLE:
            messaggioErrore = "Informazioni sulla posizione non disponibili.";
            break;
        case errore.TIMEOUT:
            messaggioErrore = "Posizione azzerata dall'utente.";
            break;
        case errore.UNKNOWN_ERROR:
            messaggioErrore = "Errore sconosciuto durante la geolocalizzazione.";
            break;
    }


    rimuoviErrore();
    
    const divErrore = document.createElement('div');
    divErrore.className = 'error-message';
    divErrore.textContent = messaggioErrore;
    document.body.insertBefore(divErrore, document.getElementById('map'));

    mappa.setView([0, 0], 3);
    localStorage.clear(); //pulisco il local storage
}


const ricalcola_posizione = document.getElementById('btn-ricalcola');
ricalcola_posizione.addEventListener('click', () =>{
    trovami();
});

const azzera_posizione = document.getElementById('btn');
azzera_posizione.addEventListener('click', () => {
    navigator.geolocation.getCurrentPosition(mostraPosizione, gestisciErrori, { timeout: 100 });
}); 
//non riesco a togliere l'indicatore sulla mappa.

trovami();