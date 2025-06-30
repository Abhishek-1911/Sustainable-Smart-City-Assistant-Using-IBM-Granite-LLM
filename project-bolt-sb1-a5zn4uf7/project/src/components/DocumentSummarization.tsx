import React, { useState } from 'react';
import { Upload, FileText, Sparkles, Download, Clock } from 'lucide-react';

interface Document {
  id: string;
  name: string;
  type: string;
  size: string;
  uploadDate: string;
  status: 'processing' | 'completed' | 'error';
  summary?: string;
}

const mockDocuments: Document[] = [
  {
    id: '1',
    name: 'Climate Action Plan 2025.pdf',
    type: 'Policy Document',
    size: '2.4 MB',
    uploadDate: '2025-01-08',
    status: 'completed',
    summary: 'The Climate Action Plan 2025 outlines the city\'s comprehensive strategy to achieve carbon neutrality by 2035. Key initiatives include expanding renewable energy infrastructure, improving public transportation, implementing green building standards, and establishing community climate resilience programs. The plan targets a 50% reduction in greenhouse gas emissions by 2030 through strategic partnerships with local businesses and citizen engagement initiatives.'
  },
  {
    id: '2',
    name: 'Water Management Strategy.docx',
    type: 'Infrastructure Plan',
    size: '1.8 MB',
    uploadDate: '2025-01-07',
    status: 'completed',
    summary: 'The Water Management Strategy focuses on sustainable water resource utilization and infrastructure modernization. The document proposes smart water metering systems, leak detection technology, rainwater harvesting programs, and wastewater treatment facility upgrades. Implementation timeline spans 3 years with an estimated budget of $45 million, projected to reduce water waste by 30% and improve supply reliability.'
  },
  {
    id: '3',
    name: 'Transportation Master Plan.pdf',
    type: 'Urban Planning',
    size: '3.1 MB',
    uploadDate: '2025-01-06',
    status: 'processing',
  }
];

export default function DocumentSummarization() {
  const [documents, setDocuments] = useState<Document[]>(mockDocuments);
  const [dragActive, setDragActive] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState<Document | null>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFiles = (files: FileList) => {
    Array.from(files).forEach(file => {
      const newDoc: Document = {
        id: Date.now().toString(),
        name: file.name,
        type: 'Uploaded Document',
        size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
        uploadDate: new Date().toISOString().split('T')[0],
        status: 'processing'
      };
      
      setDocuments(prev => [newDoc, ...prev]);
      
      // Simulate processing
      setTimeout(() => {
        setDocuments(prev => prev.map(doc => 
          doc.id === newDoc.id 
            ? { 
                ...doc, 
                status: 'completed',
                summary: 'This document has been successfully processed by IBM Granite LLM. The AI-generated summary provides key insights and actionable information extracted from the content, highlighting important policy points, recommendations, and implementation strategies relevant to city planning and governance.'
              }
            : doc
        ));
      }, 3000);
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'processing': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'error': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-slate-800 mb-2">Document Summarization</h2>
        <p className="text-slate-600">Upload policy documents for AI-powered summarization using IBM Granite LLM</p>
      </div>

      {/* Upload Area */}
      <div
        className={`border-2 border-dashed rounded-2xl p-8 text-center transition-colors duration-200 ${
          dragActive 
            ? 'border-emerald-400 bg-emerald-50' 
            : 'border-slate-300 bg-white hover:border-emerald-400 hover:bg-emerald-50'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <Upload className="h-12 w-12 text-slate-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-slate-800 mb-2">Upload Policy Documents</h3>
        <p className="text-slate-600 mb-4">Drag and drop files here or click to browse</p>
        <input
          type="file"
          multiple
          accept=".pdf,.doc,.docx,.txt"
          onChange={(e) => e.target.files && handleFiles(e.target.files)}
          className="hidden"
          id="file-upload"
        />
        <label
          htmlFor="file-upload"
          className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-blue-600 text-white rounded-xl font-medium cursor-pointer hover:shadow-lg transition-all duration-200 inline-block"
        >
          Choose Files
        </label>
        <p className="text-sm text-slate-500 mt-2">Supports PDF, DOC, DOCX, TXT files up to 10MB</p>
      </div>

      {/* Documents List */}
      <div className="bg-white rounded-2xl shadow-lg border border-emerald-100 p-6">
        <h3 className="text-xl font-semibold text-slate-800 mb-6">Document Library</h3>
        
        <div className="space-y-4">
          {documents.map((doc) => (
            <div key={doc.id} className="border border-slate-200 rounded-xl p-4 hover:shadow-md transition-all duration-200">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-gradient-to-r from-emerald-400 to-blue-500 rounded-lg">
                    <FileText className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-medium text-slate-800">{doc.name}</h4>
                    <div className="flex items-center space-x-4 text-sm text-slate-500 mt-1">
                      <span>{doc.type}</span>
                      <span>{doc.size}</span>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{doc.uploadDate}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(doc.status)}`}>
                    {doc.status === 'processing' ? 'Processing...' : doc.status}
                  </span>
                  {doc.status === 'completed' && (
                    <button
                      onClick={() => setSelectedDoc(doc)}
                      className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-lg text-sm font-medium hover:bg-emerald-200 transition-colors duration-200"
                    >
                      View Summary
                    </button>
                  )}
                </div>
              </div>
              
              {doc.status === 'processing' && (
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div className="bg-gradient-to-r from-emerald-400 to-blue-500 h-2 rounded-full animate-pulse" style={{ width: '60%' }} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Summary Modal */}
      {selectedDoc && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[80vh] overflow-auto">
            <div className="p-6 border-b border-slate-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Sparkles className="h-6 w-6 text-emerald-500" />
                  <h3 className="text-xl font-semibold text-slate-800">AI-Generated Summary</h3>
                </div>
                <div className="flex space-x-2">
                  <button className="p-2 text-slate-500 hover:text-emerald-600 transition-colors duration-200">
                    <Download className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => setSelectedDoc(null)}
                    className="px-4 py-2 text-slate-600 hover:text-slate-800 transition-colors duration-200"
                  >
                    ✕
                  </button>
                </div>
              </div>
            </div>
            
            <div className="p-6">
              <div className="mb-4">
                <h4 className="font-medium text-slate-800 mb-2">{selectedDoc.name}</h4>
                <p className="text-sm text-slate-500">Summarized by IBM Granite LLM</p>
              </div>
              
              <div className="prose max-w-none">
                <p className="text-slate-700 leading-relaxed whitespace-pre-line">
                  {selectedDoc.summary}
                </p>
              </div>
              
              <div className="mt-6 p-4 bg-emerald-50 rounded-xl border border-emerald-200">
                <p className="text-sm text-emerald-700">
                  <strong>Note:</strong> This summary was generated using IBM Granite LLM technology. 
                  For critical decisions, please review the original document in full.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}