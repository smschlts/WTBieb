// index.html
function boekToevoegen() {

    var xhr = new XMLHttpRequest();
    var boek = {};
    boek.titel = document.getElementById("boektitel").value;
    boek.auteur = document.getElementById("boekauteur").value;
    boek.isbn = document.getElementById("boekisbn").value;
    boek.categorie = document.getElementById("boekcategorie").value;
    boek.omschrijving = document.getElementById("boekomschrijving").value;
    var boekJSON = JSON.stringify(boek);
    xhr.open("POST", "http://localhost:8082/boeken", true); // asynchroon
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(boekJSON);
    return false;
}

// boek.html
function boekOphalen(boekID) {
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
}

function accountOphalen(accountID) {
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
    var xhr = new XMLHttpRequest();
    xhr.open("DELETE", "http://localhost:8082/accounts/" + accountID, true);
    xhr.send();
}

// boekenOverzichtAdmin.html
function boekenOverzichtAdmin(){
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        if(this.readyState == 4){
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
                    "<tr id='" + idOverzicht + "' onclick=\"window.location='/boek.html?id="+idOverzicht+"';\">" +
                    "<td>" + idOverzicht + "</td>" +
                    "<td>" + auteurOverzicht + "</td>" +
                    "<td>" + categorieOverzicht + "</td>" +
                    "<td>" + isbnOverzicht + "</td>" +
                    "<td>" + omschrijvingOverzicht + "</td>" +
                    "<td>" + omslagOverzicht + "</td>" +
                    "<td>" + statusOverzicht + "</td>" +
                    "<td>" + titelOverzicht + "</td>" +
                    "<td>" + wtidOverzicht + "</td>" +
                    "</tr>"
                    )
            }
        }
    }
    xhr.open("GET","http://localhost:8082/boeken",true);   // asynchroon
    xhr.send();
}

