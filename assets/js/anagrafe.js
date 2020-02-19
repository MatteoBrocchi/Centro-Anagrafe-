var Residenza = /** @class */ (function () {
    function Residenza() { }
    Residenza.cambioResidenza = function (vecchioIndirizzo, nuovoIndirizzo, vecchiaResidenza, nuovaResidenza, persona) {
        if (persona.carta != undefined && persona.carta.tuttiDati[2][0] == vecchiaResidenza && persona.carta.tuttiDati[3] == vecchioIndirizzo) {
            var copia = JSON.stringify(persona);
            persona.carta = new cartaIdentita([persona.carta.tuttiDati[0], persona.carta.tuttiDati[1],
            [nuovaResidenza, persona.carta.tuttiDati[2][1], persona.carta.tuttiDati[2][2]], nuovoIndirizzo, persona.carta.tuttiDati[4], persona.carta.tuttiDati[5], c
            ]);
            var a = JSON.parse(copia);
            a.residenza.a = new Date(Date.now());
            return a;
        }
    };
    return Residenza;
}());
var Persona = /** @class */ (function () {
    function Persona(carta) {
        this.carta = carta;
        this.residenza = new certificatoResidenza(new Date(Date.now()));
        this.nome = carta.tuttiDati[0];
        this.cognome = carta.tuttiDati[1];
    }
    Persona.prototype.Prova = function () { return false; };
    return Persona;
}());
var Matrimonio = /** @class */ (function () {
    function Matrimonio(valore3) {
        this.nomeSposo = valore3[0];
        this.cognomeSposo = valore3[1];
        this.nomeSposa = valore3[2];
        this.cognomeSposa = valore3[3];
        this.data = valore3[4];
        this.comune = valore3[5];
    }
    Object.defineProperty(Matrimonio.prototype, "tuttiDati", {
        get: function () {
            return [this.nomeSposo, this.cognomeSposo, this.nomeSposa, this.nomeSposa, this.data, this.comune];
        },
        enumerable: true,
        configurable: true
    });
    return Matrimonio;
}());
var certificatoResidenza = /** @class */ (function () {
    function certificatoResidenza(da) {
        this.da = da;
    }
    return certificatoResidenza;
}());
var cartaIdentita = /** @class */ (function () {
    function cartaIdentita(valore) {
        this.nome = valore[0];
        this.cognome = valore[1];
        this.luogoNascita = valore[2];
        this.indirizzo = valore[3];
        this.annoNascita = valore[4];
        this.annoRilascio = valore[5];
        this.id = "AU" + valore[6];
    }
    Object.defineProperty(cartaIdentita.prototype, "tuttiDati", {
        get: function () {
            return [this.nome, this.cognome, this.luogoNascita, this.indirizzo, this.annoNascita, this.annoRilascio, this.id];
        },
        enumerable: true,
        configurable: true
    });
    return cartaIdentita;
}());
var c = 0;
var persone = new Array();
var datiPie = new Array();
var datiBar = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var regioni = new Array();
var chartPie;
var regSelected = "";
var provSelected = "";
var comSelected = "";
var annoSelected = 0;
var chartBar;

