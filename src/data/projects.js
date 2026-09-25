export const projects = [
    {
        id: "rag-copilot",
        title: "RAG COPILOT",
        blurb: "Framework-free Python RAG pipeline",
        nodes: [
            { id: "query", label: "QUERY", x: 20, y: 90 },
            { id: "dense", label: "DENSE", sub: "ChromaDB", x: 160, y: 40 },
            { id: "sparse", label: "SPARSE", sub: "BM25", x: 160, y: 140 },
            { id: "merge", label: "MERGE", x: 300, y: 90 },
            { id: "rerank", label: "RERANK", sub: "cross-encoder/ms-marco-MiniLM-L-6-v2", x: 440, y: 90, accent: true },
            { id: "generate", label: "GENERATE", sub: "Groq · openai/gpt-oss-20b", x: 580, y: 90 },
            { id: "answer", label: "ANSWER", x: 720, y: 90 },
        ],
        nodesMobile: [
            { id: "query", x: 150, y: 20 },
            { id: "dense", x: 60, y: 100 },
            { id: "sparse", x: 240, y: 100 },
            { id: "merge", x: 150, y: 180 },
            { id: "rerank", x: 150, y: 260 },
            { id: "generate", x: 150, y: 340 },
            { id: "answer", x: 150, y: 420 },
        ],
        edges: [
            { from: "query", to: "dense" },
            { from: "query", to: "sparse" },
            { from: "dense", to: "merge" },
            { from: "sparse", to: "merge" },
            { from: "merge", to: "rerank" },
            { from: "rerank", to: "generate" },
            { from: "generate", to: "answer" },
        ],
        notes: [],
        links: {
            live: "https://hassan-rag-copilot.streamlit.app/",
            repo: "https://github.com/hassan-khalid234/rag-copilot",
        },
    },
];