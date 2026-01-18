# Guide d'Installation - Documentation AYOYA

## Prérequis

- Docker et Docker Compose installés
- Port 8080 disponible (ou configurez un autre port)
- 200 MB d'espace disque disponible

## Installation rapide

### 1. Avec Docker Compose (Recommandé)

```bash
cd /home/claude-dev/qrcode/ayoya-ecommerce/docs

# Lancer le script de démarrage
./start.sh

# Ou manuellement:
docker-compose up -d
```

La documentation sera disponible à:
- Accueil: http://localhost:8080
- Admin: http://localhost:8080/admin/
- Logistique: http://localhost:8080/logistics/

### 2. Installation directe Nginx

```bash
# Copier les fichiers
sudo cp -r admin logistics /usr/share/nginx/html/
sudo cp nginx.conf /etc/nginx/nginx.conf

# Redémarrer Nginx
sudo systemctl restart nginx

# Accès
http://localhost/admin/
http://localhost/logistics/
```

### 3. Avec serveur Python (développement local)

```bash
cd /home/claude-dev/qrcode/ayoya-ecommerce/docs

# Python 3
python3 -m http.server 8080

# Ou Python 2
python -m SimpleHTTPServer 8080

# Accès
http://localhost:8080/
```

## Commandes Docker utiles

```bash
# Voir l'état
docker-compose ps

# Voir les logs
docker-compose logs -f

# Redémarrer
docker-compose restart

# Arrêter
docker-compose down

# Arrêter et supprimer les volumes
docker-compose down -v
```

## Intégration dans docker-compose.yml existant

Si vous avez déjà un docker-compose.yml pour votre application:

```yaml
services:
  docs:
    build: ./docs
    ports:
      - "8080:80"
    volumes:
      - ./docs/admin:/usr/share/nginx/html/admin:ro
      - ./docs/logistics:/usr/share/nginx/html/logistics:ro
    restart: unless-stopped
```

Puis:

```bash
docker-compose up -d docs
```

## Personnalisation

### Changer le port

**Docker Compose:**
Dans `docker-compose.yml`, modifiez:
```yaml
ports:
  - "9090:80"  # Utilisez le port 9090
```

**Nginx directement:**
```nginx
server {
    listen 9090;  # Nouveau port
}
```

### Ajouter HTTPS

Pour ajouter HTTPS avec certbot:

```bash
# Installer certbot
sudo apt-get install certbot python3-certbot-nginx

# Générer le certificat
sudo certbot certonly --standalone -d docs.votre-domaine.com

# Actualiser nginx.conf avec les chemins SSL
```

### Modifier l'authentification

Pour ajouter une authentification HTTP Basic:

```bash
# Générer les credentials
htpasswd -c .htpasswd utilisateur

# Dans nginx.conf:
location / {
    auth_basic "Documentation AYOYA";
    auth_basic_user_file /etc/nginx/.htpasswd;
}
```

## Tests de performance

### Tester la vitesse de chargement

```bash
curl -w "@curl-format.txt" -o /dev/null -s http://localhost:8080/admin/
```

### Tester la compression gzip

```bash
curl -H "Accept-Encoding: gzip" -I http://localhost:8080/admin/
```

Devrait montrer: `Content-Encoding: gzip`

## Troubleshooting

### Port 8080 déjà en utilisation

```bash
# Trouver le processus
lsof -i :8080

# Arrêter le processus (remplacer PID)
kill -9 PID

# Ou changer le port dans docker-compose.yml
```

### Erreur "permission denied"

```bash
# Si vous avez besoin de privilèges root
sudo docker-compose up -d

# Ou ajouter votre utilisateur au groupe docker
sudo usermod -aG docker $USER
```

### Nginx ne se lance pas

```bash
# Vérifier la syntaxe
docker-compose exec docs nginx -t

# Voir les erreurs
docker-compose logs docs
```

### Cache navigateur

Si vous voyez une ancienne version:
- Appuyez sur Ctrl+Shift+R (hard refresh)
- Ou videz le cache des cookies/stockage pour localhost

## Support

Pour toute question ou problème, consultez:
- Logs Docker: `docker-compose logs -f`
- Pages d'erreur Nginx
- Console du navigateur (F12)

## Sécurité

- Les documents sont en lecture seule (ro)
- Authentification optionnelle recommandée pour production
- HTTPS recommandé pour production
- Pas d'accès direct au système de fichiers

## Maintenance

### Mise à jour de la documentation

```bash
# Modifier les fichiers HTML
nano admin/index.html

# Redémarrer (pas besoin si volumé)
docker-compose restart docs
```

### Sauvegarde

```bash
# Backup des fichiers
cp -r admin logistics backup_$(date +%Y%m%d)

# Backup du docker compose
cp docker-compose.yml docker-compose.bak.yml
```

### Nettoyage des images Docker

```bash
# Supprimer les images non utilisées
docker image prune

# Supprimer tous les conteneurs arrêtés
docker container prune
```