$(function () {
    $.ajax({
        type: "GET",
        contentType: "application/json",
        url: "https://late-frost-5190.getsandbox.com/anagrafiche",
        dataType: "json",
        success: function (data) {
            $.each(data, function (i, value) {
                c = value.id + 1;
                persone.push(Object.assign({}, value));
            }); //Object.assign({}, value)
            downloadDataPie();
        }
    });
    $(".regioni").on("click", function () {
        $(".regioni").css("color", "black");
    })
    $(".province").on("click", function () {
        $(".province").css("color", "black");
    })
    $(".comuni").on("click", function () {
        $(".comuni").css("color", "black");
    })
    $(".anno").on("click", function () {
        $(".anno").css("color", "black");
    })

    for (let i = 1940; i < (new Date).getFullYear() + 1; i++) $(".anno").append("<option value='" + i + "'>" + i + "</option>");
    //creazione carta d'identità
    $('.btnAddID').on('click', function () { //METTERE BOTTONE DELL'AGGIUNTA PERSONA
        var check = true;
        //controllo che il form sia stato completato
        $('#form1 input').each(function () {
            if ($(this).val() === '')
                check = false;
        });
        if (check) {
            //regione provincia e codice
            var dt = '{"nome": "' + $("#nome-input").val().toString() + '", "cognome": "' + $('#cognome-input').val().toString()
                + '", "anno_nascita": "' + $('#anno-input').val().toString() + '", "regione": "' + $('#regione-input').val().toString()
                + '","provincia": "' + $('#provincia-input').val().toString() + '", "comune": "' + $('#residenza').val().toString() + '", "anno_residenza": "' + $('#rilascio-input').val().toString()
                + '", "indirizzo": "' + $('#indirizzo-input').val().toString() + '", "anno_rilascio": "' + $('#rilascio-input').val().toString()
                + '", "codice": "' + "AU" + c + '"}';
            $.ajax({
                type: "POST",
                headers: { "Access-Control-Allow-Origin": "*" },
                data: dt,
                /* Per poter aggiungere una entry bisogna prima autenticarsi. */
                contentType: "application/json",
                url: "https://late-frost-5190.getsandbox.com/anagrafiche/add/",
                dataType: "json",
                success: function (data) {
                    $.ajax({
                        type: "GET",
                        contentType: "application/json",
                        url: "https://late-frost-5190.getsandbox.com/anagrafiche",
                        dataType: "json",
                        success: function (data) {
                            $.each(data, function (i, value) {
                                persone.push(Object.assign({}, value));
                            }); //Object.assign({}, value)
                            downloadDataPie();
                            c = persone.length;
                        }
                    });
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    var a = 0;
                }
            });
            c++;
        } else
            alert("Compila tutti i campi");
        $('#form1').trigger("reset");
    });
    //cambio residenza
    $('#form2 button').on('click', function () {
        var check = true;
        //controllo che il form sia stato completato
        $('#form2 input').each(function () {
            if ($(this).val() === '')
                check = false;
        });
        if (check) {
            var esiste = false;
            for (var i = 0; i < persone.length; i++) {
                if (persone[i].nome == $('#nome2').val().toString() &&
                    persone[i].cognome == $('#cognome2').val().toString() &&
                    persone[i].carta.luogoNascita[0] == $('#vecchiaresidenza').val().toString() &&
                    persone[i].carta.indirizzo == $('#vecchioindirizzo').val().toString()) {
                    persone[c++] = Residenza.cambioResidenza(persone[i].carta.indirizzo, $('#nuovoindirizzo').val().toString(), persone[i].carta.luogoNascita[0], $('#nuovaresidenza').val().toString(), persone[i]);
                    localStorage.setItem("persone", JSON.stringify(persone));
                    break;
                }
            };
        } else
            alert("Compila tutti i campi");
        $('#form2').trigger("reset");
    });
    $('#form3 button').on('click', function () {
        var check = true;
        //controllo che il form sia stato completato
        $('#form3 input').each(function () {
            if ($(this).val() === '')
                check = false;
        });
        if (check) {
            var appoggio = [1, 1];
            var esiste = false;
            for (var i = 0; i < persone.length; i++) {
                if (persone[i].nome == $('#nome3').val().toString() && persone[i].cognome == $('#cognome3').val().toString()) {
                    if (appoggio[0] == 1)
                        appoggio[0] = persone[i];
                    else if (appoggio[1] == 1 && appoggio[0].identificativo != persone[i].identificativo)
                        appoggio[1] = persone[i];
                }
                if (persone[i].nome == $('#nome4').val().toString() && persone[i].cognome == $('#cognome4').val().toString()) {
                    if (appoggio[0] == 1)
                        appoggio[0] = persone[i];
                    else if (appoggio[1] == 1 && appoggio[0].identificativo != persone[i].identificativo)
                        appoggio[1] = persone[i];
                }
                if (appoggio[1] != 1) {
                    appoggio[0].sposo = appoggio[1].identificativo;
                    appoggio[1].sposo = appoggio[0].identificativo;
                    esiste = true;
                    break;
                }
            };
            if (!esiste)
                alert("utente non trovato");
            localStorage.setItem("persone", JSON.stringify(persone));
        } else
            alert("Compila tutti i campi");
        $('#form3').trigger("reset");
    });
    $('#form6 button').on('click', function () {
        var check = true;
        //controllo che il form sia stato completato
        $('#form6 input').each(function () {
            if ($(this).val() === '')
                check = false;
        });
        if (check) {
            for (var i = 0; i < persone.length; i++) {
                if (persone[i].nome == $('#nome7').val().toString() && persone[i].cognome == $('#cognome7').val().toString()) {
                    persone[i].residenza.a = new Date(Date.now());
                    break;
                }
            }
            localStorage.setItem("persone", JSON.stringify(persone));
        } else
            alert("Compila tutti i campi");
        $('#form6').trigger("reset");
    });
    $(".regioni").on("change", function () {
        provSelected = "";
        comSelected = "";
        $(".regioni option:selected").each(function () {
            regSelected = $(this).text().toString();
            downloadDataBar();
        });
        $(".province").attr("disabled", false);
    });
    $(".province").on("change", function () {
        comSelected = "";
        $(".province option:selected").each(function () {
            provSelected = $(this).text().toString();
            downloadDataBar();
        });
        $(".comuni").attr("disabled", false);
    });
    $(".comuni").on("change", function () {
        $(".comuni option:selected").each(function () {
            comSelected = $(this).text().toString();
            downloadDataBar();
        });
        $(".comuni").attr("disabled", false);
    });
    $(".anno").on("change", function () {
        $(".anno option:selected").each(function () {
            annoSelected = parseInt($(this).text());
            downloadDataBar();
        });
    });
    //
    $.ajax({
        type: "GET",
        contentType: "application/json",
        url: "https://late-frost-5190.getsandbox.com/nome",
        dataType: "json",
        success: function (data) {
            var arrNome = lines.split('\n');
        }
    });
    $.ajax({
        type: "GET",
        contentType: "application/json",
        url: "https://late-frost-5190.getsandbox.com/cognome",
        dataType: "json",
        success: function (data) {
            var arrCognome = lines.split('\n');
        }
    });
    $.ajax({
        type: "GET",
        contentType: "application/json",
        url: "https://late-frost-5190.getsandbox.com/territorio",
        dataType: "json",
        success: function (data) {
            var jsonRegioni = data;
        }
    })
    for (var i = c; i < 200; i++) {
        var nascita = Math.floor(Math.random() * (2020 - 1850 + 1) + 1850);
        var dt = '{"nome": "' + nomi[Math.floor(Math.random() * nomi.length - 1)] + '", "cognome": "' + cognomi[Math.floor(Math.random() * nomi.length - 1)]
            + '", "anno_nascita": "' +
            nascita + "-" + Math.floor(Math.random() * 12) + "-" + Math.floor(Math.random() * 12);
        + '", "regione": "' + jsonRegioni.regioni[Math.random() * jsonRegioni.regioni]
            + '","provincia": "' + jsonRegioni.regioni.provincia[Math.random() * jsonRegioni.regioni.provincia] + '", "comune": "' + jsonRegioni.regioni.provincia.comune[Math.random() * jsonRegioni.regioni.provincia.comune] + '", "anno_residenza": "' + $('#rilascio-input').val().toString()
            + '", "indirizzo": "' + $('#indirizzo-input').val().toString() + '", "anno_rilascio": "' + $('#rilascio-input').val().toString()
            + '", "codice": "' + "AU" + c + '"}';

        $.ajax({
            type: "POST",
            headers: { "Access-Control-Allow-Origin": "*" },
            data: dt,
            /* Per poter aggiungere una entry bisogna prima autenticarsi. */
            contentType: "application/json",
            url: "https://late-frost-5190.getsandbox.com/anagrafiche/add/",
            dataType: "json",
            success: function (data) {
                $.ajax({
                    type: "GET",
                    contentType: "application/json",
                    url: "https://late-frost-5190.getsandbox.com/anagrafiche",
                    dataType: "json",
                    success: function (data) {
                        $.each(data, function (i, value) {
                            persone.push(Object.assign({}, value));
                        }); //Object.assign({}, value)
                        downloadDataPie();
                        c = persone.length;
                    }
                });
            },
            error: function (jqXHR, textStatus, errorThrown) {
                var a = 0;
                alert(jqXHR.responseText);
            }
        });
        c++;
    }
});

