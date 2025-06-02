// app.js - Lógica de interacción para WebAR

// Esperar a que el DOM esté cargado
document.addEventListener('DOMContentLoaded', function() {
    
    // Referencias a elementos
    const scene = document.querySelector('a-scene');
    const loader = document.getElementById('loader');
    const info = document.getElementById('info');
    const marker = document.querySelector('a-marker');
    const modelo = document.getElementById('modelo-3d');
    const particles = document.getElementById('particles');
    
    // Variables de estado
    let markerVisible = false;
    let modelClicked = false;
    let cameraInitialized = false;
    
    // Detectar si estamos en móvil
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    // Configuración mínima para mejor compatibilidad
    if (isMobile) {
        console.log('Dispositivo móvil detectado - usando configuración automática');
    }
    
    // Detectar cuando AR.js esté listo
    window.addEventListener('arjs-video-loaded', function() {
        console.log('Video AR cargado correctamente');
        cameraInitialized = true;
        loader.classList.add('hidden');
        updateInfoPanel('Cámara lista ✅ Busca el QR');
    });
    
    // Detectar cuando el video esté disponible
    const checkVideoReady = setInterval(() => {
        const video = document.querySelector('video');
        if (video && video.videoWidth > 0) {
            console.log('Stream de video detectado:', video.videoWidth + 'x' + video.videoHeight);
            cameraInitialized = true;
            loader.classList.add('hidden');
            updateInfoPanel('Cámara funcionando ✅');
            clearInterval(checkVideoReady);
        }
    }, 500);
    
    // Timeout para problemas de cámara
    setTimeout(() => {
        if (!cameraInitialized) {
            console.log('Problema de cámara detectado');
            loader.innerHTML = `
                <h3>Problema con la cámara</h3>
                <p>🔄 Intenta recargar la página</p>
                <p>📱 Permite el acceso a cámara</p>
                <button onclick="location.reload()" style="padding: 10px 20px; margin: 10px; background: #4CAF50; color: white; border: none; border-radius: 5px;">Recargar</button>
            `;
        }
    }, 6000);
    
    // Ocultar loader cuando AR esté listo (fallback)
    scene.addEventListener('loaded', function() {
        console.log('Escena AR cargada correctamente');
        setTimeout(() => {
            if (!cameraInitialized) {
                loader.classList.add('hidden');
            }
        }, 3000);
    });
    
    // Detectar cuando el marcador es visible/invisible
    marker.addEventListener('markerFound', function() {
        console.log('Marcador detectado!');
        markerVisible = true;
        updateInfoPanel('Marcador detectado ✅');
        
        // Activar partículas por un momento
        if (particles) {
            particles.setAttribute('particle-system', 'enabled', true);
            setTimeout(() => {
                particles.setAttribute('particle-system', 'enabled', false);
            }, 2000);
        }
    });
    
    marker.addEventListener('markerLost', function() {
        console.log('Marcador perdido');
        markerVisible = false;
        updateInfoPanel('Buscando marcador... 🔍');
    });
    
    // Interacción con el modelo
    if (modelo) {
        modelo.addEventListener('click', function() {
            console.log('Click en el modelo!');
            modelClicked = !modelClicked;
            
            if (modelClicked) {
                // Animación de salto
                modelo.setAttribute('animation__jump', {
                    property: 'position',
                    to: '0 1.5 0',
                    dur: 300,
                    easing: 'easeOutQuad'
                });
                
                setTimeout(() => {
                    modelo.setAttribute('animation__fall', {
                        property: 'position',
                        to: '0 0.5 0',
                        dur: 300,
                        easing: 'easeInQuad'
                    });
                }, 300);
                
                // Activar partículas
                if (particles) {
                    particles.setAttribute('particle-system', 'enabled', true);
                    setTimeout(() => {
                        particles.setAttribute('particle-system', 'enabled', false);
                    }, 1000);
                }
                
                updateInfoPanel('¡Modelo activado! 🎉');
                
                // Crear efecto de sonido con Web Audio API
                playBeep(800, 100);
                
            } else {
                updateInfoPanel('Modelo en reposo 😴');
                playBeep(400, 100);
            }
        });
    }
    
    // Función para crear sonidos simples con Web Audio API
    function playBeep(frequency, duration) {
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.value = frequency;
            oscillator.type = 'sine';
            
            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration / 1000);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + duration / 1000);
        } catch (e) {
            console.log('No se pudo reproducir el sonido:', e);
        }
    }
    
    // Actualizar panel de información
    function updateInfoPanel(message) {
        const statusP = document.createElement('p');
        statusP.style.margin = '5px 0';
        statusP.style.fontSize = '12px';
        statusP.style.opacity = '0.8';
        statusP.textContent = `📍 ${message}`;
        
        // Agregar al panel
        info.appendChild(statusP);
        
        // Eliminar después de 3 segundos
        setTimeout(() => {
            statusP.style.transition = 'opacity 0.5s';
            statusP.style.opacity = '0';
            setTimeout(() => statusP.remove(), 500);
        }, 3000);
    }
    
    // Detectar errores de cámara
    scene.addEventListener('camera-error', function(err) {
        console.error('Error de cámara:', err);
        loader.innerHTML = `
            <h3>Error al acceder a la cámara</h3>
            <p>Por favor, verifica los permisos y recarga la página</p>
            <button onclick="location.reload()" style="padding: 10px 20px; margin-top: 10px;">Recargar</button>
        `;
        loader.classList.remove('hidden');
    });
    
    // Gestión de orientación del dispositivo (para iOS)
    if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
        // iOS 13+ requiere permiso explícito
        const requestOrientationPermission = function() {
            DeviceOrientationEvent.requestPermission()
                .then(response => {
                    if (response == 'granted') {
                        console.log('Permiso de orientación concedido');
                    }
                })
                .catch(console.error);
        };
        
        // Solicitar permiso al primer toque
        window.addEventListener('touchend', requestOrientationPermission, { once: true });
    }
    
    if (!isMobile) {
        updateInfoPanel('Mejor experiencia en dispositivos móviles 📱');
    }
    
    // Manejo de visibilidad de la página
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            console.log('Aplicación en segundo plano');
        } else {
            console.log('Aplicación activa');
        }
    });
    
    // Log de información del sistema
    console.log('WebAR App iniciada');
    console.log('A-Frame version:', AFRAME.version);
    console.log('Dispositivo móvil:', isMobile);
    console.log('User Agent:', navigator.userAgent);
}); 