from django.conf.urls import include, url
from rest_framework import routers
from .api import NoteViewSet, RegistrationAPI, LoginAPI, UserAPI

router = routers.DefaultRouter()
router.register('notes', NoteViewSet, 'notes')
# This will make sure the notes api is only accessible to authenticated users and the users get to see and modify their own notes only.

urlpatterns = [
    url("^", include(router.urls)),
    url("^auth/register/$", RegistrationAPI.as_view()),
    url("^auth/login/$", LoginAPI.as_view()),
    url("^auth/user/$", UserAPI.as_view()),
]