function downloadDataPie() {
    /**
     * Creazione del diagramma a torta
     * Aggiunge i dati e li stampa
     */
    $.ajax({
        type: "GET",
        contentType: "application/json",
        url: "https://late-frost-5190.getsandbox.com/territorio",
        dataType: "json",
        success: function (data) {
            $.each(data.regioni, function (i, value) {
                regioni.push(value.nome);
            });
            for (var reg in regioni) {
                var regione = regioni[reg];
                var i = 0;
                for (var persona in persone) {
                    if (persone[persona].luoghi_residenza[0].regione == regione) {
                        i++;
                    }
                }
                datiPie.push(i);
                datiBar.push(i);
            }
            //avvio creazione grafico a torta
            addPieChart();
        },
        error: function (xhr, status, error) {
            var err = eval("(" + xhr.responseText + ")");
            console.log(err.Message);
            return err.Message;
        }
    });
}

function downloadDataBar() {
    //controlal se è stato selezionato anno e regione 
    if (annoSelected != 0 && regSelected != "" && provSelected == "") {
        datiBar = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        //scorre tutte le persone
        for (var persona in persone) {
            //scorre tutte le residenze della persona
            for (var residenza in persone[persona].luoghi_residenza) {
                //se l'anno è minore di quello selezionato aggiunge persona a tutti i mesi dell'anno
                if (persone[persona].luoghi_residenza[residenza].regione == regSelected && persone[persona].luoghi_residenza[residenza].anno.split("-")[0] < annoSelected)
                    for (var i = 0; i < 12; i++) datiBar[i]++;
                //se l'anno è uguale a quello selezionato aggiunge fino al mese selezionato
                if (persone[persona].luoghi_residenza[residenza].regione == regSelected && persone[persona].luoghi_residenza[residenza].anno.split("-")[0] == annoSelected) {
                    var mese = persone[persona].luoghi_residenza[residenza].anno.split("-")[1];
                    addDataBar(mese);
                }
            }
        }
        addBarChart(regSelected);
    }
    //oppure anno e provincia
    else if (annoSelected != 0 && provSelected != "" && comSelected == "") {
        datiBar = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        for (var persona in persone) {
            //scorre tutte le residenze della persona
            for (var residenza in persone[persona].luoghi_residenza) {
                //se l'anno è minore di quello selezionato aggiunge persona a tutti i mesi dell'anno
                if (persone[persona].luoghi_residenza[residenza].provincia == provSelected && persone[persona].luoghi_residenza[residenza].anno.split("-")[0] < annoSelected)
                    for (var i = 0; i < 12; i++) datiBar[i]++;
                //se l'anno è uguale a quello selezionato aggiunge fino al mese selezionato
                if (persone[persona].luoghi_residenza[residenza].provincia == provSelected && persone[persona].luoghi_residenza[residenza].anno.split("-")[0] == annoSelected) {
                    var mese = persone[persona].luoghi_residenza[residenza].anno.split("-")[1];
                    addDataBar(mese);
                }
            }
        }
        addBarChart(provSelected);
    }
    //oppure anno e comune
    else if (annoSelected != 0 && comSelected != "") {
        datiBar = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        for (var persona in persone) {
            var controllo = false;
            //scorre tutte le residenze della persona
            for (var residenza in persone[persona].luoghi_residenza) {
                //se l'anno è minore di quello selezionato aggiunge persona a tutti i mesi dell'anno
                if (persone[persona].luoghi_residenza[residenza].comune == comSelected && persone[persona].luoghi_residenza[residenza].anno.split("-")[0] < annoSelected && !controllo) {
                    if (persone[persona].luoghi_residenza.length > 1) {
                        if (annoSelected == persone[persona].luoghi_residenza[residenza - 1].anno.split("-")[0]) {
                            var mese = persone[persona].luoghi_residenza[residenza - 1].anno.split("-")[1];
                            if (persone[persona].luoghi_residenza.length > 1 && residenza != 0)
                                addDataBarResidenza(mese);
                        }
                        else if (persone[persona].luoghi_residenza[residenza - 1].anno.split("-")[0] > annoSelected) for (var i = 0; i < 12; i++) { datiBar[i]++; controllo = true; }
                    }
                }
                //se l'anno è uguale a quello selezionato aggiunge fino al mese selezionato
                else if (persone[persona].luoghi_residenza[residenza].comune == comSelected && persone[persona].luoghi_residenza[residenza].anno.split("-")[0] == annoSelected && !controllo) {
                    var mese = persone[persona].luoghi_residenza[residenza].anno.split("-")[1];
                    if (persone[persona].luoghi_residenza.length > 1 && residenza == 0) addDataBarResidenza(mese);
                    else {
                        addDataBar(mese);
                    }
                }
            }
        }
        addBarChart(comSelected);
    }
}

