async function cargarModuloTelon() {
    const contenedor = document.getElementById('contenedor-escena-telon');
    
    // La ruta según tu jerarquía: features -> telon -> telon.html
    const ruta = './features/telon/telon.html';

    try {
        const respuesta = await fetch(ruta);
        
        if (!respuesta.ok) {
            throw new Error(`Error al cargar: ${respuesta.status}`);
        }
   
        const html = await respuesta.text();
        contenedor.innerHTML = html;
    
        // ¡AHORA el elemento ya existe! Llamamos a la lógica:
        if (typeof inicializarEscenaTelon === 'function') {
            inicializarEscenaTelon();
        }
    }catch (error) {
        console.error("Hubo un fallo en la inyección:", error);
    }
}

async function cargarModuloConfeti() {
    const contenedor = document.getElementById('contenedor-escena-confeti');
    
    // La ruta según tu jerarquía: features -> telon -> telon.html
    const ruta = './features/confeti/confeti.html';

    try {
        const respuesta = await fetch(ruta);
        
        if (!respuesta.ok) {
            throw new Error(`Error al cargar: ${respuesta.status}`);
        }
   
        const html = await respuesta.text();
        contenedor.innerHTML = html;
    
        // ¡AHORA el elemento ya existe! Llamamos a la lógica:
        if (typeof inicializarEscenaTelon === 'function') {
            inicializarEscenaConfeti();
        }
    }catch (error) {
        console.error("Hubo un fallo en la inyección:", error);
    }
}
// Puedes llamarla cuando se abra la cortina o al cargar la página
cargarModuloTelon();
cargarModuloConfeti();