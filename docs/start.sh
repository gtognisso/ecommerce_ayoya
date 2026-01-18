#!/bin/bash

# Script de lancement de la documentation AYOYA

echo "================================================"
echo "  Documentation AYOYA E-Commerce"
echo "================================================"
echo ""

# Couleurs
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Vérifier Docker
if ! command -v docker &> /dev/null; then
    echo -e "${YELLOW}⚠ Docker n'est pas installé. Veuillez installer Docker.${NC}"
    exit 1
fi

# Vérifier Docker Compose
if ! command -v docker-compose &> /dev/null; then
    echo -e "${YELLOW}⚠ Docker Compose n'est pas installé. Veuillez installer Docker Compose.${NC}"
    exit 1
fi

echo -e "${BLUE}📦 Construction de l'image Docker...${NC}"
docker-compose build

echo ""
echo -e "${BLUE}🚀 Lancement du conteneur...${NC}"
docker-compose up -d

echo ""
sleep 2

# Vérifier si le conteneur est actif
if docker-compose ps | grep -q "ayoya-docs"; then
    echo -e "${GREEN}✓ Conteneur lancé avec succès!${NC}"
    echo ""
    echo "================================================"
    echo "  Documentation disponible à:"
    echo "================================================"
    echo -e "${GREEN}📚 Accueil:      http://localhost:8080${NC}"
    echo -e "${GREEN}👨‍💼 Admin:        http://localhost:8080/admin/${NC}"
    echo -e "${GREEN}🚚 Logistique:   http://localhost:8080/logistics/${NC}"
    echo ""
    echo "================================================"
    echo "  Commandes utiles:"
    echo "================================================"
    echo "Arrêter la documentation:"
    echo "  docker-compose down"
    echo ""
    echo "Voir les logs:"
    echo "  docker-compose logs -f"
    echo ""
    echo "Redémarrer:"
    echo "  docker-compose restart"
    echo ""
else
    echo -e "${YELLOW}⚠ Erreur lors du lancement du conteneur.${NC}"
    echo "Vérifiez les logs:"
    echo "  docker-compose logs"
    exit 1
fi
