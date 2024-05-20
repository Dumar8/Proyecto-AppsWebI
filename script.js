// Función para calcular la fecha mínima permitida para la fecha de nacimiento
function calcularFechaMinimaNacimiento() {
    const hoy = new Date();
    const anioMinimo = hoy.getFullYear() - 18;
    const mes = hoy.getMonth() + 1; // Los meses son indexados desde 0
    const dia = hoy.getDate();
    const mesString = mes < 10 ? `0${mes}` : mes;
    const diaString = dia < 10 ? `0${dia}` : dia;
    return `${anioMinimo}-${mesString}-${diaString}`;
}

// Función para establecer la fecha mínima permitida en el campo de fecha de nacimiento
function establecerFechaMinimaNacimiento() {
    const fechaNacimientoInput = document.getElementById('nacimiento');
    fechaNacimientoInput.setAttribute('max', calcularFechaMinimaNacimiento());
}

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
    // Función para desplazar la página hacia arriba cuando se carga
    window.scrollTo(0, 0);
    establecerFechaMinimaNacimiento(); // Establecer la fecha mínima de nacimiento al cargar la página

    // Manejador de evento para el envío del formulario de registro
    document.getElementById('studentForm').addEventListener('submit', function(event) {
        event.preventDefault();

        // Validar que al menos una discapacidad esté seleccionada
        const discapacidades = document.querySelectorAll('input[name="tipo_discapacidad"]:checked');
        if (discapacidades.length === 0) {
            alert('Debe seleccionar al menos un tipo de discapacidad.');
            return;
        }

        // Validar el número de cédula
        const cedula = document.getElementById('cedula').value;
        if (!isValidCedula(cedula)) {
            alert('Número de cédula incorrecto. Inténtelo de nuevo.');
            return;
        }

        // Recopilación de datos del formulario de registros
        const nombre = document.getElementById('nombre').value;
        const apellido = document.getElementById('apellido').value;
        const nacimiento = document.getElementById('nacimiento').value;
        const phone = document.getElementById('phone').value;
        const genero = document.getElementById('genero').value;
        const direccion = document.getElementById('direccion').value;
        const programa = document.getElementById('programa').value;
        const ajustes = document.getElementById('ajustes').value;
        const nombreEmergencia = document.getElementById('contacto_emergencia').value;
        const telefonoEmergencia = document.getElementById('telefono_emergencia').value;
        const relacionContacto = document.getElementById('relacion_contacto').value;
        const otraRelacion = document.getElementById('otra_relacion').value;
        const otraDiscapacidad = document.getElementById('otra_discapacidad').value;

        // Redirigir al usuario a la página de inicio de sesión después de enviar el formulario
        window.location.href = "login.html";

        // Mostrar una alerta de éxito al usuario
        alert('¡Datos enviados con éxito!');
    });

    // Manejador de evento para el botón de Limpiar en el formulario de registro
    document.querySelector('button[type="reset"]').addEventListener('click', function(event) {
        // Mostrar un mensaje de confirmación
        const confirmacion = confirm('¿Está seguro de limpiar el formulario?');
        if (!confirmacion) {
            event.preventDefault(); // Evitar la acción predeterminada si el usuario elige "Cancelar"
        } else {
            window.scrollTo(0, 0); // Desplazar la página hacia arriba si el usuario elige "Aceptar"
        }
    });

    // Manejador de evento para la selección de relación con el contacto de emergencia
    document.getElementById('relacion_contacto').addEventListener('change', function() {
        const otroRelacionInput = document.getElementById('otra_relacion');
        const otroRelacionLabel = document.querySelector('label[for="otra_relacion"]');
        if (this.value === 'Otro') {
            otroRelacionLabel.style.display = 'block';
            otroRelacionInput.style.display = 'block';
            otroRelacionInput.setAttribute('required', 'required');
        } else {
            otroRelacionLabel.style.display = 'none';
            otroRelacionInput.style.display = 'none';
            otroRelacionInput.removeAttribute('required');
        }
    });

    // Manejador de evento para la selección de tipo de discapacidad "Otro"
    document.getElementById('otro').addEventListener('change', function() {
        const otraDiscapacidadInput = document.getElementById('otra_discapacidad');
        if (this.checked) {
            otraDiscapacidadInput.style.display = 'block';
            otraDiscapacidadInput.setAttribute('required', 'required');
        } else {
            otraDiscapacidadInput.style.display = 'none';
            otraDiscapacidadInput.removeAttribute('required');
        }
    });

    // Manejador de evento para desencadenar el cambio al cargar la página
    // Obtener el valor inicial de la relación con el contacto de emergencia
    const relacionContactoValue = document.getElementById('relacion_contacto').value;
    // Obtener el campo de entrada de otro relación
    const otroRelacionInput = document.getElementById('otra_relacion');
    const otroRelacionLabel = document.querySelector('label[for="otra_relacion"]');
    // Si el valor inicial es 'Otro', mostrar el campo de entrada de otro relación
    if (relacionContactoValue === 'Otro') {
        otroRelacionLabel.style.display = 'block';
        otroRelacionInput.style.display = 'block';
        otroRelacionInput.setAttribute('required', 'required');
    } else {
        // De lo contrario, ocultarlo
        otroRelacionLabel.style.display = 'none';
        otroRelacionInput.style.display = 'none';
        otroRelacionInput.removeAttribute('required');
    }

    // Verificar el estado inicial del checkbox "Otro" de tipo de discapacidad
    const otroCheckbox = document.getElementById('otro');
    if (otroCheckbox.checked) {
        document.getElementById('otra_discapacidad').style.display = 'block';
        document.getElementById('otra_discapacidad').setAttribute('required', 'required');
    }
});
