# --- jstool-http

git_branch = git rev-parse --abbrev-ref HEAD

install:
	@npm install

build: install
	$(shell npm bin)/rollup src/browser.js --format umd --output dist/browser.js -n \$http
	$(shell npm bin)/rollup src/http-node.js --format cjs --output http-node.js
	$(shell npm bin)/rollup src/wrapper.js --format cjs --output wrapper.js

publish:
	npm version patch
	git push origin $(git_branch)

master.increaseVersion:
	git checkout master
	@git pull origin master
	@node make pkg:increaseVersion

git.increaseVersion: master.increaseVersion
	git commit -a -n -m "increased version [$(shell node make pkg:version)]"
	@git push origin master

git.updateRelease:
	git checkout release
	@git pull origin release
	@git merge --no-edit master

release: auto.install test git.increaseVersion git.updateRelease build
	@git add dist -f --all
	-git commit -n -m "updating built versions"
	@git push origin release
	@echo "\n\trelease version $(shell node make pkg:version)\n"
	@git checkout master
	npm publish
	node make gh-release

echo:
	@echo "make options: test build dev live"

# DEFAULT TASKS

.DEFAULT_GOAL := build
