# Plan d'Implémentation - AYOYA E-commerce V2

## Proposition Nom Agent Logistique
**Suggestion:** `Gestionnaire de Livraisons` ou `Agent Logistique`
- Username suggéré: `logistique`
- Rôle dans le système: `logistics`

---

## Phase 1: Backend - Modèles et API (Agent 1)

### 1.1 Nouveaux Modèles
```
- SiteConfig: prix bouteille, prix livraison, prix carton, taille carton
- ContactInfo: téléphone, email, adresse
- SocialLinks: facebook, instagram, tiktok, whatsapp
- NotificationEmail: liste emails notification
- Visual: id, type (hero, product, gallery), path, description
- Video: id, title, path, description
- DeliveryZone: ville, zones (Cotonou découpé façon GOZEM)
- Delivery: id, name, phone
- Order: (mise à jour) - orderId, status, deliveryId, logisticsNotes
- User: (ajout rôle logistics)
```

### 1.2 Zones Cotonou (inspiré GOZEM)
```
- Zone 1: Cotonou Centre (Ganhi, Jonquet, Zongo)
- Zone 2: Akpakpa (Agbodjèdo, PK3, Sègbèya)
- Zone 3: Cadjèhoun (Haie Vive, Patte d'Oie)
- Zone 4: Gbégamey (Zogbo, Mènontin)
- Zone 5: Fifadji (Gbèto, Missèbo)
- Zone 6: Fidjrossè (Cocotiers, Fidjrossè Plage)
- Zone 7: Godomey (Togoudo, Atrokpocodji)
- Zone 8: Calavi (Zogbadjè, Tankpè)
```

### 1.3 Nouveaux Endpoints API
```
# Configuration
GET/PUT  /api/admin/config/site      - Prix, taille carton
GET/PUT  /api/admin/config/contact   - Infos contact
GET/PUT  /api/admin/config/social    - Liens réseaux sociaux
GET/PUT  /api/admin/config/emails    - Emails notification

# Médias
POST     /api/admin/visuals          - Upload visuel
GET      /api/admin/visuals          - Liste visuels
DELETE   /api/admin/visuals/{id}     - Supprimer visuel
POST     /api/admin/videos           - Upload vidéo
GET      /api/admin/videos           - Liste vidéos
DELETE   /api/admin/videos/{id}      - Supprimer vidéo
POST     /api/admin/favicon          - Upload favicon (auto-resize)

# Public (site web)
GET      /api/public/config          - Config publique (prix, contact, social)
GET      /api/public/visuals         - Visuels pour affichage
GET      /api/public/videos          - Vidéos pour affichage
GET      /api/public/zones           - Zones de livraison

# Logistique
GET      /api/logistics/orders       - Liste commandes
PUT      /api/logistics/orders/{id}  - Mettre à jour statut
POST     /api/logistics/deliveries   - Créer livreur
GET      /api/logistics/deliveries   - Liste livreurs
PUT      /api/logistics/orders/{id}/assign  - Assigner livreur

# Auth
POST     /api/auth/login             - Login (admin + logistics)
```

---

## Phase 2: Frontend Admin (Agent 2)

### 2.1 Nouvelles Pages Admin
```
/admin/dashboard        - Vue d'ensemble
/admin/settings         - Configuration générale
  ├── Prix & Quantités (bouteille, livraison, carton, taille)
  ├── Contact (téléphone, adresse, email public)
  ├── Réseaux sociaux (liens)
  ├── Emails notification (CRUD)
  └── SMTP (existant)
/admin/media            - Gestion médias
  ├── Visuels (avec description emplacement)
  ├── Vidéos
  └── Favicon
/admin/legal            - CGU/CGV (édition)
```

### 2.2 Descriptions Visuels
```
- hero_background: Image de fond section héro (1920x1080 recommandé)
- hero_bottle: Image bouteille principale héro (800x1200)
- product_main: Image produit page détail (1000x1000)
- product_gallery_1-4: Images galerie produit
- about_image: Image section "À propos"
- footer_logo: Logo footer (200x80)
```

