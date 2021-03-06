/* ---------------- ALGEMENE FUNCTIES ---------------- */

// algemene verwijder confirmation functie
function confirmVerwijderen() {
    var bevestiging = confirm("Item verwijderen?");
    return bevestiging;
}

function confirmInleveren() {
    var bevestiging = confirm("Item inleveren?");
    return bevestiging;
}

function confirmWeg() {
    var bevestiging = confirm("Is dit item niet meer uitleenbaar?");
    return bevestiging;
}

function confirmBeschikbaar() {
    var bevestiging = confirm("Is dit item weer beschikbaar?");
    return bevestiging;
}

// beschikbaarheid van exemplaren berekenen, exemplaren die WEG zijn worden genegeerd
function berekenBeschikbaarheid(exemplaren) {
    var aantal = 0;
    var beschikbaar = 0;
    for (var i = 0; i < exemplaren.length; i++) {
        var status = exemplaren[i].status;
        if (status == "BESCHIKBAAR") {
            aantal++;
            beschikbaar++;
        } else if (status == "UITGELEEND") {
            aantal++;
        }
    }

    return beschikbaar + " / " + aantal;
}

// exemplaar aantal veranderen in formulieren
function veranderExemplaarAantal(verandering) {
    var nummerVeld = document.getElementById("aantalExemplaren");
    var minimum = parseInt(nummerVeld.getAttribute("min"));

    // Zorg dat value niet kleiner wordt dan minumum
    nummerVeld.value = Math.max(parseInt(nummerVeld.value) + parseInt(verandering), minimum);
}

function veranderExemplaarAantalBoekToevoegen(verandering) {
    var nummerVeld2 = document.getElementById("boekaantal");
    var minimum = parseInt(nummerVeld2.getAttribute("min"));

    // Zorg dat value niet kleiner wordt dan minumum
    nummerVeld2.value = Math.max(parseInt(nummerVeld2.value) + parseInt(verandering), minimum);

}

/* ---------------- BOEKEN ---------------- */

// boeken-overzicht-admin.html
function boekenOverzichtAdmin(){
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            var antwoord = JSON.parse(this.responseText,
               function (key, value) {
                   return (value == null) ? "" : value
                }
            );
            for(var x = 0 ; x < antwoord.length; x++){
                var idOverzicht = antwoord[x].id;
                var auteurOverzicht = antwoord[x].auteur;
                var categorieOverzicht = antwoord[x].categorie;
                var isbnOverzicht = antwoord[x].isbn;
                var omschrijvingOverzicht = antwoord[x].omschrijving;
                var omslagOverzicht = antwoord[x].omslag;
                var statusOverzicht = berekenBeschikbaarheid(antwoord[x].exemplaren);
                var titelOverzicht = antwoord[x].titel;
                var wtidOverzicht = antwoord[x].wtid;
                var urlString = " id='" + idOverzicht + "' onclick=\"window.location='boek.html?id=" + idOverzicht + "';\""

                $(boekenOverzicht).append(
                    "<tr>" +
                    "<td" + urlString + " class=\"titel\">" + titelOverzicht + "</td>" +
                    "<td" + urlString + " class=\"auteur\">" + auteurOverzicht + "</td>" +
                    "<td" + urlString + " class=\"isbn\">" + isbnOverzicht + "</td>" +
                    "<td" + urlString + " class=\"hide-column categorie\">" + categorieOverzicht + "</td>" +
                    "<td" + urlString + " class=\"hide-column\" >" + omschrijvingOverzicht + "</td>" +
                    "<td" + urlString + " class=\"hide-column\">" + omslagOverzicht + "</td>" +
                    "<td" + urlString + " class=\"status\">" + statusOverzicht + "</td>" +
                    "<td" + urlString + " class=\"hide-column\" >" + wtidOverzicht + "</td>" +
                    "<td class=\"btn bewerk-verwijder\">" + "<button onclick=\"document.location = 'boek-aanpassen.html?id="+idOverzicht+"'\">&#9998;</button>" + "</td>" +
                    "</tr>"
                )
            }
        }
    }
    xhr.open("GET","http://localhost:8082/boeken",true);
    xhr.send();
}

