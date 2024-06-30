import express from "express";

import { auth_controller } from "./controlador/auth_controller.js";
import { crud_cooperativa } from "./controlador/crud_cooperativa.js";
import { crud_usuario } from "./controlador/crud_usuario.js";
import bodyParser from "body-parser";
import session from "express-session";

const app_e = express();

app_e.use(express.static('public'));
app_e.use(express.urlencoded({ extended: true }));
app_e.use(bodyParser.json());

// Configuración de sesión
app_e.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true
}));

// MOTOR DE VISTAS
app_e.set('views', './vista');
app_e.set('view engine', 'ejs');

app_e.listen('5000', function() {
    console.log('Servidor iniciado en el puerto 5000');
});
// Ruta para la página principal
app_e.get('/', (req, res) => {
    res.render('./clientes/index');
});

// Rutas para CRUD de usuarios
app_e.get('/', crud_usuario.leer);
app_e.post('/crud_c', crud_usuario.cud);

// Rutas para autenticación
app_e.get('/login', auth_controller.showLogin);
app_e.post('/register', auth_controller.register);
app_e.post('/login', auth_controller.login);

// Rutas para CRUD de cooperativas
app_e.get('/crud_cooperativa', crud_cooperativa.leer);
app_e.post('/crud_cooperativa', crud_cooperativa.cud);
app_e.post('/crud_cooperativa/estado', crud_cooperativa.actualizarEstado);

// Rutas para CRUD de usuarios
app_e.get('/crud_usuarios', crud_usuario.leer);
app_e.post('/crud_usuarios', crud_usuario.cud);
app_e.post('/crud_usuarios/estado', crud_usuario.actualizarEstado);