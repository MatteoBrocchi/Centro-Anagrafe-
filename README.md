# Centro-Anagrafe-

## Documentazione Server

I seguenti sono gli endpoint del server, i dati che restituiscono e i modi per accedere
ad essi tramite jQuery.

> https://late-frost-5190.getsandbox.com/anagrafiche

Usando jQuery:
```javascript
var persone = new Array();
$.ajax({
      type: "GET",
      contentType: "application/json",
      url: "https://late-frost-5190.getsandbox.com/anagrafiche",
      dataType: "json",
      success: function (data) {
            $.each(data, function (i, value) { 
                        persone.push(Object.assign({}, value))
            });
      }
});
```

Risposta:
```json
[
  {
    "nome": "Mario",
    "cognome": "Rossi",
    "luogo_residenza": {
      "regione": "Emilia-Romagna",
      "provincia": "Rimini",
      "comune": "Rimini"
    },
    "anno": 1984
  },
  {
    "nome": "Giacomo",
    "cognome": "Ancora",
    "luogo_residenza": {
      "regione": "Emilia-Romagna",
      "provincia": "Ferrara",
      "comune": "Cento"
    },
    "anno": 1984
  },
  ...
]
```

> https://late-frost-5190.getsandbox.com/anagrafiche/{regione}

Usando jQuery:
```javascript
var reg = "Emilia-Romagna"
var persone = [] //Conterrà tutte le persone che hanno come regione reg (Emilia-Romagna)
$.ajax({
      type: "GET",
      contentType: "application/json",
      url: "https://late-frost-5190.getsandbox.com/anagrafiche/" + reg,
      dataType: "json",
      success: function (data) {
            $.each(data, function (i, value) { 
                        persone.push(Object.assign({}, value))
            });
      }
});
```

Risposta:
```json
[
  {
    "nome": "Mario",
    "cognome": "Rossi",
    "luogo_residenza": {
      "regione": "Emilia-Romagna",
      "provincia": "Rimini",
      "comune": "Rimini"
    },
    "anno": 1984
  },
  {
    "nome": "Giacomo",
    "cognome": "Ancora",
    "luogo_residenza": {
      "regione": "Emilia-Romagna",
      "provincia": "Ferrara",
      "comune": "Cento"
    },
    "anno": 1984
  },
  {
    "nome": "Giovanni",
    "cognome": "Pascoli",
    "luogo_residenza": {
      "regione": "Emilia-Romagna",
      "provincia": "Rimini",
      "comune": "Rimini"
    },
    "anno": 1855
  },
  {
    "nome": "Giovanni",
    "cognome": "Maggioli",
    "luogo_residenza": {
      "regione": "Emilia-Romagna",
      "provincia": "Rimini",
      "comune": "Sant'Arcangelo"
    },
    "anno": 1855
  }
]
```

> https://late-frost-5190.getsandbox.com/users/login

Usando jQuery:
```javascript
$.ajax({
      type: "POST",
      data: {"username": "username", "password": "password"},
      contentType: "application/json",
      url: "https://late-frost-5190.getsandbox.com/users/login",
      dataType: "json"
});
```

Risposta:
```
Utente autenticato! - Header di sessione settato: 963101c2-0f60-63e0-f66a-3a961e0ae6ac
```

> https://late-frost-5190.getsandbox.com/users/register

Usando jQuery:
```javascript
$.ajax({
      type: "POST",
      data: {"username": "username", "password": "password"},
      contentType: "application/json",
      url: "https://late-frost-5190.getsandbox.com/users/login",
      dataType: "json"
});
```

Risposta:
```
Utente registrato!
```