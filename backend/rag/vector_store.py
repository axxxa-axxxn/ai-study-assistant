from langchain_chroma import Chroma

from .config import VECTOR_DB_DIR
from .embeddings import get_embeddings


COLLECTION_NAME = "ai_study_documents"


def get_vector_store():
    embeddings = get_embeddings()

    vector_store = Chroma(
        collection_name=COLLECTION_NAME,
        embedding_function=embeddings,
        persist_directory=str(VECTOR_DB_DIR),
    )

    return vector_store