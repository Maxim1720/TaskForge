# Simple guide for run TaskForge application

## If you wanna run without docker

1. run db
	docker compose up pg -d
2. run backend
	php artisan serve
3. run front:
	npm run dev -- --host

## For isolation from your OS, run docker compose

1. if you're using linux, run:
```
make restart
```

2. if you're gay (still using Windows), run: 
```
docker compose up -d --build
```

Anyway, you need execute compose file.

