const form = document.querySelector("#form")
const promedio = document.querySelector("#promedio")
const mayor = document.querySelector("#mayor")
const img = document.querySelector("#img")
const resultado = document.querySelector("#resultado")
const inputs = document.querySelectorAll("#form input")
const campos = {
    Lengua: false,
    Mates: false,
    Efsi: false
}
const validar = async (e)=>{
    let input = e.target
    let num = parseInt(input.value)
    let error = document.querySelector(`#error${input.name}`)
    if(isNaN(num) || num > 10 || num < 1){
        error.classList.replace("d-none", "d-block")
        input.classList.replace("verde","rojo") 
        campos[input.name] = false;
    }else{
        error.classList.replace("d-block", "d-none")
        input.classList.replace("rojo","verde")
        campos[input.name] = true;
    }
}
const fail = ()=>{
    resultado.setAttribute("class", "bg-danger text-white")
    resultado.innerHTML = "Complete bien los campos! Tienen que ser numeros entre 1 y 10"
    img.setAttribute("src", "https://c.tenor.com/qfyuBx40-IAAAAAM/patrick-star-dumb.gif")
}
inputs.forEach(input=>{
    input.addEventListener("keyup", validar);
    input.addEventListener("blur", validar);
})
form.addEventListener("submit", e=> e.preventDefault())
mayor.addEventListener("click", ()=> {
    if(campos.Efsi && campos.Lengua && campos.Mates){
        let notas = []
        inputs.forEach(i=> notas.push({nombre: i.name, nota: parseInt(i.value) }))
        notas.sort(function(a,b){
            if (a.nota > b.nota) {
              return -1;
            }
            if (a.nota < b.nota) {
              return 1;
            }
            return 0;
        })
        let mayorNota = notas[0]
        resultado.setAttribute("class", "bg-info text-white")
        resultado.innerHTML = `${mayorNota.nombre} es la materia con mayor nota con un ${mayorNota.nota}`
        img.setAttribute("src", "https://c.tenor.com/Ce_CiuMr7fsAAAAC/spongebob-school.gif")
    }else fail()
})
promedio.addEventListener("click", ()=> {
    if(campos.Efsi && campos.Lengua && campos.Mates){
        let promedio = 0
        inputs.forEach(i=> promedio += parseInt(i.value))
        promedio /= 3
        promedio = promedio.toFixed(2)
        if(promedio >= 6){
            resultado.setAttribute("class", "bg-info text-white")
            resultado.innerHTML = `Aprobaste!! tu promedio es un ${promedio}`
            img.setAttribute("src", "https://c.tenor.com/HJ0iSKwIG28AAAAM/yes-baby.gif")
        }else{
            resultado.setAttribute("class", "bg-danger text-white")
            resultado.innerHTML = `No pasas del 6!! tu promedio es un ${promedio}`
            img.setAttribute("src", "https://c.tenor.com/mfQaON8BK-sAAAAM/tally-hall.gif")
        }
    }else fail()
})