// boek.html
function boekOphalen() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const boekID = urlParams.get('id');
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var boek = JSON.parse(this.responseText);
            document.getElementById("boektitel").innerHTML = boek.titel;
            document.getElementById("boekauteur").innerHTML = boek.auteur;
            document.getElementById("boekisbn").innerHTML = boek.isbn;
            document.getElementById("boekcategorie").innerHTML =  boek.categorie;
            document.getElementById("boekomschrijving").innerHTML = boek.omschrijving;
            document.getElementById("boekstatus").innerHTML = berekenBeschikbaarheid(boek.exemplaren);
            document.getElementById("boekworkingtalentid").innerHTML = boek.wtId;

            var exemplaren = boek.exemplaren
            for(var x = 0 ; x < exemplaren.length; x++){
                var idOverzicht = exemplaren[x].id;
                var wtidOverzicht = exemplaren[x].workingTalentExemplaarId;
                var statusOverzicht = exemplaren[x].status;
                var urlString = " onclick=\"window.location='exemplaar-geschiedenis.html?id=" + idOverzicht + "';\">"
                var toewijsButtonString = "<td class=\"btn bewerk-verwijder\"> </td>";
                if (exemplaren[x].status == "BESCHIKBAAR") {
                    toewijsButtonString = "<td class=\"btn bewerk-verwijder\">" + "<button onclick=\"document.location = 'lening-toevoegen.html?exemplaarid=" + idOverzicht + "'\">&#9755</button>" + "</td>";
                }

                $(exemplaarOverzicht).append(
                    "<tr id='" + idOverzicht + "'>" +
                    "<td" + urlString + boek.wtId + "." + wtidOverzicht + "</td>" +
                    "<td" + urlString + statusOverzicht + "</td>" +
                    toewijsButtonString +
                    "</tr>"
                )
            }
        }
    }
    xhr.open("GET", "http://localhost:8082/boeken/" + boekID, true);
    xhr.send();
}

// boek-toevoegen.html
function boekToevoegenVoorFormulier() {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var aantal = this.responseText;
            //Dit is voor de automatische generatie van het WTid
            document.getElementById("boekwtid").value = parseInt(aantal) + 1;
        }
    };
    xhr.open("GET", "http://localhost:8082/boeken/aantal", true);
    xhr.send();
}


function boekToevoegen() {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (this.readyState == 4) {
            if (this.status == 200) {
                document.location = 'boeken-overzicht-admin.html';
            } else if (this.status == 500) {
                /* ISBN wordt in de backend gecheckt op uniekheid.
                   Als hij niet uniek is, geeft hij status 500 terug.
                   Het kan zijn dat er iets anders fout gaat.
                */
                alert("ISBN bestaat al.")
            }
        }
    }

    var boek = {};
    boek.titel = document.getElementById("boektitel").value;
    boek.auteur = document.getElementById("boekauteur").value;
    boek.isbn = document.getElementById("boekisbn").value;
    //mogelijke toevoeging:
    // boek.categorie = document.getElementById("boekcategorie").value;
    // boek.omschrijving = document.getElementById("boekomschrijving").value;
    boek.wtId = document.getElementById("boekwtid").value;
    boek.aantal = document.getElementById("boekaantal").value;
    var boekJSON = JSON.stringify(boek);
    xhr.open("POST", "http://localhost:8082/boeken", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(boekJSON);
    return false;
}

function exemplaarVerwijderenOverzicht(exemplaarId) {
    bevestiging = confirmWeg();
    if (bevestiging == true) {
        var xhr = new XMLHttpRequest();
        xhr.open("PATCH", "http://localhost:8082/exemplaren/" + exemplaarId +"?status=WEG", true);
        xhr.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                window.location.reload()
            }
        }
    xhr.send();
    }
}

function exemplaarBeschikbaarStellenOverzicht(exemplaarId) {
    bevestiging = confirmBeschikbaar();
        if (bevestiging == true) {
            var xhr = new XMLHttpRequest();
            xhr.open("PATCH", "http://localhost:8082/exemplaren/" + exemplaarId +"?status=BESCHIKBAAR", true);
            xhr.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    window.location.reload()
                }
            }
        xhr.send();
        }
}

