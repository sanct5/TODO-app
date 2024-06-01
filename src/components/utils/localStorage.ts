// Eliminar un dato del localStorage
export const deleteLocalStorage = (key: string) => {
    localStorage.removeItem(key);
}

// Guarda los datos en localStorage con una hora de expiración
export const saveWithExpiry = (key: string, data: any, expiryInMinutes: number) => {
    const item = {
        data: data,
        expiry: new Date().getTime() + expiryInMinutes * 60 * 1000, // en milisegundos
    };
    localStorage.setItem(key, JSON.stringify(item));
};

// Obtiene los datos de localStorage y verifica si han expirado
export const getWithExpiry = (key: string) => {
    const itemStr = localStorage.getItem(key);

    // Si no hay datos, retorna null
    if (!itemStr) {
        return null;
    }

    const item = JSON.parse(itemStr);
    const now = new Date().getTime();

    // Si no hay tiempo de expiración, retorna null
    if (!item.expiry) {
        return null;
    }

    // Compara la hora actual con la hora de expiración
    if (now > item.expiry) {
        // Si los datos han expirado, los borra y retorna null
        localStorage.removeItem(key);
        return null;
    }
    return item.data;
};

// Guarda los datos en localStorage sin expiración
export const saveWithouExpiry = (key: string, data: any) => {
    const item = { 
        data: data
    };
    localStorage.setItem(key, JSON.stringify(item));
};

// Obtiene los datos de localStorage sin verificar si han expirado
export const getWithoutExpiry = (key: string) => {
    const itemStr = localStorage.getItem(key);

    // Si no hay datos, retorna null
    if (!itemStr) {
        return null;
    }

    const item = JSON.parse(itemStr);
    return item.data;
};