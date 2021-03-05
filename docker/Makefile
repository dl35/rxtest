UID:=$(shell id -u)
GID:=$(shell id -g)
CC:=docker-compose


all: help

%:
	@:

help:
	@echo "usage:"
	@echo
	@echo "  make build"
	@echo "  make clean"
	@echo "  make dev"
	@echo

b:
	docker-compose build --no-cache

build:
	docker-compose build  --no-cache

clean: 
	docker-compose down --rmi local

net-ls:
	docker network ls
	docker inspect docker_run bad adress ping
	ng_node-network

up: 
	docker-compose up
dev: 
	CURRENT_UID=1000:1000 docker-compose run --rm  --name angular  --service-ports angular

ng: 
	CURRENT_UID=1000:1000 docker-compose run --rm  --name angular --service-ports angular --entrypoint 
	# ./serve.sh
	#docker exec -it  -e UID=`id -u` -e GID=`id -g`  angular sh


node:
	CURRENT_UID=1000:1000 docker-compose run --rm  --name node --service-ports node
	clean