// boek-toevoegen.html
function boekToevoegen() {
    var xhr = new XMLHttpRequest();
    var boek = {};
    boek.titel = document.getElementById("boektitel").value;
    boek.auteur = document.getElementById("boekauteur").value;
    boek.isbn = document.getElementById("boekisbn").value;
    boek.categorie = document.getElementById("boekcategorie").value;
    boek.omschrijving = document.getElementById("boekomschrijving").value;
    var boekJSON = JSON.stringify(boek);
    xhr.open("POST", "http://localhost:8082/boeken", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(boekJSON);
    return false;
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
            document.getElementById("boekstatus").innerHTML = boek.status;
            document.getElementById("boekworkingtalentid").innerHTML = boek.wtId;
            // document.getElementById("boekomslag").value = boek.omslag;
        }
    }
    xhr.open("GET", "http://localhost:8082/boeken/" + boekID, true);
    xhr.send();
}

// boek-aanpassen.html
function boekOphalenVoorFormulier(boekID) {
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
            // document.getElementById("boekomslag").value = boek.omslag;
        }
    }
    xhr.open("GET", "http://localhost:8082/boeken/" + boekID, true);
    xhr.send();
}

function boekAanpassen(boekID) {
    var xhr = new XMLHttpRequest();
    var boek = {};
    boek.titel = document.getElementById("boektitel").value;
    boek.auteur = document.getElementById("boekauteur").value;
    boek.isbn = document.getElementById("boekisbn").value;
    boek.categorie = document.getElementById("boekcategorie").value;
    boek.omschrijving = document.getElementById("boekomschrijving").value;
    boek.wtId = document.getElementById("boekworkingtalentid").value;
    var boekJSON = JSON.stringify(boek);
    xhr.open("PUT", "http://localhost:8082/boeken/" + boekID, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(boekJSON);
    return false;
}

// account.html
function accountToevoegen() {
    var xhr = new XMLHttpRequest();
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
function accountOphalenVoorFormulier(accountID) {
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

function accountAanpassen(accountID) {
    var xhr = new XMLHttpRequest();
    var account = {};
    account.naam = document.getElementById("naam").value;
    account.email = document.getElementById("emailadres").value;
    var accountJSON = JSON.stringify(account);
    xhr.open("PUT", "http://localhost:8082/accounts/" + accountID, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(accountJSON);
}

function accountVerwijderen(accountID) {
    bevestiging = confirmVerwijderen();
    if (bevestiging == true) {
        var xhr = new XMLHttpRequest();
    xhr.open("DELETE", "http://localhost:8082/accounts/" + accountID, true);
    xhr.send();
    } else {
        // pass
    }
}

// boeken-overzicht-admin.html
function boekenOverzichtAdmin(){
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
              var statusOverzicht = antwoord[x].status;
              var titelOverzicht = antwoord[x].titel;
              var wtidOverzicht = antwoord[x].wtid;

              $(boekenOverzicht).append(
                    "<tr>" +
                    "<td id='" + idOverzicht + "' onclick=\"window.location='boek.html?id="+idOverzicht+"';\">" + titelOverzicht + "</td>" +
                    "<td id='" + idOverzicht + "' onclick=\"window.location='boek.html?id="+idOverzicht+"';\">" + auteurOverzicht + "</td>" +
                    "<td id='" + idOverzicht + "' onclick=\"window.location='boek.html?id="+idOverzicht+"';\">" + isbnOverzicht + "</td>" +
                    "<td id='" + idOverzicht + "' onclick=\"window.location='boek.html?id="+idOverzicht+"';\">" + categorieOverzicht + "</td>" +
                    "<td id='" + idOverzicht + "' onclick=\"window.location='boek.html?id="+idOverzicht+"';\">" + omschrijvingOverzicht + "</td>" +
                    "<td id='" + idOverzicht + "' onclick=\"window.location='boek.html?id="+idOverzicht+"';\">" + omslagOverzicht + "</td>" +
                    "<td id='" + idOverzicht + "' onclick=\"window.location='boek.html?id="+idOverzicht+"';\">" + statusOverzicht + "</td>" +
                    "<td id='" + idOverzicht + "' onclick=\"window.location='boek.html?id="+idOverzicht+"';\">" + wtidOverzicht + "</td>" +
                    "<td>" + "<button onclick=\"document.location = 'boek-aanpassen.html?id="+idOverzicht+"'\">Bewerken</button>" + "</td>" +
                    "<td>" + "<button onclick=\"boekVerwijderen("+idOverzicht+");window.location.reload()\">Verwijderen</button>" + "</td>" +
                    "</tr>"
                    )
            }
        }
    }
    xhr.open("GET","http://localhost:8082/boeken",true);
    xhr.send();
}

function boekVerwijderen(boekID) {
    bevestiging = confirmVerwijderen();
    if (bevestiging == true) {
        var xhr = new XMLHttpRequest();
        xhr.open("DELETE", "http://localhost:8082/boeken/" + boekID, true);
        xhr.send();
    } else {
        // pass
    }
    
}

function confirmVerwijderen() {
    var bevestiging = confirm("Item verwijderen?");
    return bevestiging;
}

// accountOverzicht.html
function accountOverzichtAdmin(){
  var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            var antwoord = JSON.parse(this.responseText);
            for(var x = 0 ; x < antwoord.length; x++){
              var idOverzicht = antwoord[x].id;
              var naamOverzicht = antwoord[x].naam;
              var emailOverzicht = antwoord[x].email;
              var wachtwoordOverzicht = antwoord[x].wachtwoord;

              $(accountOverzicht).append(
                    "<tr id='" + idOverzicht + "'>" +
                    "<td onclick=\"window.location='account.html?id="+idOverzicht+"';\">" + naamOverzicht + "</td>" +
                    "<td onclick=\"window.location='account.html?id="+idOverzicht+"';\">" + emailOverzicht + "</td>" +
                    "<td onclick=\"window.location='account.html?id="+idOverzicht+"';\">" + wachtwoordOverzicht + "</td>" +
                    "<td>" + "<button onclick=\"document.location = 'account-aanpassen.html?id="+idOverzicht+"'\">Bewerken</button>" + "</td>" +
                    "<td>" + "<button onclick=\"accountVerwijderen("+idOverzicht+");window.location.reload()\">Verwijderen</button>" + "</td>" +
                    "</tr>"
                    )
            }
        }
    }
    xhr.open("GET","http://localhost:8082/accounts",true);
    xhr.send();
}

