/*
 * Incluir este archivo como script para los logins.
 * 
 * Para el login de Facebook hay que usar este botón:
 * <fb:login-button scope="public_profile,email" onlogin="loginFacebook.checkLogin();"></fb:login-button>
 * 
 * Funcionalidad: Pulsar botón -> checkLogin -> callback -> testAPI
 */
var loginFacebook = {
    // Esta es la primera función a la que se llama. Al pulsar el botón pasa por aquí.
    // Una vez FB (El objeto del login) ha terminado de realizar sus operaciones, pasa a la función callback()
    checkLogin: function (e) {
        var padre = this;
        FB.getLoginStatus(function (response) {
            padre.callback(response);
        });
    },
    // Se recibe la respuesta de checkLogin
    callback: function (response) {
        console.log(response);
        if (response.status === 'connected') {
            // Si la respuesta es "connected" es que se ha conectado correctamente.
            this.testAPI();
        } else {
            // Si no, es que la persona o no se ha terminado de conectar correctamente, o que no está registrada.
            document.getElementById('status').innerHTML = 'Please log ' +
                    'into this app.';
        }
    },
    // Una vez hayamos confirmado que se ha conectado correctamente, le decimos al objeto FB que nos devuelva
    // los resultados del login creado. Podemos trabajar con ellos tras el function (response){}
    testAPI: function () {
        console.log('Welcome!  Fetching your information.... ');
        FB.api('/me', function (response) {
            console.log(response);
            // Aquí es cuando se usan los datos de la respuesta para decir "Conectado correctamente" o algo parecido.
        });
    }
};

var loginGitHub = {
    iniciar: function () {
        location.replace("https://github.com/login/oauth/authorize?scope=read:user&client_id=d671fd09fe12180a0a2f");
    }
};


/*
 * Para el Login de Google hay que incluir la Google API en el fichero con anterioridad.
 * También hay que sacar la función updateSigninStatus del objeto porque es asíncrona y tanto se llama como se escucha.
 * Vamos, que tiene que estar desde antes.
 */
function updateSigninStatus(isSignedIn) {
    // Cada vez que cambia el estado de login, entra aquí, si la librería "gapi" tiene una cuenta logueada, entra en makeApiCall()
    if (isSignedIn) {
        loginGoogle.makeApiCall();
    }
}
;

var loginGoogle = {
    handleClientLoad: function () {
        // Carga la librería
        gapi.load('client:auth2', this.initClient);
    },

    initClient: function () {
        // Inicializa las APIs
        gapi.client.init({
            apiKey: 'AIzaSyCNoqUDxsbuVQbAwFBluEgjiOeSp4oiywY',
            discoveryDocs: ["https://people.googleapis.com/$discovery/rest?version=v1"],
            clientId: '95097489819-gm2s159lgdq4g6evj3hbtc0bkmlam3hi.apps.googleusercontent.com',
            scope: 'profile'
        }).then(function () {
            // ponemos a la librería a la escucha de cambios en isSignedIn (el estado de login de la cuenta)
            gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
            // ¿Cual es el estado inicial del signedIn? Llamamos a la funcion updateSigningStatus por si acaso ya esté logueado desde el inicio.
            // Quitamos esto para que, en caso de que la persona ya esté logueada con google en su navegador, que no entre directamente a logeuado con google.
            //console.log(gapi.auth2.getAuthInstance().isSignedIn);
            //updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
        });
    },

    handleSignInClick: function (event) {
        // Ideally the button should only show up after gapi.client.init finishes, so that this
        // handler won't be called before OAuth is initialized.
        gapi.auth2.getAuthInstance().signIn();
        console.log(gapi.auth2.getAuthInstance().isSignedIn);
    },

    handleSignOutClick: function (event) {
        gapi.auth2.getAuthInstance().signOut();
    },

    makeApiCall: function () {
        // Make an API call to the People API, and print the user's given name.
        console.log(gapi.auth2.getAuthInstance().isSignedIn);
        gapi.client.people.people.get({
            'resourceName': 'people/me',
            'requestMask.includeField': 'person.names'
        }).then(function (response) {
            console.log('Hello, ' + response.result.names[0].givenName);
        }, function (reason) {
            console.log('Error: ' + reason.result.error.message);
        });
    }
}


/*************************************
 * DEJO EL LOGIN DE TWITTER PARA EL FINAL
 * @returns {undefined}
 * *******************************
 */

