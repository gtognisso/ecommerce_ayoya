# Matrice de Tests Playwright - AYOYA E-Commerce

## Vue d'Ensemble

| Catégorie | Nombre de Tests | Priorité |
|-----------|-----------------|----------|
| Public - Pages | 28 | Haute |
| Public - Formulaires | 35 | Haute |
| Public - Responsive | 18 | Haute |
| Admin - Auth | 8 | Haute |
| Admin - Dashboard | 6 | Moyenne |
| Admin - Settings | 24 | Haute |
| Admin - Media | 18 | Moyenne |
| Admin - Legal | 8 | Moyenne |
| Logistics - Auth | 8 | Haute |
| Logistics - Dashboard | 10 | Moyenne |
| Logistics - Orders | 22 | Haute |
| Logistics - Deliveries | 14 | Moyenne |
| API | 32 | Haute |
| **TOTAL** | **231** | - |

---

## 1. Tests Public - Pages

### 1.1 Page Accueil (/)

| ID | Test | Action | Résultat Attendu |
|----|------|--------|------------------|
| PUB-001 | Chargement page | Naviguer vers / | Page affichée, status 200 |
| PUB-002 | Titre page | Vérifier title | "AYOYA - Noblesse Africaine" |
| PUB-003 | Logo navbar | Vérifier présence | Logo visible |
| PUB-004 | Menu navigation | Vérifier liens | Accueil, Produit, Commander visibles |
| PUB-005 | Hero section | Vérifier contenu | Titre, description, CTA présents |
| PUB-006 | Bouton CTA hero | Cliquer "Commander" | Redirection vers /cart |
| PUB-007 | Section produit | Vérifier affichage | Image, prix, description |
| PUB-008 | Prix affiché | Vérifier format | "5 000 FCFA" (formaté) |
| PUB-009 | Section vidéos | Vérifier si vidéos | Section affichée si vidéos uploadées |
| PUB-010 | Footer | Vérifier contenu | Contact, réseaux sociaux, liens légaux |
| PUB-011 | Lien CGU footer | Cliquer | Redirection vers /cgu |
| PUB-012 | Lien CGV footer | Cliquer | Redirection vers /cgv |
| PUB-013 | Icônes sociales | Vérifier présence | FB, Instagram, TikTok si configurés |
| PUB-014 | Icône Facebook | Cliquer | Ouvre lien externe Facebook |

### 1.2 Page Produit (/product)

| ID | Test | Action | Résultat Attendu |
|----|------|--------|------------------|
| PUB-015 | Chargement page | Naviguer vers /product | Page affichée |
| PUB-016 | Galerie images | Vérifier présence | Images produit affichées |
| PUB-017 | Navigation galerie | Cliquer miniatures | Image principale change |
| PUB-018 | Informations produit | Vérifier contenu | Nom, description, ingrédients |
| PUB-019 | Prix unitaire | Vérifier affichage | Prix bouteille visible |
| PUB-020 | Prix carton | Vérifier affichage | Prix carton + nb bouteilles |
| PUB-021 | Bouton commander | Cliquer | Redirection vers /cart |

### 1.3 Page CGU (/cgu)

| ID | Test | Action | Résultat Attendu |
|----|------|--------|------------------|
| PUB-022 | Chargement page | Naviguer vers /cgu | Page affichée |
| PUB-023 | Titre | Vérifier | "Conditions Générales d'Utilisation" |
| PUB-024 | Contenu | Vérifier présence | Articles 1-9 présents |
| PUB-025 | Mention Bénin | Vérifier | Référence Code du Numérique |

### 1.4 Page CGV (/cgv)

| ID | Test | Action | Résultat Attendu |
|----|------|--------|------------------|
| PUB-026 | Chargement page | Naviguer vers /cgv | Page affichée |
| PUB-027 | Titre | Vérifier | "Conditions Générales de Vente" |
| PUB-028 | Contenu | Vérifier présence | Articles 1-12 présents |

