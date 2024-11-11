document.getElementById('healthForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Obtener los valores del formulario
    const name = document.getElementById('name').value;
    const age = document.getElementById('age').value;
    const bloodType = document.getElementById('bloodType').value;
    const allergies = document.getElementById('allergies').value;
    const contact = document.getElementById('contact').value;
    const medicalConditions = document.getElementById('medicalConditions').value;
    const currentMedications = document.getElementById('currentMedications').value;
    const weight = document.getElementById('weight').value;
    const height = document.getElementById('height').value;
    const surgeries = document.getElementById('surgeries').value;
    const transfusions = document.getElementById('transfusions').value;

    // Crear un objeto para el registro de salud
    const healthRecord = {
        id: generateUniqueId(),
        name: name,
        age: age,
        bloodType: bloodType,
        allergies: allergies,
        contact: contact,
        medicalConditions: medicalConditions,
        currentMedications: currentMedications,
        weight: weight,
        height: height,
        surgeries: surgeries,
        transfusions: transfusions
    };

    // Obtener los registros de salud existentes desde localStorage
    let healthRecords = JSON.parse(localStorage.getItem('healthRecords')) || [];

    // Añadir el nuevo registro de salud al array
    healthRecords.push(healthRecord);

    // Guardar el nuevo registro en localStorage
    localStorage.setItem('healthRecords', JSON.stringify(healthRecords));

    // Limpiar el formulario
    document.getElementById('healthForm').reset();

    // Mostrar los registros de salud dinámicamente
    showHealthRecords();
});

function generateUniqueId() {
    return 'ID-' + Math.floor(Math.random() * 1000000);
}

// Función para mostrar los registros de salud
function showHealthRecords() {
    // Obtener los registros de salud desde localStorage
    const healthRecords = JSON.parse(localStorage.getItem('healthRecords')) || [];

    // Obtener el contenedor donde se mostrarán los registros
    const recordList = document.getElementById('recordList');
    recordList.innerHTML = '';  // Limpiar el listado actual

    // Recorrer el array de registros y crear un <li> para cada uno
    healthRecords.forEach(record => {
        const listItem = document.createElement('li');
        listItem.textContent = `ID: ${record.id}, Nombre: ${record.name}, Edad: ${record.age}, Tipo de Sangre: ${record.bloodType}, Alergias: ${record.allergies}, Contacto: ${record.contact}, Condiciones: ${record.medicalConditions}, Medicamentos: ${record.currentMedications}, Peso: ${record.weight}, Altura: ${record.height}, Cirugías: ${record.surgeries}, Transfusiones: ${record.transfusions}`;
        recordList.appendChild(listItem);
    });
}

// Llamar a la función para mostrar los registros de salud cuando la página cargue
showHealthRecords();
