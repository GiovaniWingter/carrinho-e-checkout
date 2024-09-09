const { carrinho } = require("../util/carrinho");
const { body, validationResult } = require("express-validator");
const moment = require("moment");

const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const https = require('https');

const { PedidoModel } = require("../models/pedidoModel");

const carrinhoController = {

    addItem: (req, res) => {
        try {
            let id = req.query.id;
            let preco = req.query.preco;
            carrinho.addItem(id, 1, preco);
            carrinho.atualizarCarrinho(req);
            let caminho = req.get('Referer').split("/")[3] == "" ? "/" : "/" + req.get('Referer').split("/")[3];
            res.redirect(caminho);
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
            let caminho = req.get('Referer').split("/")[3] == "" ? "/" : "/" + req.get('Referer').split("/")[3];
            res.redirect(caminho);
        } catch (e) {
            console.log(e);
            res.render("pages/login", {
                listaErros: null,
                dadosNotificacao: { titulo: "Falha ao logar!", mensagem: "Usuário e/ou senha inválidos!", tipo: "error" }
            })
        }
    },
    excluirItem: (req, res) => {
        try {
            let id = req.query.id;
            let qtde = req.query.qtde;
            carrinho.excluirItem(id);
            carrinho.atualizarCarrinho(req);
            let caminho = req.get('Referer').split("/")[3] == "" ? "/" : "/" + req.get('Referer').split("/")[3];
            res.redirect(caminho);
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

    gravarPedido: async (req, res) => {

        try {
            const carrinho = req.session.carrinho;
            const camposJsonPedido = {
                data: moment().format("YYYY-MM-DD HH:mm:ss"),
                usuario_id_usuario: req.session.autenticado.id,
                status_pedido: 1,
                status_pagamento: req.query.status,
                id_pagamento: req.query.payment_id
            }
            var create = await PedidoModel.createPedido(camposJsonPedido);
            carrinho.forEach(async element => {
                camposJsonItemPedido = {
                    pedido_id_pedido: create.insertId,
                    hq_id_hq: element.codproduto,
                    quantidade: element.qtde
                }
                await PedidoModel.createItemPedido(camposJsonItemPedido);
            });
            req.session.carrinho = [];
            res.redirect("/");
        } catch (e) {
            console.log(e);
            res.render("pages/listar-carrinho", {
                autenticado: req.session.autenticado,
                carrinho: null,
                listaErros: null,
                dadosNotificacao: { titulo: "Falha ao Listar Itens !", mensagem: "Erro interno no servidor!", tipo: "error" }
            })
        }
    }
}


module.exports = { carrinhoController }