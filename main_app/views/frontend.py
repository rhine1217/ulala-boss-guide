import os
import logging
from django.http import HttpResponse
from django.views.generic import View
from django.conf import settings


class FrontEndAppView(View):
    """
    Serves the compiled frontend entry point.
    """
    index_file_path = os.path.join(settings.REACT_APP_DIR, 'build', 'index.html')

    def get(self, request):
        try:
            with open(self.index_file_path) as f:
                return HttpResponse(f.read(), content_type='application/javascript')
        except FileNotFoundError:
            logging.exception('Production build of app not found')
            return HttpResponse(status=501)