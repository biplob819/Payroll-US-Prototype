'use client'

import React, { useState } from 'react'
import Sidebar from '@/components/Sidebar'
import Header from '@/components/Header'
import { 
  Folder, 
  FileText, 
  Download,
  Eye,
  X,
  Search,
  Calendar,
  User,
  Building,
  ChevronRight,
  File,
  Clock
} from 'lucide-react'

interface Document {
  id: string
  name: string
  type: string
  size: number
  uploadDate: string
  description?: string
  category: 'policy' | 'guideline' | 'offer-letter' | 'agreement' | 'revision' | 'form' | 'other'
}

interface DocumentFolder {
  id: string
  name: string
  description: string
  icon: React.ReactNode
  documents: Document[]
  color: string
}

const employeeDocumentFolders: DocumentFolder[] = [
  {
    id: 'organization-documents',
    name: 'Organization Documents',
    description: 'This folder contains documents that apply to the entire organization, such as company policies, payroll guidelines, or leave policies.',
    icon: <Building className="text-blue-600" size={24} />,
    color: 'bg-blue-50 border-blue-200',
    documents: [
      {
        id: 'emp-handbook',
        name: 'Employee Handbook 2024.pdf',
        type: 'pdf',
        size: 1234567,
        uploadDate: '2024-01-01',
        description: 'Complete employee handbook with policies and procedures',
        category: 'policy'
      },
      {
        id: 'leave-policy',
        name: 'Leave and Vacation Policy.pdf',
        type: 'pdf',
        size: 245760,
        uploadDate: '2024-01-15',
        description: 'Company leave and vacation policies for all employees',
        category: 'policy'
      },
      {
        id: 'payroll-guidelines',
        name: 'Payroll Guidelines 2024.pdf',
        type: 'pdf',
        size: 345600,
        uploadDate: '2024-01-10',
        description: 'Payroll processing guidelines and schedules',
        category: 'guideline'
      },
      {
        id: 'benefits-guide',
        name: 'Benefits Enrollment Guide.pdf',
        type: 'pdf',
        size: 567890,
        uploadDate: '2024-01-05',
        description: 'Complete guide to employee benefits and enrollment',
        category: 'guideline'
      },
      {
        id: 'code-conduct',
        name: 'Code of Conduct.pdf',
        type: 'pdf',
        size: 198765,
        uploadDate: '2024-01-01',
        description: 'Company code of conduct and ethical guidelines',
        category: 'policy'
      }
    ]
  },
  {
    id: 'other-documents',
    name: 'Other Documents',
    description: 'This folder contains documents specific to you, such as your offer letters, salary revision letters, and employment agreements.',
    icon: <User className="text-green-600" size={24} />,
    color: 'bg-green-50 border-green-200',
    documents: [
      {
        id: 'offer-letter',
        name: 'Offer Letter - Biplob Chakraborty.pdf',
        type: 'pdf',
        size: 123456,
        uploadDate: '2020-07-15',
        description: 'Original job offer letter for Sr. Product manager position',
        category: 'offer-letter'
      },
      {
        id: 'employment-agreement',
        name: 'Employment Agreement 2024.pdf',
        type: 'pdf',
        size: 234567,
        uploadDate: '2024-01-01',
        description: 'Updated employment agreement and terms',
        category: 'agreement'
      },
      {
        id: 'salary-revision-2024',
        name: 'Salary Revision Letter 2024.pdf',
        type: 'pdf',
        size: 98765,
        uploadDate: '2024-03-01',
        description: 'Annual salary revision and compensation adjustment',
        category: 'revision'
      },
      {
        id: 'w2-2023',
        name: 'W-2 Form 2023.pdf',
        type: 'pdf',
        size: 87654,
        uploadDate: '2024-01-31',
        description: 'Tax form W-2 for year 2023',
        category: 'form'
      },
      {
        id: 'performance-review-2023',
        name: 'Performance Review 2023.pdf',
        type: 'pdf',
        size: 156789,
        uploadDate: '2024-01-15',
        description: 'Annual performance review and goals assessment',
        category: 'other'
      }
    ]
  }
]

