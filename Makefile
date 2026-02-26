.PHONY: all build clean lint format release tag git-push

VERSION := $(shell node -p "require('./package.json').version")

build:
	npm run build

clean:
	npm run clean

lint:
	npm run lint

format:
	npm run format

tag:
	git tag -a v$(VERSION) -m "Release v$(VERSION)"
	git push origin v$(VERSION)

git-push:
	git add .
	git commit -m "chore: release v$(VERSION)"
	git push origin master

release: build
	npm publish --access public

all: git-push tag release