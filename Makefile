all: build

build: node_modules
	rm -rf dist/*
	npm run build

dev: node_modules format build
	node dist/index.js

format: node_modules
	npm run format

node_modules: package.json package-lock.json
	rm -rf node_modules
	npm ci
