const moment = require("moment");
var pool = require("../../config/pool_conexoes");

const hqModel = {
    findAll: async (id = null) => {
        try {
            const [resultados] = await pool.query("SELECT h.id_hq, h.nome_hq, h.descr_hq, h.imagem_hq, " +
                " h.preco_hq, h.status_hq, IF(f.hq_id_hq > 0, 'favorito', 'favoritar') as favorito  " +
                " FROM hq h " +
                " left join favorito f " +
                " on ((h.id_hq = f.hq_id_hq and f.usuario_id_usuario = ?) and f.status_favorito =1)", [id]);
                return resultados;
        } catch (error) {
            console.log(error);
            return error;
        }
    },

    findID: async (id) => {
        try {
            const [resultados] = await pool.query("SELECT * FROM hq where id_hq = ? ", [id]);
            return resultados;
        } catch (error) {
            console.log(error);
            return error;
        }
    },

    FindPage: async (pagina, total) => {
        try {
            const [resultados] = await pool.query("SELECT * FROM hq  limit ?, ?", [pagina, total]);
            return resultados;
        } catch (error) {
            console.log(error);
            return error;
        }

    },

    TotalReg: async () => {
        try {
            const [resultados] = await pool.query('SELECT count(*) total FROM hq ');
            return resultados;
        } catch (error) {
            console.log(error);
            return error;
        }

    },

    create: async (camposJson) => {
        try {
            const [resultados] = await pool.query("insert into hq set ?", camposJson);
            return resultados;
        } catch (error) {
            console.log(error);
            return error;
        }


    },

    update: async (camposJson, id) => {
        try {
            const [resultados] = await pool.query("UPDATE hq SET ? WHERE id_hq = ?", [camposJson, id])
            return resultados;
        } catch (error) {
            console.log(error);
            return error;
        }

    },

    delete: async (id) => {
        try {
            const [resultados] = await pool.query("UPDATE hq SET status_hq = 0 WHERE id_hq = ?", [id]);
            return resultados;
        } catch (error) {
            console.log(error);
            return error;
        }
    },
}

module.exports = { hqModel };