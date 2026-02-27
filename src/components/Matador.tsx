import Bull from "./Bull";

const Matador = () =>
    <div><img src="../src/assets/matador.png" style={{ width: '150px', height: '200px' }}
        alt="matador"></img></div>

const BullRun = document.addEventListener('bullRun', (event) => {
    const pos = event as CustomEvent;
    let bullPosition = pos.detail.position;
    
    if(bullPosition === 2){
        
        console.log("we have to get out of here!", Matador);
    }
});
export { Matador };