// Función para verificar si el número de cédula es válido (para Ecuador)
function isValidCedula(cedula) {
    if (cedula.length !== 10) {
        return false;
    }

    const digitoRegion = parseInt(cedula.substring(0, 2));
    if (digitoRegion < 1 || digitoRegion > 24) {
        return false;
    }

    const coefValCedula = [2, 1, 2, 1, 2, 1, 2, 1, 2];
    const verificador = parseInt(cedula.substring(9, 10));
    let suma = 0;

    for (let i = 0; i < (cedula.length - 1); i++) {
        let digito = parseInt(cedula.substring(i, i + 1)) * coefValCedula[i];
        suma += ((digito % 10) + Math.floor(digito / 10));
    }

    suma = Math.round(suma);

    return (Math.round(suma % 10) === 0 && suma % 10 === verificador) || (10 - (suma % 10)) === verificador;
}

document.addEventListener('DOMContentLoaded', function () {
    // Manejador de evento para el formulario de inicio de sesión
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Evitar el envío del formulario por defecto

            // Obtener el valor del número de cédula ingresado por el usuario
            const cedulaIngresada = document.getElementById('cedula').value;

            // Validar el número de cédula
            if (!isValidCedula(cedulaIngresada)) {
                document.getElementById('mensaje').innerText = 'Número de cédula incorrecto. Inténtelo de nuevo.';
                return;
            }

            // Simulación de verificación exitosa (sin usar localStorage)
            // Redirigir a la página de inicio
            window.location.href = "index.html";
        });
    }
});
