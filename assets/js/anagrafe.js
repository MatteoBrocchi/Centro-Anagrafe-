var Residenza = function() {
        function e() {} return e.cambioResidenza = function(e, r, a, i, o) { if (null != o.carta && o.carta.tuttiDati[2][0] == a && o.carta.tuttiDati[3] == e) { var n = JSON.stringify(o);
                o.carta = new cartaIdentita([o.carta.tuttiDati[0], o.carta.tuttiDati[1],
                    [i, o.carta.tuttiDati[2][1], o.carta.tuttiDati[2][2]], r, o.carta.tuttiDati[4], o.carta.tuttiDati[5], c
                ]); var t = JSON.parse(n); return t.residenza.a = new Date(Date.now()), t } }, e }(),
    Persona = function() {
        function e(e) { this.carta = e, this.residenza = new certificatoResidenza(new Date(Date.now())), this.nome = e.tuttiDati[0], this.cognome = e.tuttiDati[1] } return e.prototype.Prova = function() { return !1 }, e }(),
    Matrimonio = function() {
        function e(e) { this.nomeSposo = e[0], this.cognomeSposo = e[1], this.nomeSposa = e[2], this.cognomeSposa = e[3], this.data = e[4], this.comune = e[5] } return Object.defineProperty(e.prototype, "tuttiDati", { get: function() { return [this.nomeSposo, this.cognomeSposo, this.nomeSposa, this.nomeSposa, this.data, this.comune] }, enumerable: !0, configurable: !0 }), e }(),
    certificatoResidenza = function() { return function(e) { this.da = e } }(),
    cartaIdentita = function() {
        function e(e) { this.nome = e[0], this.cognome = e[1], this.luogoNascita = e[2], this.indirizzo = e[3], this.annoNascita = e[4], this.annoRilascio = e[5], this.id = "AU" + e[6] } return Object.defineProperty(e.prototype, "tuttiDati", { get: function() { return [this.nome, this.cognome, this.luogoNascita, this.indirizzo, this.annoNascita, this.annoRilascio, this.id] }, enumerable: !0, configurable: !0 }), e }(),
    persone = new Array,
    datiPie = new Array,
    datiBar = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    regioni = new Array,
    chartPie, regSelected = "",
    provSelected = "",
    comSelected = "",
    annoSelected = 0,
    chartBar, arrayTerritory = new Array;

function downloadDataPie() { $.ajax({ type: "GET", contentType: "application/json", url: "https://late-frost-5190.getsandbox.com/territorio", dataType: "json", headers: { "Access-Control-Allow-Origin": "*", "Cache-Control": "no-store" }, success: function(e) { for (var r in $.each(e, function(e, r) { arrayTerritory.push(Object.assign({}, r)), arrayTerritory = arrayTerritory[0]; for (let e = 0; e < 20; e++) { $(".regioni").append(new Option(arrayTerritory[e].nome, arrayTerritory[e].nome)), $("#regionemod").append(new Option(arrayTerritory[e].nome, arrayTerritory[e].nome)); for (let r = 0; r < arrayTerritory[e].province.length; r++) { $(".province").append(new Option(arrayTerritory[e].province[r].nome)), $("#provinciamod").append(new Option(arrayTerritory[e].province[r].nome)); for (let a = 0; a < arrayTerritory[e].province[r].comuni.length; a++) $(".comuni").append(new Option(arrayTerritory[e].province[r].comuni[a])), $("#comunemod").append(new Option(arrayTerritory[e].province[r].comuni[a])), $("#birthPlace").append(new Option(arrayTerritory[e].province[r].comuni[a])) } } }), $.each(e.regioni, function(e, r) { regioni.push(r.nome) }), regioni) { var a = regioni[r],
                    i = 0; for (var o in persone) null == persone[o].data_morte && persone[o].luoghi_residenza[0].regione == a && i++;
                datiPie.push(i), datiBar.push(i) }
            addPieChart() }, error: function(xhr, status, error) { var err = eval("(" + xhr.responseText + ")"); return console.log(err.Message), err.Message } }) }

