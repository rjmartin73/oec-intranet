#!/bin/bash

echo "📦 Installing frontend dependencies..."
cd frontend
npm install
npm run build
cd ..

echo "🧠 Applying Django migrations..."
python manage.py migrate --noinput

echo "🎨 Collecting static files..."
python manage.py collectstatic --noinput

echo "🚀 Starting Gunicorn server..."
gunicorn intranet.wsgi:application --bind=0.0.0.0:8000