### 2.3 Bouton "Appliquer les modifications"
- Toutes modifications stockées en "brouillon"
- Bouton "Appliquer" pour publier
- Confirmation avant application

---

## Phase 3: Frontend Logistique (Agent 3)

### 3.1 Pages Logistique
```
/logistics              - Login logistique
/logistics/dashboard    - Tableau de bord
  ├── Stats: commandes jour/semaine/mois
  ├── Commandes en attente
  └── Commandes en cours
/logistics/orders       - Liste toutes commandes
/logistics/orders/{id}  - Détail commande
/logistics/deliveries   - Gestion livreurs
```

### 3.2 Statuts Commande
```
- pending: En attente
- confirmed: Confirmée
- assigned: Assignée à livreur
- in_delivery: En cours de livraison
- delivered: Livrée
- cancelled: Annulée
```

### 3.3 Actions Disponibles
```
- Voir détails commande
- Assigner/réassigner livreur
- Mettre à jour statut
- Ajouter notes
- Imprimer bon de livraison
```

---

## Phase 4: Frontend Public (Agent 4)

### 4.1 Modifications Site
```
- Responsive design (menu hamburger fonctionnel)
- Icônes réseaux sociaux (footer + header)
- Section vidéos
- Visuels dynamiques depuis API
- Formulaire commande amélioré
- Page remerciement
- Pages CGU/CGV
```

### 4.2 Formulaire Commande
```
Champs:
1. Nom complet*
2. Téléphone*
3. Téléphone contact livraison* (checkbox "même que acheteur")
4. Ville de livraison* (select)
5. Zone de livraison (si Cotonou - select dynamique)
6. Type commande: Unité / Carton
7. Quantité*
8. Adresse précise livraison*
9. Notes (optionnel)

Calcul automatique:
- Si unité: quantité × prix_bouteille + frais_livraison
- Si carton: quantité × prix_carton + frais_livraison
```

### 4.3 Zones Cotonou (Select dynamique)
```javascript
const ZONES_COTONOU = [
  { id: 'centre', name: 'Cotonou Centre (Ganhi, Jonquet, Zongo)' },
  { id: 'akpakpa', name: 'Akpakpa (Agbodjèdo, PK3, Sègbèya)' },
  { id: 'cadjehoun', name: 'Cadjèhoun (Haie Vive, Patte d\'Oie)' },
  { id: 'gbegamey', name: 'Gbégamey (Zogbo, Mènontin)' },
  { id: 'fifadji', name: 'Fifadji (Gbèto, Missèbo)' },
  { id: 'fidjrosse', name: 'Fidjrossè (Cocotiers, Plage)' },
  { id: 'godomey', name: 'Godomey (Togoudo, Atrokpocodji)' },
  { id: 'calavi', name: 'Abomey-Calavi (Zogbadjè, Tankpè)' }
];
```

---

## Phase 5: Conformité Légale (Agent 5)

### 5.1 Code du Numérique Bénin
```
- Mentions légales obligatoires
- Politique de confidentialité
- Droit de rétractation (14 jours)
- Protection données personnelles
- Cookies consent
```

### 5.2 CGU (Conditions Générales d'Utilisation)
```
1. Objet
2. Accès au site
3. Propriété intellectuelle
4. Données personnelles
5. Responsabilités
6. Modification des CGU
7. Droit applicable (Bénin)
```

### 5.3 CGV (Conditions Générales de Vente)
```
1. Objet et champ d'application
2. Produits (description AYOYA)
3. Prix (TTC, en FCFA)
4. Commande (processus)
5. Paiement (à la livraison uniquement)
6. Livraison (délais, zones)
7. Droit de rétractation
8. Garanties
9. Réclamations
10. Protection des données
11. Litiges (tribunaux du Bénin)
```

