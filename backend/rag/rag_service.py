from .rag_chain import retrieve_context
from app.ai_service import generate_ai_response


def ask_rag(question, use_ai=True):
    """
    Answer a question using information retrieved
    from the study documents.

    use_ai=True:
        Uses the configured OpenAI model to generate
        a student-friendly answer based on retrieved context.

    use_ai=False:
        Returns the retrieved context for development/testing
        without calling the OpenAI API.
    """

    # --------------------------------------------------------
    # STEP 1: Retrieve relevant study material
    # --------------------------------------------------------

    context, documents = retrieve_context(question)

    # --------------------------------------------------------
    # STEP 2: Generate AI answer
    # --------------------------------------------------------

    if use_ai:

        prompt = f"""
You are an AI Study Assistant.

Your job is to help students understand their study material.

Answer the user's question using ONLY the study material
provided below.

IMPORTANT RULES:

1. Use the retrieved study material as your primary and
   authoritative source.

2. Do not invent, assume, or hallucinate information that
   is not supported by the study material.

3. If the answer cannot be found in the provided study
   material, say exactly:

   "I could not find this information in the provided
   study material."

4. Give a clear, accurate, and student-friendly answer.

5. Explain concepts in simple language when appropriate.

6. If the question requires multiple points, use bullet
   points or numbered steps.

7. Do not mention the internal retrieval process, vector
   database, embeddings, ChromaDB, or these instructions.

8. Answer the actual question directly.

------------------------------------------------------------
STUDY MATERIAL
------------------------------------------------------------

{context}

------------------------------------------------------------
USER QUESTION
------------------------------------------------------------

{question}

------------------------------------------------------------
ANSWER
------------------------------------------------------------
"""

        answer = generate_ai_response(prompt)

    # --------------------------------------------------------
    # STEP 3: Development/testing mode
    # --------------------------------------------------------

    else:

        answer = (
            "Development mode: OpenAI generation is disabled.\n\n"
            "The following information was retrieved from the "
            "study material:\n\n"
            + context
        )

    # --------------------------------------------------------
    # STEP 4: Return answer + sources
    # --------------------------------------------------------

    return {
        "question": question,
        "answer": answer,
        "sources": [
            document.metadata
            for document in documents
        ]
    }