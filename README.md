# golden-hour-calculator
https://photo-spot.vanderlyn.space
## purpose
web app to calculate golden hour at any time, anywhere on the planet
## stack
* kubernetes: k3s
* frontend: 
  * React
  * Typescript
  * fluent ui
  * nginx
* backend:
  * Go
  * GIN
## local setup (still need to setup)
* todo: modify both images to mount their code bases/pickup local changes so no restart is needed
* run local backend
* run local frontend 
  * add var for local running to direct to localhost for backend
* maybe setup docker compose to run both images

## todo mvp
* add ability to search locations 
* update frontend to be responsive
* update to look better
* build better testing for data points
* add other maps servers
  * find better map rendering library
  * https://deck.gl/ 
* add postgres db
* add ability to create an account
* add ability to upload/view photo spot locations

## post mvp
* add ability to check weather
* add ability to save spots
* add notifications for when to get to a spot
* maybe elevation factors?
* other times besides golden hour
