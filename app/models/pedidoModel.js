var pool = require("../../config/pool_conexoes");

    const PedidoModel = {
        findAll: async () => {
            try {
                const [resultados] = await pool.query(
                    'SELECT * FROM pedido'
                )
                return resultados;
            } catch (error) {
                return error;
            }
        },
        
        findId: async (id) => {
            try {
                const [resultados] = await pool.query(
                    "select * from pedido where id_pedido = ?",
                    [id]
                )
                return resultados;
            } catch (error) {
                return error;
            }
        },

        createPedido: async (camposJson) => {
            try {
                const [resultados] = await pool.query(
                    "insert into pedido set ?",
                    [camposJson]
                )
                return resultados;
            } catch (error) {
                return error;
            }
        },
        
        createItemPedido: async (camposJson) => {
            try {
                const [resultados] = await pool.query(
                    "insert into item_pedido set ?",
                    [camposJson]
                )
                return resultados;
            } catch (error) {
                return error;
            }
        },

        update: async (camposJson, id) => {
            try {
                const [resultados] = await pool.query(
                    "UPDATE pedido SET  ? WHERE id_pedido = ?",
                    [camposJson, id],
                )
                return resultados;
            } catch (error) {
                return error;
            }
        },
        
        delete: async (id) => {
            try {
                const [resultados] = await pool.query(
                    "UPDATE pedido SET status_pedido = 0 WHERE id_pedido = ?", [id]
                )
                return resultados;
            } catch (error) {
                return error;
            }
        }
    };

module.exports = {PedidoModel}