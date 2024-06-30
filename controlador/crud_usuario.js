import { conectar } from "../modelo/db_conenctar.js";

var crud_usuario = {};

// Leer usuarios
crud_usuario.leer = (req, res) => {
    conectar.query(`
        SELECT u.UsuCod, u.UsuUsu, p.PerNom, u.UsuEst 
        FROM usuario u 
        JOIN persona p ON u.UsuPerCod = p.PerCod`, 
        (error, results) => {
            if (error) {
                throw error;
            } else {
                res.render('clientes/crud_usuarios.ejs', { resultado: results });
            }
        });
};

// Crear, actualizar, eliminar usuarios
crud_usuario.cud = (req, res) => {
    const { btm_crear, btm_actualizar, btm_borrar } = req.body;
    const id = req.body.txt_id;
    const usu = req.body.txt_usu;
    const per = req.body.txt_per;
    const est = req.body.txt_est;

    if (btm_crear) {
        // Insertar un nuevo usuario
        conectar.query('INSERT INTO usuario SET ?', { UsuUsu: usu, UsuEst: est, UsuPerCod: per }, (error, results) => {
            if (error) {
                console.log(error);
            } else {
                res.redirect('/crud_usuarios');
            }
        });
    }

    if (btm_actualizar) {
        // Actualizar usuario
        conectar.query('UPDATE usuario SET ? WHERE UsuCod = ?', [{ UsuUsu: usu, UsuEst: est }, id], (error, results) => {
            if (error) {
                console.log(error);
            } else {
                res.redirect('/crud_usuarios');
            }
        });
    }

    if (btm_borrar) {
        // Eliminar usuario
        conectar.query('DELETE FROM usuario WHERE UsuCod = ?', [id], (error, results) => {
            if (error) {
                console.log(error);
            } else {
                res.redirect('/crud_usuarios');
            }
        });
    }
};

crud_usuario.actualizarEstado = (req, res) => {
    const { id, estado } = req.body;
    conectar.query('UPDATE usuario SET UsuEst = ? WHERE UsuCod = ?', [estado, id], (error, results) => {
        if (error) {
            console.log(error);
            res.json({ success: false });
        } else {
            res.json({ success: true });
        }
    });
};

export { crud_usuario };
