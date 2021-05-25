#!/usr/bin/python

import http.client, urllib.request, urllib.parse, urllib.error
import json
from os import walk
from os.path import splitext

import argparse

def loadLanguages(projectID, localesFolder, api_token ):
    print('Loading languages')
    params = urllib.parse.urlencode({'api_token': api_token, 'id': projectID })
    headers = {"Content-type": "application/x-www-form-urlencoded",
                "Accept": "text/plain"}
    conn = http.client.HTTPSConnection("api.poeditor.com")
    conn.request("POST", "/v2/languages/list", params, headers)
    response = conn.getresponse()

    data = response.read()
    conn.close()

    results = json.loads(data)  # obj now contains a dict of the data
    
    languages = []

    if results['response']['code'] == '200':
        for language in results['result']['languages']:
            languages.append(language['code'])
    
    for language in languages:
        loadLanguage( language, projectID, localesFolder, api_token )

def loadLanguage( language, projectID, localesFolder, api_token  ):
    print('Loading: '+language)
    params = urllib.parse.urlencode({'api_token': api_token, 'action': 'view_terms', 'id': projectID, 'type': 'json', 'language': language})
    headers = {"Content-type": "application/x-www-form-urlencoded",
                "Accept": "text/plain"}
    conn = http.client.HTTPSConnection("poeditor.com")
    conn.request("POST", "/api/", params, headers)
    response = conn.getresponse()

    data = response.read()
    conn.close()

    results = json.loads(data)    # obj now contains a dict of the data

    if results['response']['code'] == '200':
        # Open file
        fo = open(localesFolder+"/"+language+".yaml", "wb")

        n_terms = 0
        for translation in results['list']:
            if translation['definition']['form'] == "" or not translation['term'].startswith('landing'):
                continue
            n_terms += 1
            lineUtf8 = (translation['term'] + ": \n    other: \"" + translation['definition']['form'].replace('\\','\\\\').replace('\n', '\\n') + "\"\n").encode('UTF-8')
            fo.write(lineUtf8);

        # Close opend file
        fo.close()
        print('Finished: '+language+" ("+str(n_terms)+' terms)')