// boek-aanpassen.html
function boekOphalenVoorFormulier() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const boekID = urlParams.get('id');
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var boek = JSON.parse(this.responseText);
            document.getElementById("boektitel").value = boek.titel;
            document.getElementById("boekauteur").value = boek.auteur;
            document.getElementById("boekisbn").value = boek.isbn;
            document.getElementById("boekcategorie").value =  boek.categorie;
            document.getElementById("boekomschrijving").value = boek.omschrijving;
            document.getElementById("boekworkingtalentid").value = boek.wtId;
            document.getElementById("aantalExemplaren").value = 0;
            document.getElementById("aantalExemplaren").setAttribute("min", 0);

            var exemplaren = boek.exemplaren
            for(var x = 0 ; x < exemplaren.length; x++){
                var idOverzicht = exemplaren[x].id;
                var wtidOverzicht = exemplaren[x].workingTalentExemplaarId;
                var statusOverzicht = exemplaren[x].status;
                var verwijderString
                if (statusOverzicht == "WEG") {
                    verwijderString = "\"<td class=\"btn bewerk-verwijder\">" + "<button onclick=\"exemplaarBeschikbaarStellenOverzicht(" + idOverzicht + ");\">&#10004</button>" + "</td>\""
                } else {
                    verwijderString = "\"<td class=\"btn bewerk-verwijder\">" + "<button onclick=\"exemplaarVerwijderenOverzicht(" + idOverzicht + ");\">&#10006</button>" + "</td>\""
                }

                $(exemplaarOverzicht).append(
                    "<tr id='" + idOverzicht + "'>" +
                    "<td>" + boek.wtId + "." + wtidOverzicht + "</td>" +
                    "<td>" + statusOverzicht + "</td>" +
                    verwijderString +
                    "</tr>"
                )
            }
        }
    }
    xhr.open("GET", "http://localhost:8082/boeken/" + boekID, true);
    xhr.send();
}

function boekAanpassen() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const boekID = urlParams.get('id');
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200) {
            document.location = document.referrer;
        }
    }

    var boek = {};
    boek.titel = document.getElementById("boektitel").value;
    boek.auteur = document.getElementById("boekauteur").value;
    boek.isbn = document.getElementById("boekisbn").value;
    boek.categorie = document.getElementById("boekcategorie").value;
    boek.omschrijving = document.getElementById("boekomschrijving").value;
    boek.wtId = document.getElementById("boekworkingtalentid").value;
    boek.aantal = document.getElementById("aantalExemplaren").value;
    var boekJSON = JSON.stringify(boek);
    xhr.open("PUT", "http://localhost:8082/boeken/" + boekID, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(boekJSON);

    return false;
}

function boekVerwijderen() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const boekID = urlParams.get('id');
    bevestiging = confirmVerwijderen();
    if (bevestiging == true) {
        var xhr = new XMLHttpRequest();
        xhr.open("DELETE", "http://localhost:8082/boeken/" + boekID, true);
        xhr.send();
    }
}

// exemplaar-geschiedenis.html
function exemplaarGeschiedenis(){
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const exemplaarId = urlParams.get('id');
    
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            var antwoord = JSON.parse(this.responseText,
                function (key, value) {
                    return (value == null) ? "" : value
                }
            );
            for(var x = 0 ; x < antwoord.length; x++){
                var boekidOverzicht = antwoord[x].boek.wtId;
                var exemplaarOverzicht = antwoord[x].exemplaarId;
                var wtidOverzicht = boekidOverzicht + "." + exemplaarOverzicht;
                var titelOverzicht = antwoord[x].boek.titel;
                var auteurOverzicht = antwoord[x].boek.auteur;
                var accountNaamOverzicht = antwoord[x].account.naam;
                var uitleningID = antwoord[x].id;
                var uitleningsDatumOverzicht = antwoord[x].uitleenDatum;
                var inleverDatumOverzicht = antwoord[x].inleverDatum;
                var urlString = ">"
                var inleverButtonString


                if(inleverDatumOverzicht=="") {
                    inleverButtonString = "<td class=\"btn bewerk-verwijder\">" + "<button onclick=\"uitleningInleverOverzicht(" + uitleningID + ");\">&#10004</button>" + "</td>" +
                    "</tr>"
                } else {
                    inleverButtonString = "<td class=\"btn bewerk-verwijder\">" + "</td>" + "</tr>"
                }

                $(ExemplaarGeschiedenis).append(
                    "<tr>" +
                    "<td class=\"uitleen-exemplaar-id\"" + urlString + wtidOverzicht + "</td>" +
                    "<td class=\"uitleen-titel\"" + urlString + titelOverzicht + "</td>" +
                    "<td class=\"uitleen-auteur\"" + urlString + auteurOverzicht + "</td>" +
                    "<td class=\"uitleen-lener\"" + urlString + accountNaamOverzicht + "</td>" +
                    "<td class=\"uitleen-datum\"" + urlString + uitleningsDatumOverzicht + "</td>" +
                    "<td class=\"uitleen-datum\"" + urlString + inleverDatumOverzicht + "</td>" +
                    "<td class=\"btn bewerk-verwijder\">" + "<button onclick=\"document.location = 'lening-aanpassen.html?id=" + uitleningID + "'\">&#9998</button>" + "</td>" +
                    inleverButtonString
                )
            }
        }     
    }
    xhr.open("GET","http://localhost:8082/uitleningen?exemplaarId=" + exemplaarId,true);
    xhr.send();
}

