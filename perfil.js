document.addEventListener('DOMContentLoaded', function () {
    // Simulación de obtención de datos del estudiante desde una fuente de datos (por ejemplo, un localStorage)
    const estudiante = {
        nombre: 'Juan',
        apellido: 'Pérez',
        nacimiento: '2000-01-01',
        cedula: '0102030405',
        phone: '0987654321',
        genero: 'masculino',
        direccion: 'Av. Siempre Viva 123',
        programa: 'salud',
        ajustes: 'Ninguno',
        nombreEmergencia: 'María Pérez',
        telefonoEmergencia: '0987654322',
        relacionContacto: 'Madre',
        otraRelacion: '',
        discapacidades: ['visual', 'auditiva'],
        otraDiscapacidad: ''
    };

    // Función para llenar el formulario con los datos del estudiante
    function llenarFormulario(estudiante) {
        document.getElementById('nombre').value = estudiante.nombre;
        document.getElementById('apellido').value = estudiante.apellido;
        document.getElementById('nacimiento').value = estudiante.nacimiento;
        document.getElementById('cedula').value = estudiante.cedula;
        document.getElementById('phone').value = estudiante.phone;
        document.getElementById('genero').value = estudiante.genero;
        document.getElementById('direccion').value = estudiante.direccion;
        document.getElementById('programa').value = estudiante.programa;
        document.getElementById('ajustes').value = estudiante.ajustes;
        document.getElementById('contacto_emergencia').value = estudiante.nombreEmergencia;
        document.getElementById('telefono_emergencia').value = estudiante.telefonoEmergencia;
        document.getElementById('relacion_contacto').value = estudiante.relacionContacto;
        document.getElementById('otra_relacion').value = estudiante.otraRelacion;

        estudiante.discapacidades.forEach(discapacidad => {
            document.getElementById(discapacidad).checked = true;
        });

        if (estudiante.otraDiscapacidad) {
            document.getElementById('otro').checked = true;
            document.getElementById('otra_discapacidad').value = estudiante.otraDiscapacidad;
            document.getElementById('otra_discapacidad').style.display = 'block';
        }
    }

    llenarFormulario(estudiante);

    // Manejador de evento para la selección de relación con el contacto de emergencia
    document.getElementById('relacion_contacto').addEventListener('change', function () {
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
    document.getElementById('otro').addEventListener('change', function () {
        const otraDiscapacidadInput = document.getElementById('otra_discapacidad');
        if (this.checked) {
            otraDiscapacidadInput.style.display = 'block';
            otraDiscapacidadInput.setAttribute('required', 'required');
        } else {
            otraDiscapacidadInput.style.display = 'none';
            otraDiscapacidadInput.removeAttribute('required');
        }
    });

    // Función para actualizar la información del estudiante (simulación)
    function actualizarEstudiante(event) {
        event.preventDefault();

        // Recopilación de datos del formulario de perfil
        const estudianteActualizado = {
            nombre: document.getElementById('nombre').value,
            apellido: document.getElementById('apellido').value,
            nacimiento: document.getElementById('nacimiento').value,
            cedula: document.getElementById('cedula').value,
            phone: document.getElementById('phone').value,
            genero: document.getElementById('genero').value,
            direccion: document.getElementById('direccion').value,
            programa: document.getElementById('programa').value,
            ajustes: document.getElementById('ajustes').value,
            nombreEmergencia: document.getElementById('contacto_emergencia').value,
            telefonoEmergencia: document.getElementById('telefono_emergencia').value,
            relacionContacto: document.getElementById('relacion_contacto').value,
            otraRelacion: document.getElementById('otra_relacion').value,
            discapacidades: Array.from(document.querySelectorAll('input[name="tipo_discapacidad"]:checked')).map(chk => chk.value),
            otraDiscapacidad: document.getElementById('otra_discapacidad').value
        };

        console.log('Datos actualizados:', estudianteActualizado);
        alert('¡Datos actualizados con éxito!');
    }

    // Manejador de evento para el envío del formulario de perfil
    document.getElementById('studentForm').addEventListener('submit', actualizarEstudiante);
});