---

## 2. Tests Public - Formulaire Commande

### 2.1 Page Panier (/cart)

| ID | Test | Action | Résultat Attendu |
|----|------|--------|------------------|
| FORM-001 | Chargement formulaire | Naviguer vers /cart | Formulaire affiché |
| FORM-002 | Champ nom vide | Soumettre sans nom | Erreur "Nom requis" |
| FORM-003 | Champ nom valide | Saisir "Jean Dupont" | Champ accepté |
| FORM-004 | Champ téléphone vide | Soumettre sans tél | Erreur "Téléphone requis" |
| FORM-005 | Téléphone invalide | Saisir "abc" | Erreur format |
| FORM-006 | Téléphone valide | Saisir "22997123456" | Champ accepté |
| FORM-007 | Contact livraison | Cocher "Même que acheteur" | Champ désactivé, copie valeur |
| FORM-008 | Contact différent | Décocher checkbox | Champ activé, saisie possible |
| FORM-009 | Ville select | Ouvrir dropdown | Liste villes affichée |
| FORM-010 | Sélection Cotonou | Choisir Cotonou | Champ zone activé |
| FORM-011 | Sélection autre ville | Choisir Porto-Novo | Champ zone désactivé |
| FORM-012 | Zones Cotonou | Ouvrir dropdown zones | 8 zones affichées |
| FORM-013 | Zone Centre | Sélectionner | "Cotonou Centre (Ganhi, Jonquet, Zongo)" |
| FORM-014 | Zone Akpakpa | Sélectionner | "Akpakpa (Agbodjèdo, PK3, Sègbèya)" |
| FORM-015 | Type commande unité | Sélectionner "Unité" | Calcul prix unitaire |
| FORM-016 | Type commande carton | Sélectionner "Carton" | Affiche nb bouteilles, calcul prix carton |
| FORM-017 | Quantité négative | Saisir -1 | Erreur ou reset à 1 |
| FORM-018 | Quantité 0 | Saisir 0 | Erreur "Minimum 1" |
| FORM-019 | Quantité valide | Saisir 3 | Calcul total mis à jour |
| FORM-020 | Calcul total unité | 3 unités | 3 × 5000 + 1000 = 16000 FCFA |
| FORM-021 | Calcul total carton | 2 cartons | 2 × 25000 + 1000 = 51000 FCFA |
| FORM-022 | Adresse vide | Soumettre sans adresse | Erreur "Adresse requise" |
| FORM-023 | Adresse valide | Saisir adresse | Champ accepté |
| FORM-024 | Notes optionnel | Laisser vide | Pas d'erreur |
| FORM-025 | Notes avec texte | Saisir note | Champ accepté |
| FORM-026 | Soumission valide | Remplir tout, soumettre | Redirection /merci |
| FORM-027 | Affichage récap | Après soumission | Numéro commande affiché |

### 2.2 Page Confirmation (/merci)

| ID | Test | Action | Résultat Attendu |
|----|------|--------|------------------|
| FORM-028 | Chargement page | Après commande | Page remerciement affichée |
| FORM-029 | Message remerciement | Vérifier | Texte de remerciement |
| FORM-030 | Numéro commande | Vérifier format | "AYO-YYYYMMDD-XXXXXX" |
| FORM-031 | Récap commande | Vérifier | Nom, quantité, total affichés |
| FORM-032 | Bouton retour | Cliquer "Retour accueil" | Redirection vers / |
| FORM-033 | Sans commande | Accès direct /merci | Message approprié ou redirection |
| FORM-034 | Contact affiché | Vérifier | Numéro téléphone contact |
| FORM-035 | Statut commande | Vérifier | "En attente de confirmation" |

---

## 3. Tests Public - Responsive

### 3.1 Mobile (375px)

