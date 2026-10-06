from .loader import load_documents
from .splitter import split_documents
from .vector_store import get_vector_store


def index_documents():
    print("Loading documents...")
    documents = load_documents()

    if not documents:
        print("No documents found.")
        return

    print(f"Loaded {len(documents)} pages/documents.")

    print("Splitting documents...")
    chunks = split_documents(documents)

    print(f"Created {len(chunks)} chunks.")

    print("Creating/updating vector database...")
    vector_store = get_vector_store()

    vector_store.add_documents(chunks)

    print("Documents successfully indexed!")
    print("Vector database location:")
    print(vector_store._persist_directory)


if __name__ == "__main__":
    index_documents()