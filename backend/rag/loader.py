from pathlib import Path
from typing import List

from langchain_community.document_loaders import PyPDFLoader, TextLoader
from langchain_core.documents import Document

from .config import DOCUMENTS_DIR


def load_documents() -> List[Document]:
    documents = []

    for file_path in DOCUMENTS_DIR.iterdir():
        if not file_path.is_file():
            continue

        suffix = file_path.suffix.lower()

        if suffix == ".pdf":
            loader = PyPDFLoader(str(file_path))
            documents.extend(loader.load())

        elif suffix == ".txt":
            loader = TextLoader(
                str(file_path),
                encoding="utf-8",
            )
            documents.extend(loader.load())

    return documents