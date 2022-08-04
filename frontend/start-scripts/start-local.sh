#!/bin/bash
docker run -e API_HOST="host.docker.internal:8000" -p 8000:80 frontend
#go to http://localhost:8000