import os
import logging

import webapp2
from google.appengine.ext.webapp.template import render


DEVENV = os.environ['SERVER_SOFTWARE'].startswith('Dev')


def handle_main(request, *args, **kwargs):
  path = os.path.join(os.path.dirname(__file__), 'gae/index.html')
  return webapp2.Response(render(path, {}))


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
  webapp2.Route('/', handler=handle_main, name='home'),
], debug=DEVENV)

app.error_handlers[404] = handle_404
app.error_handlers[500] = handle_500
