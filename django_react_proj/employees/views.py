from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

from .models import Employee
from .serializers import *

# Create your views here.
# When GET Request or POST Request is sent to API
@api_view(['GET', 'POST'])
def employees_list(request):
    # If GET Request is received
    if request.method == 'GET':
        data = Employee.objects.all()
        serializer = EmployeeSerializer(data, context = {'request' : request}, many = True)
        return Response(serializer.data)
    # If POST Request is received
    elif request.method == 'POST':
        serializer = EmployeeSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status = status.HTTP_201_CREATED)

        return Response(status = status.HTTP_400_BAD_REQUEST)

# When PUT Request or DELETE Request is sent to API
@api_view(['PUT', 'DELETE'])
def employees_detail(request, pk):
    try:
        employee = Employee.objects.get(pk = pk);
    except Employee.DoesNotExist:
        return Response(status = status.HTTP_400_BAD_REQUEST)
    # Employee whose details are to be edited or deleted, is stored in employee object
    # If PUT Request is received
    if request.method == 'PUT':
        serializer = EmployeeSerializer(employee, data = request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_204_NO_CONTENT)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    # If PUT Request is received
    elif request.method == 'DELETE':
        # Delete above fetched employee object
        employee.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