function downloadDataBar() { if (0 != annoSelected && "" != regSelected && "" == provSelected) { var e; for (var r in datiBar = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], persone)
            if (null == persone[r].data_morte)
                if (persone[r].luoghi_residenza.length > 1)
                    for (e in persone[r].luoghi_residenza) { if (persone[r].luoghi_residenza[e].anno.split("-")[0] < annoSelected && persone[r].luoghi_residenza[e].regione == regSelected) { if (null != persone[r].luoghi_residenza[parseInt(e) - 1] && annoSelected < persone[r].luoghi_residenza[e - 1].anno.split("-")[0]) { for (var a = 0; a < 12; a++) datiBar[a]++; break } if (0 == e) { for (a = 0; a < 12; a++) datiBar[a]++; break } } if (persone[r].luoghi_residenza[e].anno.split("-")[0] == annoSelected && persone[r].luoghi_residenza[e].regione == regSelected) { addDataBar(persone[r].luoghi_residenza[e].anno.split("-")[1]); break } if (null != persone[r].luoghi_residenza[1 + parseInt(e)] && persone[r].luoghi_residenza[e].anno.split("-")[0] == annoSelected && persone[r].luoghi_residenza[e].regione != regSelected && persone[r].luoghi_residenza[parseInt(e) + 1].regione == regSelected) { removeDataBar(persone[r].luoghi_residenza[e].anno.split("-")[1]); break } } else { if (persone[r].luoghi_residenza[0].regione == regSelected && persone[r].luoghi_residenza[0].anno.split("-")[0] < annoSelected)
                            for (a = 0; a < 12; a++) datiBar[a]++; if (persone[r].luoghi_residenza[0].regione == regSelected && persone[r].luoghi_residenza[0].anno.split("-")[0] == annoSelected) addDataBar(persone[r].luoghi_residenza[0].anno.split("-")[1]) }
                addBarChart(regSelected) } else if (0 != annoSelected && "" != provSelected && "" == comSelected) { for (var r in datiBar = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], persone)
            if (persone[r].luoghi_residenza.length > 1)
                for (e in persone[r].luoghi_residenza) { if (persone[r].luoghi_residenza[e].anno.split("-")[0] < annoSelected && persone[r].luoghi_residenza[e].provincia == provSelected) { if (null != persone[r].luoghi_residenza[parseInt(e) - 1] && annoSelected < persone[r].luoghi_residenza[e - 1].anno.split("-")[0]) { for (a = 0; a < 12; a++) datiBar[a]++; break } if (0 == e) { for (a = 0; a < 12; a++) datiBar[a]++; break } } if (persone[r].luoghi_residenza[e].anno.split("-")[0] == annoSelected && persone[r].luoghi_residenza[e].provincia == provSelected) { addDataBar(persone[r].luoghi_residenza[e].anno.split("-")[1]); break } if (null != persone[r].luoghi_residenza[1 + parseInt(e)] && persone[r].luoghi_residenza[e].anno.split("-")[0] == annoSelected && persone[r].luoghi_residenza[e].provincia != provSelected && persone[r].luoghi_residenza[parseInt(e) + 1].provincia == provSelected) { removeDataBar(persone[r].luoghi_residenza[e].anno.split("-")[1]); break } } else { if (persone[r].luoghi_residenza[0].provincia == provSelected && persone[r].luoghi_residenza[0].anno.split("-")[0] < annoSelected)
                        for (a = 0; a < 12; a++) datiBar[a]++; if (persone[r].luoghi_residenza[0].provincia == provSelected && persone[r].luoghi_residenza[0].anno.split("-")[0] == annoSelected) addDataBar(persone[r].luoghi_residenza[0].anno.split("-")[1]) }
            addBarChart("provincia di " + provSelected) } else if (0 != annoSelected && "" != comSelected) { for (var r in datiBar = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], persone)
            if (persone[r].luoghi_residenza.length > 1)
                for (e in persone[r].luoghi_residenza) { if (persone[r].luoghi_residenza[e].anno.split("-")[0] < annoSelected && persone[r].luoghi_residenza[e].comune == comSelected) { if (null != persone[r].luoghi_residenza[parseInt(e) - 1] && annoSelected < persone[r].luoghi_residenza[e - 1].anno.split("-")[0]) { for (a = 0; a < 12; a++) datiBar[a]++; break } if (0 == e) { for (a = 0; a < 12; a++) datiBar[a]++; break } } if (persone[r].luoghi_residenza[e].anno.split("-")[0] == annoSelected && persone[r].luoghi_residenza[e].comune == comSelected) { addDataBar(persone[r].luoghi_residenza[e].anno.split("-")[1]); break } if (null != persone[r].luoghi_residenza[1 + parseInt(e)] && persone[r].luoghi_residenza[e].anno.split("-")[0] == annoSelected && persone[r].luoghi_residenza[e].comune == comSelected && persone[r].luoghi_residenza[parseInt(e) + 1].comune == comSelected) { removeDataBar(persone[r].luoghi_residenza[e].anno.split("-")[1]); break } } else { if (persone[r].luoghi_residenza[0].comune == comSelected && persone[r].luoghi_residenza[0].anno.split("-")[0] < annoSelected)
                        for (a = 0; a < 12; a++) datiBar[a]++; if (persone[r].luoghi_residenza[0].comune == comSelected && persone[r].luoghi_residenza[0].anno.split("-")[0] == annoSelected) addDataBar(persone[r].luoghi_residenza[0].anno.split("-")[1]) }
            addBarChart("comune di " + comSelected) } }

