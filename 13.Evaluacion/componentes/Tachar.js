const tachar=()=>{
    toggleBtn.addEventListener("click", () => {
        const items = document.querySelectorAll("#taskList .item");
        if (items.length > 0) {
            const lastItem = items[items.length - 1];
            lastItem.classList.toggle("tachado");
        } 
        else {
            alert("No hay elementos");
        }
    });
};
export default tachar;