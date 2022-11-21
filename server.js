
import express from "express";
import session from "express-session";
import MongoStore from "connect-mongo";
import bodyParser from "body-parser";

const app = express();


app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static("public"));

const auth = (req, res, next) => {
    req.session.isAdmin == true ? next() : res.status(401).send("Sin permiso"); 
    //res.status(401).send("Sin permisos")
    };
    

const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true};


app.use(
    session({
        secret: "34332323232",
        store: MongoStore.create({
            //mongoUrl: 'mongodb://127.0.0.1:27017/sesiones',
            mongoUrl: 'mongodb+srv://jakummer:dLkXqtTZutylUFTS@cluster0.ye9adwh.mongodb.net/sesiones',
            mongoOptions: advancedOptions,
        }),
       
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 60000,
        }

    })
);

const { pathname: root } = new URL(".", import.meta.url);

app.get("/", (req, res) => {
    //si existe sesion
    //muestra sesion de agregar productos
    if(req.session.usuario){
        res.sendFile("C:/Users/Usuario/Desktop/WebProject_JAK/programacionBE/LogInFormulario-Kummer/public/dashboard.html");
    }else{
        res.sendFile("C:/Users/Usuario/Desktop/WebProject_JAK/programacionBE/LogInFormulario-Kummer/public/login.html");

    }
});


//* cuando realiza el login pasa por aca
app.post("/", (req, res) => {
    const {username} = req.body;
    req.session.usuario =  username;
    res.redirect('/');

});


//registración
app.post("/register", (req, res) => {
    const {username} = req.body;
    req.session.usuario =  username;
    res.redirect('/');
    
});



//* deslogeo
app.get("/logout", (req, res) => {
   req.session.destroy((err) => {
    res.sendFile("C:/Users/Usuario/Desktop/WebProject_JAK/programacionBE/LogInFormulario-Kummer/public/logout.html");
   })
});



app.listen(8081, () => console.log("*** Conectados Login ***"));
