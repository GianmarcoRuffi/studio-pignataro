
NPM = npm

# Comandi
.PHONY: start format install build clean

# Avvia l'app in modalità di sviluppo
start:
	$(NPM) run dev

# Esegue il formatter (es. Prettier)
format:
	$(NPM) run format

# Installa le dipendenze del progetto
install:
	$(NPM) install

# Crea la build di produzione
build:
	$(NPM) run build

# Pulisce la cartella di build
clean:
	rm -rf .next

# Comando per avviare il server di produzione
start-prod:
	$(NPM) run start
