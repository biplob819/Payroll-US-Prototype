'use client'

import React, { useState } from 'react'
import Sidebar from '@/components/Sidebar'
import Header from '@/components/Header'
import { 
  Folder, 
  FileText, 
  Upload,
  Download,
  Eye,
  X,
  Plus,
  Search,
  Filter,
  ChevronRight,
  Calendar,
  User,
  Building,
  Edit,
  Trash2,
  AlertCircle,
  CheckCircle,
  FolderPlus,
  File,
  Users,
  Briefcase
} from 'lucide-react'

interface Document {
  id: string
  name: string
  type: string
  size: number
  uploadDate: string
  uploadedBy: string
  category: 'leave-policy' | 'tax-document' | 'employment-agreement' | 'company-policy' | 'other'
  folderId: string
  employeeId?: string
  employeeName?: string
  signed?: boolean
  signedDate?: string
}

interface DocumentFolder {
  id: string
  name: string
  description: string
  documentCount: number
  createdDate: string
  parentId?: string
  type: 'system' | 'custom'
}

const dummyFolders: DocumentFolder[] = [
  {
    id: 'leave-policies',
    name: 'Leave Policies',
    description: 'Company leave and vacation policies',
    documentCount: 8,
    createdDate: '2024-01-01',
    type: 'system'
  },
  {
    id: 'employment-agreements',
    name: 'Employment Agreements',
    description: 'Employee contracts and agreements',
    documentCount: 24,
    createdDate: '2024-01-01',
    type: 'system'
  },
  {
    id: 'tax-documents',
    name: 'Tax Documents',
    description: 'W-2s, 1099s, and other tax forms',
    documentCount: 96,
    createdDate: '2024-01-01',
    type: 'system'
  },
  {
    id: 'company-policies',
    name: 'Company Policies',
    description: 'HR policies and procedures',
    documentCount: 12,
    createdDate: '2024-01-01',
    type: 'system'
  },
  {
    id: 'payroll-reports',
    name: 'Payroll Reports',
    description: 'Monthly and quarterly payroll reports',
    documentCount: 36,
    createdDate: '2024-01-15',
    type: 'custom'
  }
]

const dummyDocuments: Document[] = [
  {
    id: '1',
    name: 'Annual Leave Policy 2024.pdf',
    type: 'pdf',
    size: 245760,
    uploadDate: '2024-01-15',
    uploadedBy: 'HR Admin',
    category: 'leave-policy',
    folderId: 'leave-policies'
  },
  {
    id: '2',
    name: 'W-2 Form - John Smith.pdf',
    type: 'pdf',
    size: 89234,
    uploadDate: '2024-01-31',
    uploadedBy: 'Payroll System',
    category: 'tax-document',
    folderId: 'tax-documents',
    employeeId: 'emp-001',
    employeeName: 'John Smith',
    signed: true,
    signedDate: '2024-02-05'
  },
  {
    id: '3',
    name: 'W-2 Form - Sarah Johnson.pdf',
    type: 'pdf',
    size: 91456,
    uploadDate: '2024-01-31',
    uploadedBy: 'Payroll System',
    category: 'tax-document',
    folderId: 'tax-documents',
    employeeId: 'emp-002',
    employeeName: 'Sarah Johnson',
    signed: false
  },
  {
    id: '4',
    name: 'Employee Handbook 2024.pdf',
    type: 'pdf',
    size: 1234567,
    uploadDate: '2024-01-01',
    uploadedBy: 'HR Admin',
    category: 'company-policy',
    folderId: 'company-policies'
  },
  {
    id: '5',
    name: 'Employment Agreement - Michael Brown.docx',
    type: 'docx',
    size: 45678,
    uploadDate: '2024-02-10',
    uploadedBy: 'HR Admin',
    category: 'employment-agreement',
    folderId: 'employment-agreements',
    employeeId: 'emp-003',
    employeeName: 'Michael Brown',
    signed: true,
    signedDate: '2024-02-12'
  }
]

