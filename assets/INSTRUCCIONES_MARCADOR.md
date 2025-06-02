# Instrucciones para Crear un Marcador AR Personalizado para QR

## 🎯 Objetivo
Crear un marcador AR personalizado que pueda ser incrustado dentro de un código QR, permitiendo que el mismo QR sirva tanto para acceder a la aplicación como para posicionar el contenido AR.

## 📋 Pasos

### 1. Diseñar el Patrón del Marcador

Crea una imagen simple en blanco y negro que servirá como marcador:
- **Tamaño recomendado**: 512x512 px
- **Colores**: Solo blanco y negro (alto contraste)
- **Diseño**: Formas geométricas simples, logos estilizados, o patrones únicos
- **Evitar**: Degradados, sombras, o detalles muy pequeños

**Herramientas sugeridas:**
- Canva (plantillas gratuitas)
- Figma (diseño vectorial)
- MS Paint (para diseños simples)
- Inkscape (software libre)

### 2. Generar el Archivo .patt

Visita el generador de marcadores AR.js:
https://ar-js-org.github.io/AR.js/three.js/examples/marker-training/examples/generator.html

**Proceso:**
1. Sube tu imagen (botón "Upload")
2. Ajusta los parámetros:
   - Pattern Ratio: 0.5 (predeterminado)
   - Image Size: 512 (o el tamaño de tu imagen)
3. Descarga los archivos generados:
   - `pattern-marker.patt` - El archivo de patrón
   - `pattern-marker.png` - La imagen del marcador con borde negro

### 3. Crear el Código QR con el Marcador Incrustado

**Opción A: QR Code Monkey (Recomendado)**
1. Ve a https://www.qrcode-monkey.com/
2. Ingresa la URL de tu aplicación WebAR
3. En "Add Logo Image":
   - Sube tu imagen del marcador (sin el borde negro)
   - Ajusta el tamaño al 20-30% del QR
4. En "Customize Design":
   - Elige colores que no interfieran con el marcador
   - Mantén las esquinas cuadradas para mejor detección
5. Descarga en alta resolución (PNG o SVG)

**Opción B: QR Code Generator**
1. Ve a https://www.qr-code-generator.com/
2. Similar proceso, pero con opciones de diseño limitadas en versión gratuita

### 4. Optimizar el QR+Marcador

**Consejos importantes:**
- El marcador debe ocupar aproximadamente 1/5 del área total del QR
- Mantén un margen blanco alrededor del QR completo
- Prueba el QR con un lector antes de imprimir
- El tamaño mínimo recomendado para impresión es 5x5 cm

### 5. Integrar en la Aplicación

1. Guarda el archivo `.patt` en la carpeta `assets/`
2. Actualiza el HTML:
   ```html
   <a-marker
       type="pattern"
       url="assets/tu-marcador.patt"
       smooth="true">
   ```
3. Ajusta el tamaño del marcador según el tamaño real del QR:
   ```html
   <a-marker ... size="0.05">  <!-- Para un QR de 5cm -->
   ```

## 🎨 Ejemplos de Diseños Efectivos

### Buenos diseños para marcadores:
- ✅ Logo empresarial simplificado
- ✅ Formas geométricas (triángulos, hexágonos)
- ✅ Letras o iniciales estilizadas
- ✅ Símbolos abstractos únicos
- ✅ Patrones de líneas simples

### Evitar:
- ❌ Fotografías o imágenes realistas
- ❌ Texto pequeño o detallado
- ❌ Patrones repetitivos muy densos
- ❌ Diseños con poco contraste

## 🧪 Pruebas

1. **Prueba de escaneo QR**: Asegúrate de que el QR sigue siendo legible
2. **Prueba de detección AR**: Verifica que el marcador se detecta correctamente
3. **Prueba de distancia**: El marcador debe detectarse entre 20cm y 2m
4. **Prueba de iluminación**: Funciona en diferentes condiciones de luz

## 📱 Flujo de Usuario Final

1. Usuario ve el QR impreso/en pantalla
2. Escanea con la cámara del teléfono
3. Se abre automáticamente la web AR
4. Acepta permisos de cámara
5. Apunta nuevamente al mismo QR
6. ¡El contenido AR aparece sobre el QR!

## 🔧 Solución de Problemas

**El QR no se escanea:**
- Reduce el tamaño del logo/marcador
- Aumenta el nivel de corrección de errores del QR
- Simplifica el diseño del marcador

**El marcador no se detecta:**
- Aumenta el contraste del diseño
- Simplifica las formas
- Imprime en mayor tamaño
- Mejora la iluminación

**Tracking inestable:**
- Usa un diseño con más características únicas
- Evita simetría perfecta
- Añade elementos asimétricos al diseño

## 📚 Recursos Adicionales

- [Documentación AR.js sobre marcadores](https://ar-js-org.github.io/AR.js-Docs/marker-based/)
- [Mejores prácticas para marcadores AR](https://github.com/AR-js-org/AR.js/blob/master/README.md#markers-based)
- [Galería de ejemplos de marcadores](https://github.com/nicolocarpignoli/artoolkit-barcode-markers-collection)

---

💡 **Tip Pro**: Crea múltiples versiones del marcador con pequeñas variaciones y prueba cuál funciona mejor en tu caso de uso específico. 