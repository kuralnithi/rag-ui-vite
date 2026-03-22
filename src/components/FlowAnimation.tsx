import './FlowAnimation.css';

export default function FlowAnimation() {
  return (
    <div className="flow-container d-flex flex-column align-items-center justify-content-center w-100">
      <h3 className="mb-4 text-primary fw-bold" style={{ textShadow: "0 2px 5px rgba(0,0,0,0.1)" }}>
        ⚡ RAG Pipeline
      </h3>
      
      <div className="flow-steps">
        <div className="step-card pulse-1">
          <div className="step-icon">👤</div>
          <div className="step-text">1. User Query</div>
        </div>
        
        <div className="step-arrow arrow-1">⬇️</div>
        
        <div className="step-card pulse-2">
          <div className="step-icon">🔍</div>
          <div className="step-text">2. Vector Search (Qdrant)</div>
        </div>
        
        <div className="step-arrow arrow-2">⬇️</div>
        
        <div className="step-card pulse-3">
          <div className="step-icon">🧠</div>
          <div className="step-text">3. LLM Processing (Groq)</div>
        </div>
        
        <div className="step-arrow arrow-3">⬇️</div>
        
        <div className="step-card pulse-4">
          <div className="step-icon">💬</div>
          <div className="step-text">4. Final Answer</div>
        </div>
      </div>
    </div>
  );
}