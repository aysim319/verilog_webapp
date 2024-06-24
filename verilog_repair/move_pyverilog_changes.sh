#!/bin/bash

ln -sf ./verilog_repair/pyverilog_changes/parser.py ./verilog_repair/verilog_venv/lib/python3.11/site-packages/pyverilog/vparser/parser.py && \
ln -sf ./verilog_repair/pyverilog_changes/codegen.py ./verilog_repair/verilog_venv/lib/python3.11/site-packages/pyverilog/ast_code_generator/codegen.py && \
ln -sf ./verilog_repair/pyverilog_changes/ast.py ./verilog_repair/verilog_venv/lib/python3.11/site-packages/pyverilog/vparser/ast.py && \
ln -sf ./verilog_repair/pyverilog_changes/ast_classes.txt ./verilog_repair/verilog_venv/lib/python3.11/site-packages/pyverilog/vparser/ast_classes.txt