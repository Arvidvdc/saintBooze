// Required dependencies
const   express             = require("express"),
        app                 = express(),
        os                  = require('os');

// App dependencies
const   bodyParser          = require("body-parser"),
        methodOverride      = require("method-override");

// Routes
const   indexRoutes         = require("./routes/index");

// dotENV
require('dotenv').config();
let appIP       = "",
    appPort     = "",
    appDB       = "",
    appMarker   = "";

if(os.hostname()==="SARgE-WORK-IV") {
    appIP       = process.env.LOCAL_IP;
    appPort     = process.env.LOCAL_PORT;
    appDB       = process.env.DB_URL_DEVELOPMENT;
    appMarker   = "DEV"
} else {
    appIP       = process.env.SERVER_IP;
    appPort     = process.env.SERVER_PORT;
    appDB       = process.env.DB_URL;
    appMarker   = "LIVE"
}

// Express variables
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));

// Middleware
app.use((req,res,next)=>{
res.locals.appMarker = appMarker;
res.locals.currentUser=req.user;
next();
});

// Routes
app.use(indexRoutes);

// Listener
app.listen(appPort, appIP, ()=>console.log("Saint Booze \nStarted on: " + appIP + "\n      port: " + appPort ));