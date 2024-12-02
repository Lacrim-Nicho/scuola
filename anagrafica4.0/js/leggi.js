let cont=0;
const xml = new XMLHttpRequest();
xml.open('GET', './dati/anagrafica.json');

xml.onload = function() {
    if (xml.status === 200) {
        const dati = JSON.parse(xml.responseText);
        const tb = document.getElementById('tabella').tBodies[0];
        for (let i = 0; i < dati.length; i++) {
            const pers = dati[i];
            const riga = tb.insertRow();  //ho deciso di usare la funzione insertRow(), che inserisce la riga direttamente nella tabella, senza dover usare
                                        // la appendChild() e la createElement('tr'), e la funzione
                                        //insertCell(), che permette di creare le celle dove inserrire i valori,
                                        //così da poter inserire l'immagine allineata
                                        //con gli altri valori della riga, e non sotto (come nell'esercizio precedente)
                                        
            riga.innerHTML = `<td>${pers.nome}</td><td>${pers.cognome}</td><td>${pers.eta}</td>`;
            const foto = riga.insertCell();
            const l = document.createElement('a');
            const img = document.createElement('img');
            img.src = pers.immagine;
            l.value = cont;
            l.addEventListener('click', () => {   
                l.onclick = invia(l.value);
            });
            l.appendChild(img);
            cont++;
            foto.appendChild(l);
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








