FROM golang:1.16-alpine
WORKDIR /app

COPY src/go.mod ./
COPY src/go.sum ./
RUN go mod download


COPY src/*.go ./
EXPOSE 8080
RUN go build -o ./docker-backend
CMD ["./docker-backend"]