| ID | Test | Action | Résultat Attendu |
|----|------|--------|------------------|
| RESP-001 | Menu hamburger visible | Viewport 375px | Icône 3 barres visible |
| RESP-002 | Menu desktop caché | Viewport 375px | Liens nav cachés |
| RESP-003 | Ouvrir menu mobile | Cliquer hamburger | Menu slide visible |
| RESP-004 | Liens menu mobile | Vérifier | Tous liens présents |
| RESP-005 | Fermer menu | Cliquer X ou overlay | Menu se ferme |
| RESP-006 | Navigation mobile | Cliquer lien | Navigation + menu ferme |
| RESP-007 | Hero responsive | Vérifier | Texte lisible, image adaptée |
| RESP-008 | Formulaire mobile | Vérifier | Champs pleine largeur |
| RESP-009 | Boutons tactiles | Vérifier taille | Min 44px hauteur |

### 3.2 Tablet (768px)

| ID | Test | Action | Résultat Attendu |
|----|------|--------|------------------|
| RESP-010 | Layout tablet | Viewport 768px | Grille 2 colonnes |
| RESP-011 | Navigation tablet | Vérifier | Menu adapté |
| RESP-012 | Images tablet | Vérifier | Tailles optimisées |

### 3.3 Desktop (1280px)

| ID | Test | Action | Résultat Attendu |
|----|------|--------|------------------|
| RESP-013 | Menu desktop visible | Viewport 1280px | Liens nav visibles |
| RESP-014 | Hamburger caché | Viewport 1280px | Icône hamburger cachée |
| RESP-015 | Layout desktop | Vérifier | Grille complète |
| RESP-016 | Hero desktop | Vérifier | Image grande taille |
| RESP-017 | Footer colonnes | Vérifier | 3-4 colonnes |
| RESP-018 | Hover effects | Survol boutons | Effets visibles |

---

## 4. Tests Admin - Authentification

### 4.1 Login Admin (/admin)

| ID | Test | Action | Résultat Attendu |
|----|------|--------|------------------|
| ADM-001 | Page login | Naviguer /admin | Formulaire affiché |
| ADM-002 | Email vide | Soumettre vide | Erreur validation |
| ADM-003 | Email invalide | Saisir "test" | Erreur format email |
| ADM-004 | Password vide | Soumettre sans mdp | Erreur validation |
| ADM-005 | Credentials invalides | Mauvais mdp | Erreur "Identifiants invalides" |
| ADM-006 | Login réussi | admin@ayoya.bj + mdp | Redirection /admin/dashboard |
| ADM-007 | Token stocké | Après login | localStorage contient token |
| ADM-008 | Logout | Cliquer déconnexion | Redirection /admin, token supprimé |

---

## 5. Tests Admin - Dashboard

### 5.1 Dashboard (/admin/dashboard)

| ID | Test | Action | Résultat Attendu |
|----|------|--------|------------------|
| ADM-009 | Accès non auth | Sans login | Redirection /admin |
| ADM-010 | Chargement dashboard | Après login | Page affichée |
| ADM-011 | Stats commandes | Vérifier | Nombre total affiché |
| ADM-012 | Stats revenus | Vérifier | Montant total affiché |
| ADM-013 | Stats mois | Vérifier | Commandes ce mois |
| ADM-014 | Navigation sidebar | Cliquer liens | Navigation fonctionne |

---

## 6. Tests Admin - Settings

### 6.1 Onglet Prix (/admin/settings)

| ID | Test | Action | Résultat Attendu |
|----|------|--------|------------------|
| ADM-015 | Chargement settings | Naviguer | Page avec onglets |
| ADM-016 | Onglet Prix actif | Par défaut | Premier onglet sélectionné |
| ADM-017 | Prix bouteille | Vérifier valeur | 5000 par défaut |
| ADM-018 | Modifier prix bouteille | Changer à 6000 | Champ mis à jour |
| ADM-019 | Prix livraison | Vérifier valeur | 1000 par défaut |
| ADM-020 | Prix carton | Vérifier valeur | 25000 par défaut |
| ADM-021 | Taille carton | Vérifier valeur | 6 par défaut |
| ADM-022 | Bouton Appliquer | Cliquer | Sauvegarde + confirmation |

