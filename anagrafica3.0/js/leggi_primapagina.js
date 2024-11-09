let cont=0;
const xml = new XMLHttpRequest();
xml.open('GET', './files_json/file_json_invio/anagrafica.json');
xml.onload = function() {
    if (xml.status === 200) {
        const dati = JSON.parse(xml.responseText);
        const tb = document.getElementById('tabella').tBodies[0];
        for (let i = 0; i < dati.length; i++) {
            const pers = dati[i];
            const img = document.createElement('img');
            img.src = pers.immagine;
            const l = document.createElement('a');
            const riga = document.createElement('tr');
            riga.innerHTML = `<td>${pers.nome}</td><td>${pers.cognome}</td><td>${pers.eta}</td>`;
            tb.appendChild(riga);
            l.classList.add('prova');
            l.value = cont;
            l.addEventListener('click', (event) => {   //per prevenire che la funzione si "attivi" in automatico al caricamento della pagina
                                                        //mi sono aiutato con Internet, ma so cosa ho fatto
                event.preventDefault();
                l.onclick = invia(l.value);
            });
            l.appendChild(img);
            tb.appendChild(l);
            cont++;
        }
    } else {
        alert('Si è presentato un errore nel caricare i dati dal file Json.');
    }
}
xml.send();

function invia(value){
    localStorage.setItem('valore', value);
    window.location.href="receiver.html";
}








