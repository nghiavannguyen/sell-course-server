# command push & build to docker hub

docker buildx build --platform linux/amd64,linux/arm64 -t nghiavannguyen/nest-course:latest --push .