### 6.2 Onglet Contact

| ID | Test | Action | Résultat Attendu |
|----|------|--------|------------------|
| ADM-023 | Onglet Contact | Cliquer | Formulaire contact affiché |
| ADM-024 | Champ téléphone | Modifier | Valeur mise à jour |
| ADM-025 | Champ email | Modifier | Valeur mise à jour |
| ADM-026 | Champ adresse | Modifier | Valeur mise à jour |
| ADM-027 | Sauvegarder contact | Appliquer | Confirmation sauvegarde |

### 6.3 Onglet Réseaux Sociaux

| ID | Test | Action | Résultat Attendu |
|----|------|--------|------------------|
| ADM-028 | Onglet Social | Cliquer | Formulaire liens sociaux |
| ADM-029 | Lien Facebook | Saisir URL | Valeur acceptée |
| ADM-030 | Lien Instagram | Saisir URL | Valeur acceptée |
| ADM-031 | Lien TikTok | Saisir URL | Valeur acceptée |
| ADM-032 | Sauvegarder social | Appliquer | Liens mis à jour sur site |

### 6.4 Onglet Emails Notification

| ID | Test | Action | Résultat Attendu |
|----|------|--------|------------------|
| ADM-033 | Onglet Emails | Cliquer | Liste emails affichée |
| ADM-034 | Ajouter email | Saisir + ajouter | Email ajouté à liste |
| ADM-035 | Email invalide | Saisir "test" | Erreur format |
| ADM-036 | Supprimer email | Cliquer supprimer | Email retiré |
| ADM-037 | Liste vide | Supprimer tous | Message "Aucun email" |
| ADM-038 | Sauvegarder emails | Appliquer | Liste sauvegardée |

---

## 7. Tests Admin - Media

### 7.1 Onglet Visuels (/admin/media)

| ID | Test | Action | Résultat Attendu |
|----|------|--------|------------------|
| ADM-039 | Page Media | Naviguer | Page avec onglets |
| ADM-040 | Liste visuels | Vérifier | Visuels existants affichés |
| ADM-041 | Types visuels | Vérifier dropdown | 9 types disponibles |
| ADM-042 | Upload image | Sélectionner fichier | Prévisualisation affichée |
| ADM-043 | Description visuel | Vérifier | Description du type affichée |
| ADM-044 | Confirmer upload | Cliquer upload | Image uploadée, liste mise à jour |
| ADM-045 | Format invalide | Upload .txt | Erreur format |
| ADM-046 | Supprimer visuel | Cliquer supprimer | Visuel retiré |

### 7.2 Onglet Vidéos

| ID | Test | Action | Résultat Attendu |
|----|------|--------|------------------|
| ADM-047 | Onglet Vidéos | Cliquer | Section vidéos |
| ADM-048 | Upload vidéo | Sélectionner .mp4 | Vidéo uploadée |
| ADM-049 | Titre vidéo | Saisir titre | Titre enregistré |
| ADM-050 | Liste vidéos | Vérifier | Vidéos affichées |
| ADM-051 | Supprimer vidéo | Cliquer supprimer | Vidéo retirée |

### 7.3 Onglet Favicon

| ID | Test | Action | Résultat Attendu |
|----|------|--------|------------------|
| ADM-052 | Onglet Favicon | Cliquer | Section favicon |
| ADM-053 | Upload favicon | Sélectionner image | Image uploadée |
| ADM-054 | Redimensionnement | Après upload | Image redimensionnée auto |
| ADM-055 | Prévisualisation | Vérifier | Favicon visible |
| ADM-056 | Application | Recharger site | Nouveau favicon affiché |

---

## 8. Tests Admin - Legal

