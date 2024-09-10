const { carrinho } = require("../util/carrinho");

const carrinhoController = {

    addItem: (req, res) => {
        try {
            let id = req.query.id;
            let preco = req.query.preco;
            carrinho.addItem(id, 1, preco);
            carrinho.atualizarCarrinho(req);
            let caminho =
                req.get('Referer').split("/")[3] == ""
                    ? "/"
                    : "/" + req.get('Referer').split("/")[3];
            res.redirect(caminho);
        } catch (e) {
            console.log(e);
            res.render("pages/index", {
                listaErros: erros, dadosNotificacao: {
                    titulo: "Erro ao adicionar o item!",
                    mensagem: "Tente novamente mais tarde!",
                    tipo: "error"
                }
            })
        }
    },

    removeItem: (req, res) => {
        try {
            let id = req.query.id;
            let qtde = req.query.qtde;
            carrinho.removeItem(id, qtde);
            carrinho.atualizarCarrinho(req);
            let caminho = req.get('Referer').split("/")[3] == ""
                ? "/"
                : "/" + req.get('Referer').split("/")[3];
            res.redirect(caminho);
        } catch (e) {
            console.log(e);
            res.render("pages/index", {
                listaErros: erros, dadosNotificacao: {
                    titulo: "Erro ao remover o item!",
                    mensagem: "Tente novamente mais tarde!",
                    tipo: "error"
                }
            })
        }
    },

    excluirItem: (req, res) => {
        try {
            let id = req.query.id;
            let qtde = req.query.qtde;
            carrinho.excluirItem(id);
            carrinho.atualizarCarrinho(req);
            let caminho = req.get('Referer').split("/")[3] == ""
                ? "/"
                : "/" + req.get('Referer').split("/")[3];
            res.redirect(caminho);
        } catch (e) {
            console.log(e);
            res.render("pages/index", {
                listaErros: erros, dadosNotificacao: {
                    titulo: "Erro ao excluir o item!",
                    mensagem: "Tente novamente mais tarde!",
                    tipo: "error"
                }
            })
        }
    },

    listarcarrinho: (req, res) => {
        try {
            carrinho.atualizarCarrinho(req);
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
                dadosNotificacao: {
                    titulo: "Falha ao Listar Itens !",
                    mensagem: "Tente novamente mais tarde!",
                    tipo: "error"
                }
            })
        }
    },
}

module.exports = { carrinhoController }