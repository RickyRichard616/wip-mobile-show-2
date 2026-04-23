//-----------------------------------------------
// CONFIGURACIÓN Y RECURSOS
//-----------------------------------------------

const configAudio = {
    musicaTeatro: 0.2,
    sonidoConfeti: 0.3,
    musicaAmbiente: 0.1
};

// Mapa para rastrear los intervalos activos de cada audio y evitar que se pisen
const fadeIntervals = new Map();

const musicaTeatro = new Audio('https://cdn.pixabay.com/audio/2026/02/22/audio_6f2ea37e9a.mp3');
const sonidoConfeti = new Audio('https://cdn.pixabay.com/audio/2025/04/03/audio_8e52d5a127.mp3');
const musicaAmbiente = new Audio('https://cdn.pixabay.com/audio/2024/03/19/audio_0926f80b30.mp3');

// Configuración inicial
[musicaTeatro, sonidoConfeti, musicaAmbiente].forEach(a => {
    a.loop = true;
    a.volume = 0; // Siempre empezamos en 0 para que el primer fade sea limpio
});

//-----------------------------------------------
// MOTORES DE AUDIO
//-----------------------------------------------

function reproducirSonido(music, nombre) {
    const volumenBase = configAudio[nombre] || 0.5;
    music.volume = volumenBase;
    music.currentTime = 0;
    music.play();
}

/**
 * Control de volumen suave (Fade In / Fade Out)
 * @param {HTMLAudioElement} music - El objeto de audio
 * @param {string} nombre - La clave en configAudio
 */
function toggleMusicaLento(music, nombre) {
    const volumenObjetivo = configAudio[nombre] || 0.5;
    const tiempoFrecuencia = 30; // 30ms para una transición ultra fluida
    const incremento = 0.001;     // Paso de volumen por cada tick

    // 1. Limpiar cualquier transición que ya esté ocurriendo en este audio
    if (fadeIntervals.has(music)) {
        clearInterval(fadeIntervals.get(music));
    }

    if (music.paused) {
        // --- LÓGICA DE FADE IN ---
        music.volume = 0;
        music.play().catch(e => console.warn("Bloqueo de reproducción: se requiere interacción.", e));

        const interval = setInterval(() => {
            if (music.volume < volumenObjetivo) {
                // Sumamos sin pasarnos del objetivo
                music.volume = Math.min(volumenObjetivo, music.volume + incremento);
            } else {
                detenerIntervalo(music);
            }
        }, tiempoFrecuencia);
        
        fadeIntervals.set(music, interval);

    } else {
        // --- LÓGICA DE FADE OUT ---
        const interval = setInterval(() => {
            if (music.volume > 0.01) {
                // Restamos sin bajar de 0
                music.volume = Math.max(0, music.volume - incremento);
            } else {
                music.pause();
                music.currentTime = 0;
                detenerIntervalo(music);
            }
        }, tiempoFrecuencia);

        fadeIntervals.set(music, interval);
    }
}

// Función auxiliar para limpiar el mapa de intervalos
function detenerIntervalo(music) {
    clearInterval(fadeIntervals.get(music));
    fadeIntervals.delete(music);
}

//-----------------------------------------------
// LÓGICA DE EVENTOS (Intacta como pediste)
//-----------------------------------------------

document.addEventListener('musicaTeatro', () => toggleMusicaLento(musicaTeatro, 'musicaTeatro'));
document.addEventListener('sonidoConfeti', () => toggleMusicaLento(sonidoConfeti, 'sonidoConfeti'));
document.addEventListener('musicaAmbiente', () => toggleMusicaLento(musicaAmbiente, 'musicaAmbiente'));