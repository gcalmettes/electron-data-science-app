#!/bin/bash

# build frontend
npm run build:prod

# build python api
pyinstaller app/pyserver/api.py --distpath dist/pyserver
rm -rf build/
rm -rf api.spec

# build iconset
npm run generate:icons

# package electron app
npm run package:dist