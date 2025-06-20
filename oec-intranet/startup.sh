#!/bin/bash
gunicorn intranet.wsgi --chdir oec-intranet --bind=0.0.0.0 --timeout 600