/* ---------------- ACCOUNTS ---------------- */

// account-overzicht.html
function accountOverzichtAdmin(){
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200){
            var antwoord = JSON.parse(this.responseText,
                function (key, value) {
                    return (value == null) ? "" : value
                }
            );
            for(var x = 0 ; x < antwoord.length; x++){
                var idOverzicht = antwoord[x].id;
                var naamOverzicht = antwoord[x].naam;
                var emailOverzicht = antwoord[x].email;
                var urlString = " onclick=\"window.location='account.html?accountid=" + idOverzicht + "';\">"

                $(accountOverzicht).append(
                    "<tr id='" + idOverzicht + "'>" +
                    "<td" + urlString + naamOverzicht + "</td>" +
                    "<td" + urlString + emailOverzicht + "</td>" +
                    "<td class=\"btn bewerk-verwijder\">" + "<button onclick=\"document.location = 'account-aanpassen.html?accountid=" + idOverzicht + "'\">&#9998;</button>" + "</td>" +
                    "<td class=\"btn bewerk-verwijder\">" + "<button onclick=\"document.location = 'lening-toevoegen.html?accountid=" + idOverzicht + "'\">&#9755;</button>" + "</td>" +
                    "</tr>"
                )
            }
        }
    }
    xhr.open("GET","http://localhost:8082/accounts",true);
    xhr.send();
}

function accountVerwijderenOverzicht(accountID) {
    bevestiging = confirmVerwijderen();
    if (bevestiging == true) {
        var xhr = new XMLHttpRequest();
    xhr.open("DELETE", "http://localhost:8082/accounts/" + accountID, true);
    xhr.send();
    }
}

// account.html
function accountOphalen() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const accountID = urlParams.get('accountid');
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var account = JSON.parse(this.responseText);
            document.getElementById("naam").innerHTML = account.naam;
            document.getElementById("emailadres").innerHTML = account.email;
        }
    }
    xhr.open("GET", "http://localhost:8082/accounts/" + accountID, true);
    xhr.send();
    accountGeschiedenisOphalen(accountID);
}

function accountGeschiedenisOphalen(accountId){
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            var antwoord = JSON.parse(this.responseText,
                function (key, value) {
                    return (value == null) ? "" : value
                }
            );
            for(var x = 0 ; x < antwoord.length; x++){
                var boekidOverzicht = antwoord[x].boek.wtId;
                var exemplaarOverzicht = antwoord[x].exemplaarId;
                var wtidOverzicht = boekidOverzicht + "." + exemplaarOverzicht;
                var titelOverzicht = antwoord[x].boek.titel;
                var auteurOverzicht = antwoord[x].boek.auteur;
                var uitleningID = antwoord[x].id;
                var uitleningsDatumOverzicht = antwoord[x].uitleenDatum;
                var inleverDatumOverzicht = antwoord[x].inleverDatum;
                var urlString = ">"

                $(uitleenOverzicht).append(
                    "<tr>" +
                    "<td class=\"uitleen-exemplaar-id\"" + urlString + wtidOverzicht + "</td>" +
                    "<td class=\"uitleen-titel\"" + urlString + titelOverzicht + "</td>" +
                    "<td class=\"uitleen-auteur\"" + urlString + auteurOverzicht + "</td>" +
                    "<td class=\"uitleen-datum\"" + urlString + uitleningsDatumOverzicht + "</td>" +
                    "<td class=\"uitleen-datum\"" + urlString + inleverDatumOverzicht + "</td>"
                    )
                
            }
        }
    }
    xhr.open("GET","http://localhost:8082/uitleningen?accountId=" +accountId,true);
    xhr.send();
}

