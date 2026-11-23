# Cristian Coaching
Demo italiana di coaching individuale in Next.js App Router, React e TypeScript. I dati sono fittizi e indipendenti su ciascun dispositivo. Nessuna password o sincronizzazione.

## Avvio
Usare Node.js 22.13 o successivo, eseguire `npm install`, poi `npm run dev`. Aprire http://localhost:3000. Per la produzione usare `npm run build` e `npm start`. Controlli: `npm run typecheck` e `npm test`.

## Percorsi
Homepage, /chi-sono, /come-funziona, /registrazione, /accesso e /demo sono pubblici. Da /demo scegliere Cristian, Marco o un altro profilo. I clienti vedono solo le proprie schede. Un account in attesa può richiedere la prima consulenza. Nella demo è sempre possibile cambiare ruolo. Le restrizioni dell’interfaccia non sono autenticazione.

## Prova guidata
1. Registra un nome fittizio, apri Appuntamenti e scegli un giorno e una fascia disponibile.
2. Cambia ruolo in Area demo. Come Cristian apri Registrazioni per approvare il profilo e Calendario per confermare separatamente la richiesta.
3. In Schede crea una scheda, aggiungi giornate ed esercizi e salvala per un cliente. Rientra con quel profilo.
4. In Video apri un esercizio e scegli un file MP4/WebM, controlla l’anteprima e salva. Rimuovendo il file riappare il tutorial originale, se presente.
5. In Impostazioni puoi ricreare i dati iniziali. Questa operazione elimina anche i video caricati.

## Dati e architettura
lib/data.ts contiene profili, programmi individuali, catalogo di otto tutorial, disponibilità e appuntamenti relativi alla data corrente. lib/calendar.ts calcola gli slot orari in Europe/Rome. lib/store.ts applica gli aggiornamenti in transazioni IndexedDB; i file video sono Blob. localStorage conserva la selezione del ruolo. Limite per file 100 MB; la quota effettiva dipende dal browser. components contiene interfacce e flussi, app il layout e il routing. Il manifest e il service worker preparano l’installazione e la pagina di cortesia offline. I tutorial YouTube richiedono Internet e rispettano le restrizioni del titolare. Il visual del disco è originale e il contenitore hero è pronto per un futuro asset del coach.

## Vercel
Importare esclusivamente Domenico-lel/CRISTIAN-COACHING. Framework Next.js, root del repository, produzione main, build e output automatici, nessuna variabile richiesta. Con integrazione Git attiva i push su main generano deployment di produzione.

## Evoluzione backend
Sostituire il servizio IndexedDB con un repository remoto. Implementare autenticazione e autorizzazione per cliente e coach sul server, regole di accesso per record, vincoli transazionali per gli slot, storage privato dei video e URL firmati. Prevedere migrazioni, backup, informative e gestione della cancellazione prima dell’uso con persone reali.