### 8.1 Page Legal (/admin/legal)

| ID | Test | Action | Résultat Attendu |
|----|------|--------|------------------|
| ADM-057 | Page Legal | Naviguer | Éditeurs CGU/CGV |
| ADM-058 | Contenu CGU | Vérifier | Texte CGU affiché |
| ADM-059 | Modifier CGU | Éditer texte | Modification visible |
| ADM-060 | Sauvegarder CGU | Cliquer sauvegarder | Confirmation |
| ADM-061 | Contenu CGV | Vérifier | Texte CGV affiché |
| ADM-062 | Modifier CGV | Éditer texte | Modification visible |
| ADM-063 | Sauvegarder CGV | Cliquer sauvegarder | Confirmation |
| ADM-064 | Vérifier public | Aller sur /cgu | Nouveau contenu affiché |

---

## 9. Tests Logistics - Authentification

### 9.1 Login Logistics (/logistics)

| ID | Test | Action | Résultat Attendu |
|----|------|--------|------------------|
| LOG-001 | Page login | Naviguer /logistics | Formulaire affiché |
| LOG-002 | Email vide | Soumettre vide | Erreur validation |
| LOG-003 | Credentials invalides | Mauvais mdp | Erreur "Identifiants invalides" |
| LOG-004 | Login admin refusé | admin@ayoya.bj | Accès refusé ou limité |
| LOG-005 | Login réussi | logistique@ayoya.bj + mdp | Redirection /logistics/dashboard |
| LOG-006 | Token stocké | Après login | logisticsToken dans localStorage |
| LOG-007 | Accès admin interdit | Aller /admin/dashboard | Redirection ou erreur |
| LOG-008 | Logout | Cliquer déconnexion | Redirection, token supprimé |

---

## 10. Tests Logistics - Dashboard

### 10.1 Dashboard (/logistics/dashboard)

| ID | Test | Action | Résultat Attendu |
|----|------|--------|------------------|
| LOG-009 | Accès non auth | Sans login | Redirection /logistics |
| LOG-010 | Chargement dashboard | Après login | Page affichée |
| LOG-011 | Stats aujourd'hui | Vérifier | Commandes du jour |
| LOG-012 | Stats semaine | Vérifier | Commandes 7 jours |
| LOG-013 | Stats mois | Vérifier | Commandes 30 jours |
| LOG-014 | Commandes pending | Vérifier | Liste commandes en attente |
| LOG-015 | Commandes en cours | Vérifier | Liste in_delivery |
| LOG-016 | Clic commande | Cliquer ligne | Redirection détail |
| LOG-017 | Navigation sidebar | Cliquer liens | Navigation fonctionne |
| LOG-018 | Rafraîchir stats | Recharger | Stats mises à jour |

---

## 11. Tests Logistics - Commandes

### 11.1 Liste Commandes (/logistics/orders)

| ID | Test | Action | Résultat Attendu |
|----|------|--------|------------------|
| LOG-019 | Page commandes | Naviguer | Table commandes affichée |
| LOG-020 | Colonnes table | Vérifier | ID, Client, Tél, Ville, Qté, Total, Status, Actions |
| LOG-021 | Filtre status | Sélectionner "pending" | Liste filtrée |
| LOG-022 | Filtre date | Sélectionner plage | Liste filtrée |
| LOG-023 | Recherche | Saisir nom client | Résultats filtrés |
| LOG-024 | Pagination | Cliquer page 2 | Nouvelles données |
| LOG-025 | Badge status | Vérifier couleurs | pending=jaune, delivered=vert |
| LOG-026 | Clic ligne | Cliquer commande | Redirection détail |

### 11.2 Détail Commande (/logistics/orders/:id)

