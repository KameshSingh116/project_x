from fapi import FastAPI, HTTPException
from pydantic import BaseModel
from langchain_community.vectorstores import FAISS
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain.prompts import PromptTemplate
from langchain_together import Together
from langchain.memory import ConversationBufferWindowMemory
from langchain.chains import ConversationalRetrievalChain
import os

# Initialize FastAPI app
app = FastAPI()

# Initialize variables and configurations
TOGETHER_AI_API = "84fe6b8b3b418dccb00e5e122ffebfe9f135f3e71473bdafa37b5dadcbcdb93c"

# Load the FAISS vector database and embedding model
embeddings = HuggingFaceEmbeddings(
    model_name="nomic-ai/nomic-embed-text-v1",
    model_kwargs={"trust_remote_code": True, "revision": "289f532e14dbbbd5a04753fa58739e9ba766f3c7"}
)
db = FAISS.load_local("vectorstore/db_faiss", embeddings, allow_dangerous_deserialization=True)
db_retriever = db.as_retriever(search_type="similarity", search_kwargs={"k": 4})

# Prompt template for the conversational chain
prompt_template = """<s>[INST]Follow these instructions carefully: You are a medical practitioner chatbot providing accurate medical information, adopting a doctor's perspective in your responses. Utilize the provided context, chat history, and question, choosing only the necessary information based on the user's query. Avoid generating your own questions and answers. Do not reference chat history if irrelevant to the current question; only use it for similar-related queries. Prioritize the given context when searching for relevant information, emphasizing clarity and conciseness in your responses. If multiple medicines share the same name but have different strengths, ensure to mention them. Exclude any mention of medicine costs. Stick to context directly related to the user's question, and use your knowledge base to answer inquiries outside the given context. Abstract and concise responses are key; do not repeat the chat template in your answers. If you lack information, simply state that you don't know.

CONTEXT: {context}

CHAT HISTORY: {chat_history}

QUESTION: {question}

ANSWER:
</s>[INST]
"""
prompt = PromptTemplate(template=prompt_template, input_variables=['context', 'question', 'chat_history'])

# Initialize the language model
llm = Together(
    model="mistralai/Mistral-7B-Instruct-v0.2",
    temperature=0.7,
    max_tokens=512,
    together_api_key=TOGETHER_AI_API
)

# Set up conversation memory for chat history
conversation_memory = ConversationBufferWindowMemory(k=2, memory_key="chat_history", return_messages=True)

# Set up the conversational retrieval chain
qa_chain = ConversationalRetrievalChain.from_llm(
    llm=llm,
    memory=conversation_memory,
    retriever=db_retriever,
    combine_docs_chain_kwargs={'prompt': prompt}
)

# Define Pydantic model for request validation
class ChatRequest(BaseModel):
    question: str

# Endpoint for handling chat queries
@app.post("/chat")
async def chat(request: ChatRequest):
    user_input = request.question
    if not user_input:
        raise HTTPException(status_code=400, detail="Question not provided")

    # Save the user input in the conversation memory
    conversation_memory.save_context({"user": user_input}, {"assistant": ""})

    # Generate response from the conversational retrieval chain
    result = qa_chain.invoke(input=user_input)

    # Extract and format the answer
    response = "⚠️ **_Note: Information provided may be inaccurate. Consult a qualified doctor for accurate advice._** \n\n\n"
    response += "".join(result["answer"]) if "answer" in result else "I'm sorry, I could not process your question."

    # Save the assistant's response in the conversation memory
    conversation_memory.save_context({"user": user_input}, {"assistant": response})

    return {"answer": response}

# Endpoint to reset conversation history
@app.post("/reset")
async def reset_conversation():
    conversation_memory.clear()
    return {"message": "Conversation reset successfully"}

