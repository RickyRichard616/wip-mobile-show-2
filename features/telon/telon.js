// 1. Declaramos las variables globales para que otras funciones puedan usarlas, pero NO les asignamos valor todavía.
let cortinas, soga, capaIzq, capaDer, texto;

// Función para obtener el 20% de la altura actual
const obtenerDistanciaObjetivo = () => window.innerHeight * 0.2;
const pantallaTelon = document.getElementById('contenedor-escena-telon');
const pantallaConfeti = document.getElementById('contenedor-escena-confeti');

let umbral = obtenerDistanciaObjetivo();
let tirando = false;
let startY = 0;

// Exportamos la lógica para que main.js la use
function inicializarEscenaTelon() {
    const miElemento = document.getElementById('contenedor-telones');
    
    if (miElemento) {
        
        // 2. ¡CRÍTICO! Asignamos los elementos del DOM AQUÍ ADENTRO, después del fetch.
        cortinas = document.getElementById('capa-cortinas');
        soga = document.querySelector('.cuerda-arrastre');
        capaIzq = document.getElementById('cortina-izquierda');
        capaDer = document.getElementById('cortina-derecha');
        texto = document.getElementById('guia-arrastre');

        // Ahora soga ya no es null y los eventos funcionarán perfectamente
        soga.addEventListener('dragstart', (e) => e.preventDefault());

        // Actualizar el umbral si cambia el tamaño de la pantalla
        window.addEventListener('resize', () => {
            umbral = obtenerDistanciaObjetivo();
        });

        soga.addEventListener('pointerdown', (e) => {
            tirando = true;
            soga.setPointerCapture(e.pointerId);
            startY = e.clientY;
            soga.classList.add('sin-balanceo');
            soga.style.transition = 'none';
        });

        soga.addEventListener('pointermove', (e) => {
            if (!tirando) return;

            const deltaY = e.clientY - startY;
            texto.classList.remove('reaparecer');
            texto.classList.add('desvanecer-rapido');

            // Movimiento fluido basado en el umbral dinámico
            if (deltaY > 0 && deltaY < umbral + 50) {
                soga.style.transform = `translateY(${deltaY}px)`;
                
                if (deltaY >= umbral) {
                    finalizarTirón();
                }
            }
        });
        
        soga.addEventListener('pointerup', cancelarTirón);
        soga.addEventListener('pointercancel', cancelarTirón);        
    }
}

function finalizarTirón() {
    tirando = false;

    capaIzq.classList.add('abrir-cortinas-izq');
    capaDer.classList.add('abrir-cortinas-der');
    
    soga.classList.remove('sin-balanceo');
    soga.style.transition = 'transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    soga.style.transform = `translateY(${umbral}px)`;

    setTimeout(() => {
        cortinas.classList.add('desvanecer');
    }, 3000);

    setTimeout(() => {
        document.dispatchEvent(new CustomEvent('musicaAmbiente'));
        document.dispatchEvent(new CustomEvent('musicaTeatro'));
        document.dispatchEvent(new CustomEvent('iniciarHistoria'));
    }, 8000);
}

function cancelarTirón() {
    if (!tirando) return;
    tirando = false;
    
    if (!capaIzq.classList.contains('abrir-cortinas-izq')) {
        soga.style.transition = 'transform 0.4s ease';
        soga.style.transform = `translateY(0)`;
        texto.classList.remove('desvanecer-rapido');
        texto.classList.add('reaparecer');
    }
}