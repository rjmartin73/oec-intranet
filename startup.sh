#!/bin/bash
gunicorn intranet.wsgi --bind=0.0.0.0 --timeout 600
