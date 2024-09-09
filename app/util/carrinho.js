const { hqModel } = require("../models/hqModel");

const carrinho = {
    itensCarrinho: [],

    atualizarCarrinho: (req) => {
        req.session.carrinho = carrinho.itensCarrinho;
    },

    removeItem: (codItem, qtde) => {
        try {
            let indice = carrinho.itensCarrinho.findIndex(
                (element) => element.codproduto === codItem);
            if (indice !== -1) {
                carrinho.itensCarrinho[indice].qtde -= qtde;
                if (carrinho.itensCarrinho[indice].qtde <= 0) {
                    carrinho.itensCarrinho.splice(indice, 1);
                }
            }
        } catch (error) {
            console.error(error);
        }
    },

    excluirItem: (codItem) => {
        try {
            let indice = carrinho.itensCarrinho.findIndex(
                (element) => element.codproduto === codItem);
            if (indice !== -1) {
                carrinho.itensCarrinho.splice(indice, 1);
            }
        } catch (error) {
            console.error(error);
        }
    },

    getQtdeItens: () => {
        return carrinho.itensCarrinho.length;
    },

    addItem: async (codItem, qtde, preco) => {
        try {
            // Verifica se o carrinho está vazio
            if (carrinho.itensCarrinho.length === 0) {
                const hq = await hqModel.findID(codItem);
                if (hq.length > 0) {
                    carrinho.itensCarrinho.push({
                        "codproduto": codItem,
                        "qtde": qtde,
                        "preco": parseFloat(hq[0].preco_hq),
                        "produto": hq[0].nome_hq,
                        "imagem": hq[0].imagem_hq
                    });
                }
            } else {
                let indice = carrinho.itensCarrinho.findIndex(
                    (element) => element.codproduto === codItem);
                if (indice === -1) {
                    const hq = await hqModel.findID(codItem);
                    if (hq.length > 0) {
                        carrinho.itensCarrinho.push({
                            "codproduto": codItem,
                            "qtde": qtde,
                            "preco": parseFloat(hq[0].preco_hq),
                            "produto": hq[0].nome_hq,
                            "imagem": hq[0].imagem_hq
                        });
                    }
                } else {
                    carrinho.itensCarrinho[indice].qtde += qtde;
                }
            }
        } catch (error) {
            console.error(error);
        }
    }
}
module.exports = { carrinho };
