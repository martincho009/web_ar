# 🔧 Guía de Solución de Problemas - WebAR

## ❌ El marcador no se detecta

### Causas comunes y soluciones:

### 1. **Problema de HTTPS**
- ⚠️ **Síntoma**: La cámara funciona pero no detecta marcadores
- ✅ **Solución**: SIEMPRE usa HTTPS (GitHub Pages lo tiene)
- ❌ **NO funciona**: Abrir archivo local (file://)

### 2. **Tamaño del marcador**
- ⚠️ **Síntoma**: Detección intermitente
- ✅ **Solución**: Imprime mínimo 8x8 cm
- 💡 **Mejor**: 10x10 cm o más grande

### 3. **Iluminación**
- ⚠️ **Síntoma**: No detecta o pierde tracking
- ✅ **Solución**: 
  - Buena luz sin sombras
  - Evita reflejos en el papel
  - No uses flash del móvil

### 4. **Calidad de impresión**
- ⚠️ **Síntoma**: No detecta nunca
- ✅ **Solución**:
  - Imprime en papel blanco mate
  - Alta calidad (no modo económico)
  - Bordes negros bien definidos

### 5. **Distancia a la cámara**
- ⚠️ **Síntoma**: Detecta y pierde constantemente
- ✅ **Solución**: Mantén 20-50 cm de distancia
- ❌ **Muy cerca**: < 15 cm no funciona
- ❌ **Muy lejos**: > 80 cm pierde precisión

## 📱 Problemas específicos de móvil

### Cache del navegador
```bash
# En Chrome móvil:
1. Menú (3 puntos) → Configuración
2. Privacidad → Borrar datos
3. Selecciona "Imágenes y archivos en caché"
4. Borrar datos
```

### Permisos de cámara
- Ve a Configuración del teléfono
- Aplicaciones → Chrome
- Permisos → Cámara → Permitir

## 🧪 Páginas de prueba

He creado varias versiones para diagnosticar:

1. **`test-hiro-simple.html`** - Versión más básica
2. **`test-jsdelivr.html`** - CDN alternativo
3. **`test-barcode.html`** - Para marcadores barcode

### Prueba en este orden:
1. Primero `test-hiro-simple.html`
2. Si funciona, prueba `index.html`
3. Si no funciona, prueba `test-jsdelivr.html`

## 🔍 Debug en Chrome móvil

1. Conecta el móvil por USB
2. En PC: Chrome → chrome://inspect
3. Busca tu dispositivo
4. Click en "inspect" junto a la página
5. Revisa la consola por errores

## ⚡ Solución rápida

Si nada funciona, usa estas versiones exactas que están probadas:
```html
<script src="https://aframe.io/releases/0.9.0/aframe.min.js"></script>
<script src="https://cdn.rawgit.com/jeromeetienne/AR.js/1.6.2/aframe/build/aframe-ar.js"></script>
```

## 🆘 Último recurso

Si aún no funciona:
1. Prueba otro navegador (Firefox móvil)
2. Prueba otro dispositivo
3. Verifica que el marcador esté 100% plano
4. Asegúrate de NO tener zoom activado en el navegador

## 📊 Compatibilidad conocida

✅ **Funciona bien**:
- Chrome Android 70+
- Safari iOS 11+
- Firefox Android

⚠️ **Problemas conocidos**:
- Samsung Internet (algunos modelos)
- Navegadores "lite"
- WebView en apps

## 🔗 Referencias

- [Issue #523 - Marcadores no detectados](https://github.com/jeromeetienne/AR.js/issues/523)
- [AR.js Documentation](https://ar-js-org.github.io/AR.js-Docs/)
- [Playground funcional](https://webxr.io/webar-playground/app/) 