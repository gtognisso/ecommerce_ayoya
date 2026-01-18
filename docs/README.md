# Documentation AYOYA E-Commerce

Documentation complète pour la gestion de la plateforme AYOYA e-commerce.

## Structure

```
docs/
├── admin/
│   └── index.html          # Guide Administrateur
├── logistics/
│   └── index.html          # Guide Logistique
├── Dockerfile              # Configuration Docker
├── nginx.conf              # Configuration Nginx
└── README.md               # Ce fichier
```

## Guides Disponibles

### 1. Guide Administrateur (`/admin/`)
Guide complet pour les administrateurs de la plateforme AYOYA.

**Sections:**
- Accueil & Vue d'ensemble
- Connexion à l'interface admin
- Tableau de bord (statistiques clés)
- Gestion des prix (bouteilles, livraison, cartons, tailles)
- Gestion des médias (visuels, vidéos, favicon)
- Configuration du contact (téléphone, email, adresse)
- Gestion des réseaux sociaux (Facebook, Instagram, TikTok)
- Notifications par email (ajout/suppression des adresses)
- Configuration SMTP (envoi d'emails automatiques)
- Documents légaux (CGU/CGV)
- FAQ complète

### 2. Guide Logistique (`/logistics/`)
Guide complet pour les agents logistiques et responsables de livraison.

**Sections:**
- Accueil & Vue d'ensemble
- Connexion à l'interface logistique
- Tableau de bord (statistiques de charge)
- Gestion des commandes (consultation, filtrage, détail)
- Traitement des commandes (confirmation, assignation, livraison)
- Gestion des livreurs (ajout, modification, statuts, performances)
- Explication des statuts de commande
- Workflow de traitement complet
- FAQ complète

## Déploiement

### Avec Docker

```bash
# Build l'image
docker build -t ayoya-docs .

# Lance le conteneur
docker run -p 8080:80 ayoya-docs

# Accès
- Documentation: http://localhost:8080
- Admin: http://localhost:8080/admin/
- Logistics: http://localhost:8080/logistics/
```

### Sans Docker (serveur Nginx directement)

```bash
# Copier les fichiers dans le répertoire web
sudo cp -r admin logistics /usr/share/nginx/html/

# Copier la configuration Nginx
sudo cp nginx.conf /etc/nginx/nginx.conf

# Redémarrer Nginx
sudo systemctl restart nginx
```

## Caractéristiques

- **HTML autonome**: Chaque guide est un fichier HTML unique avec CSS inlné
- **Pas de dépendances**: Fonctionne sans framework ou librairie externe
- **Navigation intuitive**: Menu collant pour accès facile aux sections
- **Design AYOYA**: Utilise les couleurs officielles de la marque
  - Orange: #FF6B00
  - Bleu: #0066CC
  - Vert: #00AA55
  - Rouge: #DC2626
- **Responsive**: Adapté aux mobiles et tablettes
- **Compressé**: Nginx compresse les fichiers avec gzip
- **Bien structuré**: Étapes numérotées, captures d'écran placeholders, FAQ complète

## Personnalisation

### Modifier les couleurs
Chaque guide contient un bloc `<style>` au début. Cherchez les variables de couleur et remplacez-les:

```css
header {
    background: linear-gradient(135deg, #FF6B00 0%, #0066CC 100%);
}

section h2 {
    color: #FF6B00;  /* Admin: Orange */
    /* or */
    color: #00AA55;  /* Logistics: Vert */
}
```

### Ajouter des sections
1. Ajoutez une `<section>` dans le HTML
2. Ajoutez un lien dans le `<nav>`
3. Mettez en place la fonction JavaScript `showSection()`

### Intégrer les captures d'écran
Remplacez les placeholders `<div class="screenshot">` par des balises `<img>`:

```html
<img src="path/to/screenshot.png" alt="Description" style="max-width: 100%; border: 1px solid #ccc; margin: 20px 0;">
```

## Accès

- **URL racine**: `https://votre-domaine.com/docs/`
- **Guide Admin**: `https://votre-domaine.com/docs/admin/`
- **Guide Logistique**: `https://votre-domaine.com/docs/logistics/`

## Points clés

### Guide Administrateur
- Explique comment gérer les prix et tarifs
- Détaille l'upload de médias et favicon
- Couvre la configuration SMTP pour les emails
- Inclut des instructions pour les documents légaux

### Guide Logistique
- Explique le cycle de vie des commandes
- Détaille le traitement complet (confirmation → livraison)
- Couvre la gestion des livreurs
- Inclut les statuts et raisons d'annulation

## FAQ incluses

Chaque guide inclut une section FAQ importante avec:
- Questions fréquemment posées
- Réponses détaillées et étape par étape
- Solutions aux problèmes courants
- Conseils et bonnes pratiques

## Support

Pour des questions ou améliorations à la documentation, contactez l'équipe AYOYA.

## Version

- Créée: 2024-01-18
- Plateforme: AYOYA E-Commerce
- Compatible avec: Tous les navigateurs modernes
