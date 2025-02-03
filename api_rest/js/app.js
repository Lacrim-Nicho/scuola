const url = 'https://torquemag.io/wp-json/wp/v2/posts'; 

function caricaPost() {

    document.getElementById('post').classList.add('caricamento'); //AGGIUNGO CLASSE CON ANIMAZIONE
                                                                //DEL CARICAMENTO AL DIV
                                                                //PRINCIPALE DELLA PAGINA HTML

    fetch(url)
        .then(function(risposta) {
            if (risposta.ok) {
                return risposta.json();
            } else {
                throw new Error('Errore nella richiesta'); //SE SONO PRESENTI ERRORI, VIENE CREATO UN OGGETTO "error"
                                                            //CHE POI VIENE GESTITO DAL CATCH POSTO ALLA FINE DELLA FUNZIONE
            }
        })
        .then(function(risposta) {
            if (risposta.length === 0) {
                document.getElementById('post').classList.add('error'); //AGGIUNGO CLASSE ERROR PER DARE UN CSS
                                                                        //ANCHE AD EVENTUALI ERRORI
                document.getElementById('post').innerHTML = "<p>Nessuna risposta fornita dall'API.</p>";
                return;
            }

            var rispostaHTML = '';
            for (let i = 0; i < risposta.length; i++) {
                const post = risposta[i];
                rispostaHTML += `
                    <div class="post">
                        <h2>${post.title.rendered}</h2>
                        <p>${post.excerpt.rendered}</p>
                        <a href="${post.link}" target="_blank">Leggi di più</a>
                    </div>
                `;
            }

            document.getElementById('post').innerHTML = rispostaHTML;
            document.getElementById('post').classList.remove('caricamento'); //UNA VOLTA CHE L'API RISPONDE,
                                                                            //LA CLASSE CON ANIMAZIONE DEL CARICAMENTO
                                                                            //VIENE TOLTA E VIENE MOSTRATA LA RISPOSTA DELL'API
        })
        .catch(function(errore) {
            document.getElementById('post').classList.add('error'); 
            document.getElementById('post').innerHTML = '<p>Errore nel recupero della risposta.</p>';
            console.log(errore);
            document.getElementById('post').classList.remove('caricamento');
        });
}

caricaPost();
