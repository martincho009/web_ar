# WebAR con Marcadores QR - AR.js + A-Frame

Una aplicación de Realidad Aumentada Web (WebAR) que funciona directamente en el navegador móvil sin necesidad de instalar apps. Utiliza AR.js y A-Frame para mostrar modelos 3D interactivos sobre marcadores.

## 🚀 Demo en Vivo

Para probar la aplicación:

1. **Abre la aplicación** en tu navegador móvil (se requiere HTTPS)
2. **Permite el acceso a la cámara** cuando se te solicite
3. **Apunta la cámara al marcador Hiro** (ver abajo)
4. **¡Disfruta de la experiencia AR!** Toca el modelo para interactuar

## 📱 Características

- ✅ **100% Web** - No requiere instalación de apps
- ✅ **Multiplataforma** - Funciona en Android y iOS
- ✅ **Interactivo** - Toca el modelo 3D para activar animaciones
- ✅ **Ligero** - Carga rápida y rendimiento optimizado
- ✅ **Open Source** - Basado en AR.js y A-Frame

## 🎯 Marcador AR

Esta aplicación utiliza el marcador **Hiro** por defecto. Puedes:

1. **Descargarlo aquí**: [Marcador Hiro PDF](https://raw.githubusercontent.com/AR-js-org/AR.js/master/data/images/hiro.png)
2. **Imprimirlo** en papel (recomendado tamaño A4)
3. **O mostrarlo en otra pantalla**

### Crear tu propio marcador personalizado

Para usar un marcador personalizado (por ejemplo, incrustado en un código QR):

1. Visita el [generador de marcadores AR.js](https://ar-js-org.github.io/AR.js/three.js/examples/marker-training/examples/generator.html)
2. Sube tu imagen (logo o diseño simple en blanco y negro)
3. Descarga el archivo `.patt` generado
4. Colócalo en la carpeta `assets/`
5. Actualiza el HTML cambiando:
   ```html
   <a-marker type="pattern" url="assets/tu-marcador.patt">
   ```

## 🛠️ Instalación Local

### Requisitos
- Un servidor web local (para servir HTTPS)
- Navegador móvil moderno con cámara

### Pasos

1. **Clona o descarga** este repositorio

2. **Inicia un servidor local**:
   ```bash
   # Con Node.js
   npx http-server -S -C cert.pem

   # Con Python
   python -m http.server 8000

   # O usa Live Server en VS Code
   ```

3. **Accede desde tu móvil**:
   - En la misma red WiFi: `https://[TU-IP-LOCAL]:8080`
   - O usa un túnel como [ngrok](https://ngrok.com) para HTTPS público

## 📁 Estructura del Proyecto

```
web_ar/
├── index.html          # Aplicación principal
├── js/
│   └── app.js         # Lógica de interacción
├── assets/            # Recursos (modelos, patrones, sonidos)
│   └── (vacío)        # Agrega aquí tus modelos .glb
└── README.md          # Este archivo
```

## 🎨 Personalización

### Cambiar el modelo 3D

El ejemplo actual usa primitivas de A-Frame (cubos, esferas, cilindros) para crear un robot simple. Para usar un modelo 3D personalizado:

1. Obtén un modelo en formato **glTF/GLB** (recomendado)
2. Colócalo en la carpeta `assets/`
3. Modifica el HTML:
   ```html
   <a-entity gltf-model="assets/tu-modelo.glb" scale="0.5 0.5 0.5"></a-entity>
   ```

### Recursos gratuitos de modelos 3D:
- [Sketchfab](https://sketchfab.com) (filtrar por descarga gratuita)
- [Google Poly](https://poly.google.com) (archivo)
- [Free3D](https://free3d.com)

### Agregar más interactividad

Edita `js/app.js` para agregar más comportamientos:
- Animaciones adicionales
- Cambios de textura/color
- Efectos de partículas
- Sonidos personalizados

## 🔧 Solución de Problemas

**La cámara no se activa:**
- Asegúrate de usar HTTPS (requerido para `getUserMedia`)
- Verifica los permisos de cámara en tu navegador
- En iOS, usa Safari (Chrome iOS tiene limitaciones)

**El marcador no se detecta:**
- Mejora la iluminación
- Imprime el marcador con bordes blancos suficientes
- Evita reflejos o arrugas en el papel
- Prueba acercándote/alejándote

**Bajo rendimiento:**
- Reduce la complejidad del modelo 3D
- Desactiva las partículas
- Cierra otras aplicaciones

## 📚 Documentación

- [AR.js Docs](https://ar-js-org.github.io/AR.js-Docs/)
- [A-Frame Docs](https://aframe.io/docs/)
- [Tutorial AR.js + A-Frame](https://aframe.io/blog/arjs/)

## 🚀 Próximos Pasos

1. **Integrar con QR**: Genera un código QR que contenga la URL de tu app y el marcador AR incrustado
2. **Múltiples marcadores**: Agrega más marcadores para diferentes modelos
3. **AR sin marcadores**: Explora AR.js location-based o image tracking
4. **Publicar**: Despliega en GitHub Pages, Netlify o Vercel (todos con HTTPS gratuito)

## 📄 Licencia

Este proyecto es de código abierto bajo la licencia MIT. Siéntete libre de usarlo, modificarlo y compartirlo.

---

¡Disfruta creando experiencias AR en la web! 🎉 