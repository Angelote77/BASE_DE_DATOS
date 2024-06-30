import { conectar } from "../modelo/db_conenctar.js";
import bcrypt from 'bcrypt';

const auth_controller = {};

// Renderiza la página de login
auth_controller.showLogin = (req, res) => {
    const { error } = req.query;
    res.render('auth/login', { error });
};

// Maneja el registro de nuevos usuarios y personas
auth_controller.register = (req, res) => {
    const { PerApePat, PerApeMat, PerNom, PerFecNac, PerCor, usuario, contrasena } = req.body;

    // Asegúrate de encriptar la contraseña antes de almacenarla
    const saltRounds = 10;
    bcrypt.hash(contrasena, saltRounds, (err, hashedPassword) => {
        if (err) {
            console.log(err);
            res.redirect('/login');
        } else {
            // Primero insertamos en la tabla persona
            conectar.query('INSERT INTO persona (PerApePat, PerApeMat, PerNom, PerFecNac, PerCor) VALUES (?, ?, ?, ?, ?)', 
                [PerApePat, PerApeMat, PerNom, PerFecNac, PerCor], 
                (error, resultsPersona) => {
                    if (error) {
                        console.log(error);
                        res.redirect('/login');
                    } else {
                        // Luego insertamos en la tabla usuario
                        conectar.query('INSERT INTO usuario (UsuUsu, UsuPas, UsuPerCod) VALUES (?, ?, ?)', 
                            [usuario, hashedPassword, resultsPersona.insertId], 
                            (error, resultsUsuario) => {
                                if (error) {
                                    console.log(error);
                                    res.redirect('/login');
                                } else {
                                    res.redirect('/');
                                }
                            });
                    }
                });
        }
    });
};

// Maneja el inicio de sesión de usuarios
auth_controller.login = (req, res) => {
    const { usuario, contrasena } = req.body;

    conectar.query('SELECT * FROM usuario WHERE UsuUsu = ?', [usuario], (error, results) => {
        if (error) {
            console.log(error);
            res.redirect('/login');
        } else {
            if (results.length > 0) {
                bcrypt.compare(contrasena, results[0].UsuPas, (err, result) => {
                    if (result) {
                        res.redirect('/');
                    } else {
                        res.redirect('/login?error=Contraseña incorrecta');
                    }
                });
            } else {
                res.redirect('/login?error=Usuario no existe');
            }
        }
    });
};

export { auth_controller };
