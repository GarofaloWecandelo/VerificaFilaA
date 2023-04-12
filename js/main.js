    let inputNominativo = document.getElementById("nominativo")
    let inputSesso = document.getElementById("sesso")
    let inputClasse = document.getElementById("classe")
    let inputPunteggio = document.getElementById("punteggio")
    let tagTabella = document.getElementById("tabella")
    let filtroSesso = document.getElementById("filtroSesso")
    let filtroClasse = document.getElementById("filtroClasse")

    let risultati = []
    let contaRighe = 0

    function inserisci(){

        if(!checkInputs()){

            sendError()
            return
        }

        const s1 = {};

            s1.nominativo = inputNominativo.value.trim();
            s1.sesso = inputSesso.value;
            s1.classe = inputClasse.value;
            s1.punteggio = inputPunteggio.value;

        risultati.push(s1)

        for (let i = 0; i < contaRighe; i++)
            tagTabella.lastChild.remove()

        refreshTable(risultati)

        saveArray()
    }

    function refreshTable(array){

        for (let i = 0; i < array.length; i++){
        
            let tr = document.createElement("tr")
            
            let td1 = document.createElement("td")
            td1.innerHTML = array[i].nominativo
            tr.appendChild(td1)

            let td2 = document.createElement("td")
            td2.innerHTML = array[i].sesso
            tr.appendChild(td2)

            let td3 = document.createElement("td")
            td3.innerHTML = array[i].classe
            tr.appendChild(td3)

            let td4 = document.createElement("td")
            td4.innerHTML = array[i].punteggio
            tr.appendChild(td4)

            tagTabella.appendChild(tr)
        }

        contaRighe = array.length
    }

    function filtra(){

        let filtrato = []

        for (let i = 0; i < risultati.length; i++){
            if(filtroSesso.value == risultati[i].sesso && filtroClasse.value == risultati[i].classe){
                filtrato.push(risultati[i])
            }
        }

        for (let i = 0; i < contaRighe; i++)
            tagTabella.lastChild.remove()

        refreshTable(filtrato)
    }

    function checkInputs(){

        if(inputNominativo.value.trim() != "")
            if(inputPunteggio.value >= 1 && inputPunteggio.value <= 40)
                return true

        return false
        
    }

    function sendError(){

        alert("errore, controllare gli input e riprovare")
    }

    function start() {
        if (JSON.parse(localStorage.getItem('risultati')) == null)
            return
        risultati = JSON.parse(localStorage.getItem('risultati'))
        refreshTable(risultati)
    }

    function saveArray() {
        risultati = localStorage.setItem('risultati', JSON.stringify(risultati))
    }