// account-toevoegen.html
//Wachtwoord wordt niet naar gevraagd en is dus de default (zie AcountService.java)
function accountToevoegen() {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (this.readyState == 4) {
            if (this.status == 200) {
                document.location = 'account-overzicht.html';
            } else if (this.status == 500) {
                /* Email wordt in de backend gecheckt op uniekheid.
                    Als hij niet uniek is, geeft hij status 500 terug.
                    Het kan zijn dat er iets anders fout gaat.
                */
                alert("Email bestaat al")
            }
        }
    }

    var account = {};
    account.naam = document.getElementById("naam").value;
    account.email = document.getElementById("emailadres").value;
    var accountJSON = JSON.stringify(account);
    xhr.open("POST", "http://localhost:8082/accounts", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(accountJSON);
    return false;
}

// account-aanpassen.html
function accountOphalenVoorFormulier() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const accountID = urlParams.get('accountid');
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var account = JSON.parse(this.responseText);
            document.getElementById("naam").value = account.naam;
            document.getElementById("emailadres").value = account.email;
        }
    }
    xhr.open("GET", "http://localhost:8082/accounts/" + accountID, true);
    xhr.send();
}

function accountAanpassen() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const accountID = urlParams.get('accountid');
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
        if(this.readyState == 4) {
            if (this.status == 200) {
                document.location = document.referrer;
            } else if (this.status == 500) {
                /* Email wordt in de backend gecheckt op uniekheid.
                    Als hij niet uniek is, geeft hij status 500 terug.
                    Het kan zijn dat er iets anders fout gaat.
                */
                alert("Email bestaat al.")
            }

        }
    }

    var account = {};
    account.naam = document.getElementById("naam").value;
    account.email = document.getElementById("emailadres").value;
    var accountJSON = JSON.stringify(account);
    xhr.open("PATCH", "http://localhost:8082/accounts/" + accountID, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(accountJSON);

    return false;
}

function accountVerwijderen() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const accountID = urlParams.get('accountid');
    bevestiging = confirmVerwijderen();
    if (bevestiging == true) {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function(){
            if(this.readyState == 4 && this.status == 200){
                document.location = 'account-overzicht.html';
            }
        }
        xhr.open("DELETE", "http://localhost:8082/accounts/" + accountID, true);

        xhr.send();
    }
}

/* ---------------- UITLENINGEN ---------------- */

// uitlening-overzicht-admin.html
function uitleenOverzichtAdmin(){
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            var antwoord = JSON.parse(this.responseText,
                function (key, value) {
                    return (value == null) ? "" : value
                 }
            );
            for(var x = 0 ; x < antwoord.length; x++){
                var boekidOverzicht = antwoord[x].boek.wtId;
                var exemplaarOverzicht = antwoord[x].exemplaarId;
                var wtidOverzicht = boekidOverzicht + "." + exemplaarOverzicht;
                var titelOverzicht = antwoord[x].boek.titel;
                var auteurOverzicht = antwoord[x].boek.auteur;
                var accountNaamOverzicht = antwoord[x].account.naam;
                var uitleningID = antwoord[x].id;
                var uitleningsDatumOverzicht = antwoord[x].uitleenDatum;
                var inleverDatumOverzicht = antwoord[x].inleverDatum;
                var urlString = ">"
                var inleverButtonString


                if(inleverDatumOverzicht=="") {
                    inleverButtonString = "<td class=\"btn bewerk-verwijder\">" + "<button onclick=\"uitleningInleverOverzicht(" + uitleningID + ");\">&#10004</button>" + "</td>" +
                    "</tr>"
                } else {
                    inleverButtonString = "<td class=\"btn bewerk-verwijder\">" + "</td>" + "</tr>"
                }

                $(uitleenOverzicht).append(
                    "<tr>" +
                    "<td class=\"uitleen-exemplaar-id\"" + urlString + wtidOverzicht + "</td>" +
                    "<td class=\"uitleen-titel\"" + urlString + titelOverzicht + "</td>" +
                    "<td class=\"uitleen-auteur\"" + urlString + auteurOverzicht + "</td>" +
                    "<td class=\"uitleen-lener\"" + urlString + accountNaamOverzicht + "</td>" +
                    "<td class=\"uitleen-datum\"" + urlString + uitleningsDatumOverzicht + "</td>" +
                    inleverButtonString
                )
            }
        }
    }
    xhr.open("GET","http://localhost:8082/uitleningen/actief",true);
    xhr.send();
}

