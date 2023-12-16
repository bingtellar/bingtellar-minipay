import json
import os
from django.http import JsonResponse
from django.shortcuts import render

# Create your views here.


def abi(request):
    abi = open(os.path.abspath('celo/remit_abi.json'))
    return JsonResponse(json.load(abi), safe=False)
