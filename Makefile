tutorial:
	@# todo: have this actually run some kind of tutorial wizard?
	@echo "Please read the 'Makefile' file to go through this tutorial"

start:
	pnpm run dev

test:
	pnpm run test

build:
	pnpm run build

story:
	pnpm run storybook

cypress:
	pnpm run cypress:open
