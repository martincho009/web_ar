# 🔧 Guía de Solución de Problemas - WebAR

## ✅ SOLUCIÓN QUE FUNCIONA

Después de muchas pruebas, esta configuración específica es la que funciona correctamente:

### Versiones de librerías:
```html
<script src="https://aframe.io/releases/0.9.2/aframe.min.js"></script>
<script src="https://cdn.rawgit.com/jeromeetienne/AR.js/1.7.7/aframe/build/aframe-ar.js"></script>
```

⚠️ **IMPORTANTE**: No uses versiones más nuevas, pueden tener problemas de detección de marcadores.

## ❌ Problemas comunes y soluciones

### 1. **El marcador no se detecta**

#### Causas y soluciones:
- **📏 Tamaño incorrecto**
  - ✅ Imprime mínimo 8x8 cm (mejor 10x10 cm)
  - ❌ No uses marcadores pequeños

- **💡 Mala iluminación**
  - ✅ Luz natural o luz blanca fuerte
  - ✅ Sin sombras sobre el marcador
  - ❌ No uses flash del móvil

- **📄 Calidad de impresión**
  - ✅ Papel blanco mate (sin brillos)
  - ✅ Impresión de alta calidad
  - ✅ Bordes negros bien definidos
  - ❌ No uses papel brillante o fotográfico

- **📱 Distancia incorrecta**
  - ✅ Mantén 20-50 cm del marcador
  - ❌ Muy cerca (< 15 cm) no funciona
  - ❌ Muy lejos (> 80 cm) pierde precisión

### 2. **Cámara distorsionada o congelada**

- **🔄 Limpia caché del navegador**
  ```
  Chrome móvil:
  1. Menú (3 puntos) → Configuración
  2. Privacidad → Borrar datos
  3. Selecciona "Caché"
  4. Borrar datos
  ```

- **🔍 Desactiva zoom**
  - Pellizca para verificar que no hay zoom
  - Reinicia el navegador si es necesario

### 3. **Permisos de cámara**

- **Android:**
  ```
  Configuración → Aplicaciones → Chrome → Permisos → Cámara → Permitir
  ```

- **iOS:**
  ```
  Configuración → Safari → Cámara → Permitir
  ```

## 🌐 Navegadores compatibles

### ✅ Funcionan bien:
- Chrome Android 70+
- Safari iOS 11+
- Firefox Android

### ⚠️ Problemas conocidos:
- Samsung Internet (algunos modelos)
- Navegadores "lite" o mini
- WebView dentro de apps
- Chrome en iOS (usa Safari mejor)

## 🔍 Debug paso a paso

1. **Verifica HTTPS**
   - ✅ `https://` (requerido)
   - ❌ `http://` o `file://` no funcionan

2. **Prueba el marcador Hiro primero**
   - Es el más confiable
   - Si funciona, el problema era el marcador

3. **Revisa la consola**
   - En Chrome: `chrome://inspect` desde PC
   - Busca errores en rojo

## 💡 Tips importantes

### Para mejor detección:
1. **Marcador completamente plano** (sin arrugas)
2. **Fondo uniforme** alrededor del marcador
3. **Evita movimientos bruscos**
4. **Espera 2-3 segundos** para que detecte

### Si sigue sin funcionar:
1. **Prueba otro dispositivo** (puede ser hardware)
2. **Prueba Firefox** si Chrome falla
3. **Reinicia el teléfono** (cierra todas las apps)
4. **Verifica** que no haya otras apps usando la cámara

## 🆘 Último recurso

Si absolutamente nada funciona:

1. **Usa el playground oficial** que sabemos que funciona:
   - https://webxr.io/webar-playground/app/

2. **Clona exactamente** esta configuración:
   ```html
   <!DOCTYPE html>
   <html>
   <head>
       <script src="https://aframe.io/releases/0.9.2/aframe.min.js"></script>
       <script src="https://cdn.rawgit.com/jeromeetienne/AR.js/1.7.7/aframe/build/aframe-ar.js"></script>
   </head>
   <body style='margin: 0; overflow: hidden;'>
       <a-scene embedded arjs='sourceType: webcam;'>
           <a-marker preset='hiro'>
               <a-box position='0 0.5 0' material='opacity: 0.5;'></a-box>
           </a-marker>
           <a-entity camera></a-entity>
       </a-scene>
   </body>
   </html>
   ```

## 📊 Tabla de compatibilidad rápida

| Dispositivo | Chrome | Safari | Firefox | Samsung |
|-------------|--------|--------|---------|---------|
| Android 8+  | ✅     | -      | ✅      | ⚠️      |
| iOS 11+     | ⚠️     | ✅     | ✅      | -       |

## 🔗 Referencias útiles

- [Issue #523 - Problema de detección](https://github.com/jeromeetienne/AR.js/issues/523)
- [AR.js Documentation](https://ar-js-org.github.io/AR.js-Docs/)
- [Generador de marcadores](https://ar-js-org.github.io/AR.js/three.js/examples/marker-training/examples/generator.html) 