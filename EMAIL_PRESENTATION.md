# Email de Présentation - Site E-Commerce AYOYA

---

**Objet:** Invitation à tester le nouveau site e-commerce AYOYA - Accès et documentation

---

Bonjour,

Nous avons le plaisir de vous présenter le **site e-commerce AYOYA**, désormais opérationnel et prêt à être testé.

## Présentation

Le site AYOYA E-Commerce est une plateforme de vente en ligne complète permettant :
- La commande de bouteilles et cartons AYOYA
- La livraison à domicile ou le retrait en magasin
- La gestion des commandes par l'équipe logistique
- L'administration complète des prix, médias et contenus

---

## URLs d'accès

| Service | URL |
|---------|-----|
| **Site public (Boutique)** | https://ecom.ayoya.srv1164291.hstgr.cloud |
| **Interface Admin** | https://ecom.ayoya.srv1164291.hstgr.cloud/admin/login |
| **Interface Logistique** | https://ecom.ayoya.srv1164291.hstgr.cloud/logistics |
| **Documentation Admin** | https://docadmin.ecom.ayoya.srv1164291.hstgr.cloud |
| **Documentation Logistique** | https://doclogistique.ecom.ayoya.srv1164291.hstgr.cloud |

---

## Identifiants de test

### Accès Administrateur
```
URL:      https://ecom.ayoya.srv1164291.hstgr.cloud/admin/login
Email:    admin@ayoya.bj
Password: Admin123!
```

### Accès Logistique
```
URL:      https://ecom.ayoya.srv1164291.hstgr.cloud/logistics
Email:    logistics@ayoya.bj
Password: Logistics123!
```

---

## Fonctionnalités à tester

### Site Public (Client)
- [ ] Page d'accueil avec présentation produit
- [ ] Page produit avec galerie d'images
- [ ] Formulaire de commande (panier)
- [ ] Sélection de la ville et zone de livraison (8 zones Cotonou)
- [ ] Choix du mode de livraison (domicile ou retrait)
- [ ] Calcul automatique des prix
- [ ] Page de confirmation de commande

### Interface Administrateur
- [ ] Connexion sécurisée
- [ ] Tableau de bord avec statistiques
- [ ] Gestion des prix (bouteille, livraison, carton)
- [ ] Gestion des médias (images, vidéos, favicon)
- [ ] Configuration du contact
- [ ] Gestion des réseaux sociaux
- [ ] Configuration des emails de notification
- [ ] Configuration SMTP
- [ ] Édition des documents légaux (CGU/CGV)

### Interface Logistique
- [ ] Connexion sécurisée
- [ ] Tableau de bord avec charge de travail
- [ ] Liste des commandes avec filtres
- [ ] Détail d'une commande
- [ ] Traitement des commandes (confirmation, assignation, livraison)
- [ ] Gestion des livreurs

---

## Documentation disponible

Nous avons préparé une documentation complète pour chaque interface :

### Guide Administrateur
**URL:** https://docadmin.ecom.ayoya.srv1164291.hstgr.cloud

Contenu :
- Vue d'ensemble de l'interface
- Gestion des prix et tarifs
- Upload et gestion des médias
- Configuration SMTP pour les emails
- Édition des documents légaux
- FAQ complète

### Guide Logistique
**URL:** https://doclogistique.ecom.ayoya.srv1164291.hstgr.cloud

Contenu :
- Vue d'ensemble de l'interface
- Cycle de vie des commandes
- Traitement complet (confirmation → livraison)
- Gestion des livreurs
- Explication des statuts
- FAQ complète

---

## Informations techniques

- **Framework Frontend:** React avec Vite
- **Framework Backend:** Express.js avec Node.js
- **Base de données:** SQLite
- **Hébergement:** Docker sur serveur dédié
- **SSL:** Certificats Let's Encrypt (HTTPS)
- **Reverse Proxy:** Traefik

---

## Retours et suggestions

Merci de noter vos observations pendant les tests :
- Bugs rencontrés (avec captures d'écran si possible)
- Améliorations suggérées
- Questions sur le fonctionnement

Vous pouvez envoyer vos retours à : **[adresse email de contact]**

---

## Prochaines étapes

1. Tester les différentes interfaces avec les identifiants fournis
2. Consulter la documentation pour comprendre les fonctionnalités
3. Noter les remarques et suggestions
4. Planifier une réunion de validation

---

Nous restons à votre disposition pour toute question.

Cordialement,

**L'équipe technique AYOYA**

---

*Ce site est en phase de test. Les données sont fictives et peuvent être réinitialisées.*
