from pathlib import Path


# backend/
BASE_DIR = Path(__file__).resolve().parent.parent

# backend/data/
DATA_DIR = BASE_DIR / "data"

# backend/data/documents/
DOCUMENTS_DIR = DATA_DIR / "documents"

# backend/data/vector_db/
VECTOR_DB_DIR = DATA_DIR / "vector_db"


# RAG settings
CHUNK_SIZE = 800
CHUNK_OVERLAP = 150

# Number of documents returned during retrieval
TOP_K = 5

# Local embedding model
EMBEDDING_MODEL = "sentence-transformers/all-MiniLM-L6-v2"