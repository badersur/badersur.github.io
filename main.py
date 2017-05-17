import os
import logging

import webapp2
from google.appengine.ext.webapp.template import render

DEVENV = os.environ['SERVER_SOFTWARE'].startswith('Dev')


class HomePage(webapp2.RequestHandler):

  def get(self):
    self.redirect('/ar/', permanent=True)


def handle_404(request, response, exception):
  logging.exception(exception)
  path = os.path.join(os.path.dirname(__file__), 'gae/404.html')
  response.write(render(path, {}))
  response.set_status(404)


def handle_500(request, response, exception):
  logging.exception(exception)
  response.write('A server error occurred!')
  response.set_status(500)


app = webapp2.WSGIApplication([
  ('/', HomePage),
], debug=DEVENV)

app.error_handlers[404] = handle_404
app.error_handlers[500] = handle_500
