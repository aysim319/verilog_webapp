from fastapi import APIRouter, Response
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from process import get_implicated_lines

router = APIRouter(prefix='/api')

class CodeSnippetData(BaseModel):
    pid: str
    code_type: str
    code_filename: str

@router.post("/submit")
async def run_cirfix(code_snippet_data: CodeSnippetData):
    implicated_lines = get_implicated_lines(code_snippet_data.pid, code_snippet_data.code_type, code_snippet_data.code_filename)
    res = JSONResponse(content={"implicated_lines": implicated_lines})
    return res
