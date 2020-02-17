$(function() {
    var myChartprova2;
    var regioniprova = [];
    var datiprova = []
    var datibar = [];
    var regionibar = [];
    var myChartprova;
 
    function creazioneGrafici() {
        if (myChartprova != undefined) myChartprova.destroy();
        for (let i = 0; i < datibar.length; i++) { if (datibar[i] == undefined) { datibar[i] = 0; } }
        for (let j = 0; j < datibar.length; j++) { if (regionibar[j] == undefined) { regionibar[j] = ""; } }
        datibar.push(999);
        myChartprova = new Chart(document.getElementById("myChart"), {
            type: "bar",
            data: {
                labels: [
                    "Gennaio",
                    "Febbraio",
                    "Marzo",
                    "Aprile",
                    "Maggio",
                    "Giugno",
                    "Luglio",
                    "Agosto",
                    "Settembre",
                    "Ottobre",
                    "Novembre",
                    "Dicembre"
                ],
                datasets: [{
                    label: "Popolazione regione",
                    data: [
                        datibar[0],
                        datibar[1],
                        datibar[2],
                        datibar[3],
                        datibar[4],
                        datibar[5],
                        datibar[6],
                        datibar[8],
                        datibar[9],
                        datibar[10],
                        datibar[11],
                        datibar[12],
                        datibar[13],
                        datibar[14],
                        datibar[15],
                        datibar[16],
                        datibar[17],
                        datibar[18],
                        datibar[19],
                    ],
                    backgroundColor: [
                        '#ffe119', '#4363d8', '#f58231', '#911eb4', '#46f0f0', '#f032e6', '#bcf60c', '#fabebe', '#e6beff', '#9a6324', '#fffac8', '#800000', '#aaffc3', '#808000', '#ffd8b1', '#000075', '#808080', '#ffffff', '#000000'
                    ],
                    borderWidth: 1,
                    borderColor: "#777",
                    hoverBorderWidth: 2,
                    hoverBorderColor: "#000"
                }]
            },
            options: {
                title: {
                    display: true,
                    text: "Popolazione regione",
                    fontSize: 25
                },
                legend: {
                    display: false,
                    position: "right",
                    labels: {
                        fontColor: "#000",
                    }
                },
                layout: {
                    padding: {
                        left: 0,
                        right: 0,
                        bottom: 0,
                        top: 0
                    },
                    margin: {
                        bottom: 10,
                    }
                },
                tooltips: {
                    enabled: true,
                },
                scales:{
                    yAxes:[{
                        ticks:{
                            stepSize:1
                        }
                    }]
                }
            },
            animation:{
                animateScale: true
            },
 
        });
 
 
 
        //
        regioniprova.push("regione");
        datiprova.push(999);
 
        if (myChartprova2 != undefined) myChartprova2.destroy();
        for (let i = 0; i < datiprova.length; i++) { if (datiprova[i] == undefined) { datiprova[i] = 0; } }
        for (let j = 0; j < datiprova.length; j++) { if (regioniprova[j] == undefined) { regioniprova[j] = ""; } }
        myChartprova2 = new Chart(document.getElementById("myChartPie"), {
            type: "pie",
            data: {
                labels: [regioniprova[0], regioniprova[1], regioniprova[2], regioniprova[3], regioniprova[4], regioniprova[5], regioniprova[6], regioniprova[7], regioniprova[8], regioniprova[9], regioniprova[10], regioniprova[11], regioniprova[12], regioniprova[13], regioniprova[14], regioniprova[15], regioniprova[16], regioniprova[17], regioniprova[18], regioniprova[19]],
                datasets: [{
                    label: "Population",
                    data: [
                        datiprova[0],
                        datiprova[1],
                        datiprova[2],
                        datiprova[3],
                        datiprova[4],
                        datiprova[5],
                        datiprova[6],
                        datiprova[8],
                        datiprova[9],
                        datiprova[10],
                        datiprova[11],
                        datiprova[12],
                        datiprova[13],
                        datiprova[14],
                        datiprova[15],
                        datiprova[16],
                        datiprova[17],
                        datiprova[18],
                        datiprova[19],
                    ],
                    backgroundColor: [
                        '#ffe119', '#4363d8', '#f58231', '#911eb4', '#46f0f0', '#f032e6', '#bcf60c', '#fabebe', '#e6beff', '#9a6324', '#fffac8', '#800000', '#aaffc3', '#808000', '#ffd8b1', '#000075', '#808080', '#ffffff', '#000000'
                    ],
                    borderWidth: 1,
                    borderColor: "#777",
                    hoverBorderWidth: 2,
                    hoverBorderColor: "#000"
                }]
            },
            options: {
                title: {
                    display: true,
                    text: "Popolazione regione",
                    fontSize: 25
                },
                legend: {
                    display: false,
                    position: "right",
                    labels: {
                        fontColor: "#000",
                    }
                },
                layout: {
                    padding: {
                        left: 0,
                        right: 0,
                        bottom: 0,
                        top: 0
                    },
                    margin: {
                        bottom: 10,
                    }
                },
                tooltips: {
                    enabled: true,
                }
            },
 
        })
    }
 
    class gestorePersona {
        constructor() {
            this.listaPersone = new Array();
        }
 
        /*
         * Inizializza la gestione.
         * Se trova variabili utilizzate nel web storage le utilizza.
         */
        init() {
            console.log("Sto avviando le liste...")
            this.listaprov = new Array();
            if (localStorage.getItem("listaPersone") != null) {
                this.listaprov = JSON.parse(localStorage.getItem("listaPersone"));
            }
            for (var i = 0; i < this.listaprov.length; i++) {
                this.add(new Persona(this.listaprov[i]));
            }
            console.log("Liste avviate.")
        }
 
        /*
         * Ritorna la lista della persona.
         */
        get lista() {
            return this.listaPersone;
        }
 
        /* Aggiunge una persona
         * ex: add(new Persona(...))
         */
        add(persona) {
            this.listaPersone.push(persona);
            this.save();
            return 0;
        }
 
        /*
         * Salva le liste nel WebStorage.
         */
        save() {
            localStorage.setItem("listaPersone", JSON.stringify(this.listaPersone));
        }
 
 
    }
    class Persona {
        constructor(value) {
            this.nome = value.nome;
            this.cognome = value.cognome;
            this.comune = value.comune;
            this.provincia = value.provincia;
            this.regione = value.regione;
            this.annoDocumento = value.anno;
        }
 
        get getLuogo() { return (this.regione + "|" + this.provincia + "|" + this.comune) };
        getAnno() { return this.annoDocumento };
    }
 
    class Regione {
        constructor(nome) {
            this.nome = nome
            this.Province = new Array();
        }
 
        addProvincia(value) { this.Province.push(new Province(value)); }
 
        get getNome() { return this.nome; }
        get getProvince() { return this.Province; }
    }
 
    class Province {
        constructor(nome) {
            this.nome = nome;
            this.Comuni = new Array();
        }
 
        addComune(value) { this.Comuni.push(new Comuni(value)); }
 
        get getNome() { return this.nome; }
        get getComuni() { return this.Comuni; }
    }
 
    class Comuni {
        constructor(nome) {
            this.nome = nome;
        }
        get getNome() { return this.nome; }
    }
 
    /*Inizializzazioni variabili e liste del webstorage */
    var gestorePersone = new gestorePersona();
    gestorePersone.init();
    var Regioni = new Array();
    var arrChiavi = "";
    creazioneGrafici();
    if (gestorePersone.lista.length > 0) {
        $(gestorePersone.lista).each(function(i, el) {
            var x = el.getLuogo.split('|');
            /*Creazione della regione 1- Se non ci sono la aggiunge
            Se invece ci sono controlla che non siano già state inserite in database
            E le aggiunge se non sono presenti */
            var confirm = true;
            if (Regioni.length == 0) Regioni.push(new Regione(x[0]));
            else {
                $(Regioni).each(function(i, el) {
                    if (el.getNome == x[0]) {
                        confirm = false;
                    }
                })
                if (confirm == true) Regioni.push(new Regione(x[0]));
            }
        })
 
        /*Calcolo della provincia
        Prende i luoghi inseriti dall'utente
        1- Cerca la regione corrispondente e entra dentro
        2- Controlla che il campo province non sia vuoto - Aggiunge provincia | Continua il processo
        3- Controlla ogni provincia in quella regione
        4- Verifica che non ci sia un nome uguale - true | false
        5- Se rimane true vuol dire che non c'è nessun duplicato altrimenti non aggiunge
            */
        $(gestorePersone.lista).each(function(i, el) {
            var x = el.getLuogo.split('|');
            var confirm = true;
            $(Regioni).each(function(i, el) {
                if (el.getNome == x[0]) {
                    if (el.getProvince.length == 0) Regioni[i].addProvincia(x[1]);
                    else {
                        $(Regioni[i].getProvince).each(function(i, el) {
                            if (el.getNome == x[1]) {
                                confirm = false;
                            }
                        })
                        if (confirm == true) Regioni[i].addProvincia(x[1]);
                    }
                }
            })
        })
 
        /**
        Calcolo dei comuni
        Prende i luoghi inseriti dall'utente
        1- Cerca la regione corrispondente e entra dentro
        2- Cerca la provincia corrispondente e entra dentro
        3- Controlla ogni comune in quella provincia
        4- Se non esiste un comune lo aggiunge in automatico dato che non ha niente da confrontare
        5- Verifica che non ci sia un nome uguale - true | false
        6- Se rimane true vuol dire che non c'è nessun duplicato altrimenti non aggiunge
         */
        $(gestorePersone.lista).each(function(i, el) {
            var x = el.getLuogo.split('|');
            var confirm = true;
            $(Regioni).each(function(i, el) {
                if (el.getNome == x[0]) {
                    $(Regioni[i].getProvince).each(function(j, el) {
                        if (el.getNome == x[1]) {
                            if (Regioni[i].getProvince[j].getComuni.length == 0) Regioni[i].getProvince[j].addComune(x[2]);
                            else {
                                $(Regioni[i].getProvince[j].getComuni).each(function(z, el) {
                                    if (el.getNome == x[2]) {
                                        confirm = false;
                                    }
                                })
                                if (confirm == true) Regioni[i].getProvince[j].addComune(x[2]);
 
                            }
                        }
                    })
                }
            })
        })
    }
    refreshCombo();
    /*---------- */
 
    // Aggiunge i dati di una persona
    $(".btn-aggiungi").on("click", function() {
        var nome = $("#dati .text-nome").val();
        var cognome = $("#dati .text-cognome").val();
        var comune = $("#dati .text-comune").val();
        var provincia = $("#dati .text-provincia").val();
        var regione = $("#dati .text-regione").val();
        var anno = $("#dati .text-anno").val();
        arrChiavi += regione + "|" + provincia + "|" + comune + ";";
        //refreshCombo();
        var value = { "nome": nome, "cognome": cognome, "comune": comune, "provincia": provincia, "regione": regione, "anno": anno };
        gestorePersone.add(new Persona(value));
    })
 
 
    function refreshCombo() {
        //Metodo aggiunta dei vari luoghi nei corrispettivi combobox
        /* primaSezione = ["Regione|Provincia|Comune","Regione|Provincia|Comune"]*/
        $(Regioni).each(function(i, el) {
            $(".regioni").append("<option value='" + el.getNome + "'>" + el.getNome + "</option>");
        })
    }
 
    $(".regioni").on("change", function() {
        $(".comuni").children().remove();
        $(".province").children().remove();
        $(".comuni").attr("disabled", true);
        $(".province").attr("disabled", false);
        $(Regioni).each(function(i, el) {
            if ($(".regioni").val() == el.getNome) {
                $(Regioni[i].getProvince).each(function(j, ex) {
                    $(".province").append("<option value='" + ex.getNome + "'>" + ex.getNome + "</option>");
                })
            }
        })
    })
 
    $(".province").on("change", function() {
        $(".comuni").children().remove();
        $(".comuni").attr("disabled", false);
        $(Regioni).each(function(i, el) {
            if ($(".regioni").val() == el.getNome) {
                $(Regioni[i].getProvince).each(function(j, el) {
                    if ($(".province").val() == el.getNome) {
                        $(Regioni[i].getProvince[j].getComuni).each(function(z, el) {
                            $(".comuni").append("<option value='" + el.getNome + "'>" + el.getNome + "</option>");
                        })
                    }
                })
            }
        })
    })
 
 
    $(".regioni").on("click", function() {
        $(".regioni").css("color", "black");
    })
    $(".province").on("click", function() {
        $(".province").css("color", "black");
    })
    $(".comuni").on("click", function() {
        $(".comuni").css("color", "black");
    })
    $(".anno").on("click", function() {
        $(".anno").css("color", "black");
    })
 
    for (let i = 1940; i < (new Date).getFullYear(); i++) $(".anno").append("<option value='" + i + "'>" + i + "</option>");
})