| ID | Test | Action | Résultat Attendu |
|----|------|--------|------------------|
| LOG-027 | Page détail | Naviguer | Infos commande affichées |
| LOG-028 | Infos client | Vérifier | Nom, tél, adresse complets |
| LOG-029 | Détails commande | Vérifier | Quantité, type, total |
| LOG-030 | Historique status | Vérifier | Timeline statuts |
| LOG-031 | Select livreur | Ouvrir dropdown | Liste livreurs |
| LOG-032 | Assigner livreur | Sélectionner + confirmer | Livreur assigné, status → assigned |
| LOG-033 | Changer status | Cliquer "En livraison" | Status → in_delivery |
| LOG-034 | Marquer livré | Cliquer "Livré" | Status → delivered |
| LOG-035 | Annuler commande | Cliquer "Annuler" | Confirmation + status → cancelled |
| LOG-036 | Ajouter note | Saisir note | Note sauvegardée |
| LOG-037 | Retour liste | Cliquer retour | Redirection /logistics/orders |

### 11.3 Workflow Commande

| ID | Test | Action | Résultat Attendu |
|----|------|--------|------------------|
| LOG-038 | Workflow complet | pending→confirmed→assigned→in_delivery→delivered | Tous statuts OK |
| LOG-039 | Status invalide | delivered→pending | Erreur ou interdit |
| LOG-040 | Annulation | Depuis n'importe quel status | Status → cancelled |

---

## 12. Tests Logistics - Livreurs

### 12.1 Gestion Livreurs (/logistics/deliveries)

| ID | Test | Action | Résultat Attendu |
|----|------|--------|------------------|
| LOG-041 | Page livreurs | Naviguer | Liste livreurs affichée |
| LOG-042 | Ajouter livreur | Cliquer "Ajouter" | Modal formulaire |
| LOG-043 | Nom requis | Soumettre sans nom | Erreur validation |
| LOG-044 | Téléphone requis | Soumettre sans tél | Erreur validation |
| LOG-045 | Créer livreur | Remplir + soumettre | Livreur ajouté à liste |
| LOG-046 | Modifier livreur | Cliquer éditer | Modal pré-rempli |
| LOG-047 | Sauvegarder modif | Modifier + sauver | Infos mises à jour |
| LOG-048 | Désactiver livreur | Toggle actif | Livreur désactivé |
| LOG-049 | Supprimer livreur | Cliquer supprimer | Confirmation + suppression |
| LOG-050 | Stats livreur | Vérifier | Nb commandes assignées |
| LOG-051 | Livreur dans select | Aller page commande | Livreur dans dropdown |
| LOG-052 | Livreur inactif | Vérifier dropdown | Non visible si inactif |
| LOG-053 | Recherche livreur | Saisir nom | Liste filtrée |
| LOG-054 | Liste vide | Supprimer tous | Message "Aucun livreur" |

---

## 13. Tests API

### 13.1 Endpoints Public

| ID | Test | Endpoint | Résultat Attendu |
|----|------|----------|------------------|
| API-001 | Health | GET /api/health | {"status":"ok"} |
| API-002 | Config publique | GET /api/public/config | Prix, contact, social |
| API-003 | Zones | GET /api/public/zones | 8 zones Cotonou |
| API-004 | CGU | GET /api/public/cgu | Contenu CGU |
| API-005 | CGV | GET /api/public/cgv | Contenu CGV |
| API-006 | Visuels | GET /api/public/visuals | Liste visuels |
| API-007 | Vidéos | GET /api/public/videos | Liste vidéos |
| API-008 | Créer commande | POST /api/orders | ID commande retourné |
| API-009 | Commande invalide | POST /api/orders (vide) | Erreur 422 |

### 13.2 Endpoints Auth

| ID | Test | Endpoint | Résultat Attendu |
|----|------|----------|------------------|
| API-010 | Login valide | POST /api/auth/login | Token JWT |
| API-011 | Login invalide | POST /api/auth/login (mauvais mdp) | Erreur 401 |
| API-012 | Accès protégé sans token | GET /api/admin/stats | Erreur 401 |
| API-013 | Accès avec token | GET /api/admin/stats + Bearer | Données retournées |
| API-014 | Token expiré | Token ancien | Erreur 401 |

