# Ulala Boss Guide

## App Overview
A mobile-friendly website that makes it easier for Ulala Idle Adventure game players to:
* Add and save their own skill setups for each different boss in the Ulala game
* Search and view other Players’ skill setups to get inspirations 
  
  ![Screenshot](https://i.ibb.co/LgQT9Cq/Screen-Shot-2021-05-14-at-9-11-47-PM.png)

## Technologies
Django, Django Rest Framework, React, Recoil, Ant Design, PostgreSQL, Heroku, Amazon S3, Discord OAuth2

## Links
* Deployed App: https://ulala-boss-guide.herokuapp.com/
* [Pitch Deck](https://docs.google.com/presentation/d/1ALB4iP9oAtfpOkjOLnjqmj4HApzfEUyxRi4z4K8tXn0/edit?usp=sharing) 
* [Task Board](https://www.notion.so/cbcdf382b205436ea422728bb511bafa?v=e1bbde496f8948fc879dccf92863865c)
  
## Future Enhancements
* Performance improvements (caching, state management, serving static files, etc.)
* Features: 
  * Provide grouping of game bosses by area in searching and creating setups
  * Allow for less than 4 skills / toys being selected to be closer to game experience
  * Allow for duplicate character classes in one setup
  * Support batch import of existing setup screenshots via image processing (e.g. OpenCV)
  * Allow users to designate a default setup as the template for creating new setups
  * Allow users to create teams and share setups within the team only