#!/bin/bash
gunicorn intranet.wsgi --chdir /home/site/wwwroot/oec-intranet --bind=0.0.0.0 --timeout 600