function uitleningInleverOverzicht(uitleningID) {
    bevestiging = confirmInleveren();
    if (bevestiging == true) {
        var xhr = new XMLHttpRequest();
         xhr.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    window.location.reload();
                }
        }
        xhr.open("PUT", "http://localhost:8082/uitleningen/" + uitleningID + "/inlever", true);
        xhr.send();
    }
}

//lening-toevoegen.html
function formulierInvullenVoorLening() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const accountID = urlParams.get('accountid');
    const exemplaarID = urlParams.get('exemplaarid');

//Een nieuwe lening heeft automatisch de huidige datum
    Date.prototype.toDateInputValue = (function() {
        var local = new Date(this);
        local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
        return local.toJSON().slice(0,10);
    });
    document.getElementById('uitleendatum').value = new Date().toDateInputValue();

    //Als je bij een medewerker op toewijzen klikt
    if (accountID) {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                var account = JSON.parse(this.responseText);
                var naamAccount = account.naam;
                accountVeldInvullen(accountID, naamAccount);
                document.getElementById("accountTabel").style.display = "none";
            }
        }
        xhr.open("GET", "http://localhost:8082/accounts/" + accountID, true);
        xhr.send();
        
    }

    //Als je bij een boek op exemplaar toewijzen klikt
    if (exemplaarID) {
        var xhr2 = new XMLHttpRequest();
        xhr2.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                var exemplaar = JSON.parse(this.responseText);
                var titelBoek = exemplaar.boek.titel;
                var boekid = exemplaar.boek.id;
                var wtExemplaarId = exemplaar.workingTalentExemplaarId;
                boekVeldInvullen(boekid, titelBoek, wtExemplaarId);
                document.getElementById("boekenTabel").style.display = "none";
            }
        }
        xhr2.open("GET", "http://localhost:8082/exemplaren/" + exemplaarID, true);
        xhr2.send();
        document.getElementById("boekenTabel").style.display = "none";
    }
    accountOverzichtLening();
    boekenOverzichtLening();
}

// Input elementen worden niet gevalideerd als ze disabled zijn.
// Hiermee wordt de validatie alsnog uitgevoerd.
function leningToevoegenInputControleren() {
    accountNaam = document.getElementById("accountnaam");
    boekTitel = document.getElementById("boektitel");
    if (accountNaam.value == "") {
        accountNaam.disabled = false;
        setTimeout(function () {
            accountNaam.disabled = true;
        }, 4000);
    }
    if (boekTitel.value == "") {
        boekTitel.disabled = false;
        setTimeout(function () {
            boekTitel.disabled = true;
        }, 4000);
    }
}

function leningToevoegen() {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.location = 'uitleen-overzicht-admin.html';
        }
    }

    var lening = {};
    lening.account = { "id" : document.getElementById("accountid").value };
    lening.boek = { "id" : document.getElementById("boekid").value };
    lening.uitleenDatum = document.getElementById("uitleendatum").value;
    lening.exemplaarId = document.getElementById("exemplaarid").value;
    var leningJSON = JSON.stringify(lening);
    xhr.open("POST", "http://localhost:8082/uitleningen", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(leningJSON);
    return false;
}