### 13.3 Endpoints Admin

| ID | Test | Endpoint | Résultat Attendu |
|----|------|----------|------------------|
| API-015 | Get prices | GET /api/admin/prices | Prix actuels |
| API-016 | Update prices | PUT /api/admin/prices | Prix mis à jour |
| API-017 | Get contact | GET /api/admin/contact | Infos contact |
| API-018 | Update contact | PUT /api/admin/contact | Contact mis à jour |
| API-019 | Get social | GET /api/admin/social | Liens sociaux |
| API-020 | Update social | PUT /api/admin/social | Liens mis à jour |
| API-021 | Get emails | GET /api/admin/emails | Liste emails |
| API-022 | Add email | POST /api/admin/emails | Email ajouté |
| API-023 | Delete email | DELETE /api/admin/emails/:id | Email supprimé |
| API-024 | Upload visual | POST /api/admin/media/visuals | Visual uploadé |
| API-025 | Delete visual | DELETE /api/admin/media/visuals/:id | Visual supprimé |

### 13.4 Endpoints Logistics

| ID | Test | Endpoint | Résultat Attendu |
|----|------|----------|------------------|
| API-026 | Get orders | GET /api/logistics/orders | Liste commandes |
| API-027 | Get order | GET /api/logistics/orders/:id | Détail commande |
| API-028 | Update status | PATCH /api/logistics/orders/:id/status | Status mis à jour |
| API-029 | Assign delivery | POST /api/logistics/orders/:id/assign | Livreur assigné |
| API-030 | Get deliveries | GET /api/logistics/deliveries | Liste livreurs |
| API-031 | Create delivery | POST /api/logistics/deliveries | Livreur créé |
| API-032 | Delete delivery | DELETE /api/logistics/deliveries/:id | Livreur supprimé |

---

## 14. Screenshots à Capturer

| ID | Page | Description | Résolution |
|----|------|-------------|------------|
| SCR-001 | / | Accueil desktop | 1280x720 |
| SCR-002 | / | Accueil mobile | 375x667 |
| SCR-003 | /product | Produit desktop | 1280x720 |
| SCR-004 | /cart | Formulaire commande | 1280x720 |
| SCR-005 | /merci | Confirmation | 1280x720 |
| SCR-006 | /admin | Login admin | 1280x720 |
| SCR-007 | /admin/dashboard | Dashboard admin | 1280x720 |
| SCR-008 | /admin/settings | Settings prix | 1280x720 |
| SCR-009 | /admin/media | Gestion médias | 1280x720 |
| SCR-010 | /logistics | Login logistics | 1280x720 |
| SCR-011 | /logistics/dashboard | Dashboard logistics | 1280x720 |
| SCR-012 | /logistics/orders | Liste commandes | 1280x720 |
| SCR-013 | /logistics/orders/:id | Détail commande | 1280x720 |
| SCR-014 | /logistics/deliveries | Gestion livreurs | 1280x720 |

---

## 15. Exécution des Tests

### Commandes

```bash
# Installer dépendances
npm install

# Exécuter tous les tests
npx playwright test

# Tests par catégorie
npx playwright test tests/public/
npx playwright test tests/admin/
npx playwright test tests/logistics/
npx playwright test tests/api/

# Tests avec UI
npx playwright test --ui

# Générer rapport
npx playwright show-report
```

### Configuration Screenshots

```typescript
// Redimensionner au format Claude (max 1568px)
const screenshot = await page.screenshot();
const resized = await sharp(screenshot)
  .resize(1024, 768, { fit: 'inside' })
  .toBuffer();
```

---

## Validation Requise

**Total: 231 tests**

- [ ] Matrice validée
- [ ] Priorités confirmées
- [ ] Screenshots requis confirmés

**Prêt à implémenter les tests Playwright ?**
