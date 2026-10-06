from .retriever import get_retriever


def retrieve_context(question):
    retriever = get_retriever()

    documents = retriever.invoke(question)

    context = "\n\n".join(
        document.page_content
        for document in documents
    )

    return context, documents