docker build --platform=linux/amd64 -f Dockerfile --force-rm  -t developer-docs .

docker tag developer-docs:latest 576263512135.dkr.ecr.$REGION.amazonaws.com/core/docs:$TAG

aws ecr get-login-password --region $REGION | docker login --username AWS --password-stdin 576263512135.dkr.ecr.$REGION.amazonaws.com

docker push 576263512135.dkr.ecr.$REGION.amazonaws.com/core/docs:$TAG
