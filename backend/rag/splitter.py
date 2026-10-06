from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_core.documents import Document

from .config import CHUNK_SIZE, CHUNK_OVERLAP


def split_documents(documents: list[Document]) -> list[Document]:
    splitter = RecursiveCharacterTextSplitter(
        chunk_size=CHUNK_SIZE,
        chunk_overlap=CHUNK_OVERLAP,
        length_function=len,
    )

    return splitter.split_documents(documents)