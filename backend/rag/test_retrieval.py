from .retriever import get_retriever


def test_retrieval():
    print("Initializing retriever...")

    retriever = get_retriever()

    query = "What is the RoadSafe project?"

    print(f"\nQuery: {query}")
    print("\nSearching for relevant documents...\n")

    results = retriever.invoke(query)

    print(f"Retrieved {len(results)} chunks.")

    for i, doc in enumerate(results, start=1):
        print(f"\n--- Result {i} ---")
        print(doc.page_content[:1000])
        print("\nMetadata:")
        print(doc.metadata)


if __name__ == "__main__":
    test_retrieval()