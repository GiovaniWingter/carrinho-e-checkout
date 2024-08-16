const { hqModel } = require("../models/hqModel");
const { favoritoModel } = require("../models/favoritoModel");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
var salt = bcrypt.genSaltSync(12);
const { removeImg } = require("../util/removeImg");
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const https = require('https');

const { carrinho } = require("../util/carrinho");

const hqController = {



    listar: async (req, res) => {
        req.session.autenticado.login = req.query.login;
        results = await hqModel.findAll(req.session.autenticado.id);
        carrinho.atualizarCarrinho(req);
        res.render("pages/index", {
            autenticado: req.session.autenticado,
            login: req.session.logado,
            listaHq: results,
            carrinho: req.session.carrinho,
        });
    },

    favoritar: async (req, res) => {

        if (req.session.autenticado.autenticado == null) {
            res.render("pages/login", { listaErros: null, dadosNotificacao: { titulo: "Faça seu Login!", mensagem: "Para favoritar é necessário estar logado !", tipo: "warning" } });
        } else {
            await favoritoModel.favoritar({
                idHq: req.query.id,
                situacao: req.query.sit,
                idUsuario: req.session.autenticado.id
            });
            res.redirect("/")
        }
    }

}


module.exports = { hqController }