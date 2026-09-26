from PyPDF2 import PdfReader
from docx import Document


def extract_text(file_path):
    if file_path.lower().endswith(".pdf"):
        return _extract_pdf(file_path)
    elif file_path.lower().endswith(".docx"):
        return _extract_docx(file_path)
    raise ValueError("Unsupported file type. Use PDF or DOCX.")


def _extract_pdf(path):
    reader = PdfReader(path)
    text = ""
    for page in reader.pages:
        text += page.extract_text() or ""
    return text.strip()


def _extract_docx(path):
    document = Document(path)
    text = ""
    for paragraph in document.paragraphs:
        text += paragraph.text + "\n"
    return text.strip()