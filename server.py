#!/usr/bin/env python3
"""
Servidor HTTPS simple para WebAR
Uso: python3 server.py
"""

import http.server
import socketserver
import ssl
import os

# Configuración
PORT = 8443  # Puerto HTTPS
DIRECTORY = "."  # Directorio actual

class MyHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)
    
    def end_headers(self):
        # Agregar headers necesarios para WebAR
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        # Política de permisos para cámara
        self.send_header('Permissions-Policy', 'camera=*')
        super().end_headers()

# Crear servidor
Handler = MyHTTPRequestHandler

print(f"🚀 Iniciando servidor WebAR...")
print(f"📁 Sirviendo archivos desde: {os.path.abspath(DIRECTORY)}")

# Verificar si existen certificados SSL
if os.path.exists('cert.pem') and os.path.exists('key.pem'):
    # Usar certificados existentes
    print("✅ Certificados SSL encontrados")
    
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        httpd.socket = ssl.wrap_socket(httpd.socket,
                                     certfile='cert.pem',
                                     keyfile='key.pem',
                                     server_side=True)
        
        print(f"\n🌐 Servidor HTTPS activo en:")
        print(f"   https://localhost:{PORT}")
        print(f"   https://TU_IP_PUBLICA:{PORT}")
        print(f"\n📱 Abre desde tu móvil: https://TU_IP_PUBLICA:{PORT}")
        print("\n⏹️  Presiona Ctrl+C para detener\n")
        
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n👋 Servidor detenido")
else:
    print("\n⚠️  No se encontraron certificados SSL")
    print("Ejecuta primero: python3 generate_cert.py")
    print("O usa: python3 -m http.server 8000 (sin HTTPS)") 