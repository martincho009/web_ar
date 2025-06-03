# 🎯 WebAR con Marcador Hiro - Interactivo

Aplicación de Realidad Aumentada Web que muestra un modelo 3D interactivo sobre el marcador Hiro usando AR.js y A-Frame. El modelo se puede rotar y escalar con gestos táctiles.

## 🚀 Demo en vivo

👉 **[https://martincho009.github.io/web_ar/](https://martincho009.github.io/web_ar/)**

## ✅ Características

- 📱 **Compatible con móviles** (Android/iOS)
- 🎯 **Marcador Hiro** estándar de AR.js
- 🎨 **Modelo 3D interactivo** con controles táctiles
- 🎮 **Gestos:** Rotar con 1 dedo, escalar con pellizco
- 🔒 **HTTPS** requerido (GitHub Pages incluido)
- 📦 **Sin instalación** - funciona en el navegador

## 📋 Requisitos

### Para usar la app:
- 📱 Smartphone con cámara y pantalla táctil
- 🌐 Navegador moderno (Chrome, Firefox, Safari)
- 🖨️ Marcador Hiro impreso
- 💡 Buena iluminación

## 🎯 Cómo usar

1. **Imprime el marcador Hiro**
   - Abre [hiro-marker.html](https://martincho009.github.io/web_ar/hiro-marker.html)
   - Descarga o imprime el marcador
   - Tamaño mínimo: **8x8 cm** (mejor 10x10 cm)

2. **Abre la app en tu móvil**
   - Ve a: https://martincho009.github.io/web_ar/
   - Permite acceso a la cámara

3. **Interactúa con el modelo 3D**
   - Mantén distancia de 20-50 cm del marcador
   - **🎮 Controles táctiles:**
     - **1 dedo:** Arrastra para rotar el modelo
     - **2 dedos:** Pellizca para agrandar/achicar
   - ¡Explora tu modelo desde todos los ángulos!

## 🎮 Controles interactivos

### **Rotación:**
- Toca el modelo con **1 dedo** y arrastra
- Rota horizontal y verticalmente
- Responde en tiempo real

### **Escalado:**
- Usa **2 dedos** (pellizco/pinch)
- Escala entre 10% y 200% del tamaño original
- Mantiene las proporciones

### **Límites de seguridad:**
- Escala mínima: 0.1x (10%)
- Escala máxima: 2.0x (200%)
- Rotación suave sin trabas

## ⚠️ Importante - Solución de problemas

### ✅ Lo que FUNCIONA:
- **Versiones específicas de librerías:**
  ```html
  <script src="https://aframe.io/releases/0.9.2/aframe.min.js"></script>
  <script src="https://cdn.rawgit.com/jeromeetienne/AR.js/1.7.7/aframe/build/aframe-ar.js"></script>
  ```
- **Marcador Hiro** (más confiable que códigos QR)
- **Papel blanco mate** (sin brillos)
- **Buena iluminación** sin sombras
- **Pantalla táctil** para controles

### ❌ Problemas comunes:
1. **No detecta el marcador**
   - Limpia caché del navegador
   - Verifica tamaño del marcador (mínimo 8cm)
   - Prueba con Firefox si Chrome falla
   - Asegura que el papel esté plano

2. **Los gestos no funcionan**
   - Verifica que la pantalla táctil funcione
   - Espera a que aparezca el modelo primero
   - Toca directamente sobre el modelo 3D
   - Evita tocar fuera del área del modelo

3. **Cámara distorsionada**
   - Desactiva zoom del navegador
   - Cierra otras apps que usen cámara
   - Reinicia el navegador

4. **Modelo no aparece**
   - Verifica conexión a internet
   - Espera a que cargue completamente
   - Revisa permisos de cámara

## 🛠️ Desarrollo local

```bash
# Clonar repositorio
git clone https://github.com/martincho009/web_ar.git

# Servir con HTTPS (requerido para gestos táctiles)
# Usar cualquier servidor web con HTTPS
python -m http.server 8000
# Luego acceder via túnel HTTPS como ngrok
```

## 📁 Estructura del proyecto

```
web_ar/
├── index.html              # App principal con modelo interactivo
├── hiro-marker.html        # Página para imprimir marcador
├── assets/
│   └── base_basic_pbr.glb  # Modelo 3D
├── README.md               # Este archivo
└── TROUBLESHOOTING.md      # Guía detallada de problemas
```

## 🔧 Personalización

Para cambiar el modelo 3D:
1. Coloca tu modelo `.glb` o `.gltf` en `assets/`
2. Actualiza la referencia en `index.html`:
   ```html
   <a-asset-item id="modelo3d" src="assets/tu-modelo.glb"></a-asset-item>
   ```

### Ajustar controles:
```html
<!-- Cambiar límites de escala -->
<a-entity gesture-handler="minScale: 0.05; maxScale: 3">

<!-- Ajustar sensibilidad de rotación modificando el valor 0.5 -->
newRotation.y = this.startRotation.y + deltaX * 0.5;
```

## 📚 Recursos

- [AR.js Documentation](https://ar-js-org.github.io/AR.js-Docs/)
- [A-Frame Documentation](https://aframe.io/docs/)
- [A-Frame Extras - Gestos](https://github.com/donmccurdy/aframe-extras)
- [Modelos 3D gratuitos](https://sketchfab.com/)

## 🐛 Problemas conocidos

- Algunas versiones de Samsung Internet tienen problemas
- WebView en apps puede no funcionar correctamente
- Versiones nuevas de AR.js pueden tener problemas de detección
- **Gestos táctiles requieren HTTPS** para funcionar correctamente

## 💡 Tips para mejor experiencia

1. **Marcador estable:** Pega el marcador en una superficie plana
2. **Buena luz:** Evita sombras sobre el marcador
3. **Distancia óptima:** 30-40 cm funciona mejor
4. **Gestos suaves:** Movimientos lentos y controlados
5. **Un gesto a la vez:** No mezcles rotación y escalado

## 📝 Licencia

MIT License - Usa este código como quieras

---

💡 **Tip**: Si tienes problemas, revisa [TROUBLESHOOTING.md](TROUBLESHOOTING.md) para soluciones detalladas. 


https://au.gmented.com/app/marker/marker.php

