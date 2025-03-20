import Form from "./Componentes/formulario.js";
import taskTable from "./Componentes/tabla.js";
import cards from "./Componentes/cards.js";

(() => {
    Form.setDatos((task) => {
        taskTable.addTask(task);
        cards.update();
    });
})();