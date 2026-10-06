from .rag_chain import retrieve_context


def test_rag_context():
    question = "What is the RoadSafe project?"

    print(f"Question: {question}")

    context, documents = retrieve_context(question)

    print(f"\nRetrieved documents: {len(documents)}")

    print("\n===== CONTEXT =====\n")
    print(context)


if __name__ == "__main__":
    test_rag_context()