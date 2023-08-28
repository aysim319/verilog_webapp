from rest_framework import serializers
from .models import CodeFile


class CodeFileSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    filename = serializers.CharField(required=True, allow_blank=False, max_length=100)
    filepath = serializers.CharField(required=False, allow_blank=True)
    num_lines = serializers.IntegerField(read_only=True)

    def create(self, validated_data):
        """
        Create and return a new `CodeFile` instance, given the validated data.
        """
        return CodeFile.objects.create(**validated_data)

    def update(self, instance, validated_data):
        """
        Update and return an existing `CodeFile` instance, given the validated data.
        """
        instance.id = validated_data.get('id', instance.id)
        instance.filename = validated_data.get('filename', instance.filename)
        instance.filepath = validated_data.get('filepath', instance.filepath)
        instance.num_lines = validated_data.get('num_lines', instance.num_lines)
        instance.save()
        return instance