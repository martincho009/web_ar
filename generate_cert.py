#!/usr/bin/env python3
"""
Generador de certificados SSL autofirmados para desarrollo
"""

import os
import subprocess
import socket

def get_ip():
    """Obtener la IP pública del servidor"""
    try:
        # Intenta conectarse a un servidor DNS público para obtener la IP local
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        s.connect(("8.8.8.8", 80))
        ip = s.getsockname()[0]
        s.close()
        return ip
    except:
        return "127.0.0.1"

def generate_certificate():
    """Genera certificados SSL autofirmados"""
    
    ip = get_ip()
    
    print("🔐 Generando certificados SSL autofirmados...")
    print(f"📍 IP detectada: {ip}")
    
    # Crear configuración para OpenSSL
    config = f"""
[req]
default_bits = 2048
prompt = no
default_md = sha256
distinguished_name = dn
x509_extensions = v3_req

[dn]
C=ES
ST=Spain
L=Madrid
O=WebAR Development
OU=Testing
CN={ip}

[v3_req]
subjectAltName = @alt_names

[alt_names]
DNS.1 = localhost
DNS.2 = *.localhost
IP.1 = 127.0.0.1
IP.2 = {ip}
"""
    
    # Guardar configuración temporal
    with open('openssl.cnf', 'w') as f:
        f.write(config)
    
    # Comando OpenSSL para generar certificado
    cmd = [
        'openssl', 'req', '-x509', '-nodes', '-days', '365',
        '-newkey', 'rsa:2048',
        '-keyout', 'key.pem',
        '-out', 'cert.pem',
        '-config', 'openssl.cnf'
    ]
    
    try:
        # Ejecutar OpenSSL
        result = subprocess.run(cmd, capture_output=True, text=True)
        
        if result.returncode == 0:
            print("\n✅ Certificados generados exitosamente!")
            print("   - cert.pem (certificado)")
            print("   - key.pem (clave privada)")
            
            # Limpiar archivo temporal
            os.remove('openssl.cnf')
            
            print("\n📱 Nota: Los navegadores mostrarán una advertencia de seguridad")
            print("   porque es un certificado autofirmado. Acepta la excepción.")
            
            print(f"\n🚀 Ahora puedes ejecutar: python3 server.py")
            print(f"   Y acceder desde: https://{ip}:8443")
            
        else:
            print("\n❌ Error al generar certificados:")
            print(result.stderr)
            
    except FileNotFoundError:
        print("\n❌ Error: OpenSSL no está instalado")
        print("   En Ubuntu/Debian: sudo apt-get install openssl")
        print("   En CentOS/RHEL: sudo yum install openssl")

if __name__ == "__main__":
    generate_certificate() 