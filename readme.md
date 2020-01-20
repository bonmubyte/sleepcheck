#Sleepcheck

when you download zip from github, make sure that AT FIRST, "frontend" goes into "ponynote"/"backend" so that inside the backend folder, webpack-stats.dev.json can be generated (it generates when i yarn start inside the backend folder). And then you can move the frontend folder out againm...

Modern note taking application with Django and ReactJS

This code repository is for my tutorial blog post: [Modern Django](http://v1k45.com/blog/modern-django-part-1-setting-up-django-and-react/).

## How to setup


- Create a virtual env for this project
- Clone it
- `$ pip install -r requirements.txt`
- `$ cd ponynote/frontend`
- `$ npm install`
- `$ npm run start`
- `$ python manage.py runserver`
