document.addEventListener("DOMContentLoaded", function () {
    const inputs = document.querySelectorAll('#formulario input');

    const expresiones = {
        nombre: /^[a-zA-ZÀ-ÿ\s]{4,16}$/,
        mastercard: /5[1-5][0-9]{14}$/,
        visa: /3[47][0-9]{13}$/,
        americanExpress: /3[47][0-9]{13}$/, 
        fecha: /^(0[1-9]|1[0-2])\/[0-9]{2}$/,
        cvv: /^[0-9]{3}$/
    }
    
    const campos = {
        nombre: false,
        numero: false,
        fecha: false,
        cvv: false
    }
    
    const validarFormulario = (e) => {
        const nombreInput = document.getElementById("nombre").value.toLowerCase();
        switch (e.target.name) {
            case "nombre":
                validarCampo(expresiones.nombre, e.target, 'nombre');
                switch (nombreInput) {
                    case "mastercard":
                        campos.numero = validarCampo(expresiones.mastercard, e.target, 'numero');
                        break;
                    case "visa":
                        campos.numero = validarCampo(expresiones.visa, e.target, 'numero');
                        break;
                    case "americanexpress":
                        campos.numero = validarCampo(expresiones.americanExpress, e.target, 'numero');
                        break;
                    default:
                        campos.numero = false;
                        break;
                }
                break;
            case "fecha":
                validarCampo(expresiones.fecha, e.target, 'fecha');
                break;
            case "cvv":
                campos.cvv = validarCampo(expresiones.cvv, e.target, 'cvv');
                break;
        }
    }
    
    const validarCampo = (expresion, input, campo) => {
        if(expresion.test(input.value)){
            document.getElementById(`${campo}`).classList.remove('incorrecto');
            document.getElementById(`${campo}`).classList.add('correcto');
        } else {
            document.getElementById(`${campo}`).classList.add('incorrecto');
            document.getElementById(`${campo}`).classList.remove('correcto');
        }
    }

    inputs.forEach((input) => {
        input.addEventListener('keyup', validarFormulario);
        input.addEventListener('blur', validarFormulario);
    });
});