export default function EmployeePortalDocumentsPage() {
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null)
  const [showDocumentPreview, setShowDocumentPreview] = useState(false)

  const currentFolder = employeeDocumentFolders.find(f => f.id === selectedFolder)

  const filteredDocuments = currentFolder?.documents.filter(doc =>
    doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.description?.toLowerCase().includes(searchTerm.toLowerCase())
  ) || []

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const handleDocumentPreview = (document: Document) => {
    setSelectedDocument(document)
    setShowDocumentPreview(true)
  }

  const handleDownloadDocument = (document: Document) => {
    // Simulate download
    console.log(`Downloading ${document.name}`)
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'policy':
        return <Building className="text-blue-500" size={16} />
      case 'guideline':
        return <FileText className="text-purple-500" size={16} />
      case 'offer-letter':
        return <File className="text-green-500" size={16} />
      case 'agreement':
        return <FileText className="text-red-500" size={16} />
      case 'revision':
        return <FileText className="text-orange-500" size={16} />
      case 'form':
        return <File className="text-gray-500" size={16} />
      default:
        return <FileText className="text-gray-500" size={16} />
    }
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto">
          <div className="p-8">
            <div className="max-w-6xl mx-auto">
              {/* Page Header */}
              <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                  Documents
                </h1>
                <p className="text-gray-600">
                  Access your personal documents and company policies
                </p>
              </div>

              {/* Breadcrumb */}
              {selectedFolder && (
                <div className="flex items-center space-x-2 text-sm text-gray-600 bg-gray-50 px-4 py-2 rounded-lg mb-6">
                  <button 
                    onClick={() => setSelectedFolder(null)}
                    className="hover:text-gray-900"
                  >
                    Documents
                  </button>
                  <ChevronRight size={14} />
                  <span className="text-gray-900">{currentFolder?.name}</span>
                </div>
              )}

              {!selectedFolder ? (
                // Folder View
                <div>
                  <div className="mb-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Document Folders</h2>
                    <p className="text-gray-600">
                      The documents module is divided into two main folders for easy organization and access.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {employeeDocumentFolders.map((folder) => (
                      <div
                        key={folder.id}
                        onClick={() => setSelectedFolder(folder.id)}
                        className={`${folder.color} border rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer`}
                      >
                        <div className="flex items-start space-x-4 mb-4">
                          <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
                            {folder.icon}
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 mb-2">{folder.name}</h3>
                            <div className="flex items-center text-sm text-gray-600 mb-2">
                              <FileText size={14} className="mr-1" />
                              {folder.documents.length} documents
                            </div>
                          </div>
                        </div>
                        <p className="text-sm text-gray-700 leading-relaxed">
                          {folder.description}
                        </p>
                        
                        {/* Recent Documents Preview */}
                        {folder.documents.length > 0 && (
                          <div className="mt-4 pt-4 border-t border-gray-200">
                            <p className="text-xs font-medium text-gray-500 mb-2">Recent Documents:</p>
                            <div className="space-y-1">
                              {folder.documents.slice(0, 2).map((doc) => (
                                <div key={doc.id} className="flex items-center text-xs text-gray-600">
                                  {getCategoryIcon(doc.category)}
                                  <span className="ml-2 truncate">{doc.name}</span>
                                </div>
                              ))}
                              {folder.documents.length > 2 && (
                                <p className="text-xs text-gray-500">+{folder.documents.length - 2} more documents</p>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h3 className="font-medium text-blue-900 mb-2">Access Documents</h3>
                    <p className="text-sm text-blue-800 mb-2">To access documents shared with you:</p>
                    <ol className="text-sm text-blue-800 list-decimal list-inside space-y-1">
                      <li>Click on the appropriate folder above</li>
                      <li>Browse the documents available to you</li>
                      <li>Click on any document to preview or download it</li>
                    </ol>
                  </div>
                </div>
              ) : (
                // Document List View
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-3">
                      {currentFolder?.icon}
                      <div>
                        <h2 className="text-xl font-semibold text-gray-900">{currentFolder?.name}</h2>
                        <p className="text-gray-600 text-sm">{filteredDocuments.length} documents</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedFolder(null)}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                      ← Back to Folders
                    </button>
                  </div>

                  {/* Search */}
                  <div className="mb-6">
                    <div className="relative max-w-md">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                      <input
                        type="text"
                        placeholder="Search documents..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  {/* Document List */}
                  <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                    {filteredDocuments.length === 0 ? (
                      <div className="p-12 text-center">
                        <FileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No documents found</h3>
                        <p className="text-gray-600">
                          {searchTerm ? 'Try adjusting your search terms.' : 'No documents available in this folder.'}
                        </p>
                      </div>
                    ) : (
                      <div className="divide-y divide-gray-200">
                        {filteredDocuments.map((document) => (
                          <div key={document.id} className="p-4 hover:bg-gray-50">
                            <div className="flex items-center justify-between">
                              <div className="flex items-start space-x-3 flex-1">
                                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                                  {getCategoryIcon(document.category)}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <h4 className="font-medium text-gray-900 truncate">{document.name}</h4>
                                  {document.description && (
                                    <p className="text-sm text-gray-600 mt-1">{document.description}</p>
                                  )}
                                  <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                                    <div className="flex items-center">
                                      <Calendar size={12} className="mr-1" />
                                      {formatDate(document.uploadDate)}
                                    </div>
                                    <div className="flex items-center">
                                      <File size={12} className="mr-1" />
                                      {formatFileSize(document.size)}
                                    </div>
                                    <div className="flex items-center">
                                      <FileText size={12} className="mr-1" />
                                      {document.type.toUpperCase()}
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="flex space-x-2 ml-4">
                                <button 
                                  onClick={() => handleDocumentPreview(document)}
                                  className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded"
                                  title="Preview document"
                                >
                                  <Eye size={16} />
                                </button>
                                <button 
                                  onClick={() => handleDownloadDocument(document)}
                                  className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded"
                                  title="Download document"
                                >
                                  <Download size={16} />
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>

      {/* Document Preview Modal */}
      {showDocumentPreview && selectedDocument && (
        <DocumentPreviewModal 
          document={selectedDocument} 
          onClose={() => setShowDocumentPreview(false)} 
        />
      )}
    </div>
  )
}

// Document Preview Modal Component
function DocumentPreviewModal({ document, onClose }: { document: Document, onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-xl font-bold text-gray-900">Document Preview</h1>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          <div className="space-y-6">
            {/* Document Info */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">{document.name}</h3>
              {document.description && (
                <p className="text-gray-600 mb-3">{document.description}</p>
              )}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">Size:</span>
                  <span className="ml-2 text-gray-900">{(document.size / 1024 / 1024).toFixed(2)} MB</span>
                </div>
                <div>
                  <span className="text-gray-500">Uploaded:</span>
                  <span className="ml-2 text-gray-900">{new Date(document.uploadDate).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  })}</span>
                </div>
                <div>
                  <span className="text-gray-500">Type:</span>
                  <span className="ml-2 text-gray-900">{document.type.toUpperCase()}</span>
                </div>
              </div>
            </div>

            {/* Document Content Placeholder */}
            <div className="bg-gray-100 rounded-lg p-12 text-center">
              <FileText size={48} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Document Preview</h3>
              <p className="text-gray-600 mb-4">
                Document preview would be displayed here. You can view the document content or download it for offline access.
              </p>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Download Document
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