---

## Phase 6: Documentation (Agent 6)

### 6.1 Guide Admin
```
URL: https://docadmin.ecom.ayoya.srv1164291.hstgr.cloud

Sections:
1. Connexion
2. Tableau de bord
3. Gestion des prix
4. Gestion des médias
5. Configuration contact
6. Réseaux sociaux
7. Emails de notification
8. Documents légaux
9. FAQ
```

### 6.2 Guide Logistique
```
URL: https://doclogistique.ecom.ayoya.srv1164291.hstgr.cloud

Sections:
1. Connexion
2. Tableau de bord
3. Voir les commandes
4. Traiter une commande
5. Gérer les livreurs
6. Mettre à jour les statuts
7. Imprimer bon de livraison
8. FAQ
```

---

## Phase 7: Optimisations Proposées

### 7.1 Performance
```
- Lazy loading images
- Compression images côté serveur
- Cache Redis pour config
- CDN pour assets statiques (optionnel)
```

### 7.2 UX/Conversion
```
- Indicateur de progression commande
- Estimation délai livraison
- WhatsApp direct pour questions
- Avis clients (futur)
```

### 7.3 SEO
```
- Meta tags dynamiques
- Schema.org Product
- Sitemap.xml
- Robots.txt
```

### 7.4 Sécurité
```
- Rate limiting API
- Validation inputs stricte
- CSRF protection
- Headers sécurité (CSP, HSTS)
```

---

## Phase 8: Tests Playwright

### 8.1 Suites de Tests
```
tests/
├── public/
│   ├── home.spec.ts          - Page accueil
│   ├── product.spec.ts       - Page produit
│   ├── cart.spec.ts          - Formulaire commande
│   ├── confirmation.spec.ts  - Page remerciement
│   ├── legal.spec.ts         - CGU/CGV
│   └── responsive.spec.ts    - Tests mobile
├── admin/
│   ├── login.spec.ts         - Connexion admin
│   ├── settings.spec.ts      - Configuration
│   ├── media.spec.ts         - Gestion médias
│   └── legal.spec.ts         - Édition CGU/CGV
├── logistics/
│   ├── login.spec.ts         - Connexion logistique
│   ├── dashboard.spec.ts     - Tableau de bord
│   ├── orders.spec.ts        - Gestion commandes
│   └── deliveries.spec.ts    - Gestion livreurs
└── api/
    ├── orders.spec.ts        - API commandes
    ├── config.spec.ts        - API configuration
    └── auth.spec.ts          - API authentification
```

### 8.2 Couverture Tests
```
- Chaque page: navigation, affichage, responsive
- Chaque bouton: click, résultat attendu
- Chaque formulaire: validation, soumission, erreurs
- Chaque API: succès, erreurs, edge cases
- Screenshots: redimensionnés 1024x768
```

---

## Résumé Agents Parallèles

| Agent | Tâche | Modèle |
|-------|-------|--------|
| 1 | Backend API + Modèles | Haiku |
| 2 | Frontend Admin | Haiku |
| 3 | Frontend Logistique | Haiku |
| 4 | Frontend Public | Haiku |
| 5 | CGU/CGV + Conformité | Haiku |
| 6 | Documentation | Haiku |
| 7 | Docker + Déploiement | Haiku |

---

## Credentials Proposés

| Rôle | Username | Password |
|------|----------|----------|
| Admin | `admin` | `ayoya_admin_2024` |
| Logistique | `logistique` | `ayoya_logistique_2024` |

---

## Validation Requise

1. ✅ Nom agent logistique: `logistique` / `Agent Logistique`
2. ✅ Zones Cotonou (8 zones façon GOZEM)
3. ✅ Statuts commande (6 statuts)
4. ✅ Structure documentation
5. ✅ Plan de tests exhaustif

**Valider ce plan pour démarrer l'implémentation ?**
