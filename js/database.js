const STORAGE_KEY = 'vehiclePlates';

export function savePlate(plate, house, imageData = null) {
    try {
        const plates = getPlates();
        plates.push({
            plate,
            house,
            date: new Date().toISOString(),
            image: imageData
        });
        localStorage.setItem(STORAGE_KEY, JSON.stringify(plates));
    } catch (error) {
        console.error('Error al guardar la placa:', error);
        throw new Error('No se pudo guardar la placa. Verifica el almacenamiento del navegador.');
    }
}

export function getPlates() {
    try {
        const plates = localStorage.getItem(STORAGE_KEY);
        return plates ? JSON.parse(plates) : [];
    } catch (error) {
        console.error('Error al obtener las placas:', error);
        return [];
    }
}