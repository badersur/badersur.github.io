import os
import logging

import webapp2
from google.appengine.ext.webapp.template import render

IS_DEV_ENV = os.environ['SERVER_SOFTWARE'].startswith('Dev')
IS_PERMANENT = False


class HomePage(webapp2.RequestHandler):

  def get(self):
    self.response.headers.add('X-Content-Type-Options', 'nosniff')
    self.response.headers.add('Strict-Transport-Security', 'max-age=10886400; includeSubDomains')
    self.redirect('/ar/', permanent=IS_PERMANENT)


class Redirector(webapp2.RequestHandler):

  def get(self, path):
    self.response.headers.add('X-Content-Type-Options', 'nosniff')
    self.response.headers.add('Strict-Transport-Security', 'max-age=10886400; includeSubDomains')
    self.redirect('/ar/' + path, permanent=IS_PERMANENT)


def handle_404(request, response, exception):
  logging.exception(exception)
  path = os.path.join(os.path.dirname(__file__), 'gae/404.html')
  response.write(render(path, {}))
  response.set_status(404)
  response.headers.add('X-UA-Compatible', 'IE=edge')
  response.headers.add('X-Content-Type-Options', 'nosniff')
  response.headers.add('Strict-Transport-Security', 'max-age=10886400; includeSubDomains')


def handle_500(request, response, exception):
  logging.exception(exception)
  response.write('A server error occurred!')
  response.set_status(500)
  response.headers.add('X-Content-Type-Options', 'nosniff')
  response.headers.add('Strict-Transport-Security', 'max-age=10886400; includeSubDomains')


app = webapp2.WSGIApplication([
  ('/', HomePage),
  ('/(courses|projects)/?', Redirector),
], debug=IS_DEV_ENV)

app.error_handlers[404] = handle_404
app.error_handlers[500] = handle_500
