// Feature flags per controllo funzionalità
export const FEATURE_FLAGS = {
  // Abilita/disabilita la pagina AMS Classics
  AMS_CLASSICS_ENABLED: false,
  
  // Messaggio da mostrare quando la pagina è disabilitata
  AMS_CLASSICS_DISABLED_MESSAGE: "La sezione AMS Classics è temporaneamente in manutenzione. Tornerà presto disponibile!",
  
  // Altre feature flags future
  ADVANCED_SEARCH_ENABLED: true,
  CONTACT_FORM_ENABLED: true,
  NEWSLETTER_ENABLED: true
};

// Funzione per abilitare AMS Classics (da usare in console o per futuri comandi)
export const enableAMSClassics = () => {
  console.log("🚗 AMS Classics abilitato!");
  return true;
};

// Funzione per disabilitare AMS Classics
export const disableAMSClassics = () => {
  console.log("🔒 AMS Classics disabilitato!");
  return false;
};