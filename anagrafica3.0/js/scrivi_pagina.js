const valore = localStorage.getItem('valore');
const xml = new XMLHttpRequest();
xml.open('GET', './files_json/file_json_ricevi/ricevi.json');
xml.onload = function() {
    if (xml.status === 200) {
        const dati = JSON.parse(xml.responseText);
        const tb = document.getElementById('tabella').tBodies[0];
        if(valore == 0){
            const pers = dati[0];
            const riga = document.createElement('tr');
            const img = document.createElement('img');
            const container = document.createElement('div');
            container.classList.add('contenitore');
            img.src = pers.immagine;
            riga.innerHTML = `<td>${pers.nome}</td><td>${pers.cognome}</td><td>${pers.eta}</td><td>${pers.indirizzo}</td><td>${pers.citta}</td><td>${pers.telefono}</td><td>${pers.professione}</td>`;
            tb.appendChild(riga);
            container.appendChild(img);
            tb.appendChild(container);
            const scrivi = document.getElementById('fine');
            scrivi.innerHTML = `CURRICULUM DI: ${pers.nome} ${pers.cognome}`;
        }

        else if(valore == 1) {
            const pers = dati[1];
            const riga = document.createElement('tr');
            const img = document.createElement('img');
            const container = document.createElement('div');
            container.classList.add('contenitore');
            img.src = pers.immagine;
            riga.innerHTML = `<td>${pers.nome}</td><td>${pers.cognome}</td><td>${pers.eta}</td><td>${pers.indirizzo}</td><td>${pers.citta}</td><td>${pers.telefono}</td><td>${pers.professione}</td>`;
            tb.appendChild(riga);
            tb.appendChild(img);
            container.appendChild(img);
            tb.appendChild(container);
            const scrivi = document.getElementById('fine');
            scrivi.innerHTML = `CURRICULUM DI: ${pers.nome} ${pers.cognome}`;
        }

        else if(valore == 2) {
            const pers = dati[2];
            const riga = document.createElement('tr');
            const img = document.createElement('img');
            const container = document.createElement('div');
            container.classList.add('contenitore');
            img.src = pers.immagine;
            riga.innerHTML = `<td>${pers.nome}</td><td>${pers.cognome}</td><td>${pers.eta}</td><td>${pers.indirizzo}</td><td>${pers.citta}</td><td>${pers.telefono}</td><td>${pers.professione}</td>`;
            tb.appendChild(riga);
            tb.appendChild(img);
            container.appendChild(img);
            tb.appendChild(container);
            const scrivi = document.getElementById('fine');
            scrivi.innerHTML = `CURRICULUM DI: ${pers.nome} ${pers.cognome}`;
        }

        
    } else {
        alert('Si è presentato un errore nel caricare i dati dal file Json.');
    }
}
xml.send();