function addDataBar(e) { switch (e) {
        case "01":
            datiBar[0]++; break;
        case "02":
            for (var r = 1; r < 12; r++) datiBar[r]++; break;
        case "03":
            for (r = 2; r < 12; r++) datiBar[r]++; break;
        case "04":
            for (r = 3; r < 12; r++) datiBar[r]++; break;
        case "05":
            for (r = 4; r < 12; r++) datiBar[r]++; break;
        case "06":
            for (r = 5; r < 12; r++) datiBar[r]++; break;
        case "07":
            for (r = 6; r < 12; r++) datiBar[r]++; break;
        case "08":
            for (r = 7; r < 12; r++) datiBar[r]++; break;
        case "09":
            for (r = 8; r < 12; r++) datiBar[r]++; break;
        case "10":
            for (r = 9; r < 12; r++) datiBar[r]++; break;
        case "11":
            for (r = 10; r < 12; r++) datiBar[r]++; break;
        case "12":
            for (r = 11; r < 12; r++) datiBar[r]++ } }

function addDataBarResidenza(e) { switch (e) {
        case "01":
            datiBar[0]++; break;
        case "02":
            for (var r = 0; r < 1; r++) datiBar[r]++; break;
        case "03":
            for (r = 0; r < 2; r++) datiBar[r]++; break;
        case "04":
            for (r = 0; r < 3; r++) datiBar[r]++; break;
        case "05":
            for (r = 0; r < 4; r++) datiBar[r]++; break;
        case "06":
            for (r = 0; r < 5; r++) datiBar[r]++; break;
        case "07":
            for (r = 0; r < 6; r++) datiBar[r]++; break;
        case "08":
            for (r = 0; r < 7; r++) datiBar[r]++; break;
        case "09":
            for (r = 0; r < 8; r++) datiBar[r]++; break;
        case "10":
            for (r = 0; r < 9; r++) datiBar[r]++; break;
        case "11":
            for (r = 0; r < 10; r++) datiBar[r]++; break;
        case "12":
            for (r = 0; r < 11; r++) datiBar[r]++ } }

function removeDataBar(e) { switch (e) {
        case "01":
            datiBar[0]++; break;
        case "02":
            for (var r = 0; r < 2; r++) datiBar[r]++; break;
        case "03":
            for (r = 0; r < 3; r++) datiBar[r]++; break;
        case "04":
            for (r = 0; r < 4; r++) datiBar[r]++; break;
        case "05":
            for (r = 0; r < 5; r++) datiBar[r]++; break;
        case "06":
            for (r = 0; r < 6; r++) datiBar[r]++; break;
        case "07":
            for (r = 0; r < 7; r++) datiBar[r]++; break;
        case "08":
            for (r = 0; r < 8; r++) datiBar[r]++; break;
        case "09":
            for (r = 0; r < 9; r++) datiBar[r]++; break;
        case "10":
            for (r = 0; r < 10; r++) datiBar[r]++; break;
        case "11":
            for (r = 0; r < 11; r++) datiBar[r]++; break;
        case "12":
            for (r = 0; r < 12; r++) datiBar[r]++ } }

