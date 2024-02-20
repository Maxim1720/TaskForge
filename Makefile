restart:
	@make down
	@make up
down:
	docker compose down --remove-orphans
up:
	docker compose up -d --build
open-backend:
	docker compose exec -it backend sh
restart-backend:
	docker compose restart backend
