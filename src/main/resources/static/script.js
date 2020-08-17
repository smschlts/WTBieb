// algemene verwijder confirmation functie
function confirmVerwijderen() {
    var bevestiging = confirm("Item verwijderen?");
    return bevestiging;
}

function confirmInleveren() {
    var bevestiging = confirm("Item inleveren?");
    return bevestiging;
}


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
                    "<td" + urlString + " class=\"categorie\">" + categorieOverzicht + "</td>" +
                    "<td" + urlString + " class=\"hide-column\" >" + omschrijvingOverzicht + "</td>" +
                    "<td" + urlString + " class=\"hide-column\">" + omslagOverzicht + "</td>" +
                    "<td" + urlString + " class=\"status\">" + statusOverzicht + "</td>" +
                    "<td" + urlString + " class=\"hide-column\" >" + wtidOverzicht + "</td>" +
                    "<td class=\"btn bewerk-verwijder\">" + "<button onclick=\"document.location = 'boek-aanpassen.html?id="+idOverzicht+"'\">&#9998;</button>" + "</td>" +
                    "<td class=\"btn bewerk-verwijder\">" + "<button onclick=\"boekVerwijderenOverzicht("+idOverzicht+");window.location.reload()\">&#10006;</button>" + "</td>" +
                    "</tr>"
                    )
            }
        }
    }
    xhr.open("GET","http://localhost:8082/boeken",true);
    xhr.send();
}

function boekVerwijderenOverzicht(boekID) {
    bevestiging = confirmVerwijderen();
    if (bevestiging == true) {
        var xhr = new XMLHttpRequest();
        xhr.open("DELETE", "http://localhost:8082/boeken/" + boekID, true);
        xhr.send();
    } else {
        // pass
    }
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
    } else {
        // pass
    }
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
            // document.getElementById("boekomslag").value = boek.omslag;
        }
    }
    xhr.open("GET", "http://localhost:8082/boeken/" + boekID, true);
    xhr.send();
}

// boek-toevoegen.html
function boekToevoegen() {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (this.readyState == 4) {
            document.location = 'boeken-overzicht-admin.html';
        }
    }

    var boek = {};
    boek.titel = document.getElementById("boektitel").value;
    boek.auteur = document.getElementById("boekauteur").value;
    boek.isbn = document.getElementById("boekisbn").value;
    boek.categorie = document.getElementById("boekcategorie").value;
    boek.omschrijving = document.getElementById("boekomschrijving").value;
    boek.aantal = document.getElementById("boekaantal").value;
    var boekJSON = JSON.stringify(boek);
    xhr.open("POST", "http://localhost:8082/boeken", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(boekJSON);
    return false;
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
            document.getElementById("aantalExemplaren").value = boek.aantal;
            // document.getElementById("boekomslag").value = boek.omslag;
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
        if(this.readyState == 4) {
            document.location = 'boeken-overzicht-admin.html';
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

// account-overzicht.html
function accountOverzichtAdmin(){
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
                var naamOverzicht = antwoord[x].naam;
                var emailOverzicht = antwoord[x].email;
                var wachtwoordOverzicht = antwoord[x].wachtwoord;
                var urlString = " onclick=\"window.location='account.html?id=" + idOverzicht + "';\">"
  
                $(accountOverzicht).append(
                      "<tr id='" + idOverzicht + "'>" +
                      "<td" + urlString + naamOverzicht + "</td>" +
                      "<td" + urlString + emailOverzicht + "</td>" +
//                      "<td" + urlString + wachtwoordOverzicht + "</td>" +
                      "<td class=\"btn bewerk-verwijder\">" + "<button onclick=\"document.location = 'account-aanpassen.html?id=" + idOverzicht + "'\">&#9998</button>" + "</td>" +
                      "<td class=\"btn bewerk-verwijder\">" + "<button onclick=\"accountVerwijderenOverzicht(" + idOverzicht + ");window.location.reload()\">&#10006</button>" + "</td>" +
                      "</tr>"
                      )
              }
          }
      }
      xhr.open("GET","http://localhost:8082/accounts",true);
      xhr.send();
  }

