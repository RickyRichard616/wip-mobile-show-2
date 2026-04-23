document.addEventListener("DOMContentLoaded", () => {
    // Referencias
    const pInicio = document.getElementById('pantalla-inicio');
    const pButaca = document.getElementById('pantalla-butaca');
    const pFotos = document.getElementById('pantalla-fotos');
    const pHistoria = document.getElementById('pantalla-historia');
    const textoButaca = document.getElementById('texto-butaca');
    const btnRegalo = document.getElementById('btn-ver-regalo');
    const imgElement = document.getElementById('imagen-regalo');
    const textoFotos = document.getElementById('texto-durante-fotos');
    const textoHistoria = document.getElementById('texto-durante-historia');
    
    const esperar = (ms) => new Promise(res => setTimeout(res, ms));

    const listaFotos = [
        "resources/images/regalo/AyJ.png",
        "resources/images/regalo/AyJ1.png",
        "resources/images/regalo/AyJ2.png",
        "resources/images/regalo/AmorDeNile.jpg",
        "resources/images/regalo/AmorDeNile1.png",
        "resources/images/regalo/emilieyjason.png",
        "resources/images/regalo/emilieyjason1.png",
        "resources/images/regalo/rb1.png",
        "resources/images/regalo/mc1.png"
    ];

    const historia = [
        "Había una vez una pequeña princesa que llevaba el sol en los bolsillos. Era inteligente, audaz y veía el mundo con ojos diferentes.",
        "Pero a veces, los demás temen lo que brilla demasiado. En los pasillos del reino, las sombras intentaban apagar su risa.",
        "Se burlaban de lo que no podían imitar. La princesa creció, y con ella crecieron las esperanzas de cristal.",
        "Se enamoró, confió y entregó su corazón, pero a menudo le devolvieron piezas rotas. Buscó refugio en los muros del castillo...",
        "...pero la Reina tenía un decreto: 'No hay tiempo para el cansancio'. 'Sonríe para el banquete', 'Camina firme para la corte'.",
        "La corona empezó a pesar, no por ser de oro, sino por estar hecha de expectativas ajenas y silencios obligados.",
        "Entonces aprendió a decir que todo estaba bien... hasta que empezó a creérselo ella misma, ocultando el invierno en su pecho.",
        "Pero el tiempo es un visitante que no pide permiso. Un día, el trono del Rey quedó vacío y el castillo se llenó de silencio.",
        "La princesa lloró hasta quedarse sin lágrimas. El peso de la corona se volvió insoportable y el dolor se instaló en su habitación...",
        "...como un huésped que se niega a marcharse. Hoy, esa princesa sigue cansada y el camino le parece una montaña muy alta.",
        "Pero el narrador sabe algo que ella olvida: su fuerza no está en no sentir el dolor, sino en seguir en pie a pesar de él.",
        "Fran, la felicidad no es un lugar al que se llega, es una obra que se sigue escribiendo. Y no tienes que actuar sola."
    ];

    /*
    const historia = [
        "Había una vez una pequeña princesa que llevaba el sol en los bolsillos. Era inteligente, audaz y veía el mundo con ojos que otros no entendían.",
        "Pero a veces, los demás temen lo que brilla demasiado. En los pasillos del reino, las sombras intentaban apagar su risa, burlándose de lo que no podían imitar.",
        "La princesa creció, y con ella crecieron las esperanzas de cristal. Se enamoró, confió y entregó su corazón, pero a menudo le devolvieron piezas rotas.",
        "Buscó refugio en los muros del castillo, pero la Reina tenía un decreto: 'No hay tiempo para el cansancio'. 'Sonríe para el banquete', 'Camina firme para la corte'.",
        "La corona empezó a pesar, no por ser de oro, sino por estar hecha de expectativas ajenas.",
        "Entonces aprendió a decir que todo estaba bien... hasta que empezó a creérselo ella misma, ocultando el invierno que nacía en su pecho.",
        "Pero el tiempo es un visitante que no pide permiso. Un día, el trono del Rey quedó vacío y el castillo se llenó de un silencio ensordecedor.",
        "La princesa lloró hasta quedarse sin lágrimas. El peso de la corona se volvió insoportable y el dolor se instaló en su habitación como un huésped que se niega a marcharse.",
        "Hoy, esa princesa sigue cansada. Sus manos tiemblan a veces y el camino le parece una montaña demasiado alta.",
        "Pero el narrador, que la observa desde la primera fila, sabe algo que ella olvida: su fuerza no está en no sentir el dolor, sino en seguir en pie a pesar de él.",
        "Fran, la felicidad no es un lugar al que se llega, es una obra que se sigue escribiendo. Y no tienes que actuar sola."
    ];
    */


    // TRANSICIÓN 1: TICKET -> BUTACA
    document.getElementById('ticket-entrada').addEventListener('click', async () => {

        document.dispatchEvent(new CustomEvent('musicaAmbiente'));

        pInicio.classList.replace('visible', 'invisible');
        await esperar(2000);
        pButaca.classList.replace('invisible', 'oculto-total');
        
        pButaca.classList.replace('oculto-total', 'invisible');
        await esperar(50);
        pButaca.classList.remove('invisible');

        // Secuencia de diálogo en la butaca
        await esperar(5000);
        textoButaca.classList.add('invisible');
        await esperar(1000);
        
        textoButaca.innerText = '"Por cierto, parece que alguien dejó algo en tu butaca. ¿Quieres ver qué es?"';
        textoButaca.classList.remove('invisible');
        
        await esperar(3000);
        btnRegalo.classList.remove('invisible');
        btnRegalo.classList.add('fade-in');
    });

    // TRANSICIÓN 2: BUTACA -> REGALO
    btnRegalo.addEventListener('click', async () => {
        pButaca.classList.add('invisible');
        await esperar(4000);
        pButaca.classList.add('oculto-total');
        pFotos.classList.remove('oculto-total');
        
        // Aquí llamas a tu función de Slideshow que ya optimizamos
        iniciarSlideshow(); 
    });

    async function iniciarSlideshow() {
        let indexActual = 0; // Cambiado a 0 a menos que necesites saltar las primeras fotos
        
        // Configuración inicial de visibilidad
        textoFotos.innerText = '"Míralas bien. Cada una es un recordatorio de que tu voz —esa voz tan bella que tienes— merece ser escuchada, y que tu presencia es el regalo más grande para quienes te rodeamos."';
        imgElement.style.transition = 'opacity 2s ease';
        
        while (indexActual < listaFotos.length) {
            // 1. Preparar salida de la imagen anterior
            imgElement.classList.add('invisible');
            
            // 2. Cambiar fuente y esperar carga
            imgElement.src = listaFotos[indexActual];
            
            // Esperamos a que la imagen cargue realmente antes de mostrarla
            await new Promise(resolve => {
                imgElement.onload = resolve;
            });

            // 3. Efecto de entrada (Fade In)
            await esperar(50);
            
            pFotos.classList.remove('invisible');
            textoFotos.classList.remove('invisible');
            imgElement.classList.remove('invisible');

            // 4. Tiempo de exposición de la foto
            await esperar(3000); 

            // 5. Efecto de salida (Fade Out)
            imgElement.classList.add('invisible');
            await esperar(1500);

            indexActual++;
        }

        terminarSlideshow();
    }

    function terminarSlideshow() {
        pFotos.classList.add('invisible');

        setTimeout(() => {
            pFotos.classList.replace('invisible', 'oculto-total');
            pantallaTelon.style.display = 'flex';
            pantallaTelon.style.transition = 'opacity 3s, scale 3s';
        }, 1500);

        setTimeout(() => {
            pantallaTelon.style.opacity = 1;
            pantallaTelon.style.scale = 1;
        }, 2000);
    }

    document.addEventListener('iniciarHistoria', async () => {
        pantallaTelon.style.display = 'none';

        iniciarHistoria(); 
    });

    async function iniciarHistoria() {
        let indexActual = 0; // Cambiado a 0 a menos que necesites saltar las primeras fotos

        textoHistoria.style.transition = 'opacity 2s ease';
        pHistoria.classList.remove('oculto-total');
        
        while (indexActual < historia.length) {
            // 1. Preparar salida de la imagen anterior
            textoHistoria.classList.add('invisible');
            
            // 2. Cambiar fuente y esperar carga
            textoHistoria.textContent = historia[indexActual];

            // 3. Efecto de entrada (Fade In)
            await esperar(50);
            
            pHistoria.classList.remove('invisible');
            textoHistoria.classList.remove('invisible');

            await esperar(9000); 

            // 5. Efecto de salida (Fade Out)
            textoHistoria.classList.add('invisible');
            await esperar(2000);

            indexActual++;
        }

        terminarHistoria();
    }

    function terminarHistoria() {
        setTimeout(() => {
            pHistoria.classList.add('invisible');
            
            pantallaConfeti.style.display = 'flex';
            pantallaConfeti.style.transition = 'opacity 5s';
        }, 1500);

        setTimeout(() => {
            pHistoria.classList.replace('invisible', 'oculto-total');
            pantallaConfeti.style.opacity = 1;
            document.dispatchEvent(new CustomEvent('musicaTeatro'));
            document.dispatchEvent(new CustomEvent('sonidoConfeti'));
        }, 5000);
    }
});