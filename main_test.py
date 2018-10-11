#!/usr/bin/env python
# -*- coding: utf-8 -*-

# see https://cloud.google.com/appengine/docs/standard/python/tools/handlertesting
import unittest
import webtest
import main


class AppTest(unittest.TestCase):
    def setUp(self):
        # Wrap the app with WebTest’s TestApp.
        self.testapp = webtest.TestApp(main.app)

    def testHomePage(self):
        response = self.testapp.get('/')
        self.assertEqual(response.status_int, 302)
        self.assertEqual(response.location, 'http://localhost/ar/')

    def testRedirector(self):
        response = self.testapp.get('/courses/')
        self.assertEqual(response.status_int, 302)
        self.assertEqual(response.location, 'http://localhost/ar/courses')

    def testHandle404(self):
        response = self.testapp.get('/404', status=404)
        self.assertEqual(response.status_int, 404)

    def testAddHeaders(self):
        response = self.testapp.get('/')
        main.add_headers(response, ua_compat=True, csp=True)
        self.assertEqual(
            response.headers['X-Xss-Protection'], '1; mode=block')

        self.assertEqual(
            response.headers['X-Content-Type-Options'], 'nosniff')

        self.assertEqual(
            response.headers['Strict-Transport-Security'], 'max-age=31536000')

        self.assertEqual(
            response.headers['X-UA-Compatible'], 'IE=edge')

        csp_header = response.headers['Content-Security-Policy']
        object_src = "object-src 'none'; "
        script_src = "script-src 'self' 'unsafe-inline' https://www.google-analytics.com;"

        assert object_src in csp_header and script_src in csp_header

    def testGetUri(self):
        response = self.testapp.get('/')
        request = response.request
        uri = main.get_uri(request)
        self.assertEqual(uri, '/')

        uri = main.get_uri(request, '/awesome-path')
        self.assertEqual(uri, '/awesome-path')
