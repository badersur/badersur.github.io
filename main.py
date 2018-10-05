import os
import logging

import webapp2
import jinja2

IS_PERMANENT = False
IS_DEV_ENV = os.environ.get('SERVER_SOFTWARE', '').startswith('Dev')

TEMPLATE_DIR = os.path.join(os.path.dirname(__file__), 'gae')
JINJA_ENV = jinja2.Environment(loader=jinja2.FileSystemLoader(TEMPLATE_DIR),
                               autoescape=True)


def render_file(template, **params):
    t = JINJA_ENV.get_template(template)
    return t.render(params)


def add_headers(response, ua_compat=False, csp=False):
    response.headers.add('X-Frame-Options', 'deny')
    response.headers.add('X-Xss-Protection', '1; mode=block')
    response.headers.add('X-Content-Type-Options', 'nosniff')
    response.headers.add('Strict-Transport-Security',
                         'max-age=10886400; includeSubDomains')
    if ua_compat:
        response.headers.add('X-UA-Compatible', 'IE=edge')
    if csp:
        response.headers.add(
            'Content-Security-Policy',

            "default-src 'self';" +
            "script-src 'self' 'unsafe-inline' https://www.google-analytics.com;" +
            "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;" +
            "img-src 'self' https://www.google-analytics.com;" +
            "font-src https://fonts.gstatic.com;"
        )


def get_uri(request, path='self'):
    if path != 'self':
        uri = path
    else:
        uri = request.path
    server_name = request.server_name
    if not IS_DEV_ENV:
        uri = 'https://' + server_name + uri
    return uri


class HomePage(webapp2.RequestHandler):

    def get(self):
        add_headers(self.response)
        uri = get_uri(self.request, '/ar/')
        self.redirect(uri, permanent=IS_PERMANENT)


class Redirector(webapp2.RequestHandler):

    def get(self, path):
        add_headers(self.response)
        uri = get_uri(self.request, '/ar/' + path)
        self.redirect(uri, permanent=IS_PERMANENT)


def shoud_go2https(request):
    return not IS_DEV_ENV and request.scheme == 'http'


def go2https(request, response):
    response.headers['Location'] = get_uri(request)
    response.set_status(302)


def handle_404(request, response, exception):
    if shoud_go2https(request):
        return go2https(request, response)
    logging.exception(exception)
    response.set_status(404)
    add_headers(response, ua_compat=True, csp=True)
    error_page = render_file('404.html')
    response.write(error_page)


def handle_500(request, response, exception):
    if shoud_go2https(request):
        return go2https(request, response)
    logging.exception(exception)
    response.set_status(500)
    add_headers(response)
    response.write('A server error occurred!')


app = webapp2.WSGIApplication([
    ('/', HomePage),
    ('/(courses|projects)/?', Redirector),
], debug=IS_DEV_ENV)

app.error_handlers[404] = handle_404
app.error_handlers[500] = handle_500
