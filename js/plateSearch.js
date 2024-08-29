import { getPlates } from './database.js';

export function initPlateSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchPlateBtn = document.getElementById('searchPlateBtn');
    const searchResults = document.getElementById('searchResults');

    searchPlateBtn.addEventListener('click', () => {
        try {
            const searchTerm = searchInput.value.toUpperCase();
            const plates = getPlates();
            const filteredPlates = plates.filter(plate => {
                return (plate && plate.plate && plate.plate.includes(searchTerm)) ||
                       (plate && plate.house && plate.house.toString().includes(searchTerm));
            });
            displayResults(filteredPlates);
        } catch (error) {
            console.error('Error en la búsqueda:', error);
            displayError('Ocurrió un error durante la búsqueda. Por favor, intenta de nuevo.');
        }
    });
}

function displayResults(plates) {
    const searchResults = document.getElementById('searchResults');
    if (plates.length === 0) {
        searchResults.innerHTML = '<p class="text-muted">No se encontraron resultados.</p>';
    } else {
        searchResults.innerHTML = `
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th>Número de Casa</th>
                        <th>Placa</th>
                        <th>Fecha de Registro</th>
                        <th>Imagen</th>
                    </tr>
                </thead>
                <tbody>
                    ${plates.map(plate => `
                        <tr>
                            <td>${plate.house || 'N/A'}</td>
                            <td>${plate.plate || 'N/A'}</td>
                            <td>${plate.date ? new Date(plate.date).toLocaleString() : 'N/A'}</td>
                            <td>${plate.image ? `<img src="${plate.image}" alt="Placa" style="max-width: 150px; max-height: 150px;">` : 'N/A'}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;
    }
}

function displayError(message) {
    const searchResults = document.getElementById('searchResults');
    searchResults.innerHTML = `<p class="text-danger">${message}</p>`;
}