//var loginTwitter = {
//    clavesPeticion: {
//        oauth_callback: "Ninguna"
//    },
//    precarga: function () {
////        post("https://api.twitter.com/oauth/request_token?oauth_nonce=49059468077626450401519411838&oauth_timestamp=1519411838&oauth_signature_method=HMAC-SHA1&oauth_consumer_key=kG3fjcP4RWMFEAv5IdBTPZS2m&oauth_version=1.0&oauth_signature=IIzRYvgd/ruu/UAyxk534059tEs=&oauth_token=966623389430550528-xzFrcifPVzO6GTMLcyhWS8ZzQSqbE7B", {
////            //oauth_consumer_key: "kG3fjcP4RWMFEAv5IdBTPZS2m",
////            //oauth_token: "966623389430550528-xzFrcifPVzO6GTMLcyhWS8ZzQSqbE7B",
////            oauth_callback: "https://trello.com/b/0bSrWBXK/tareas-del-equipo-de-dew"
////        });
//        $.post({
//            url: "https://api.twitter.com/oauth/request_token",
//            data: "",
//            dataType: "json",
//            crossDomain: true,
//            success: function () {
//
//            },
//            error: function (e1, e2, e3) {
//                console.error(e1);
//                console.error(e2);
//                console.error(e3);
//            }
//        })
//    }
//};
///*
//  This example shows how to use YQL to
//  make queries to the GEO Web service.
//  The call to the YQL Web service uses
//  2-legged OAuth and is made with OpenSocial
//  functions.
//*/
//function makeQuery(e){
//  e.preventDefault(); // do not send off form
//  var container = document.getElementById('results');
//  var location = document.getElementById('query').value || 'SFO';
//  var content = '';
//
//  var BASE_URI = 'http://query.yahooapis.com/v1/yql';
//
//  // function calling the opensocial makerequest method
//  function runQuery(query, handler) {
//    gadgets.io.makeRequest(BASE_URI, handler, {
//        METHOD: 'POST',
//        POST_DATA: toQueryString({q: query, format: 'json'}),
//        CONTENT_TYPE: 'JSON',
//        AUTHORIZATION: 'OAuth'
//    });
//  };
//
//  // Tool function to create a request string
//  function toQueryString(obj) {
//    var parts = [];
//    for(var each in obj) if (obj.hasOwnProperty(each)) {
//      parts.push(encodeURIComponent(each) + '=' +
//                 encodeURIComponent(obj[each]));
//    }
//    return parts.join('&');
//  };
//
//  // Run YQL query to GeoPlanet API and extract data from response
//  runQuery('select * from geo.places where text="' + location + '"',
//    function(rsp) {
//      if(rsp.data){
//        var place = rsp.data.query.results.place;
//        if(place[0]){
//          place = place[0];
//        }
//        var name      = place.name || 'Unknown';
//        var country   = place.country.content || place[0].country.content ||
//                        'Unknown';
//        var latitude  = place.centroid.latitude || 'Unknown';
//        var longitude = place.centroid.longitude || 'Unknown';
//        var city      = place.locality1.content || 'Unknown';
//        var state     = place.admin1.content || 'Unknown';
//        var county    = place.admin2.content || 'Unknown';
//        var zip       = place.postal ? place.postal.content : 'Unknown';
//
//        content = '<ul><li><strong>Place Name: </strong>' + name + '</li>'+
//        '<li><strong>City/Town: </strong>' + city + '</li>' +
//        '<li><strong>County/District: </strong>' + county + '</li>' +
//        '<li><strong>State/Province: </strong>' + state + '</li>' +
//        '<li><strong>Zipcode: </strong>' + zip + '</li>' +
//        '<li><strong>Country: </strong>' + country + '</li>' +
//        '<li><strong>Latitude: </strong>' + latitude + '</li>' +
//        '<li><strong>Longitude: </strong>' + longitude + '</li></ul>';
//        container.innerHTML = content;
//      }
//      else {
//        container.innerHTML = gadgets.json.stringify(rsp);
//      }
//  });
//}
// Create an event handler for submitting the form
//var form = document.getElementById('geosearch');
//form.addEventListener('submit',makeQuery,false);








/**
 * 
 * Estas dos funciones de aquí abajo.
 * window.fbAsyncInit y (function(d,s,id) son funciones que cargan el SDK de logind e facebook y el objeto FB
 * para que luego se usen en las funciones de login. NO TOCAR.
 * 
 */
window.fbAsyncInit = function () {
    FB.init({
        appId: '2264700813756753',
        cookie: true, // enable cookies to allow the server to access 
        // the session
        xfbml: true, // parse social plugins on this page
        version: 'v2.8' // use graph api version 2.8
    });
    // Now that we've initialized the JavaScript SDK, we call 
    // FB.getLoginStatus().  This function gets the state of the
    // person visiting this page and can return one of three states to
    // the callback you provide.  They can be:
    //
    // 1. Logged into your app ('connected')
    // 2. Logged into Facebook, but not your app ('not_authorized')
    // 3. Not logged into Facebook and can't tell if they are logged into
    //    your app or not.
    //
    // These three cases are handled in the callback function.
    // 
    // Comentamos esto para que faceBook no sea nuestro login predeterminado.
    //FB.getLoginStatus(function (response) {
    //    loginFacebook.callback(response);
    //});
};
// Load the SDK asynchronously
(function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id))
        return;
    js = d.createElement(s);
    js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));
    