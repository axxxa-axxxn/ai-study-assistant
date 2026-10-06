from .vector_store import get_vector_store
from .config import TOP_K


def get_retriever():
    vector_store = get_vector_store()

    return vector_store.as_retriever(
        search_kwargs={"k": TOP_K}
    )