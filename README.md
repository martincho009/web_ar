# 🎯 WebAR con Marcador Hiro

Aplicación de Realidad Aumentada Web que muestra un modelo 3D sobre el marcador Hiro usando AR.js y A-Frame.

## 🚀 Demo en vivo

👉 **[https://martincho009.github.io/web_ar/](https://martincho009.github.io/web_ar/)**

## ✅ Características

- 📱 **Compatible con móviles** (Android/iOS)
- 🎯 **Marcador Hiro** estándar de AR.js
- 🎨 **Modelo 3D** con animación de rotación
- 🔒 **HTTPS** requerido (GitHub Pages incluido)
- 📦 **Sin instalación** - funciona en el navegador

## 📋 Requisitos

### Para usar la app:
- 📱 Smartphone con cámara
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

3. **Apunta al marcador**
   - Mantén distancia de 20-50 cm
   - Asegura buena iluminación
   - ¡Verás el modelo 3D aparecer!

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

### ❌ Problemas comunes:
1. **No detecta el marcador**
   - Limpia caché del navegador
   - Verifica tamaño del marcador (mínimo 8cm)
   - Prueba con Firefox si Chrome falla
   - Asegura que el papel esté plano

2. **Cámara distorsionada**
   - Desactiva zoom del navegador
   - Cierra otras apps que usen cámara
   - Reinicia el navegador

3. **Modelo no aparece**
   - Verifica conexión a internet
   - Espera a que cargue completamente
   - Revisa permisos de cámara

## 🛠️ Desarrollo local

```bash
# Clonar repositorio
git clone https://github.com/martincho009/web_ar.git

# Servir con HTTPS (requerido)
# Opción 1: Python
python server.py

# Opción 2: Node.js
npm install
node server-node.js
```

## 📁 Estructura del proyecto

```
web_ar/
├── index.html              # App principal
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

## 📚 Recursos

- [AR.js Documentation](https://ar-js-org.github.io/AR.js-Docs/)
- [A-Frame Documentation](https://aframe.io/docs/)
- [Modelos 3D gratuitos](https://sketchfab.com/)

## 🐛 Problemas conocidos

- Algunas versiones de Samsung Internet tienen problemas
- WebView en apps puede no funcionar
- Versiones nuevas de AR.js pueden tener problemas de detección

## 📝 Licencia

MIT License - Usa este código como quieras

---

💡 **Tip**: Si tienes problemas, revisa [TROUBLESHOOTING.md](TROUBLESHOOTING.md) para soluciones detalladas. 