// boeken overzicht tabel in lening-toevoegen.html
function boekenOverzichtLening(){
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            var antwoord = JSON.parse(this.responseText);
            for(var x = 0 ; x < antwoord.length; x++){
                var idOverzicht = antwoord[x].id;
                var auteurOverzicht = antwoord[x].auteur;
                var statusOverzicht = berekenBeschikbaarheid(antwoord[x].exemplaren);
                var titelOverzicht = antwoord[x].titel;
                var boekidOverzicht = antwoord[x].wtId;

                $(boekenOverzicht).append(
                    "<tr id='" + idOverzicht + "' onclick=\"boekVeldInvullen('" + idOverzicht + "', '" + titelOverzicht + "')\">" +
                    "<td>" + boekidOverzicht + "</td>" +
                    "<td id='titel'>" + titelOverzicht + "</td>" +
                    "<td>" + auteurOverzicht + "</td>" +
                    "<td>" + statusOverzicht + "</td>" +
                    "</tr>"
                )
            }
        }
    }
    xhr.open("GET","http://localhost:8082/boeken",true);
    xhr.send();
}

// account overzicht tabel in lening-toevoegen.html
function accountOverzichtLening(){
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            var antwoord = JSON.parse(this.responseText);
            for(var x = 0 ; x < antwoord.length; x++){
                var idOverzicht = antwoord[x].id;
                var naamOverzicht = antwoord[x].naam;
                var emailOverzicht = antwoord[x].email;

                $(accountOverzicht).append(
                    "<tr id='" + idOverzicht + "' onclick=\"accountVeldInvullen('" + idOverzicht + "', '" + naamOverzicht + "')\">" +
                    "<td>" + naamOverzicht + "</td>" +
                    "<td>" + emailOverzicht + "</td>" +
                    "</tr>"
                )
            }
        }
    }
    xhr.open("GET","http://localhost:8082/accounts",true);
    xhr.send();
}

// inputveld invullen in lening-toevoegen.html
function boekVeldInvullen(boekID, boekTitel, wtexemplaarnummer = null) {
    document.getElementById("boekid").value = boekID;
    document.getElementById("boektitel").value = boekTitel;
    haalAantalExemplarenOp(boekID, wtexemplaarnummer);
}

function accountVeldInvullen(accountID, accountNaam) {
    document.getElementById("accountid").value = accountID;
    document.getElementById("accountnaam").value = accountNaam;
}

function haalAantalExemplarenOp(boekid, wtexemplaarnummer = null) {
    var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function(){
            if(this.readyState == 4 && this.status == 200){
                var antwoord = JSON.parse(this.responseText,
                    function (key, value) {
                    return (value == null) ? "" : value
                }
            );
        document.getElementById("exemplaarid").innerHTML="";
        var aantalBeschikbaar = 0;
            for(var x = 0 ; x < antwoord.exemplaren.length; x++){
                var boekworkingtalentid = antwoord.wtId;
                var exemplaarworkingtalentid = antwoord.exemplaren[x].workingTalentExemplaarId;

                if (antwoord.exemplaren[x].status == "BESCHIKBAAR") {
                    if (wtexemplaarnummer == exemplaarworkingtalentid) {
                        $(exemplaarid).append(
                            "<option value=\"" + exemplaarworkingtalentid + "\" selected>" + boekworkingtalentid + "." + exemplaarworkingtalentid +"</option>"
                        )
                    } else {
                        $(exemplaarid).append(
                        "<option value=\"" + exemplaarworkingtalentid + "\">" + boekworkingtalentid + "." + exemplaarworkingtalentid +"</option>"
                        )
                    }
                }
            }
        }
    }
    xhr.open("GET","http://localhost:8082/boeken/"+ boekid,true);
    xhr.send();
}

// lening-aanpassen.html
function formateerDatum(datum) {
    if (datum == "" || datum == null) {
        return "";
    }
    //De datum wordt in de juiste format gezet om het af te kunnen lezen
    return datum.substr(6, 4)+"-"+datum.substr(3, 2)+"-"+datum.substr(0, 2);
}


function leningOphalenVoorFormulier() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const leningID = urlParams.get('id');
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var lening = JSON.parse(this.responseText);
            var wtid = lening.boek.wtId + "." + lening.exemplaarId;
            document.getElementById("boektitel").value = lening.boek.titel;
            document.getElementById("boekauteur").value = lening.boek.auteur;
            document.getElementById("boekwtid").value = wtid;
            document.getElementById("AccountNaam").value =  lening.account.naam;
            document.getElementById("UitleenDatum").value = formateerDatum(lening.uitleenDatum);
            document.getElementById("InleverDatum").value = formateerDatum(lening.inleverDatum);
            document.getElementById("BoekId").value = lening.boek.id;
            document.getElementById("AccountId").value = lening.account.id;

        }
        if(document.getElementById("InleverDatum").value==""){
            document.getElementById("InleverDatum").disabled = true;
        }else{
            document.getElementById("InleverDatum").disabled = false;
        }
    }
    xhr.open("GET", "http://localhost:8082/uitleningen/" + leningID, true);
    xhr.send();
}

