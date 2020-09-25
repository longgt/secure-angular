const express = require('express');
const cors = require('cors');

const config = require('./config');
const store = require('./store/session');

const app = express();
app.use(express.json());

// Enables CORS
app.use(cors({
  origin: true,
  credentials: true
}));

// configure sessions
app.use(store.session(
  {
    name: config.session.name,
    store: store.getStore(),
    secret: config.session.secret,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: 'auto',
      httpOnly: true,
      sameSite: config.session.sameSite,
      maxAge: 3600000
    }
  })
);

// Configuration for Proxies
app.set( 'trust proxy', true );

// Defines express 'logout' middleware before keycloak default route 'logout'
app.use('/logout', (req, res, next) => {
  const redirect_url = `http://localhost:${config.serverPort}/logout/callback`;
  req.url = req.path + `?redirect_url=${redirect_url}`;
  next();
});

// Add keycloak middleware to root path
const keycloak = require('./keycloak-config.js').initKeycloak(store.getStore());
app.use(keycloak.middleware());

// Secured Rest API
app.use('/api', require('./routes/api.js'));

// NG application middlewares
app.use('/oauth-callback', require('./routes/oauth-callback'));
app.use('/login', require('./routes/login'));
app.use('/user', require('./routes/user'));
app.use('/logout', require('./routes/logout'));
app.use('/token', require('./routes/token'));

app.get('/', (req, res) => {
  res.send("Server is up!");
});

app.listen(config.serverPort, '0.0.0.0', () => console.log(`Keycloak example app listening on port ${config.serverPort}.`));