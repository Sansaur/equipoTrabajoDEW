/*
 * Incluir este archivo como script para los logins.
 * 
 * Para el login de Facebook hay que usar este botón:
 * <fb:login-button scope="public_profile,email" onlogin="loginFacebook.checkLogin();"></fb:login-button>
 * 
 * Funcionalidad: Pulsar botón -> checkLogin -> callback -> testAPI
 */

function appLogout(){
    localStorage.setItem('UsuarioLogueado',null);
}

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
            console.log(response.name);
            localStorage.setItem('UsuarioLogueado', response.name);
            // Aquí es cuando se usan los datos de la respuesta para decir "Conectado correctamente" o algo parecido.
        });
    }
};

var loginGitHub = {
    iniciar: function () {
        localStorage.setItem('UsuarioLogueado','gitUser');
        location.replace("https://github.com/login/oauth/authorize?scope=user&client_id=d671fd09fe12180a0a2f");
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
        // NO SE SI ESTO VA A FUNCIONAR SIEMPRE, HAGAN PRUEBAS.
        console.log(gapi.auth2.getAuthInstance().isSignedIn);
        let estamosLogueados = gapi.auth2.getAuthInstance().isSignedIn.Ab;
        let nombreGoogle = gapi.auth2.getAuthInstance().currentUser.Ab.w3.ig.split(' ')[0];
        console.log(nombreGoogle);
        console.log(estamosLogueados);
        if (nombreGoogle) {
            localStorage.setItem('UsuarioLogueado', nombreGoogle);

        }
        gapi.auth2.getAuthInstance().signIn();
    },

    handleSignOutClick: function (event) {
        gapi.auth2.getAuthInstance().signOut();
    },

    makeApiCall: function () {
        // Make an API call to the People API, and print the user's given name.
        console.log(gapi.auth2.getAuthInstance().isSignedIn);
        console.log(gapi.auth2.getAuthInstance());
        gapi.client.people.people.get({
            'resourceName': 'people/me',
            'requestMask.includeField': 'person.names'
        }).then(function (response) {
            console.log('Hello, ' + response.result.names[0].givenName);
            localStorage.setItem('UsuarioLogueado', response.result.names[0].givenName);
        }, function (reason) {
            console.log('Error: ' + reason.result.error.message);
        });
    }
}


/*************************************
 * DEJO EL LOGIN DE TWITTER PARA EL FINAL
 * FIREBASE GOOGLE:
 * https://dew06-t02.firebaseapp.com/__/auth/handler
 * @returns {undefined}
 * *******************************
 */
/**
 * Vale, Login hecho.
 * De la manera que funciona es usando Google Firebase, que al parecer es como un servidor que se encarga de servicios de autenticación de varias cosas
 * Ya se podría haber avisado de esto desde antes, la verdad.
 * 
 * Se tiene que importar
 * <script src="https://www.gstatic.com/firebasejs/4.6.2/firebase-app.js"></script>
 <script src="https://www.gstatic.com/firebasejs/4.6.2/firebase-auth.js"></script>
 <script src="https://www.gstatic.com/firebasejs/4.6.2/firebase-database.js"></script>
 <script src="https://www.gstatic.com/firebasejs/4.6.2/firebase-firestore.js"></script>
 <script src="https://www.gstatic.com/firebasejs/4.6.2/firebase-messaging.js"></script>
 
 Al HTML (Se supone que debebería valor solo con auth, pero no me arriesgo)
 
 * Aquí abajo se configura el firebase, le decimos la apiKey y el dominio que se encarga de realizar las autenticaciones
 * Luego creamos la variable provider con el método TwitterAuthProvider()
 * en los parámetros del provider le ponemos que tenga idioma "es" (Español) y que requiera de hacer login (Para que no haga login automático, aunque esté conectada la cuenta ya)
 * ejecutarLogin() es a lo que debe hacer referencia el botón que haga la acción de loguearse en Twitter, nos lleva a la página de Twiter y hacemos login.
 * 
 * Luego, entra en firebase.auth().getRedirectResult.then()
 * Que tiene preparada para coger las claves de las credenciales del resultado.
 * 
 * No hace redireccionamiento a ningun sitio por ahora.
 * 
 */
var config = {
    apiKey: "AIzaSyBVfY6k8e1ZnuymVFoaqWIrTvxAz2hCUR8",
    authDomain: "dew06-t02.firebaseapp.com"
};
firebase.initializeApp(config);

var provider = new firebase.auth.TwitterAuthProvider();
firebase.auth().languageCode = 'pt';
provider.setCustomParameters({
    'lang': 'es',
    'force_login': 'true'
});
function ejecutarLogin() {
    firebase.auth().signInWithRedirect(provider);
}
firebase.auth().getRedirectResult().then(function (result) {
    if (result.credential) {
        // This gives you a the Twitter OAuth 1.0 Access Token and Secret.
        // You can use these server side with your app's credentials to access the Twitter API.
        console.log(result.credential);
        var token = result.credential.accessToken;
        var secret = result.credential.secret;
        // ...
        console.log(token);
        console.log(secret);
    }
    // The signed-in user info.
    var user = result.user;
    console.warn(user);
    console.warn(user.displayName);
    localStorage.setItem('UsuarioLogueado', user.displayName);
    location.replace('index.html');
}).catch(function (error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
    console.log(errorCode);
});

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
    