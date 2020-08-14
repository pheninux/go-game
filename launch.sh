#export PATH=$PATH:/usr/local/bin
cd ./cmd/web
rice clean
rice embed-go
#go build
#GOOS=linux GOARCH=amd64 go build
#GOOS=darwin GOARCH=amd64 go build
#gzip web
#scp web root@54.38.189.215:/var/www/go/deploy/game/
#cd ..
#cd ..
#go run ./cmd/web