function addPieChart() { null != chartPie && chartPie.destroy(); for (var e = 0; e < datiPie.length; e++) null == datiPie[e] && (datiPie[e] = 0); for (var r = 0; r < datiPie.length; r++) null == regioni[r] && (regioni[r] = "");
    chartPie = new Chart(document.getElementById("myChartPie"), { type: "pie", data: { labels: [regioni[0] || "", regioni[1] || "", regioni[2] || "", regioni[3] || "", regioni[4] || "", regioni[5] || "", regioni[6] || "", regioni[7] || "", regioni[8] || "", regioni[9] || "", regioni[10] || "", regioni[11] || "", regioni[12] || "", regioni[13] || "", regioni[14] || "", regioni[15] || "", regioni[16] || "", regioni[17] || "", regioni[18] || "", regioni[19] || ""], datasets: [{ label: "Population", data: [datiPie[0], datiPie[1], datiPie[2], datiPie[3], datiPie[4], datiPie[5], datiPie[6], datiPie[7], datiPie[8], datiPie[9], datiPie[10], datiPie[11], datiPie[12], datiPie[13], datiPie[14], datiPie[15], datiPie[16], datiPie[17], datiPie[18], datiPie[19]], backgroundColor: ["#ffe119", "#4363d8", "#f58231", "#911eb4", "#46f0f0", "#f032e6", "#bcf60c", "#fabebe", "#e6beff", "#9a6324", "#fffac8", "#800000", "#aaffc3", "#808000", "#ffd8b1", "#000075", "#808080", "#ffffff", "#000000"], borderWidth: 1, borderColor: "#777", hoverBorderWidth: 2, hoverBorderColor: "#000" }] }, options: { title: { display: !0, text: "Popolazione regioni attuale", fontSize: 45 }, legend: { display: !1, position: "right", labels: { fontColor: "#000" } }, layout: { padding: { left: 0, right: 0, bottom: 0, top: 20 } }, tooltips: { enabled: !0 } } }), $("#myChartPie").css("width", "900px"), $("#myChartPie").css("height", "") }