// account.html
function accountToevoegen() {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (this.readyState == 4) {
            document.location = 'account-overzicht.html';
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

function accountOphalen() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const accountID = urlParams.get('id');
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var account = JSON.parse(this.responseText);
            document.getElementById("naam").innerHTML = account.naam;
            document.getElementById("emailadres").innerHTML = account.email;
            // document.getElementById("avatar").value = account.avatar;
        }
    }
    xhr.open("GET", "http://localhost:8082/accounts/" + accountID, true);
    xhr.send();
}

// account-aanpassen.html
function accountOphalenVoorFormulier() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const accountID = urlParams.get('id');
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var account = JSON.parse(this.responseText);
            document.getElementById("naam").value = account.naam;
            document.getElementById("emailadres").value = account.email;
            // document.getElementById("avatar").value = account.avatar;
        }
    }
    xhr.open("GET", "http://localhost:8082/accounts/" + accountID, true);
    xhr.send();
}

function accountAanpassen() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const accountID = urlParams.get('id');
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function(){
        if(this.readyState == 4) {
            document.location = 'account-overzicht.html';
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

function accountVerwijderenOverzicht(accountID) {
    bevestiging = confirmVerwijderen();
    if (bevestiging == true) {
        var xhr = new XMLHttpRequest();
    xhr.open("DELETE", "http://localhost:8082/accounts/" + accountID, true);
    xhr.send();
    } else {
        // pass
    }
}

function accountVerwijderen() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const accountID = urlParams.get('id');
    bevestiging = confirmVerwijderen();
    if (bevestiging == true) {
        var xhr = new XMLHttpRequest();
    xhr.open("DELETE", "http://localhost:8082/accounts/" + accountID, true);
    xhr.send();
    } else {
        // pass
    }
}

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
              var titelOverzicht = antwoord[x].boek.titel;
              var auteurOverzicht = antwoord[x].boek.auteur;
              var isbnOverzicht = antwoord[x].boek.isbn;
              var exemplaarOverzicht = antwoord[x].exemplaarId;
              var accountNaamOverzicht = antwoord[x].account.naam;
              var uitleningID = antwoord[x].id;
              var uitleningsDatumOverzicht = antwoord[x].uitleenDatum;
              var inleverDatumOverzicht = antwoord[x].inleverDatum;
          //   var urlString = " onclick=\"window.location='lening-aanpassen.html?id=" + uitleningID + "';\">"
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
                    "<td class=\"uitleen-titel\"" + urlString + titelOverzicht + "</td>" +
                    "<td class=\"uitleen-auteur\"" + urlString + auteurOverzicht + "</td>" +
                    "<td class=\"uitleen-isbn\"" + urlString + isbnOverzicht + "</td>" +
                    "<td class=\"uitleen-exemplaar-id\"" + urlString + exemplaarOverzicht + "</td>" +
                    "<td class=\"uitleen-lener\"" + urlString + accountNaamOverzicht + "</td>" +
                    "<td class=\"uitleen-datum\"" + urlString + uitleningsDatumOverzicht + "</td>" +
                    "<td class=\"uitleen-datum\"" + urlString + inleverDatumOverzicht + "</td>" +
                    "<td class=\"btn bewerk-verwijder\">" + "<button onclick=\"document.location = 'lening-aanpassen.html?id=" + uitleningID + "'\">&#9998</button>" + "</td>" +
                    inleverButtonString
                    )
                
                
            }
        }
    }
    xhr.open("GET","http://localhost:8082/uitleningen",true);
    xhr.send();
}

function uitleningVerwijderenOverzicht(uitleningID) {
    bevestiging = confirmVerwijderen();
    if (bevestiging == true) {
        var xhr = new XMLHttpRequest();
    xhr.open("DELETE", "http://localhost:8082/uitleningen/" + uitleningID, true);
    xhr.send();
    } else {
        // pass
    }
}

