from pathlib import Path
DATA_DIR = f"{Path(__file__).resolve().parent}/data/"
PYVERILOG_ROOT = Path(__file__).resolve().parent.parent
import pytest
import process
from unittest.mock import patch
import json

class TestCirfix:
    expected_answer = dict()
    with open(f"{DATA_DIR}/expected_answers.json", "r") as f:
        expected_answer = json.load(f)

    @patch("process.set_config")
    def test_decoder_3_to_8_get_implicated_line(self,mock_config):
        pid = "1"
        sample_file = "decoder_3_to_8_wadden_buggy1.v"
        codetype = "decoder_3_to_8"

        SRC_FILE = f"{PYVERILOG_ROOT}/benchmarks/{codetype}/{sample_file}"
        TEST_BENCH = f"{PYVERILOG_ROOT}/benchmarks/{codetype}/{process.TESTBENCH_MAPPING.get(codetype)}"
        EVAL_SCRIPT = f"{PYVERILOG_ROOT}/benchmarks/{codetype}/run.sh"
        PROJ_DIR = f"{PYVERILOG_ROOT}/benchmarks/{codetype}/"
        ORACLE = f"{PYVERILOG_ROOT}/benchmarks/{codetype}/oracle.txt"
        OUTPUT_FILE = f"{PYVERILOG_ROOT}/tests/data/{pid}/output.txt"
        ORIG_FILE = f"{PYVERILOG_ROOT}/benchmarks/{codetype}/{process.ORIG_FILE_MAPPING.get(codetype)}"
        output_dir = f"{PYVERILOG_ROOT}/tests/data/{pid}"
        mock_config.return_value = [SRC_FILE, TEST_BENCH, EVAL_SCRIPT, PROJ_DIR, ORACLE, OUTPUT_FILE, ORIG_FILE, output_dir]
        num_lines = sorted(process.get_implicated_lines(pid, codetype, sample_file))
        assert self.expected_answer.get(sample_file) == num_lines

    @patch("process.set_config")
    def test_first_counter_overflow_get_implicated_line(self,mock_config):
        pid = "1"
        sample_file = "first_counter_overflow_wadden_buggy1.v"
        codetype = "first_counter_overflow"

        SRC_FILE = f"{PYVERILOG_ROOT}/benchmarks/{codetype}/{sample_file}"
        TEST_BENCH = f"{PYVERILOG_ROOT}/benchmarks/{codetype}/{process.TESTBENCH_MAPPING.get(codetype)}"
        EVAL_SCRIPT = f"{PYVERILOG_ROOT}/benchmarks/{codetype}/run.sh"
        PROJ_DIR = f"{PYVERILOG_ROOT}/benchmarks/{codetype}/"
        ORACLE = f"{PYVERILOG_ROOT}/benchmarks/{codetype}/oracle.txt"
        OUTPUT_FILE = f"{PYVERILOG_ROOT}/tests/data/{pid}/output.txt"
        ORIG_FILE = f"{PYVERILOG_ROOT}/benchmarks/{codetype}/{process.ORIG_FILE_MAPPING.get(codetype)}"
        output_dir = f"{PYVERILOG_ROOT}/tests/data/{pid}"
        mock_config.return_value = [SRC_FILE, TEST_BENCH, EVAL_SCRIPT, PROJ_DIR, ORACLE, OUTPUT_FILE, ORIG_FILE, output_dir]
        num_lines = sorted(process.get_implicated_lines(pid, codetype, sample_file))
        assert self.expected_answer.get(sample_file) == num_lines

    @patch("process.set_config")
    def test_flip_flop_get_implicated_line(self,mock_config):
        pid = "1"
        sample_file = "tff_wadden_buggy1.v"
        codetype = "flip_flop"

        SRC_FILE = f"{PYVERILOG_ROOT}/benchmarks/{codetype}/{sample_file}"
        TEST_BENCH = f"{PYVERILOG_ROOT}/benchmarks/{codetype}/{process.TESTBENCH_MAPPING.get(codetype)}"
        EVAL_SCRIPT = f"{PYVERILOG_ROOT}/benchmarks/{codetype}/run.sh"
        PROJ_DIR = f"{PYVERILOG_ROOT}/benchmarks/{codetype}/"
        ORACLE = f"{PYVERILOG_ROOT}/benchmarks/{codetype}/oracle.txt"
        OUTPUT_FILE = f"{PYVERILOG_ROOT}/tests/data/{pid}/output.txt"
        ORIG_FILE = f"{PYVERILOG_ROOT}/benchmarks/{codetype}/{process.ORIG_FILE_MAPPING.get(codetype)}"
        output_dir = f"{PYVERILOG_ROOT}/tests/data/{pid}"
        mock_config.return_value = [SRC_FILE, TEST_BENCH, EVAL_SCRIPT, PROJ_DIR, ORACLE, OUTPUT_FILE, ORIG_FILE, output_dir]
        num_lines = sorted(process.get_implicated_lines(pid, codetype, sample_file))
        assert self.expected_answer.get(sample_file) == num_lines

    @patch("process.set_config")
    def test_fsm_full_get_implicated_line(self,mock_config):
        pid = "1"
        sample_file = "fsm_full_wadden_buggy1.v"
        codetype = "fsm_full"

        SRC_FILE = f"{PYVERILOG_ROOT}/benchmarks/{codetype}/{sample_file}"
        TEST_BENCH = f"{PYVERILOG_ROOT}/benchmarks/{codetype}/{process.TESTBENCH_MAPPING.get(codetype)}"
        EVAL_SCRIPT = f"{PYVERILOG_ROOT}/benchmarks/{codetype}/run.sh"
        PROJ_DIR = f"{PYVERILOG_ROOT}/benchmarks/{codetype}/"
        ORACLE = f"{PYVERILOG_ROOT}/benchmarks/{codetype}/oracle.txt"
        OUTPUT_FILE = f"{PYVERILOG_ROOT}/tests/data/{pid}/output.txt"
        ORIG_FILE = f"{PYVERILOG_ROOT}/benchmarks/{codetype}/{process.ORIG_FILE_MAPPING.get(codetype)}"
        output_dir = f"{PYVERILOG_ROOT}/tests/data/{pid}"
        mock_config.return_value = [SRC_FILE, TEST_BENCH, EVAL_SCRIPT, PROJ_DIR, ORACLE, OUTPUT_FILE, ORIG_FILE, output_dir]
        num_lines = sorted(process.get_implicated_lines(pid, codetype, sample_file))
        assert self.expected_answer.get(sample_file) == num_lines

    @patch("process.set_config")
    def test_lshift_reg_get_implicated_line(self,mock_config):
        pid = "1"
        sample_file = "lshift_reg_wadden_buggy1.v"
        codetype = "lshift_reg"

        SRC_FILE = f"{PYVERILOG_ROOT}/benchmarks/{codetype}/{sample_file}"
        TEST_BENCH = f"{PYVERILOG_ROOT}/benchmarks/{codetype}/{process.TESTBENCH_MAPPING.get(codetype)}"
        EVAL_SCRIPT = f"{PYVERILOG_ROOT}/benchmarks/{codetype}/run.sh"
        PROJ_DIR = f"{PYVERILOG_ROOT}/benchmarks/{codetype}/"
        ORACLE = f"{PYVERILOG_ROOT}/benchmarks/{codetype}/oracle.txt"
        OUTPUT_FILE = f"{PYVERILOG_ROOT}/tests/data/{pid}/output.txt"
        ORIG_FILE = f"{PYVERILOG_ROOT}/benchmarks/{codetype}/{process.ORIG_FILE_MAPPING.get(codetype)}"
        output_dir = f"{PYVERILOG_ROOT}/tests/data/{pid}"
        mock_config.return_value = [SRC_FILE, TEST_BENCH, EVAL_SCRIPT, PROJ_DIR, ORACLE, OUTPUT_FILE, ORIG_FILE, output_dir]
        num_lines = sorted(process.get_implicated_lines(pid, codetype, sample_file))
        assert self.expected_answer.get(sample_file) == num_lines

    @patch("process.set_config")
    def test_mux_4_1_get_implicated_line(self,mock_config):
        pid = "1"
        sample_file = "mux_4_1_wadden_buggy1.v"
        codetype = "mux_4_1"

        SRC_FILE = f"{PYVERILOG_ROOT}/benchmarks/{codetype}/{sample_file}"
        TEST_BENCH = f"{PYVERILOG_ROOT}/benchmarks/{codetype}/{process.TESTBENCH_MAPPING.get(codetype)}"
        EVAL_SCRIPT = f"{PYVERILOG_ROOT}/benchmarks/{codetype}/run.sh"
        PROJ_DIR = f"{PYVERILOG_ROOT}/benchmarks/{codetype}/"
        ORACLE = f"{PYVERILOG_ROOT}/benchmarks/{codetype}/oracle.txt"
        OUTPUT_FILE = f"{PYVERILOG_ROOT}/tests/data/{pid}/output.txt"
        ORIG_FILE = f"{PYVERILOG_ROOT}/benchmarks/{codetype}/{process.ORIG_FILE_MAPPING.get(codetype)}"
        output_dir = f"{PYVERILOG_ROOT}/tests/data/{pid}"
        mock_config.return_value = [SRC_FILE, TEST_BENCH, EVAL_SCRIPT, PROJ_DIR, ORACLE, OUTPUT_FILE, ORIG_FILE, output_dir]
        num_lines = sorted(process.get_implicated_lines(pid, codetype, sample_file))
        assert self.expected_answer.get(sample_file) == num_lines

