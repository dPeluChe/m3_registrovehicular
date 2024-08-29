import { savePlate } from './database.js';

let stream = null;

export function initPlateCapture() {
    const plateInput = document.getElementById('plateInput');
    const houseNumber = document.getElementById('houseNumber');
    const registerBtn = document.getElementById('registerBtn');
    const cameraBtn = document.getElementById('cameraBtn');
    const video = document.getElementById('video');
    const canvas = document.getElementById('canvas');
    const cameraOutput = document.getElementById('cameraOutput');

    plateInput.addEventListener('input', formatPlateInput);

    registerBtn.addEventListener('click', () => {
        const plate = plateInput.value.toUpperCase();
        const house = houseNumber.value;
        if (validatePlate(plate) && house) {
            const imageData = canvas.toDataURL('image/jpeg');
            savePlate(plate, house, imageData);
            showAlert('success', `Placa ${plate} registrada para la casa ${house}`);
            plateInput.value = '';
            houseNumber.value = '';
        } else {
            showAlert('danger', 'Placa inválida o número de casa faltante. La placa debe tener el formato XXXX-XXXX.');
        }
    });

    cameraBtn.addEventListener('click', () => {
        if (stream) {
            stopCamera();
        } else {
            openCamera();
        }
    });
}

function formatPlateInput(e) {
    let input = e.target;
    let value = input.value.replace(/[^A-Za-z0-9]/g, '').toUpperCase();
    if (value.length > 4) {
        value = value.slice(0, 4) + '-' + value.slice(4);
    }
    input.value = value;
}

function validatePlate(plate) {
    return /^[A-Z0-9]{4}-[A-Z0-9]{4}$/.test(plate);
}

async function openCamera() {
    const video = document.getElementById('video');
    const cameraBtn = document.getElementById('cameraBtn');
    const cameraOutput = document.getElementById('cameraOutput');

    try {
        stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
        video.srcObject = stream;
        video.style.display = 'block';
        cameraOutput.innerHTML = '';
        video.play();
        cameraBtn.textContent = 'Capturar';
    } catch (err) {
        console.error('Error al acceder a la cámara:', err);
        cameraOutput.innerHTML = 'Error al acceder a la cámara. Asegúrate de dar permisos.';
    }
}

function stopCamera() {
    const video = document.getElementById('video');
    const cameraBtn = document.getElementById('cameraBtn');
    const canvas = document.getElementById('canvas');
    const cameraOutput = document.getElementById('cameraOutput');

    if (stream) {
        stream.getTracks().forEach(track => track.stop());
        stream = null;
    }

    video.style.display = 'none';
    cameraBtn.textContent = 'Usar Cámara';

    // Capturar la imagen
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d').drawImage(video, 0, 0);
    
    // Mostrar la imagen capturada
    const img = document.createElement('img');
    img.src = canvas.toDataURL('image/jpeg');
    cameraOutput.innerHTML = '';
    cameraOutput.appendChild(img);

    // Aquí es donde normalmente se procesaría la imagen con OCR
    // Por ahora, solo mostraremos un mensaje
    showAlert('info', 'Imagen capturada. El procesamiento OCR se implementará más adelante.');
}

function showAlert(type, message) {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show mt-3`;
    alertDiv.role = 'alert';
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;
    document.getElementById('app').prepend(alertDiv);
    
    // Autocierre después de 3 segundos
    setTimeout(() => {
        alertDiv.remove();
    }, 3000);
}