function leningAanpassen() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const leningID = urlParams.get('id');
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200) {
            document.location = document.referrer;
        }
    }

    var lening = {};
     lening.boek = {'id' : document.getElementById("BoekId").value };
     lening.account = {'id' : document.getElementById("AccountId").value };
    lening.uitleenDatum = document.getElementById("UitleenDatum").value;
    lening.inleverDatum = document.getElementById("InleverDatum").value;
    var leningJSON = JSON.stringify(lening);
    xhr.open("PUT", "http://localhost:8082/uitleningen/" + leningID, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(leningJSON);

    return false;
}

function uitleningVerwijderen() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const uitleningID = urlParams.get('id');
    bevestiging = confirmVerwijderen();
    if (bevestiging == true) {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function(){
            if(this.readyState == 4 && this.status == 200) {
                window.location=document.referrer;
            }
        }
        xhr.open("DELETE", "http://localhost:8082/uitleningen/" + uitleningID, true);
        xhr.send();
    }
}


/* ---------------- FILTERS/ZOEKFUNCTIES ---------------- */

// zoekfunctie in boeken-overzicht-admin.html
function boekZoekenOverzicht() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("boekInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("boekenOverzicht");
    tr = table.getElementsByTagName("tr");

    // Haal juiste kolom index op
    var zoekIndex = 0;
    switch(document.getElementById("boekZoekOpties").value) {
        case "wtid":
            zoekIndex = 0;
            break;
        case "titel":
            zoekIndex = 1;
            break;
        case "auteur":
            zoekIndex = 2;
            break;
        default:
            zoekIndex = 0;
            break;
    }
  
    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[zoekIndex];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}

// zoekfunctie in account-overzicht.html
function accountZoekenOverzicht() {
    // Declare variables
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("accountInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("accountOverzicht");
    tr = table.getElementsByTagName("tr");

    // Haal juiste kolom index op
    var zoekIndex = 0;
    switch(document.getElementById("accountZoekOpties").value) {
        case "naam":
            zoekIndex = 0;
            break;
       case "email":
           zoekIndex = 1;
           break;
       default:
            zoekIndex = 0;
            break;
    }
  
    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[zoekIndex];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}

// zoekfunctie in uitleen-overzicht-admin.html
function uitleningZoekenOverzicht() {
    // Declare variables
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("uitleningInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("uitleenOverzicht");
    tr = table.getElementsByTagName("tr");

    // Haal juiste kolom index op
    var zoekIndex = 0;
    switch(document.getElementById("uitleningZoekOpties").value) {
        case "wtid":
            zoekIndex = 0;
            break;
        case "titel":
            zoekIndex = 1;
            break;
        case "auteur":
            zoekIndex = 2;
            break;
        case "lener":
            zoekIndex = 3;
            break;
        case "uitleendatum":
            zoekIndex = 4;
            break;
        case "inleverdatum":
            zoekIndex = 5;
            break;
        default:
            zoekIndex = 0;
            break;
    }

    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[zoekIndex];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}

// zoekfunctie in account.html
function uitleningZoekenIndividueelAccount() {
    // Declare variables
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("uitleningInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("uitleenOverzicht");
    tr = table.getElementsByTagName("tr");

    // Haal juiste kolom index op
    var zoekIndex = 0;
    switch(document.getElementById("uitleningZoekOpties").value) {
        case "wtid":
            zoekIndex = 0;
            break;
        case "titel":
            zoekIndex = 1;
            break;
        case "auteur":
            zoekIndex = 2;
            break;
        case "uitleendatum":
            zoekIndex = 3;
            break;
        case "inleverdatum":
            zoekIndex = 4;
            break;
        default:
            zoekIndex = 0;
            break;
    }

    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[zoekIndex];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}
