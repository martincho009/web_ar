const express = require('express');
const https = require('https');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 8443;

// Middleware
app.use(cors());
app.use(express.static('.'));

// Headers de seguridad para WebAR
app.use((req, res, next) => {
    res.header('Permissions-Policy', 'camera=*');
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

// Ruta principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Verificar certificados SSL
const certExists = fs.existsSync('cert.pem') && fs.existsSync('key.pem');

if (certExists) {
    // Configuración HTTPS
    const options = {
        key: fs.readFileSync('key.pem'),
        cert: fs.readFileSync('cert.pem')
    };

    // Crear servidor HTTPS
    https.createServer(options, app).listen(PORT, '0.0.0.0', () => {
        console.log('🚀 Servidor WebAR con Express iniciado');
        console.log(`🌐 HTTPS activo en: https://localhost:${PORT}`);
        console.log(`📱 Acceso remoto: https://TU_IP_PUBLICA:${PORT}`);
        console.log('\n⚡ Características:');
        console.log('   - CORS habilitado');
        console.log('   - Permisos de cámara configurados');
        console.log('   - Archivos estáticos servidos');
        console.log('\n⏹️  Presiona Ctrl+C para detener');
    });
} else {
    console.log('⚠️  No se encontraron certificados SSL');
    console.log('');
    console.log('Opción 1: Genera certificados con Node.js');
    console.log('   npm run cert');
    console.log('');
    console.log('Opción 2: Genera certificados con Python');
    console.log('   python3 generate_cert.py');
    console.log('');
    console.log('Opción 3: Servidor HTTP sin SSL (no recomendado para móviles)');
    
    // Servidor HTTP de respaldo
    app.listen(8000, '0.0.0.0', () => {
        console.log('📡 Servidor HTTP iniciado en: http://localhost:8000');
        console.log('⚠️  La cámara NO funcionará sin HTTPS en móviles');
    });
} 