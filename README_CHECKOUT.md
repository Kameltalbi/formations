# Système de Checkout Dual - Formation Bilan Carbone®

## 🎯 **Vue d'ensemble**

Ce système propose **deux pages de checkout distinctes** selon la région de l'utilisateur, avec des liens de paiement Konnect spécifiques pour chaque région.

## 🌍 **Détection automatique de région**

### **Méthodes de détection (par ordre de priorité) :**
1. **Cache localStorage** - Évite les requêtes répétées
2. **TLD (.tn)** - Détection par domaine
3. **Fuseau horaire** - Détection par timezone
4. **Langue du navigateur** - Détection par langue
5. **API IP** - Détection par adresse IP (fallback)

## 📍 **Routes du système**

### **Page de redirection intelligente**
- **Route :** `/checkout`
- **Fonction :** Détecte la région et redirige automatiquement
- **Comportement :** Redirection vers `/checkout-tn` ou `/checkout-intl`

### **Checkout Tunisie**
- **Route :** `/checkout-tn`
- **Prix :** 600 TND
- **Modes de paiement :**
  - 💳 Carte bancaire → Redirige vers `/payment-tn`
  - 💰 Espèces → Enregistrement direct
  - 🏦 Virement → Enregistrement direct
  - 📄 Chèque → Enregistrement direct

### **Checkout International**
- **Route :** `/checkout-intl`
- **Prix :** 300 USD
- **Modes de paiement :**
  - 💳 Carte bancaire → Redirige vers `/payment-intl`
  - 🌍 MoneyGram → Enregistrement direct

### **Pages de paiement Konnect**
- **Route Tunisie :** `/payment-tn`
- **Route International :** `/payment-intl`
- **Fonction :** Page de transition avec compte à rebours vers Konnect

## 🔗 **Liens Konnect configurés**

### **Tunisie**
- **URL :** https://knct.me/AVqlWiEIC
- **Prix :** 600 TND
- **Devise :** TND (Dinar tunisien)

### **International**
- **URL :** https://knct.me/VnXSe9LmA
- **Prix :** 300 USD
- **Devise :** USD (Dollar américain)
- **Taux de change :** 1 USD ≈ 2.879 TND

## 🚀 **Flux utilisateur**

### **Utilisateur en Tunisie :**
1. Clic sur "Acheter" → `/checkout`
2. Détection automatique → `/checkout-tn`
3. Remplissage du formulaire
4. Sélection "Carte bancaire" → `/payment-tn`
5. Compte à rebours → Konnect Tunisie (600 TND)

### **Utilisateur à l'international :**
1. Clic sur "Acheter" → `/checkout`
2. Détection automatique → `/checkout-intl`
3. Remplissage du formulaire
4. Sélection "Carte bancaire" → `/payment-intl`
5. Compte à rebours → Konnect International (300 USD)

## 💾 **Stockage des données**

### **Base de données Supabase**
- **Table :** `inscriptions`
- **Champs :** Prénom, nom, email, téléphone, société, fonction, pays, notes, mode de paiement, région détectée, prix, devise, statut

### **Cache local**
- **Clé :** `ab_country`
- **Valeurs :** `"TN"` ou `"INTL"`
- **Durée :** Persistant jusqu'à suppression

## 🔧 **Configuration technique**

### **Variables d'environnement requises**
```bash
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### **Dépendances principales**
- React Router DOM
- Supabase Client
- Tailwind CSS

## 📱 **Responsive design**
- **Mobile :** Formulaire en colonne unique
- **Tablet :** Grille adaptative
- **Desktop :** Formulaire + résumé en colonnes

## 🎨 **Thème et couleurs**
- **Primaire :** Vert (#16a34a)
- **Accent :** Émeraude (#059669)
- **Texte :** Gris foncé (#374151)
- **Arrière-plan :** Gris clair (#f9fafb)

## ✅ **Avantages du système**

1. **Simplicité** - Pas d'API Konnect complexe
2. **Fiabilité** - Liens directs vers Konnect
3. **UX optimisée** - Détection automatique de région
4. **Maintenance facile** - Liens configurables
5. **Sécurité** - Redirection sécurisée vers Konnect

## 🔄 **Mise à jour des liens Konnect**

Pour modifier les liens de paiement, éditez les fichiers :
- **Tunisie :** `src/pages/PaymentTN.tsx` et `src/pages/CheckoutTN.tsx`
- **International :** `src/pages/PaymentIntl.tsx` et `src/pages/CheckoutIntl.tsx`

## 🧪 **Test du système**

1. **Test Tunisie :** Accédez à `/checkout-tn`
2. **Test International :** Accédez à `/checkout-intl`
3. **Test automatique :** Accédez à `/checkout`

Le système détectera automatiquement votre région et vous redirigera vers la bonne page !