// uitlening-overzicht-admin.html
function uitleenOverzichtAdmin(){
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            var antwoord = JSON.parse(this.responseText);
            for(var x = 0 ; x < antwoord.length; x++){
              var titelOverzicht = antwoord[x].boek.titel;
              var auteurOverzicht = antwoord[x].boek.auteur;
              var isbnOverzicht = antwoord[x].boek.isbn;
          //    var exemplaarOverzicht = antwoord[x].exemplaar;
              var accountNaamOverzicht = antwoord[x].account.naam;
              var uitleningID = antwoord[x].id;
              var uitleningsDatumOverzicht = antwoord[x].uitleenDatum;
              var inleverDatumOverzicht = antwoord[x].inleverDatum;

              $(uitleenOverzicht).append(
                    "<tr>" +
                    "<td>" + titelOverzicht + "</td>" +
                    "<td>" + auteurOverzicht + "</td>" +
                    "<td>" + isbnOverzicht + "</td>" +
                  //  "<td>" + exemplaarOverzicht + "</td>" +
                    "<td>" + accountNaamOverzicht + "</td>" +
                    "<td>" + uitleningsDatumOverzicht + "</td>" +
                    "<td>" + inleverDatumOverzicht + "</td>" +
                    "<td>" + "<button onclick=\"document.location = 'lening-aanpassen.html?id="+uitleningID+"'\">Bewerken</button>" + "</td>" +
                    "<td>" + "<button onclick=\"uitleningVerwijderen("+uitleningID+");window.location.reload()\">Verwijderen</button>" + "</td>" +
                    "</tr>"
                    )
            }
        }
    }
    xhr.open("GET","http://localhost:8082/uitleningen",true);
    xhr.send();
}

function uitleningVerwijderen(uitleningID) {
    bevestiging = confirmVerwijderen();
    if (bevestiging == true) {
        var xhr = new XMLHttpRequest();
    xhr.open("DELETE", "http://localhost:8082/uitleningen/" + uitleningID, true);
    xhr.send();
    } else {
        // pass
    }
}

// lening-aanpassen.html
function leningOphalenVoorFormulier(leningID) {
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

        }
    }
    xhr.open("GET", "http://localhost:8082/uitleningen/" + leningID, true);
    xhr.send();
}

function leningAanpassen(leningID) {
    var xhr = new XMLHttpRequest();
    var lening = {};
    boek.titel = document.getElementById("boektitel").value;
    boek.auteur = document.getElementById("boekauteur").value;
    boek.isbn = document.getElementById("boekisbn").value;
    account.naam = document.getElementById("AccountNaam").value;
    uitleenDatum = document.getElementById("UitleenDatum").value;
    inleverDatum = document.getElementById("InleverDatum").value;
    var leningJSON = JSON.stringify(lening);
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
  
    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[0]; // tabel kolom id voor "titel"
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

  // zoekfunctie in boeken-overzicht-admin.html
function accountZoekenOverzicht() {
    // Declare variables
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("accountInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("accountOverzicht");
    tr = table.getElementsByTagName("tr");
  
    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[0]; // tabel kolom id voor "naam"
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
              var statusOverzicht = antwoord[x].status;
              var titelOverzicht = antwoord[x].titel;
              var wtidOverzicht = antwoord[x].wtid;

              $(boekenOverzicht).append(
                    "<tr id='" + idOverzicht + "' onclick=\"boekVeldInvullen("+ titelOverzicht + ")\">" +
                    "<td>" + titelOverzicht + "</td>" +
                    "<td>" + auteurOverzicht + "</td>" +
                    "<td>" + isbnOverzicht + "</td>" +
                    "<td>" + categorieOverzicht + "</td>" +
                    "<td>" + omschrijvingOverzicht + "</td>" +
                    "<td>" + omslagOverzicht + "</td>" +
                    "<td>" + statusOverzicht + "</td>" +
                    "<td>" + wtidOverzicht + "</td>" +
                    "</tr>"
                    )
            }
        }
    }
    xhr.open("GET","http://localhost:8082/boeken",true);
    xhr.send();
}

function boekVeldInvullen(boekTitel) {
    document.getElementById("boekid").value = boekTitel;
}