function addDataBar(mese) {
    switch (mese) {
        case "01":
            datiBar[0]++;
            break;
        case "02":
            for (var i = 1; i < 12; i++)
                datiBar[i]++;
            break;
        case "03":
            for (var i = 2; i < 12; i++)
                datiBar[i]++;
            break;
        case "04":
            for (var i = 3; i < 12; i++)
                datiBar[i]++;
            break;
        case "05":
            for (var i = 4; i < 12; i++)
                datiBar[i]++;
            break;
        case "06":
            for (var i = 5; i < 12; i++)
                datiBar[i]++;
            break;
        case "07":
            for (var i = 6; i < 12; i++)
                datiBar[i]++;
            break;
        case "08":
            for (var i = 7; i < 12; i++)
                datiBar[i]++;
            break;
        case "09":
            for (var i = 8; i < 12; i++)
                datiBar[i]++;
            break;
        case "10":
            for (var i = 9; i < 12; i++)
                datiBar[i]++;
            break;
        case "11":
            for (var i = 10; i < 12; i++)
                datiBar[i]++;
            break;
        case "12":
            for (var i = 11; i < 12; i++)
                datiBar[i]++;
            break;
    }
}
function addDataBarResidenza(mese) {
    switch (mese) {
        case "01":
            datiBar[0]++;
            break;
        case "02":
            for (var i = 0; i < 1; i++)
                datiBar[i]++;
            break;
        case "03":
            for (var i = 0; i < 2; i++)
                datiBar[i]++;
            break;
        case "04":
            for (var i = 0; i < 3; i++)
                datiBar[i]++;
            break;
        case "05":
            for (var i = 0; i < 4; i++)
                datiBar[i]++;
            break;
        case "06":
            for (var i = 0; i < 5; i++)
                datiBar[i]++;
            break;
        case "07":
            for (var i = 0; i < 6; i++)
                datiBar[i]++;
            break;
        case "08":
            for (var i = 0; i < 7; i++)
                datiBar[i]++;
            break;
        case "09":
            for (var i = 0; i < 8; i++)
                datiBar[i]++;
            break;
        case "10":
            for (var i = 0; i < 9; i++)
                datiBar[i]++;
            break;
        case "11":
            for (var i = 0; i < 10; i++)
                datiBar[i]++;
            break;
        case "12":
            for (var i = 0; i < 11; i++)
                datiBar[i]++;
            break;
    }
}
function addPieChart() {
    if (chartPie != undefined)
        chartPie.destroy();
    for (var i = 0; i < datiPie.length; i++) {
        if (datiPie[i] == undefined) {
            datiPie[i] = 0;
        }
    }
    for (var j = 0; j < datiPie.length; j++) {
        if (regioni[j] == undefined) {
            regioni[j] = "";
        }
    }
    chartPie = new Chart(document.getElementById("myChartPie"), {
        type: "pie",
        data: {
            labels: [regioni[0] || "", regioni[1] || "", regioni[2] || "", regioni[3] || "", regioni[4] || "", regioni[5] || "", regioni[6] || "", regioni[7] || "", regioni[8] || "", regioni[9] || "", regioni[10] || "", regioni[11] || "", regioni[12] || "", regioni[13] || "", regioni[14] || "", regioni[15] || "", regioni[16] || "", regioni[17] || "", regioni[18] || "", regioni[19] || ""],
            datasets: [{
                label: "Population",
                data: [
                    datiPie[0],
                    datiPie[1],
                    datiPie[2],
                    datiPie[3],
                    datiPie[4],
                    datiPie[5],
                    datiPie[6],
                    datiPie[7],
                    datiPie[8],
                    datiPie[9],
                    datiPie[10],
                    datiPie[11],
                    datiPie[12],
                    datiPie[13],
                    datiPie[14],
                    datiPie[15],
                    datiPie[16],
                    datiPie[17],
                    datiPie[18],
                    datiPie[19],
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
                text: "Popolazione regioni",
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
                }
            },
            tooltips: {
                enabled: true,
            }
        },
    });
    // Ridimensiono la torta
    $("#myChartPie").css("width", "1000px");
    $("#myChartPie").css("height", "");
}

function addBarChart(luogo) {
    // Ridimensionamento dei grafici
    $("#myChart").parent().removeClass("d-none");
    $("#myChart").parent().addClass("d-flex");
    $("#myChartPie").parent().removeClass("col-md-12");
    $("#myChartPie").parent().addClass("col-md-6");

    luogo = "Popolazione " + luogo;
    if (chartBar != undefined)
        chartBar.destroy();
    for (var i = 0; i < datiBar.length; i++) {
        if (datiBar[i] == undefined) {
            datiBar[i] = 0;
        }
    }
    chartBar = new Chart(document.getElementById("myChart"), {
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
                label: luogo,
                data: [
                    datiBar[0],
                    datiBar[1],
                    datiBar[2],
                    datiBar[3],
                    datiBar[4],
                    datiBar[5],
                    datiBar[6],
                    datiBar[7],
                    datiBar[8],
                    datiBar[9],
                    datiBar[10],
                    datiBar[11],
                ],
                backgroundColor: [
                    '#0044ff', '#00bfff', '#00ffae', '#00ff26', '#5eff00', '#e1ff00', '#ffb700', '#ff3c00', '#c46200', '#c4b700', '#00c493', '#009dc4'
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
                text: luogo,
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
            },
            tooltips: {
                enabled: true,
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        stepSize: 1
                    }
                }]
            }
        }
    });
}
//# sourceMappingURL=anagrafe.js.map
