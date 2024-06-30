import express from "express";
import { conectar } from "../modelo/db_conenctar.js";

var crud_cooperativa = {};

crud_cooperativa.leer = (req, res) => {
    conectar.query('SELECT * FROM cooperativa', (error, results) => {
        if (error) {
            throw error;
        } else {
            res.render('clientes/cooperativa.ejs', { resultado: results });
        }
    });
};

crud_cooperativa.cud = (req, res) => {
    const btm_crear = req.body.btm_crear;
    const btm_actualizar = req.body.btm_actualizar;
    const btm_borrar = req.body.btm_borrar;
    const id = req.body.txt_id;
    const iden = req.body.txt_iden;
    const nom = req.body.txt_nom;
    const sig = req.body.txt_sig;
    const dir = req.body.txt_dir;
    const tel = req.body.txt_tel;
    const cor = req.body.txt_cor;
    const slo = req.body.txt_slo;
    const usu_rep = req.body.txt_usu_rep;

    if (btm_crear) {
        conectar.query('INSERT INTO cooperativa SET ?', { CooIden: iden, CooNom: nom, CooSig: sig, CooDir: dir, CooTel: tel, CooCor: cor, CooSlo: slo, CooUsuRep: usu_rep }, (error, results) => {
            if (error) {
                console.log(error);
            } else {
                res.redirect('/crud_cooperativa');
            }
        });
    }

    if (btm_actualizar) {
        conectar.query('UPDATE cooperativa SET ? WHERE CooCod = ?', [{ CooIden: iden, CooNom: nom, CooSig: sig, CooDir: dir, CooTel: tel, CooCor: cor, CooSlo: slo, CooUsuRep: usu_rep }, id], (error, results) => {
            if (error) {
                console.log(error);
            } else {
                res.redirect('/crud_cooperativa');
            }
        });
    }

    if (btm_borrar) {
        conectar.query('DELETE FROM cooperativa WHERE CooCod = ?', [id], (error, results) => {
            if (error) {
                console.log(error);
            } else {
                res.redirect('/crud_cooperativa');
            }
        });
    }
};

crud_cooperativa.actualizarEstado = (req, res) => {
    const { id, estado } = req.body;
    conectar.query('UPDATE cooperativa SET CooEst = ? WHERE CooCod = ?', [estado, id], (error, results) => {
        if (error) {
            console.log(error);
            res.json({ success: false });
        } else {
            res.json({ success: true });
        }
    });
};

export { crud_cooperativa };
