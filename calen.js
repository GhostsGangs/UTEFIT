const calendarBody = document.getElementById('calendarBody');
const reservationForm = document.getElementById('reservationForm');

let reservations = JSON.parse(localStorage.getItem('reservations')) || [];

function renderCalendar() {
    const today = new Date();
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    const daysInMonth = lastDayOfMonth.getDate();

    let date = 1;
    let html = '';

    for (let i = 0; i < 6; i++) {
        html += '<tr>';
        for (let j = 0; j < 7; j++) {
            if ((i === 0 && j < firstDayOfMonth.getDay()) || date > daysInMonth) {
            html += '<td></td>'; // Celda vacía antes del primer día y después del último día
            } else {
                const reservedClass = getReservedClass(date);
                html += <td class="${reservedClass}">${date}</td>;
                date++;
            }
        }
        html += '</tr>';
    }

    calendarBody.innerHTML = html;
}

function getReservedClass(day) {
    const reservation = reservations.find(reservation => {
        const reservationDay = new Date(reservation.date).getDate();
        return reservationDay === day;
    });

    if (reservation) {
        return reserved-${reservation.status};
    }

    return '';
}

function toggleReservationForm() {
    reservationForm.classList.toggle('hidden');
}

function submitReservation() {
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const petType = document.getElementById('petType').value;
    const reservationDate = document.getElementById('reservationDate').value;

  // Validar la información antes de proceder
    if (name && phone && petType && reservationDate) {
        const reservation = {
            name: name,
            phone: phone,
            petType: petType,
            date: reservationDate,
            status: 'pending' // Estado inicial como pendiente
    };

    reservations.push(reservation);

    // Actualizar visualización en el calendario (cambiar color de fondo)
    updateCalendar();

    // Almacenar en el almacenamiento local
    localStorage.setItem('reservations', JSON.stringify(reservations));

    // Otras acciones, como enviar la información a la base de datos
    // Aquí deberías realizar una petición AJAX o similar para interactuar con tu backend
    // En este ejemplo, simplemente mostraremos un mensaje en la consola
    console.log('Reserva enviada:', reservation);

    // Cerrar el formulario después de enviar la reserva
    toggleReservationForm();
    } else {
        alert('Por favor, complete todos los campos del formulario.');
    }
}

function updateCalendar() {
  // Lógica para actualizar el calendario con las reservas
  // Puedes recorrer las reservas y cambiar el color de fondo en las fechas correspondientes
    const cells = document.querySelectorAll('#calendarBody td');
    cells.forEach((cell, index) => {
        const day = index + 1; // Las celdas comienzan desde 1
        const reservedClass = getReservedClass(day);
        cell.className = reservedClass;
    });
}

function cancelReservation() {
  // Lógica para cancelar una reserva (si es necesario)
    toggleReservationForm();
}

// Inicializar el calendario
renderCalendar();