function addBarChart(e) { $("#myChart").parent().removeClass("d-none"), $("#myChart").parent().addClass("d-flex"), $("#myChartPie").parent().removeClass("col-lg-12"), $("#myChartPie").parent().addClass("col-lg-6"), e = "Popolazione annuale " + e, null != chartBar && chartBar.destroy(); for (var r = 0; r < datiBar.length; r++) null == datiBar[r] && (datiBar[r] = 0);
    chartBar = new Chart(document.getElementById("myChart"), { type: "bar", data: { labels: ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"], datasets: [{ label: e, data: [datiBar[0], datiBar[1], datiBar[2], datiBar[3], datiBar[4], datiBar[5], datiBar[6], datiBar[7], datiBar[8], datiBar[9], datiBar[10], datiBar[11]], backgroundColor: ["#0044ff", "#00bfff", "#00ffae", "#00ff26", "#5eff00", "#e1ff00", "#ffb700", "#ff3c00", "#c46200", "#c4b700", "#00c493", "#009dc4"], borderWidth: 1, borderColor: "#777", hoverBorderWidth: 2, hoverBorderColor: "#000" }] }, options: { title: { display: !0, text: e, fontSize: 25 }, legend: { display: !1, position: "right", labels: { fontColor: "#000" } }, layout: { padding: { left: 0, right: 0, bottom: 0, top: 0 } }, tooltips: { enabled: !0 }, scales: { yAxes: [{ ticks: { beginAtZero: !0, stepSize: 1 } }] } } }) }
$(function() { $.ajax({ headers: { "Access-Control-Allow-Origin": "*", "Cache-Control": "no-store" }, type: "GET", contentType: "application/json", url: "https://late-frost-5190.getsandbox.com/anagrafiche", dataType: "json", success: function(e) { $.each(e, function(e, r) { persone.push(Object.assign({}, r)) }), downloadDataPie(), document.getElementById("loading_screen").style.display = "none" } }), siteScroll(); var e = $(window),
        r = $("body");
    breakpoints({ xlarge: ["1281px", "1680px"], large: ["981px", "1280px"], medium: ["737px", "980px"], small: [null, "736px"] }), e.on("load", function() { window.setTimeout(function() { r.removeClass("is-preload") }, 100) }), $("#nav > ul").dropotron({ mode: "fade", noOpenerFade: !0, alignment: "center" }), $('<div id="titleBar"><a href="#navPanel" class="toggle"></a></div>').appendTo(r), $('<div id="navPanel"><nav>' + $("#nav").navList() + "</nav></div>").appendTo(r).panel({ hideOnClick: !0, hideOnSwipe: !0, resetScroll: !0, resetForms: !0, side: "left", target: r, visibleClass: "navPanel-visible" }), $(".regioni").on("click", function() { $(".regioni").css("color", "black") }), $(".province").on("click", function() { $(".province").css("color", "black") }), $(".comuni").on("click", function() { $(".comuni").css("color", "black") }), $(".anno").on("click", function() { $(".anno").css("color", "black") }); for (let e = 1940; e < (new Date).getFullYear() + 1; e++) $(".anno").append("<option value='" + e + "'>" + e + "</option>");
    $(".regioni").on("change", function() { provSelected = "", comSelected = "", $(".regioni option:selected").each(function() { regSelected = $(this).text().toString(), downloadDataBar() }), $(".province").attr("disabled", !1) }), $(".province").on("change", function() { comSelected = "", $(".province option:selected").each(function() { provSelected = $(this).text().toString(), downloadDataBar() }), $(".comuni").attr("disabled", !1) }), $(".comuni").on("change", function() { $(".comuni option:selected").each(function() { comSelected = $(this).text().toString(), downloadDataBar() }), $(".comuni").attr("disabled", !1) }), $(".anno").on("change", function() { $(".anno option:selected").each(function() { annoSelected = parseInt($(this).text()), downloadDataBar() }) }), $(document).on("change", ".regioni", function() { $(".province").empty(), $(".comuni").empty(), $(".province").append(new Option("Seleziona provincia")), $(".comuni").append(new Option("Seleziona comune")); for (var e = $(".regioni").val(), r = 0; r < 20; r++)
            if (arrayTerritory[r].nome == e)
                for (let e = 0; e < arrayTerritory[r].province.length; e++) { $(".province").append(new Option(arrayTerritory[r].province[e].nome, arrayTerritory[r].province[e].nome)); for (let a = 0; a < arrayTerritory[r].province[e].comuni.length; a++) $(".comuni").append(new Option(arrayTerritory[r].province[e].comuni[a], arrayTerritory[r].province[e].comuni[a])) } }), $(document).on("change", ".province", function() { $(".comuni").empty(), $(".comuni").append(new Option("Seleziona comune")); for (var e = $(".province").val(), r = 0; r < 20; r++)
            for (var a = 0; a < arrayTerritory[r].province.length; a++)
                if (arrayTerritory[r].province[a].nome == e) { $(".regioni").val(arrayTerritory[r].nome); for (var i = 0; i < arrayTerritory[r].province[a].comuni.length; i++) $(".comuni").append(new Option(arrayTerritory[r].province[a].comuni[i], arrayTerritory[r].province[a].comuni[i])) } }), $(document).on("change", ".comuni", function() { for (var e = $(".comuni").val(), r = 0; r < 20; r++)
            for (var a = 0; a < arrayTerritory[r].province.length; a++)
                for (var i = 0; i < arrayTerritory[r].province[a].comuni.length; i++) arrayTerritory[r].province[a].comuni[i] == e && ($(".regioni").val(arrayTerritory[r].nome), $(".province").val(arrayTerritory[r].province[a].nome), $(".comuni").val(e)) }) });
var siteScroll = function() { var e = !1;
    $(window).scroll(function() { $(this).scrollTop() > 100 ? (e || ($("#nav>ul").prepend("<li class='titolo'>Ufficio Anagrafe</li>"), e = !0), $("#nav").addClass("shrink")) : (e && ($("#nav>ul").find(":first").remove(), e = !1), $("#nav").removeClass("shrink")) }) };