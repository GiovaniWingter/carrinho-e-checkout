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
            res.render("pages/cadastro", {
                listaErros: erros, dadosNotificacao: {
                    titulo: "Erro ao cadastrar!", 
                    mensagem: "Verifique os valores digitados!", 
                    tipo: "error"
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
            let caminho = req.get('Referer').split("/")[3] == "" 
                ? "/" 
                : "/" + req.get('Referer').split("/")[3];
            res.redirect(caminho);
        } catch (e) {
            console.log(e);
            res.render("pages/login", {
                listaErros: null,
                dadosNotificacao: { titulo: "Falha ao logar!", 
                    mensagem: "Usuário e/ou senha inválidos!", 
                    tipo: "error" }
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
            res.render("pages/login", {
                listaErros: null,
                dadosNotificacao: { titulo: "Falha ao logar!", 
                    mensagem: "Usuário e/ou senha inválidos!", 
                    tipo: "error" }
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
                dadosNotificacao: { titulo: "Falha ao Listar Itens !", 
                    mensagem: "Erro interno no servidor!", 
                    tipo: "error" }
            })
        }
    },

   
}

module.exports = { carrinhoController }