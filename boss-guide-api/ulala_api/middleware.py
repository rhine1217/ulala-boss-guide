from django.http import HttpResponse
from django.conf import settings

CORS_ALLOWED_ORIGINS = getattr(settings, 'CORS_ALLOWED_ORIGINS')
CORS_ALLOW_METHODS = getattr(settings, 'CORS_ALLOW_METHODS', ['POST', 'GET', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'])
CORS_ALLOW_HEADERS = getattr(settings, 'CORS_ALLOW_HEADERS', ['content-type', 'authorization'])
CORS_ALLOW_CREDENTIALS = getattr(settings, 'CORS_ALLOW_CREDENTIALS', True)
CORS_EXPOSE_HEADERS = getattr(settings, 'CORS_EXPOSE_HEADERS', ['content-type', 'location'])

class CorsMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def set_headers(self, response):
        response['Access-Control-Allow-Origin'] = CORS_ALLOWED_ORIGINS
        response['Access-Control-Allow-Methods'] = ','.join(CORS_ALLOW_METHODS)
        response['Access-Control-Allow-Headers'] = ','.join(CORS_ALLOW_HEADERS)
        response['Access-Control-Allow-Credentials'] = 'true' if CORS_ALLOW_CREDENTIALS else 'false'
        response['Access-Control-Expose-Headers'] = ','.join(CORS_EXPOSE_HEADERS)

        return response

    def __call__(self, request):
        response = self.get_response(request)
        response = self.set_headers(response)
        return response