from app import create_app
from rag.rag_service import ask_rag


app = create_app()


def test_rag_service():
    question = "What is the RoadSafe project?"

    print(f"Question: {question}")
    print("\nRunning RAG in development mode...\n")

    with app.app_context():
        result = ask_rag(question, use_ai=False)

    print("===== RAG ANSWER =====")
    print(result["answer"])

    print("\n===== SOURCES =====")

    for i, source in enumerate(result["sources"], start=1):
        print(f"\nSource {i}:")
        print(source)


if __name__ == "__main__":
    test_rag_service()