import ChatPanel from "./components/ChatPanel";
import UploadPanel from "./components/UploadPanel";
import "./App.css";

export default function App() {
  return (
    <div className="container-fluid app-bg vh-100 overflow-hidden">
      <div className="row h-100">

        {/* LEFT SIDE - CHAT */}
        <div className="col-md-6 h-100 d-flex flex-column py-4 align-items-center">
          <div className="w-100 h-100 d-flex justify-content-center" style={{ maxWidth: '600px' }}>
            <ChatPanel />
          </div>
        </div>

        {/* RIGHT SIDE - HEADER & UPLOAD */}
        <div className="col-md-6 h-100 d-flex flex-column py-4 align-items-center animation-section position-relative overflow-y-auto" style={{ overflowX: 'hidden' }}>
          
          <div className="w-100 text-center mb-5 mt-4">
            <h1 className="fw-bold" style={{ color: '#0f172a', fontSize: '2.5rem', letterSpacing: '-1px' }}>
              RAG with Langchain
            </h1>
            <p className="text-muted fs-5 mt-2">
              An intelligent document retrieval system
            </p>
          </div>

          <div className="w-100 mb-4 flex-shrink-0" style={{ maxWidth: '600px' }}>
            <UploadPanel />
          </div>
        </div>

      </div>
    </div>
  );
}