function uitleningInleverOverzicht(uitleningID) {
    bevestiging = confirmInleveren();
    if (bevestiging == true) {
        console.log("inleveren: " + "http://localhost:8082/uitleningen/" + uitleningID + "/inlever");
        var xhr = new XMLHttpRequest();
         xhr.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    window.location.reload();
                }
        }
        xhr.open("PUT", "http://localhost:8082/uitleningen/" + uitleningID + "/inlever", true);
        xhr.send();
    } else {
        // pass
    }
}

function uitleningVerwijderen() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const uitleningID = urlParams.get('id');
    bevestiging = confirmVerwijderen();
    if (bevestiging == true) {
        var xhr = new XMLHttpRequest();
    xhr.open("DELETE", "http://localhost:8082/uitleningen/" + uitleningID, true);
    xhr.send();
    } else {
        // pass
    }
}

//lening-toevoegen.html
function leningToevoegen() {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (this.readyState == 4) {
            document.location = 'uitleen-overzicht-admin.html';
        }
    }

    var lening = {};
    lening.account = { "id" : document.getElementById("accountid").value };
    lening.boek = { "id" : document.getElementById("boekid").value };
    lening.uitleenDatum = document.getElementById("uitleendatum").value;
    lening.exemplaarId = document.getElementById("exemplaarid").value;
    var leningJSON = JSON.stringify(lening);
    console.log(leningJSON);
    xhr.open("POST", "http://localhost:8082/uitleningen", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(leningJSON);
    return false;
}

// lening-aanpassen.html
function leningOphalenVoorFormulier() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const leningID = urlParams.get('id');
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var lening = JSON.parse(this.responseText);
            document.getElementById("boektitel").value = lening.boek.titel;
            document.getElementById("boekauteur").value = lening.boek.auteur;
            document.getElementById("boekisbn").value = lening.boek.isbn;
            document.getElementById("AccountNaam").value =  lening.account.naam;
            document.getElementById("UitleenDatum").value = lening.uitleenDatum;
            document.getElementById("InleverDatum").value = lening.inleverDatum;
            document.getElementById("BoekId").value = lening.boek.id;
            document.getElementById("AccountId").value = lening.account.id;

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
        if(this.readyState == 4) {
            document.location = 'uitleen-overzicht-admin.html';
        }
    }

    var lening = {};
     lening.boek = {'id' : document.getElementById("BoekId").value };
     lening.account = {'id' : document.getElementById("AccountId").value };
    lening.uitleenDatum = document.getElementById("UitleenDatum").value;
    lening.inleverDatum = document.getElementById("InleverDatum").value;
    var leningJSON = JSON.stringify(lening);
    console.log("Put uitvoeren" + leningJSON);
    xhr.open("PUT", "http://localhost:8082/uitleningen/" + leningID, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(leningJSON);

    return false;
}

