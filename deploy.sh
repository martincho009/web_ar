#!/bin/bash

# Script de despliegue para WebAR
# Uso: ./deploy.sh [opcion]

echo "🚀 Script de Despliegue WebAR"
echo "=============================="

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Detectar IP pública
IP=$(curl -s ifconfig.me || echo "TU_IP_PUBLICA")
echo -e "${GREEN}📍 IP Pública detectada: $IP${NC}"
echo ""

# Función para generar certificados SSL
generate_ssl() {
    echo -e "${YELLOW}🔐 Generando certificados SSL...${NC}"
    
    if command -v openssl &> /dev/null; then
        openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
            -keyout key.pem -out cert.pem \
            -subj "/C=ES/ST=State/L=City/O=WebAR/CN=$IP" \
            -addext "subjectAltName=IP:$IP,IP:127.0.0.1,DNS:localhost"
        
        echo -e "${GREEN}✅ Certificados generados${NC}"
    else
        echo -e "${RED}❌ OpenSSL no está instalado${NC}"
        echo "Instala con: sudo apt-get install openssl"
        exit 1
    fi
}

# Menú principal
if [ $# -eq 0 ]; then
    echo "Selecciona método de despliegue:"
    echo ""
    echo "1) Python Simple (desarrollo rápido)"
    echo "2) Node.js Express (más robusto)"
    echo "3) Nginx (producción)"
    echo "4) Generar certificados SSL"
    echo "5) Instrucciones Let's Encrypt (SSL real)"
    echo ""
    read -p "Opción (1-5): " choice
else
    choice=$1
fi

case $choice in
    1)
        echo -e "${YELLOW}📦 Desplegando con Python...${NC}"
        
        # Verificar Python
        if ! command -v python3 &> /dev/null; then
            echo -e "${RED}Python 3 no está instalado${NC}"
            exit 1
        fi
        
        # Verificar certificados
        if [ ! -f "cert.pem" ] || [ ! -f "key.pem" ]; then
            echo "No se encontraron certificados SSL"
            generate_ssl
        fi
        
        echo -e "${GREEN}✅ Iniciando servidor Python${NC}"
        echo ""
        echo -e "Accede desde tu móvil: ${GREEN}https://$IP:8443${NC}"
        echo ""
        python3 server.py
        ;;
        
    2)
        echo -e "${YELLOW}📦 Desplegando con Node.js...${NC}"
        
        # Verificar Node.js
        if ! command -v node &> /dev/null; then
            echo -e "${RED}Node.js no está instalado${NC}"
            echo "Instala desde: https://nodejs.org/"
            exit 1
        fi
        
        # Instalar dependencias
        if [ ! -d "node_modules" ]; then
            echo "Instalando dependencias..."
            npm install
        fi
        
        # Verificar certificados
        if [ ! -f "cert.pem" ] || [ ! -f "key.pem" ]; then
            echo "No se encontraron certificados SSL"
            generate_ssl
        fi
        
        echo -e "${GREEN}✅ Iniciando servidor Node.js${NC}"
        echo ""
        echo -e "Accede desde tu móvil: ${GREEN}https://$IP:8443${NC}"
        echo ""
        npm start
        ;;
        
    3)
        echo -e "${YELLOW}📦 Configuración para Nginx...${NC}"
        echo ""
        echo "1. Copia los archivos al servidor:"
        echo "   sudo cp -r . /var/www/webar"
        echo ""
        echo "2. Copia la configuración de Nginx:"
        echo "   sudo cp nginx-webar.conf /etc/nginx/sites-available/webar"
        echo ""
        echo "3. Edita la configuración:"
        echo "   sudo nano /etc/nginx/sites-available/webar"
        echo "   - Cambia TU_IP_PUBLICA por: $IP"
        echo "   - Ajusta las rutas según tu servidor"
        echo ""
        echo "4. Activa el sitio:"
        echo "   sudo ln -s /etc/nginx/sites-available/webar /etc/nginx/sites-enabled/"
        echo "   sudo nginx -t"
        echo "   sudo systemctl reload nginx"
        echo ""
        echo -e "${GREEN}URL final: https://$IP${NC}"
        ;;
        
    4)
        generate_ssl
        ;;
        
    5)
        echo -e "${YELLOW}🔒 Instrucciones para Let's Encrypt (SSL real)${NC}"
        echo ""
        echo "Let's Encrypt proporciona certificados SSL gratuitos y válidos."
        echo ""
        echo "Requisitos:"
        echo "- Un dominio apuntando a tu IP ($IP)"
        echo "- Puerto 80 abierto"
        echo ""
        echo "Pasos:"
        echo "1. Instala Certbot:"
        echo "   sudo apt-get update"
        echo "   sudo apt-get install certbot"
        echo ""
        echo "2. Genera certificados:"
        echo "   sudo certbot certonly --standalone -d tu-dominio.com"
        echo ""
        echo "3. Los certificados estarán en:"
        echo "   /etc/letsencrypt/live/tu-dominio.com/fullchain.pem"
        echo "   /etc/letsencrypt/live/tu-dominio.com/privkey.pem"
        echo ""
        echo "4. Actualiza tu configuración para usar estos certificados"
        echo ""
        echo "5. Renovación automática:"
        echo "   sudo crontab -e"
        echo "   0 0 * * * certbot renew --quiet"
        ;;
        
    *)
        echo -e "${RED}Opción no válida${NC}"
        exit 1
        ;;
esac 