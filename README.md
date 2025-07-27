# AutoMultiService S.a.S. - Sito Web Ufficiale

🚗 **AutoMultiService S.a.S.** - 25 anni di esperienza nell'acquisto di veicoli incidentati, chilometrati e d'epoca.

## 📋 Descrizione

Sito web ufficiale di AutoMultiService S.a.S., azienda specializzata nell'acquisto di veicoli con 25 anni di esperienza nel settore. Il sito offre informazioni sui servizi, valutazioni gratuite e contatti diretti.

## ✨ Funzionalità

- 🏠 **Homepage** - Presentazione servizi e azienda
- 🛠️ **Servizi** - Acquisto veicoli incidentati, chilometrati e d'epoca
- 🏢 **Chi Siamo** - Storia aziendale e informazioni
- 📞 **Contatti** - Moduli di contatto e informazioni di contatto
- 📱 **Responsive Design** - Ottimizzato per mobile, tablet e desktop
- ⚡ **Performance** - Caricamento veloce e ottimizzazioni SEO
- 🗺️ **Mappa Integrata** - Localizzazione sede aziendale

## 🔧 Feature Flags

Il progetto include un sistema di feature flags per controllare funzionalità specifiche:

- **AMS Classics**: Sezione dedicata ai veicoli d'epoca (attualmente disabilitata)
- **Sistema modulare** per abilitare/disabilitare funzionalità

### Abilitazione AMS Classics
```javascript
// Nel file src/config/features.js
FEATURE_FLAGS.AMS_CLASSICS_ENABLED = true;
```

## 🚀 Tecnologie Utilizzate

- **React 18** - Framework JavaScript
- **React Router** - Routing applicazione
- **Anime.js** - Animazioni fluide
- **CSS3** - Styling moderno e responsive
- **Helmet** - Meta tags e SEO
- **Lazy Loading** - Ottimizzazione performance

## 📦 Installazione e Sviluppo

### Prerequisiti
- Node.js 18+ 
- npm o yarn

### Setup Locale
```bash
# Clona il repository
git clone https://github.com/tuo-username/automultiservice-website.git

# Entra nella directory
cd automultiservice-website

# Installa le dipendenze
npm install

# Avvia il server di sviluppo
npm start
```

Il sito sarà disponibile su `http://localhost:3000`

## 🏗️ Build e Deploy

### Build di Produzione
```bash
npm run build
```

### Deploy su Vercel
Il progetto è configurato per il deploy automatico su Vercel:

1. Collega il repository GitHub a Vercel
2. Vercel rileverà automaticamente la configurazione React
3. Deploy automatico ad ogni push su main

## 📂 Struttura del Progetto

```
src/
├── components/          # Componenti React riutilizzabili
│   ├── Hero.js         # Sezione hero principale
│   ├── Services.js     # Sezione servizi
│   ├── About.js        # Sezione chi siamo
│   ├── Contact.js      # Sezione contatti
│   ├── Navigation.js   # Navigazione principale
│   ├── GoogleMap.js    # Mappa integrata
│   └── FeatureBlocked.js # Componente per feature disabilitate
├── pages/              # Pagine dell'applicazione
│   ├── Home.js         # Homepage principale
│   └── AMSClassicsPage.js # Pagina veicoli d'epoca
├── config/             # Configurazioni
│   └── features.js     # Feature flags
├── styles/             # File CSS
│   ├── App.css         # Stili principali
│   ├── Locations.css   # Stili sezioni geografiche
│   └── Classics.css    # Stili pagina classics
└── public/             # Asset statici
    └── immagineintestazione.jpg # Logo aziendale
```

## 📱 Contatti Azienda

- **Indirizzo**: Via del Lavoro, 12 - 40061 Minerbio (Bologna)
- **Telefono**: 338.748.7512 / 388.726.5091
- **Email**: info@automultiservice.it
- **WhatsApp**: 338.748.7512
- **Fondazione**: 2000
- **P.IVA**: 04704900283

## 📄 Licenza

Questo progetto è proprietà di AutoMultiService S.a.S. Tutti i diritti riservati.

## 🛠️ Supporto

Per supporto tecnico o modifiche al sito, contattare il team di sviluppo.

---

**AutoMultiService S.a.S.** - Dal 2000 al vostro servizio 🚗