// zoekfunctie in boeken-overzicht-admin.html
function boekZoekenOverzicht() {
    // Declare variables
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("boekInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("boekenOverzicht");
    tr = table.getElementsByTagName("tr");

    var zoekIndex = 0;
    switch(document.getElementById("boekZoekOpties").value) {
        case "titel":
            zoekIndex = 0;
            break;
       case "auteur":
           zoekIndex = 1;
           break;
       case "isbn":
           zoekIndex = 2;
           break;
       default:
            zoekIndex = 0;
            break;
    }
  
    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[zoekIndex]; // tabel kolom id voor "titel"
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
      td = tr[i].getElementsByTagName("td")[zoekIndex]; // tabel kolom id voor "naam"
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
function uitleningZoekenOverzicht() {
    // Declare variables
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("uitleningInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("uitleenOverzicht");
    tr = table.getElementsByTagName("tr");

    var zoekIndex = 0;
    switch(document.getElementById("uitleningZoekOpties").value) {
        case "titel":
            zoekIndex = 0;
            break;
        case "auteur":
            zoekIndex = 1;
            break;
        case "isbn":
            zoekIndex = 2;
            break;
        case "lener":
            zoekIndex = 4;
            break;
        case "uitleendatum":
            zoekIndex = 5;
            break;
        case "inleverdatum":
            zoekIndex = 6;
            break;
        default:
            zoekIndex = 0;
            break;
    }

    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[zoekIndex]; // tabel kolom id voor "naam"
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

// boek zoeken in lening-toevoegen.html
function boekenOverzichtLening(){
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            var antwoord = JSON.parse(this.responseText);
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

              $(boekenOverzicht).append(
                    "<tr id='" + idOverzicht + "' onclick=\"boekVeldInvullen('" + idOverzicht + "', '" + titelOverzicht + "')\">" +
                    "<td id='titel'>" + titelOverzicht + "</td>" +
                    "<td>" + auteurOverzicht + "</td>" +
                    "<td>" + isbnOverzicht + "</td>" +
                    "<td>" + categorieOverzicht + "</td>" +
                    // "<td>" + omschrijvingOverzicht + "</td>" +
                    // "<td>" + omslagOverzicht + "</td>" +
                    "<td>" + statusOverzicht + "</td>" +
//                    "<td>" + wtidOverzicht + "</td>" +
                    "</tr>"
                    )
            }
        }
    }
    xhr.open("GET","http://localhost:8082/boeken",true);
    xhr.send();
}

function accountOverzichtLening(){
    var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function(){
          if(this.readyState == 4 && this.status == 200){
              var antwoord = JSON.parse(this.responseText);
              for(var x = 0 ; x < antwoord.length; x++){
                var idOverzicht = antwoord[x].id;
                var naamOverzicht = antwoord[x].naam;
                var emailOverzicht = antwoord[x].email;
                // var wachtwoordOverzicht = antwoord[x].wachtwoord;
  
                $(accountOverzicht).append(
                      "<tr id='" + idOverzicht + "' onclick=\"accountVeldInvullen('" + idOverzicht + "', '" + naamOverzicht + "')\">" +
                      "<td>" + naamOverzicht + "</td>" +
                      "<td>" + emailOverzicht + "</td>" +
                    //   "<td" + urlString + wachtwoordOverzicht + "</td>" +
                      "</tr>"
                      )
              }
          }
      }
      xhr.open("GET","http://localhost:8082/accounts",true);
      xhr.send();
  }

// voorbeeld lening-toevoegen.html
function boekVeldInvullen(boekID, boekTitel) {
    document.getElementById("boekid").value = boekID;
    document.getElementById("boektitel").value = boekTitel;
    haalAantalExemplarenOp(boekID);
}

function accountVeldInvullen(accountID, accountNaam) {
    document.getElementById("accountid").value = accountID;
    document.getElementById("accountnaam").value = accountNaam;
}

function haalAantalExemplarenOp(boekid) {
    var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function(){
            if(this.readyState == 4 && this.status == 200){
                var antwoord = JSON.parse(this.responseText,
                    function (key, value) {
                   return (value == null) ? "" : value
                }
           );
           document.getElementById("exemplaarid").innerHTML="";
            for(var x = 0 ; x < antwoord.exemplaren.length; x++){
              var boekworkingtalentid = antwoord.exemplaren[x].workingTalentExemplaarId;

              if (antwoord.exemplaren[x].status == "UITGELEEND") {
                $(exemplaarid).append(
                    "<option disabled>"+ boekworkingtalentid +"</option>"
                            )
              } else if (antwoord.exemplaren[x].status == "BESCHIKBAAR") {
                $(exemplaarid).append(
                            "<option>"+ boekworkingtalentid +"</option>"
                                    )
              }
              
            }
        }
    }
    xhr.open("GET","http://localhost:8082/boeken/"+ boekid,true);
    xhr.send();

}