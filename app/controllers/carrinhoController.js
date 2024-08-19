const { carrinho } = require("../util/carrinho");
const { body, validationResult } = require("express-validator");

const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const https = require('https');


const carrinhoController = {

    addItem: (req, res) => {
        try {
            let id = req.query.id;
            let preco = req.query.preco;
            carrinho.addItem(id, 1, preco);
            carrinho.atualizarCarrinho(req);
            res.redirect(req.get('Referer').split("/")[3]); 
        } catch (e) {
            console.log(e);
            res.render("pages/cadastro", {
                listaErros: erros, dadosNotificacao: {
                    titulo: "Erro ao cadastrar!", mensagem: "Verifique os valores digitados!", tipo: "error"
                }, valores: req.body
            })
        }
    },

    removeItem: (req, res) => {
        try {
            let id = req.query.id;
            let qtde = req.query.qtde;
            carrinho.removeItem(id, qtde);
            carrinho.atualizarCarrinho(req);           
            res.redirect(req.get('Referer').split("/")[3]); 
        } catch (e) {
            console.log(e);
            res.render("pages/login", {
                listaErros: null,
                dadosNotificacao: { titulo: "Falha ao logar!", mensagem: "Usuário e/ou senha inválidos!", tipo: "error" }
            })
        }


    },

    listarcarrinho: (req, res) => {
        try {
            carrinho.atualizarCarrinho(req);
            req.session.autenticado.login = req.query.login;
            res.render("pages/listar-carrinho", {
                autenticado: req.session.autenticado,
                carrinho: req.session.carrinho,
                listaErros: null,
            });
        } catch (e) {
            console.log(e);
            res.render("pages/listar-carrinho", {
                autenticado: req.session.autenticado,
                carrinho: null,
                listaErros: null,
                dadosNotificacao: { titulo: "Falha ao Listar Itens !", mensagem: "Erro interno no servidor!", tipo: "error" }
            })
        }
    },
}


module.exports = {carrinhoController}