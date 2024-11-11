document.getElementById('doctorRegisterForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Obtener los valores del formulario
    const doctorName = document.getElementById('doctorName').value;
    const doctorLicense = document.getElementById('doctorLicense').value;
    const university = document.getElementById('university').value;
    const specialty = document.getElementById('specialty').value;
    const contactInfo = document.getElementById('contactInfo').value;

    // Crear un objeto para el médico
    const doctorRecord = {
        name: doctorName,
        license: doctorLicense,
        university: university,
        specialty: specialty,
        contactInfo: contactInfo
    };

    // Obtener los registros de médicos existentes desde localStorage
    let doctors = JSON.parse(localStorage.getItem('doctors')) || [];

    // Comprobar si la cédula profesional ya existe
    const existingDoctor = doctors.find(doc => doc.license === doctorLicense);
    if (existingDoctor) {
        alert('Este médico ya está registrado con esta cédula profesional.');
        return;
    }

    // Añadir el nuevo médico al array de médicos
    doctors.push(doctorRecord);

    // Guardar el nuevo registro de médicos en localStorage
    localStorage.setItem('doctors', JSON.stringify(doctors));

    // Limpiar el formulario
    document.getElementById('doctorRegisterForm').reset();

    // Mostrar los médicos registrados dinámicamente
    showRegisteredDoctors();
});

// Función para mostrar médicos registrados
function showRegisteredDoctors() {
    // Obtener los médicos registrados desde localStorage
    const doctors = JSON.parse(localStorage.getItem('doctors')) || [];

    // Obtener el contenedor donde se mostrarán los médicos
    const doctorList = document.getElementById('doctorList');
    doctorList.innerHTML = '';  // Limpiar el listado actual

    // Recorrer el array de médicos y crear un <li> para cada uno
    doctors.forEach(doctor => {
        const listItem = document.createElement('li');
        listItem.textContent = `Dr(a). ${doctor.name} - Cédula: ${doctor.license} - ${doctor.specialty} - Universidad: ${doctor.university}`;
        doctorList.appendChild(listItem);
    });
}

// Llamar a la función para mostrar los médicos registrados cuando la página cargue
showRegisteredDoctors();
