import { initPlateCapture } from './plateCapture.js';
import { initPlateSearch } from './plateSearch.js';

const app = document.getElementById('app');
const captureBtn = document.getElementById('captureBtn');
const searchBtn = document.getElementById('searchBtn');

function showCapturePage() {
    app.innerHTML = `
        <h2>Captura de Placa</h2>
        <div class="mb-3">
            <input type="text" id="plateInput" class="form-control" maxlength="9" placeholder="Ingrese la placa (XXXX-XXXX)">
        </div>
        <div class="mb-3">
            <input type="text" id="houseNumber" class="form-control" placeholder="Número de casa">
        </div>
        <button id="registerBtn" class="btn btn-success">Registrar</button>
        <button id="cameraBtn" class="btn btn-info">Usar Cámara</button>
        <video id="video" class="mt-3" style="display:none;"></video>
        <canvas id="canvas" style="display:none;"></canvas>
        <div id="cameraOutput" class="mt-3"></div>
    `;
    initPlateCapture();
}

function showSearchPage() {
    app.innerHTML = `
        <h2>Búsqueda de Placas</h2>
        <div class="mb-3">
            <input type="text" id="searchInput" class="form-control" placeholder="Buscar por placa o número de casa...">
        </div>
        <button id="searchPlateBtn" class="btn btn-primary">Buscar</button>
        <div id="searchResults" class="mt-3"></div>
    `;
    initPlateSearch();
}

function init() {
    console.log('Inicializando la aplicación');
    captureBtn.addEventListener('click', () => {
        console.log('Botón de captura clickeado');
        showCapturePage();
    });
    searchBtn.addEventListener('click', () => {
        console.log('Botón de búsqueda clickeado');
        showSearchPage();
    });

    console.log('Mostrando página de captura inicial');
    showCapturePage();
}

// Asegurarse de que el DOM esté completamente cargado antes de inicializar
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM cargado, llamando a init()');
    init();
});