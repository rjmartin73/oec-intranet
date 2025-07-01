from django.http import JsonResponse


def hello_api(request):
    return JsonResponse({"message": "👋 Hello from the OEC API!"})


def calendar_api(request):
    return JsonResponse({"message": "📅 Calendar API endpoint!"})
