from typing import List, Dict
from dotenv import load_dotenv
import os
from pathlib import Path
import random

from app.models import Problem
from app.serializers import ProblemSerializer
from src.settings import STATIC_PATH

load_dotenv()
NUM_PROBLEM = int(os.getenv("NUM_PROBLEM"))


def get_problems(pid) -> List[List[str]]:
    qs = Problem.objects.filter(participant_id=pid, solved=0)
    if qs.exists():
        data = qs.values('source_code', 'problem_type', 'bug_type', 'implicated_lines')
        problem_set = []
        for d in data.all().order_by('idx'):
            problem_set.append([d.get('problem_type'), d.get('source_code'), d.get('bug_type'), d.get('implicated_lines')])
        return problem_set

    random.seed(pid)
    paths = [filename for filename in Path(f'{STATIC_PATH}/buggy_verilog_codes/').glob("*.v")]
    # seed does not make consistent sample (https://stackoverflow.com/questions/23066235/python-seed-not-keeping-same-sequence)
    random.shuffle(paths)
    problem_sets_files = paths[:NUM_PROBLEM]
    problem_sets = []
    problem_sets_fnames = []
    problem_models = []
    for idx, v_file in enumerate(problem_sets_files, start=1):
        with open(v_file, "r") as f:
            filename = str(v_file).split("/")[-1].split("-")
            original_problem = filename[0]
            bug_type = filename[1][:-2]
            source_code = f.read()
            problem_sets.append([original_problem, source_code, bug_type])
        problem_sets_fnames.append(v_file)
        problem_models.append({"participant_id": pid, "idx": idx,
                               "problem_type": original_problem, "bug_type": bug_type, "source_code": source_code})

    serializer = ProblemSerializer(many=True)
    serializer.create(problem_models)

    return problem_sets


def update_problems(data: Dict):
    problem_type = data.get("problem_type")
    bug_type = data.get("bug_type")
    participant_id = data.get("participant_id")
    solved = data.get('solved')
    implicated_lines = data.get('implicated_lines')
    Problem.objects.filter(participant_id=participant_id, problem_type=problem_type, bug_type=bug_type).update(**data)
