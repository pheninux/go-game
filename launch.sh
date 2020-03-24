cd cmd/web
rice clean
rice embed-go
go build
gzip web
scp web.gz root@54.38.189.215:/var/www/go/deploy/game/
cd ..
cd ..
#go run ./cmd/web