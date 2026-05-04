# Install all dependencies
install:
	npm ci

# Install only prod dependencies
install-prod:
	npm ci --production

# Install pre-commit hooks
pre-commit-install:
	npm run prepare

# Manually trigger pre-commit hooks
pre-commit-run:
	npx lint-staged

# Run development server
dev:
	npm run dev

# Build production ready static files
build:
	npm run build

# Preview production build
preview:
	npm run preview

lint-html:
	npm run lint:html

lint-css:
	npm run lint:css

lint-js:
	npm run lint:js

lint-prettier:
	npm run lint:prettier

format-html:
	npm run format:html

format-css:
	npm run format:css

format-js:
	npm run format:js

format-prettier:
	npm run format:prettier

lint: lint-html lint-css lint-js lint-prettier

format: format-html format-css format-js format-prettier

# Start all services in detached mode
compose-up:
	docker compose up

# Stop running services without removing containers
compose-stop:
	docker compose stop

# Stop and remove containers, networks, and related resources
compose-down:
	docker compose down

# Build or rebuild service images
compose-build:
	docker compose build

# Follow service logs in real time
compose-logs:
	docker compose logs -f

# Show current status of compose services
compose-ps:
	docker compose ps

# Restart running services
compose-restart:
	docker compose restart

# Open a shell inside the app container
compose-shell:
	docker compose exec app sh

.PHONY: install install-prod pre-commit-install pre-commit-run dev \
				build preview lint-html lint-css lint-js lint-prettier format-html format-css format-js format-prettier lint format \
				compose-up compose-stop compose-down compose-build compose-logs compose-ps compose-restart compose-shell \