export default function DocumentsPage() {
  const [activeTab, setActiveTab] = useState('manage-documents')
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null)
  const [folders] = useState<DocumentFolder[]>(dummyFolders)
  const [documents] = useState<Document[]>(dummyDocuments)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterCategory, setFilterCategory] = useState('')
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [showCreateFolderModal, setShowCreateFolderModal] = useState(false)
  const [showDocumentPreview, setShowDocumentPreview] = useState(false)
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null)

  const tabs = [
    { id: 'manage-documents', label: 'Manage Documents', icon: <Folder size={16} /> },
    { id: 'employee-documents', label: 'Employee Documents', icon: <Users size={16} /> }
  ]

  const categories = [
    { id: 'leave-policy', label: 'Leave Policies' },
    { id: 'tax-document', label: 'Tax Documents' },
    { id: 'employment-agreement', label: 'Employment Agreements' },
    { id: 'company-policy', label: 'Company Policies' },
    { id: 'other', label: 'Other' }
  ]

  const filteredDocuments = documents
    .filter(doc => {
      const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           doc.employeeName?.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = !filterCategory || doc.category === filterCategory
      const matchesFolder = !selectedFolder || doc.folderId === selectedFolder
      return matchesSearch && matchesCategory && matchesFolder
    })

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

  const renderManageDocumentsTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Document Management</h2>
          <p className="text-gray-600 mt-1">Organize and manage company documents</p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={() => setShowCreateFolderModal(true)}
            className="flex items-center px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            <FolderPlus size={16} className="mr-2" />
            New Folder
          </button>
          <button
            onClick={() => setShowUploadModal(true)}
            className="flex items-center px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            <Upload size={16} className="mr-2" />
            Upload Documents
          </button>
        </div>
      </div>

      {/* Breadcrumb */}
      {selectedFolder && (
        <div className="flex items-center space-x-2 text-sm text-gray-600 bg-gray-50 px-4 py-2 rounded-lg">
          <button 
            onClick={() => setSelectedFolder(null)}
            className="hover:text-gray-900"
          >
            Documents
          </button>
          <ChevronRight size={14} />
          <span className="text-gray-900">{folders.find(f => f.id === selectedFolder)?.name}</span>
        </div>
      )}

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search documents..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
            />
          </div>
        </div>
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
        >
          <option value="">All Categories</option>
          {categories.map(cat => (
            <option key={cat.id} value={cat.id}>{cat.label}</option>
          ))}
        </select>
      </div>

      {/* Content */}
      {!selectedFolder ? (
        // Folder View
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {folders.map((folder) => (
            <div
              key={folder.id}
              onClick={() => setSelectedFolder(folder.id)}
              className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Folder className="text-blue-600" size={24} />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{folder.name}</h3>
                  <p className="text-sm text-gray-600">{folder.documentCount} documents</p>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-2">{folder.description}</p>
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>Created {formatDate(folder.createdDate)}</span>
                <span className={`px-2 py-1 rounded-full ${
                  folder.type === 'system' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                }`}>
                  {folder.type}
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        // Document List View
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Document
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Size
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Upload Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Uploaded By
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredDocuments.map((document) => (
                <tr key={document.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 w-8 h-8 bg-gray-100 rounded flex items-center justify-center">
                        <FileText className="text-gray-500" size={16} />
                      </div>
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-900">{document.name}</div>
                        {document.employeeName && (
                          <div className="text-sm text-gray-500">Employee: {document.employeeName}</div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatFileSize(document.size)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatDate(document.uploadDate)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {document.uploadedBy}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => handleDocumentPreview(document)}
                        className="text-gray-600 hover:text-gray-900"
                      >
                        <Eye size={16} />
                      </button>
                      <button className="text-gray-600 hover:text-gray-900">
                        <Download size={16} />
                      </button>
                      <button className="text-gray-600 hover:text-gray-900">
                        <Edit size={16} />
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )

  const renderEmployeeDocumentsTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Employee Documents</h2>
          <p className="text-gray-600 mt-1">View employee-specific documents and signatures</p>
        </div>
      </div>

      {/* Employee Document Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
            <FileText className="text-green-600" size={24} />
          </div>
          <h3 className="font-semibold text-gray-900 mb-1">W-2 Forms</h3>
          <p className="text-2xl font-bold text-gray-900">24</p>
          <p className="text-sm text-gray-600">20 signed, 4 pending</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
            <Briefcase className="text-blue-600" size={24} />
          </div>
          <h3 className="font-semibold text-gray-900 mb-1">Employment Agreements</h3>
          <p className="text-2xl font-bold text-gray-900">24</p>
          <p className="text-sm text-gray-600">22 signed, 2 pending</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
            <FileText className="text-purple-600" size={24} />
          </div>
          <h3 className="font-semibold text-gray-900 mb-1">Tax Forms</h3>
          <p className="text-2xl font-bold text-gray-900">72</p>
          <p className="text-sm text-gray-600">68 signed, 4 pending</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
          <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-3">
            <File className="text-orange-600" size={24} />
          </div>
          <h3 className="font-semibold text-gray-900 mb-1">Other Documents</h3>
          <p className="text-2xl font-bold text-gray-900">36</p>
          <p className="text-sm text-gray-600">32 signed, 4 pending</p>
        </div>
      </div>

      {/* Employee Documents List */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Employee-Signed Documents</h3>
        </div>
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Employee
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Document
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {documents.filter(doc => doc.employeeName).map((document) => (
              <tr key={document.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                      <User className="text-gray-600" size={16} />
                    </div>
                    <div className="ml-3">
                      <div className="text-sm font-medium text-gray-900">{document.employeeName}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{document.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800 capitalize">
                    {document.category.replace('-', ' ')}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    {document.signed ? (
                      <>
                        <CheckCircle className="text-green-500 mr-2" size={16} />
                        <span className="text-sm text-green-800">Signed</span>
                      </>
                    ) : (
                      <>
                        <AlertCircle className="text-orange-500 mr-2" size={16} />
                        <span className="text-sm text-orange-800">Pending</span>
                      </>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {document.signed && document.signedDate ? formatDate(document.signedDate) : 'N/A'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => handleDocumentPreview(document)}
                      className="text-gray-600 hover:text-gray-900"
                    >
                      <Eye size={16} />
                    </button>
                    <button className="text-gray-600 hover:text-gray-900">
                      <Download size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto">
          <div className="p-8">
            <div className="max-w-6xl">
              {/* Page Header */}
              <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                  Documents
                </h1>
                <p className="text-gray-600">
                  Manage company documents and employee-signed forms
                </p>
              </div>

              {/* Tab Navigation */}
              <div className="mb-8">
                <div className="bg-gray-100 p-1 rounded-lg inline-flex">
                  <nav className="flex">
                    {tabs.map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center space-x-2 px-4 py-2 rounded-md font-medium text-sm transition-all duration-200 ${
                          activeTab === tab.id
                            ? 'bg-white text-gray-900 shadow-sm'
                            : 'text-gray-600 hover:text-gray-900 hover:bg-white hover:bg-opacity-50'
                        }`}
                      >
                        {tab.icon}
                        <span>{tab.label}</span>
                      </button>
                    ))}
                  </nav>
                </div>
              </div>

              {/* Tab Content */}
              <div>
                {activeTab === 'manage-documents' && renderManageDocumentsTab()}
                {activeTab === 'employee-documents' && renderEmployeeDocumentsTab()}
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Modals */}
      {showUploadModal && <UploadModal onClose={() => setShowUploadModal(false)} />}
      {showCreateFolderModal && <CreateFolderModal onClose={() => setShowCreateFolderModal(false)} />}
      {showDocumentPreview && selectedDocument && (
        <DocumentPreviewModal 
          document={selectedDocument} 
          onClose={() => setShowDocumentPreview(false)} 
        />
      )}
    </div>
  )
}

// Upload Modal Component
function UploadModal({ onClose }: { onClose: () => void }) {
  const [dragActive, setDragActive] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>({})
  const [isUploading, setIsUploading] = useState(false)
  const [selectedFolder, setSelectedFolder] = useState('')

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files) {
      setUploadedFiles(Array.from(e.dataTransfer.files))
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setUploadedFiles(Array.from(e.target.files))
    }
  }

  const handleUpload = () => {
    if (uploadedFiles.length === 0) return
    
    setIsUploading(true)
    // Simulate upload progress for each file
    uploadedFiles.forEach((file, index) => {
      const interval = setInterval(() => {
        setUploadProgress(prev => {
          const newProgress = { ...prev }
          const current = newProgress[file.name] || 0
          if (current >= 100) {
            clearInterval(interval)
            // Check if all files are done
            if (index === uploadedFiles.length - 1) {
              setTimeout(() => {
                setIsUploading(false)
                onClose()
              }, 1000)
            }
            return newProgress
          }
          newProgress[file.name] = current + 10
          return newProgress
        })
      }, 200)
    })
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-gray-900">Upload Documents</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={24} />
          </button>
        </div>

        <div className="space-y-6">
          {/* Folder Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Folder
            </label>
            <select
              value={selectedFolder}
              onChange={(e) => setSelectedFolder(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
            >
              <option value="">Select a folder...</option>
              <option value="leave-policies">Leave Policies</option>
              <option value="employment-agreements">Employment Agreements</option>
              <option value="tax-documents">Tax Documents</option>
              <option value="company-policies">Company Policies</option>
            </select>
          </div>

          {/* File Upload Area */}
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              dragActive
                ? 'border-blue-400 bg-blue-50'
                : 'border-gray-300 hover:border-gray-400'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            {uploadedFiles.length > 0 ? (
              <div className="space-y-3">
                {uploadedFiles.map((file, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-900">{file.name}</span>
                      <span className="text-xs text-gray-500">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </span>
                    </div>
                    {isUploading && (
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${uploadProgress[file.name] || 0}%` }}
                        ></div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    Drag and drop your files here, or{' '}
                    <label className="text-blue-600 hover:text-blue-700 cursor-pointer">
                      browse
                      <input
                        type="file"
                        className="hidden"
                        multiple
                        accept=".pdf,.doc,.docx,.txt,.jpg,.png"
                        onChange={handleFileChange}
                      />
                    </label>
                  </p>
                  <p className="text-xs text-gray-500">PDF, DOC, DOCX, TXT, JPG, PNG up to 10MB each</p>
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleUpload}
              disabled={uploadedFiles.length === 0 || !selectedFolder || isUploading}
              className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                uploadedFiles.length > 0 && selectedFolder && !isUploading
                  ? 'bg-gray-900 text-white hover:bg-gray-800'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {isUploading ? 'Uploading...' : 'Upload Documents'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// Create Folder Modal Component
function CreateFolderModal({ onClose }: { onClose: () => void }) {
  const [folderName, setFolderName] = useState('')
  const [folderDescription, setFolderDescription] = useState('')

  const handleCreate = () => {
    if (!folderName) return
    // Add folder creation logic here
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-gray-900">Create New Folder</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={24} />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Folder Name
            </label>
            <input
              type="text"
              value={folderName}
              onChange={(e) => setFolderName(e.target.value)}
              placeholder="Enter folder name"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description (Optional)
            </label>
            <textarea
              value={folderDescription}
              onChange={(e) => setFolderDescription(e.target.value)}
              placeholder="Enter folder description"
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent resize-none"
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleCreate}
              disabled={!folderName}
              className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                folderName
                  ? 'bg-gray-900 text-white hover:bg-gray-800'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Create Folder
            </button>
          </div>
        </div>
      </div>
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
              <h3 className="font-semibold text-gray-900 mb-2">{document.name}</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
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
                  <span className="text-gray-500">Uploaded By:</span>
                  <span className="ml-2 text-gray-900">{document.uploadedBy}</span>
                </div>
                {document.signed && (
                  <div>
                    <span className="text-gray-500">Signed:</span>
                    <span className="ml-2 text-green-600">✓ {document.signedDate}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Document Content Placeholder */}
            <div className="bg-gray-100 rounded-lg p-12 text-center">
              <FileText size={48} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Document Preview</h3>
              <p className="text-gray-600 mb-4">
                Document preview would be displayed here. This could be a PDF viewer, image viewer, or text content.
              </p>
              <button className="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors">
                Download Document
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
