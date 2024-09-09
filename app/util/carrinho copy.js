const { hqModel } = require("../models/hqModel");

const carrinho = {

    itensCarrinho: [],

    atualizarCarrinho: (req) => {
        req.session.carrinho = carrinho.itensCarrinho;
    },

    addItem: async (codItem, qtde, preco) => {
        if (carrinho.itensCarrinho == Array()) {
            hq = await hqModel.findID(codItem);
            carrinho.itensCarrinho[0] = {
                "codproduto": codItem,
                "qtde": qtde,
                "preco": parseFloat(hq[0].preco_hq),
                "produto": hq[0].nome_hq,
                "imagem": hq[0].imagem_hq,
            };
        } else {
            let indice = carrinho.itensCarrinho.findIndex((element) => element.codproduto == codItem);
            if (indice == -1) {
                hq = await hqModel.findID(codItem);
                carrinho.itensCarrinho.push(
                    {
                        "codproduto": codItem,
                        "qtde": qtde,
                        "preco": parseFloat(hq[0].preco_hq),
                        "produto": hq[0].nome_hq,
                        "imagem": hq[0].imagem_hq,
                    });
            } else {
                carrinho.itensCarrinho[indice].qtde += qtde;
            }
        }
    },

    removeItem: (codItem, qtde) => {
        let indice = carrinho.itensCarrinho.findIndex((element) => element.codproduto == codItem);
        carrinho.itensCarrinho[indice].qtde = carrinho.itensCarrinho[indice].qtde - qtde;
        if (carrinho.itensCarrinho[indice].qtde <= 0) {
            carrinho.itensCarrinho.splice(indice, 1);
        }
    },

    excluirItem: (codItem) => {
        let indice = carrinho.itensCarrinho.findIndex((element) => element.codproduto == codItem);
        carrinho.itensCarrinho.splice(indice, 1);
    },

    getQtdeItens: () => {
        return carrinho.itensCarrinho.length;
    }

}

module.exports = { carrinho };
