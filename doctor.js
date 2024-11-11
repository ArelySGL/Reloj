document.getElementById('doctorForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const doctorId = document.getElementById('doctorId').value;
    const patientId = document.getElementById('patientId').value;

    // Verificar si el doctorId corresponde a un médico registrado
    if (validateDoctor(doctorId)) {
        logAccess(doctorId);
        loadHealthRecord(patientId);  // Cargar el registro de salud con la clave correcta
    } else {
        alert('ID de médico no válido.');
    }
});

// Validar si el médico está registrado
function validateDoctor(doctorId) {
    // Obtener los registros de médicos desde localStorage
    const doctors = JSON.parse(localStorage.getItem('doctors')) || [];

    // Buscar el médico por su cédula profesional
    const doctor = doctors.find(doc => doc.license === doctorId);

    return doctor !== undefined;  // Retorna true si el médico está registrado
}

// Registrar el acceso del médico
function logAccess(doctorId) {
    const timestamp = new Date().toLocaleString();
    console.log(`El médico con cédula ${doctorId} accedió a la información el ${timestamp}`);
}

// Cargar el registro de salud del paciente
function loadHealthRecord(patientId) {
    // Obtener los registros de pacientes desde localStorage usando la clave correcta
    const records = JSON.parse(localStorage.getItem('healthRecords')) || [];  // Cambié a 'healthRecords'

    const patientRecord = document.getElementById('patientRecord');
    patientRecord.innerHTML = ''; // Limpiar el registro anterior

    // Buscar el registro del paciente por su ID
    const record = records.find(r => r.id === patientId);

    if (record) {
        // Mostrar el registro de salud del paciente
        patientRecord.innerHTML = `
            <strong>ID:</strong> ${record.id}<br>
            <strong>Nombre:</strong> ${record.name}<br>
            <strong>Edad:</strong> ${record.age}<br>
            <strong>Tipo de Sangre:</strong> ${record.bloodType}<br>
            <strong>Alergias:</strong> ${record.allergies}<br>
            <strong>Contacto de Emergencia:</strong> ${record.contact}<br>
            <strong>Condiciones Médicas:</strong> ${record.medicalConditions}<br>
            <strong>Medicamentos Actuales:</strong> ${record.currentMedications}<br>
            <strong>Peso:</strong> ${record.weight} kg<br>
            <strong>Altura:</strong> ${record.height} cm<br>
            <strong>Historial de Cirugías:</strong> ${record.surgeries}<br>
            <strong>Historial de Transfusiones:</strong> ${record.transfusions}<br>
        `;
    } else {
        patientRecord.innerHTML = 'Registro no encontrado.';
    }
}

// Función para agregar un paciente (esto debería hacerse desde el formulario de registro de salud)
function registerPatient(patientData) {
    let patientRecords = JSON.parse(localStorage.getItem('healthRecords')) || [];  // Usar la misma clave
    patientRecords.push(patientData);
    localStorage.setItem('healthRecords', JSON.stringify(patientRecords));
}

// Función para generar un ID único para el paciente
function generateUniqueId() {
    return 'ID-' + Math.floor(Math.random() * 1000000);
}

// Ejemplo de cómo registrar un paciente (esto es solo para propósitos de prueba)
function registerDummyPatient() {
    const patientData = {
        id: generateUniqueId(),
        name: 'Juan Pérez',
        age: 30,
        bloodType: 'O+',
        allergies: 'Ninguna',
        contact: '555-1234',
        medicalConditions: 'Hipertensión',
        currentMedications: 'Atenolol',
        weight: 70,
        height: 175,
        surgeries: 'Apendicectomía',
        transfusions: 'No'
    };

    registerPatient(patientData);
    console.log('Paciente registrado:', patientData);
}

// Llamada para registrar un paciente de prueba
registerDummyPatient();


