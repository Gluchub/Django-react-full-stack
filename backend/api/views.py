from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer, NoteSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Note
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response

# Create your views here.

@api_view(['POST'])
@permission_classes([AllowAny])
def register_user(request):
    serializer= UserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)

class NoteListCreate(generics.ListCreateAPIView):
    serializer_class = NoteSerializer
    permission_class = [IsAuthenticated]

    def get_queryset(self):
        user= self.request.user
        return Note.objects.all()
    
    # def perform_create(self, serializer):
    #     if serializer.valid():
    #         serializer.save(author=self.request.user)
    #         print("successful author")
    #     else:
    #         print(serializer.errors)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def noteCreate(request):
    serializer= NoteSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)

class NoteDelete(generics.DestroyAPIView):
    serializer_class= NoteSerializer
    permission_class= [IsAuthenticated]

    def get_queryset(self):
        user= self.request.user
        return Note.objects.all()