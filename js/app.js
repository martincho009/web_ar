// app.js - Optimizado SOLO para dispositivos móviles

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
    
    console.log('WebAR iniciado - optimizado para móviles');
    
    // Eliminar cualquier elemento VR que aparezca dinámicamente
    const removeVRElements = () => {
        const vrElements = document.querySelectorAll('.a-enter-vr, .a-enter-vr-button, .a-orientation-modal, .a-enter-ar-button, .rs-base');
        vrElements.forEach(el => {
            if (el) {
                el.style.display = 'none';
                el.style.visibility = 'hidden';
                el.remove();
            }
        });
    };
    
    // Ejecutar inmediatamente y cada segundo por si aparecen elementos VR
    removeVRElements();
    setInterval(removeVRElements, 1000);
    
    // Observer para eliminar elementos VR que aparezcan dinámicamente
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            mutation.addedNodes.forEach((node) => {
                if (node.nodeType === 1) { // Element node
                    if (node.classList && (
                        node.classList.contains('a-enter-vr') ||
                        node.classList.contains('a-enter-vr-button') ||
                        node.classList.contains('a-orientation-modal') ||
                        node.classList.contains('rs-base')
                    )) {
                        node.remove();
                    }
                }
            });
        });
    });
    
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
    
    // Prevenir zoom en móviles
    document.addEventListener('touchstart', function(e) {
        if (e.touches.length > 1) {
            e.preventDefault();
        }
    }, { passive: false });
    
    let lastTouchEnd = 0;
    document.addEventListener('touchend', function(e) {
        const now = (new Date()).getTime();
        if (now - lastTouchEnd <= 300) {
            e.preventDefault();
        }
        lastTouchEnd = now;
    }, false);
    
    // Orientación de pantalla
    function handleOrientationChange() {
        setTimeout(() => {
            // Forzar recalculo de dimensiones
            if (scene && scene.resize) {
                scene.resize();
            }
        }, 500);
    }
    
    window.addEventListener('orientationchange', handleOrientationChange);
    window.addEventListener('resize', handleOrientationChange);
    
    // Detectar cuando AR.js esté listo
    window.addEventListener('arjs-video-loaded', function() {
        console.log('Video AR cargado - móvil');
        cameraInitialized = true;
        loader.classList.add('hidden');
        updateInfoPanel('Cámara lista ✅');
    });
    
    // Detectar stream de video
    const checkVideoReady = setInterval(() => {
        const video = document.querySelector('video');
        if (video && video.videoWidth > 0) {
            console.log('Stream móvil:', video.videoWidth + 'x' + video.videoHeight);
            cameraInitialized = true;
            loader.classList.add('hidden');
            clearInterval(checkVideoReady);
        }
    }, 300);
    
    // Timeout para problemas
    setTimeout(() => {
        if (!cameraInitialized) {
            loader.innerHTML = `
                <h3>⚠️ Problema de cámara</h3>
                <p>Permite acceso a la cámara</p>
                <button onclick="location.reload()" style="padding: 12px 24px; margin: 15px; background: #4CAF50; color: white; border: none; border-radius: 8px; font-size: 14px;">🔄 Reintentar</button>
            `;
        }
    }, 5000);
    
    // Carga de escena (fallback)
    scene.addEventListener('loaded', function() {
        console.log('Escena cargada');
        setTimeout(() => {
            if (!cameraInitialized) {
                loader.classList.add('hidden');
            }
        }, 2000);
    });
    
    // Detección de marcador
    marker.addEventListener('markerFound', function() {
        console.log('🎯 Marcador detectado!');
        markerVisible = true;
        updateInfoPanel('Marcador detectado ✅');
        
        if (particles) {
            particles.setAttribute('particle-system', 'enabled', true);
            setTimeout(() => {
                particles.setAttribute('particle-system', 'enabled', false);
            }, 1500);
        }
    });
    
    marker.addEventListener('markerLost', function() {
        console.log('Marcador perdido');
        markerVisible = false;
        updateInfoPanel('Busca el marcador Hiro 🔍');
    });
    
    // Interacción con modelo
    if (modelo) {
        modelo.addEventListener('click', function() {
            console.log('🎮 Click en modelo!');
            modelClicked = !modelClicked;
            
            if (modelClicked) {
                modelo.setAttribute('animation__jump', {
                    property: 'position',
                    to: '0 1.5 0',
                    dur: 250,
                    easing: 'easeOutQuad'
                });
                
                setTimeout(() => {
                    modelo.setAttribute('animation__fall', {
                        property: 'position',
                        to: '0 0.5 0',
                        dur: 250,
                        easing: 'easeInQuad'
                    });
                }, 250);
                
                if (particles) {
                    particles.setAttribute('particle-system', 'enabled', true);
                    setTimeout(() => {
                        particles.setAttribute('particle-system', 'enabled', false);
                    }, 800);
                }
                
                updateInfoPanel('¡Modelo activado! 🎉');
                playBeep(800, 80);
                
            } else {
                updateInfoPanel('Modelo en reposo 😴');
                playBeep(400, 80);
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
    console.log('Dispositivo móvil:', true);
    console.log('User Agent:', navigator.userAgent);
}); 