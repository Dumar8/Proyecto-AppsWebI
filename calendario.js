document.addEventListener('DOMContentLoaded', function() {
    var selectedEvent;

    $('#calendar').fullCalendar({
        header: {
            left: 'prev,next today',
            center: 'title',
            right: 'month,agendaWeek,agendaDay'
        },
        locale: 'es', // Establecer el idioma a español
        editable: true,
        eventLimit: true, // allow "more" link when too many events
        events: [
            {
                title: 'Evento 1',
                start: '2024-05-25'
            },
            {
                title: 'Evento 2',
                start: '2024-05-26',
                end: '2024-05-28'
            },
            {
                title: 'Evento 3',
                start: '2024-06-01T10:30:00',
                end: '2024-06-01T12:30:00'
            }
        ],
        eventClick: function(event) {
            // Mostrar el modal para editar evento
            $('#event-title').val(event.title);
            $('#event-start').val(moment(event.start).format('YYYY-MM-DDTHH:mm'));
            $('#event-end').val(event.end ? moment(event.end).format('YYYY-MM-DDTHH:mm') : '');
            $('#delete-event').show();
            $('#event-modal').modal();
            selectedEvent = event;
        },
        dayClick: function(date, jsEvent, view) {
            // Mostrar el modal para agregar evento
            $('#event-start').val(date.format('YYYY-MM-DDTHH:mm'));
            $('#event-end').val('');
            $('#event-title').val('');
            $('#delete-event').hide();
            $('#event-modal').modal();
            selectedEvent = null;
        }
    });

    // Manejar el envío del formulario de evento
    $('#event-form').on('submit', function(event) {
        event.preventDefault();

        var title = $('#event-title').val();
        var start = $('#event-start').val();
        var end = $('#event-end').val();

        if (selectedEvent) {
            // Actualizar evento existente
            selectedEvent.title = title;
            selectedEvent.start = start;
            selectedEvent.end = end ? end : null;
            $('#calendar').fullCalendar('updateEvent', selectedEvent);
        } else {
            // Agregar nuevo evento
            if (title && start) {
                $('#calendar').fullCalendar('renderEvent', {
                    title: title,
                    start: start,
                    end: end ? end : null
                }, true); // make the event "stick"
            }
        }

        $.modal.close();
    });

    // Manejar la eliminación del evento
    $('#delete-event').on('click', function() {
        if (selectedEvent) {
            $('#calendar').fullCalendar('removeEvents', selectedEvent._id);
            $.modal.close();
        }
    });
});
