from rest_framework import serializers
from employees.models import Employee
from django.db import models

class EmployeeSerializer(serializers.ModelSerializer):
    # Meta data is important to serialize the fields in Employee Model
    class Meta:
        model = Employee
        fields = ['pk', 'eid', 'ename', 'email', 'phone']
