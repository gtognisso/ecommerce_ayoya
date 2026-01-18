# Guide des Captures d'Écran

Ce document explique comment ajouter et mettre à jour les captures d'écran dans la documentation AYOYA.

## Emplacements des captures d'écran

Tous les emplacements de captures d'écran sont marqués avec:

```html
<div class="screenshot">📱 Capture écran: Description</div>
```

## Comment remplacer un placeholder

### 1. Prendre la capture d'écran

**Admin:**
- Résolution: 1280x720px (16:9)
- Format: PNG ou JPG
- Nommage: `admin-description.png`

**Logistique:**
- Résolution: 1280x720px (16:9)
- Format: PNG ou JPG
- Nommage: `logistics-description.png`

### 2. Créer les répertoires d'images

```bash
mkdir -p /home/claude-dev/qrcode/ayoya-ecommerce/docs/images/admin
mkdir -p /home/claude-dev/qrcode/ayoya-ecommerce/docs/images/logistics
```

### 3. Placer l'image

```bash
cp votre-screenshot.png /home/claude-dev/qrcode/ayoya-ecommerce/docs/images/admin/
```

### 4. Mettre à jour le HTML

Remplacer:
```html
<div class="screenshot">📱 Capture écran: Formulaire de connexion AYOYA</div>
```

Par:
```html
<img src="../images/admin/admin-connexion.png" alt="Formulaire de connexion AYOYA" style="max-width: 100%; border: 2px solid #ddd; border-radius: 8px; margin: 20px 0; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
```

## Liste des captures d'écran requises

### Guide Admin (11 captures)

1. `admin-connexion.png` - Formulaire de connexion
2. `admin-menu.png` - Menu Configuration
3. `admin-prix-bouteilles.png` - Onglet Prix des bouteilles
4. `admin-prix-modifier.png` - Bouton modifier prix
5. `admin-prix-form.png` - Formulaire de prix
6. `admin-livraison-config.png` - Configuration livraison
7. `admin-medias-ajouter.png` - Bouton ajouter média
8. `admin-medias-liste.png` - Liste des médias
9. `admin-medias-formulaire.png` - Formulaire téléchargement
10. `admin-videos-gestionnaire.png` - Gestionnaire vidéos
11. `admin-dashboard.png` - Vue du tableau de bord

### Guide Logistique (13 captures)

1. `logistics-connexion.png` - Formulaire de connexion
2. `logistics-menu.png` - Menu principal
3. `logistics-dashboard.png` - Vue du tableau de bord
4. `logistics-commandes-liste.png` - Liste des commandes
5. `logistics-commandes-detail.png` - Détail commande
6. `logistics-livreurs-liste.png` - Liste des livreurs
7. `logistics-livreurs-ajouter.png` - Bouton ajouter livreur
8. `logistics-livreurs-form.png` - Formulaire nouveau livreur
9. `logistics-livreurs-modifier.png` - Bouton modifier livreur
10. `logistics-livreurs-stats.png` - Statistiques livreur
11. `logistics-confirmation.png` - Confirmation commande
12. `logistics-assignation-livreur.png` - Assignation livreur
13. `logistics-statut-detail.png` - Détail des statuts

## Conventions de style

### Taille et formats

- **Résolution**: 1280x720px
- **Format**: PNG (transparent) ou JPG (compressé)
- **Compressé**: Max 200KB par image
- **Ratio**: 16:9 (essayer de maintenir)

### Annotations

Si vous annotez vos captures:
- Police: Arial, 12pt
- Couleur: Rouge (#DC2626) pour les flèches/surlignages
- Contrastes: Élevés pour la lisibilité

### Exemple d'annotation

```
Numéro de flèche: ① ② ③ (cercles numérotés)
Couleur: Rouge AYOYA #DC2626
Police: Arial gras 12pt
```

## Mise à jour avec Docker

Si vous utilisez Docker:

1. Ajouter les images dans `/docs/images/`
2. Mettre à jour les fichiers HTML
3. Redémarrer le conteneur:

```bash
docker-compose restart docs
```

Les volumes montent les images automatiquement.

## Optimisation des images

### Avec ImageMagick

```bash
# Redimensionner
convert screenshot.png -resize 1280x720 optimized.png

# Compresser PNG
optipng -o2 optimized.png

# Compresser JPG
convert screenshot.png -quality 85 optimized.jpg
```

### Avec ImageOptim (macOS)

1. Ouvrir ImageOptim
2. Glisser-déposer l'image
3. Attendre la compression

### Avec TinyPNG (en ligne)

1. Aller sur https://tinypng.com
2. Télécharger vos images
3. Télécharger les versions compressées

## Checklist avant publication

- [ ] Image redimensionnée à 1280x720px
- [ ] Poids < 200KB
- [ ] Format PNG ou JPG
- [ ] Annotations claires et lisibles
- [ ] Pas d'informations sensibles
- [ ] HTML mise à jour
- [ ] Alt text descriptif
- [ ] Lien relatif correct (`../images/...`)
- [ ] Testé dans le navigateur
- [ ] Responsive sur mobile

## Exemple complet d'intégration

**Avant:**
```html
<div class="step">
    <strong>1</strong> Ouvrez votre navigateur et accédez à <code>https://votre-domaine.com/admin</code>
</div>
<div class="screenshot">📱 Capture écran: Formulaire de connexion AYOYA</div>
```

**Après:**
```html
<div class="step">
    <strong>1</strong> Ouvrez votre navigateur et accédez à <code>https://votre-domaine.com/admin</code>
</div>
<img src="../images/admin/admin-connexion.png" alt="Formulaire de connexion AYOYA" style="max-width: 100%; border: 2px solid #ddd; border-radius: 8px; margin: 20px 0; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
```

## Signifier aux utilisateurs les placeholders

Vous pouvez garder les placeholders et ajouter un badge:

```html
<div class="screenshot">
    📱 Capture écran: Formulaire de connexion AYOYA
    <span style="background: #FF6B00; color: white; padding: 2px 8px; border-radius: 3px; font-size: 0.8em; margin-left: 10px;">À venir</span>
</div>
```

## Sécurité et confidentialité

⚠️ **Important**: Ne pas inclure dans les captures:
- Vrais identifiants ou mots de passe
- Adresses emails réelles
- Numéros de téléphone
- Données personnelles des clients
- Montants de transactions réelles

Utiliser des données fictives/de test.

## Maintenance des images

### Versionner les images

```bash
# Créer des versions
admin-connexion-v1.png
admin-connexion-v2.png (après mise à jour UI)
```

### Archiver les anciennes versions

```bash
mkdir archived
mv admin-connexion-v1.png archived/
```

### Mettre à jour tout le répertoire

```bash
# Avant déploiement
./optimize-images.sh images/

# Script d'optimisation
#!/bin/bash
for file in *.png; do
    optipng -o2 "$file"
done
```

## Support et questions

Pour toute question sur les captures d'écran:
- Consulter ce document
- Voir les exemples existants
- Demander à l'équipe AYOYA
