# Setup Steps
- setup k8s nginx ingress for bare metal
- setup metallb (software load balancer for bare metal) 
- setup postgres db
- - username
- - strong-password-lol
- - setup vault to inject creds later


# whats needed
- ingress setup
- - config to be able to access site from internet 
- lets encrypt/cert for https website
- postgres finished being setup
- test connection between frontend/backend
- figure out any other networking between frontend/backend service
# future improvements
- better pipeline for modifying infra
- pipeline for pushing out code changes for any project on kubes cluster
- figure out data migration workflow
- swagger setup for testing endpoints
- cyprus testing/pipelines 
- maybe terraform setup for deploying stuff to projects? xD