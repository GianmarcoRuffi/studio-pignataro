NPM = npm

.PHONY: start format install build start-prod

start:
	$(NPM) run dev

format:
	$(NPM) run format

install:
	$(NPM) install

build:
	$(NPM) run build

start-prod:
	$(NPM) run start
