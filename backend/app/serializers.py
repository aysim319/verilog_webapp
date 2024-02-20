from rest_framework import serializers
from app.models import CodeFile, Participant, Problem


class CodeFileSerializer(serializers.Serializer):
    pid = serializers.IntegerField(required=True)
    filename = serializers.CharField(required=True, allow_blank=False)
    filepath = serializers.CharField(required=True, allow_blank=True)
    implicated_lines = serializers.CharField(read_only=True)
    created = serializers.DateTimeField(required=True)

    class Meta:
        model = CodeFile
        fields = ('pid', 'filename', 'filepath', 'implicated_lines', 'created')

    def create(self, validated_data):
        return CodeFile.objects.create(**validated_data)

    def update(self, instance, validated_data):
        """
        Update and return an existing `CodeFile` instance, given the validated data.
        """
        instance.id = validated_data.get('pid', instance.pid)
        instance.filename = validated_data.get('filename', instance.filename)
        instance.filepath = validated_data.get('filepath', instance.filepath)
        instance.num_lines = validated_data.get('num_lines', instance.num_lines)
        instance.save()
        return instance

class ParticipantSerializer(serializers.Serializer):
    pid = serializers.IntegerField(required=True,)
    name = serializers.CharField(required=True, allow_blank=False)
    date = serializers.DateTimeField(required=True, allow_null=False)
    class Meta:
        model = Participant
        fields = ('pid', 'name', 'date')
    def create(self, validated_data):
        return Participant.objects.create(**validated_data)

class ProblemListSerializer(serializers.ListSerializer):
    def create(self, validated_data):
        problems = [Problem(**item) for item in validated_data]
        return Problem.objects.bulk_create(problems)
class ProblemSerializer(serializers.Serializer):
    source_code = serializers.CharField(required=True)
    problem_type = serializers.CharField(required=True)
    implicated_lines = serializers.CharField()
    pid = serializers.IntegerField(required=True)
    idx = serializers.IntegerField(required=True)
    solved = serializers.IntegerField(default=0)
    class Meta:
        model = Problem
        list_serializer_class = ProblemListSerializer
        fields = ('pid', 'idx', 'problem_type', 'source_code', 'implicated_lines', 'solved')

    def create(self, validated_data):
        qs = Participant.objects.filter(pid=validated_data.pid)
        if qs.exists():
            return Problem.objects.create(**validated_data)
    def update(self, instance, validated_data):
        pass