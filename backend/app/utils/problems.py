from dotenv import load_dotenv
import os
from pathlib import Path
import random

from src.settings import STATIC_PATH

load_dotenv()
NUM_PROBLEM = int(os.getenv("NUM_PROBLEM"))
def generate_problem(seed):

    random.seed(seed)
    paths = [ filename for filename in Path(f'{STATIC_PATH}/buggy_verilog_codes/').glob("*.v") ]
    # seed does not make consistent sample (https://stackoverflow.com/questions/23066235/python-seed-not-keeping-same-sequence)
    problem_sets_files = list(random.sample(paths, NUM_PROBLEM))
    problem_sets = []
    for v_file in problem_sets_files:
        with open(v_file, "r") as f:
            problem_sets.append(f.read())
    return problem_sets