var express = require("express");
var router = express.Router();

const {
  verificarUsuAutenticado,
  limparSessao,
  gravarUsuAutenticado,
  verificarUsuAutorizado,
} = require("../models/autenticador_middleware");

const { usuarioController } = require("../controllers/usuarioController");
const { carrinhoController } = require("../controllers/carrinhoController");
const { hqController } = require("../controllers/hqController");

const uploadFile = require("../util/uploader")("./app/public/imagem/perfil/");
// const uploadFile = require("../util/uploader")();


// SDK do Mercado Pago
const { MercadoPagoConfig, Preference } = require('mercadopago');
// Adicione as credenciais
const client = new MercadoPagoConfig(
  {
    accessToken: process.env.accessToken
  });


router.get("/addItem", function (req, res) {
  carrinhoController.addItem(req, res);
});

router.get("/removeItem", function (req, res) {
  carrinhoController.removeItem(req, res);
});

router.get("/listar-carrinho", function (req, res) {
  carrinhoController.listarcarrinho(req, res);
});

router.get(
  "/perfil",
  verificarUsuAutorizado([1, 2, 3], "pages/restrito"),
  async function (req, res) {
    usuarioController.mostrarPerfil(req, res);
  }
);

router.post(
  "/perfil",
  uploadFile("imagem-perfil_usu"),
  usuarioController.regrasValidacaoPerfil,
  verificarUsuAutorizado([1, 2, 3], "pages/restrito"),
  async function (req, res) {
    usuarioController.gravarPerfil(req, res);
  }
);


router.get("/", verificarUsuAutenticado, function (req, res) {
  hqController.listar(req, res);
});

router.get("/sair", limparSessao, function (req, res) {
  res.redirect("/");
});

router.get("/login", function (req, res) {
  res.render("pages/login", { listaErros: null, dadosNotificacao: null });
});

router.post(
  "/login",
  usuarioController.regrasValidacaoFormLogin,
  gravarUsuAutenticado,
  function (req, res) {
    usuarioController.logar(req, res);
  }
);

router.get("/cadastro", function (req, res) {
  res.render("pages/cadastro", {
    listaErros: null,
    dadosNotificacao: null,
    valores: { nome_usu: "", nomeusu_usu: "", email_usu: "", senha_usu: "" },
  });
});

router.post(
  "/cadastro",
  usuarioController.regrasValidacaoFormCad,
  async function (req, res) {
    usuarioController.cadastrar(req, res);
  }
);

router.get(
  "/adm",
  verificarUsuAutenticado,
  verificarUsuAutorizado([2, 3], "pages/restrito"),
  function (req, res) {
    res.render("pages/adm", req.session.autenticado);
  }
);

router.get("/favoritar", verificarUsuAutenticado, function (req, res) {
  hqController.favoritar(req, res);
}
);


/* --------------------------------------------------------------------- */


router.get("/exemplo", function(req, res){
  res.render("pages/exemplo")
})

router.post("/create-preference", function (req, res) {

    const preference = new Preference(client);

console.log( req.body.items);

    preference.create({
        body: {
            items: req.body.items,
            back_urls: {
                "success": "http://localhost:8080/feedback",
                "failure": "http://localhost:8080/feedback",
                "pending": "http://localhost:8080/feedback"
            },
            auto_return: "approved",
        }
    })
        .then((value)=>{
            res.json(value)
        })
        .catch(console.log)



});

/* -----------------------------------------------------------------------*/



module.exports = router;
