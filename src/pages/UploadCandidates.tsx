import { useState } from 'react';
import { Upload, X, FileText, AlertCircle, CheckCircle2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { useParams, useNavigate } from 'react-router';

interface FileWithValidation {
  file: File;
  id: string;
  errors: string[];
  isValid: boolean;
}

export default function UploadCandidates() {
  const [files, setFiles] = useState<FileWithValidation[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const validateFile = (file: File): string[] => {
    const errors: string[] = [];
    
    if (file.size > 2 * 1024 * 1024) {
      errors.push('File size exceeds 2 MB');
    }
    
    if (file.type !== 'application/pdf') {
      errors.push('Only PDF files are allowed');
    }
    
    const nameWithoutExt = file.name.replace('.pdf', '');
    const nameParts = nameWithoutExt.split(/[-_]/);
    
    if (nameParts.length < 2 || nameParts.length > 3) {
      errors.push('Filename must be firstname-lastname.pdf or firstname-middlename-lastname.pdf');
    } else {
      const validNamePattern = /^[a-zA-Z]+$/;
      const allNamesValid = nameParts.every(part => validNamePattern.test(part));
      
      if (!allNamesValid) {
        errors.push('Name parts must contain only letters');
      }
    }
    
    return errors;
  };

  const handleFileSelect = (selectedFiles: FileList | null) => {
    if (!selectedFiles) return;
    
    const fileArray = Array.from(selectedFiles);
    const newFiles: FileWithValidation[] = fileArray.map(file => {
      const validationErrors = validateFile(file);
      return {
        file,
        id: Math.random().toString(36).substr(2, 9),
        errors: validationErrors,
        isValid: validationErrors.length === 0
      };
    });
    
    setFiles(prev => [...prev, ...newFiles]);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files) {
      handleFileSelect(e.dataTransfer.files);
    }
  };

  const removeFile = (id: string) => {
    setFiles(prev => prev.filter(f => f.id !== id));
  };

  const handleProcess = async () => {
    const validFiles = files.filter(f => f.isValid);
    const formData = new FormData();
    validFiles.forEach(f => {
      formData.append('files', f.file);
    });
    if (validFiles.length === 0) {
      setErrors(['No valid files to process']);
      return;
    }
    
    setErrors([]);
    toast(`Processing ${validFiles.length} valid file(s)`);
    const response = await fetch(`${import.meta.env.VITE_APP_API_BASE_URL}/candidates/upload-resumes/${id}`,{
      method: 'POST',
      body: formData,
    });
    if (response.ok) {
      toast.success('Files processed successfully');
      navigate(`/candidates/${id}`);
      setFiles([]);
    } else {
      toast.error('Failed to process files');
    }
  };

  const handleCancel = () => {
    setFiles([]);
    setErrors([]);
  };

  const validFilesCount = files.filter(f => f.isValid).length;

  return (
    <div className="flex items-center justify-center bg-slate-100 p-4 h-[93vh]">
      <div className="w-full max-w-3xl bg-white rounded-lg shadow-lg p-6 md:p-8">
        <h1 className="text-2xl md:text-3xl font-semibold text-slate-900 mb-6">
          Upload Candidate Resumes
        </h1>
        
        <div className="bg-slate-100 border border-slate-200 rounded-lg p-4 mb-6">
          <h2 className="text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
            <AlertCircle className="w-4 h-4" />
            Upload Requirements
          </h2>
          <ul className="text-sm text-slate-600 space-y-1 ml-6 list-disc">
            <li>File size must be less than 2 MB</li>
            <li>Only PDF files are allowed</li>
            <li>Filename format: <code className="bg-slate-200 px-1 rounded">firstname_lastname.pdf</code> or <code className="bg-slate-200 px-1 rounded">firstname_middlename_lastname.pdf</code></li>
          </ul>
        </div>

        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            isDragging
              ? 'border-slate-400 bg-slate-50'
              : 'border-slate-300 bg-white'
          }`}
        >
          <Upload className="w-12 h-12 mx-auto mb-4 text-slate-400" />
          <p className="text-slate-600 mb-2">
            Drag and drop resume files here, or
          </p>
          <label className="inline-block">
            <input
              type="file"
              multiple
              accept=".pdf"
              onChange={(e) => handleFileSelect(e.target.files)}
              className="hidden"
            />
            <span className="px-4 py-2 bg-slate-600 text-white rounded-lg cursor-pointer hover:bg-slate-700 transition-colors inline-block">
              Browse Files
            </span>
          </label>
        </div>

        {files.length > 0 && (
          <div className="mt-6">
            <h3 className="text-sm font-semibold text-slate-700 mb-3">
              Selected Files ({validFilesCount} valid, {files.length - validFilesCount} invalid)
            </h3>
            <div className="max-h-80 overflow-y-auto space-y-2">
              {files.map((item) => (
                <div
                  key={item.id}
                  className={`flex items-start gap-3 p-3 rounded-lg border ${
                    item.isValid
                      ? 'bg-green-50 border-green-200'
                      : 'bg-red-50 border-red-200'
                  }`}
                >
                  <FileText className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                    item.isValid ? 'text-green-600' : 'text-red-600'
                  }`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-900 truncate">
                      {item.file.name}
                    </p>
                    <p className="text-xs text-slate-500">
                      {(item.file.size / 1024).toFixed(2)} KB
                    </p>
                    {item.errors.length > 0 && (
                      <ul className="mt-1 space-y-0.5">
                        {item.errors.map((error, idx) => (
                          <li key={idx} className="text-xs text-red-600 flex items-start gap-1">
                            <X className="w-3 h-3 flex-shrink-0 mt-0.5" />
                            {error}
                          </li>
                        ))}
                      </ul>
                    )}
                    {item.isValid && (
                      <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
                        <CheckCircle2 className="w-3 h-3" />
                        Valid
                      </p>
                    )}
                  </div>
                  <button
                    onClick={() => removeFile(item.id)}
                    className="text-slate-400 hover:text-slate-600 transition-colors"
                    aria-label="Remove file"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {errors.length > 0 && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            {errors.map((error, idx) => (
              <p key={idx} className="text-sm text-red-600">
                {error}
              </p>
            ))}
          </div>
        )}

        {files.length > 0 && (
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleProcess}
              disabled={validFilesCount === 0}
              className="flex-1 px-6 py-3 bg-slate-700 text-white rounded-lg font-medium hover:bg-slate-800 transition-colors disabled:bg-slate-300 disabled:cursor-not-allowed"
            >
              {validFilesCount > 0 ? `Process (${validFilesCount})` : 'Process'}
            </button>
            <button
              onClick={handleCancel}
              className="flex-1 px-6 py-3 bg-white text-slate-700 border border-slate-300 rounded-lg font-medium hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
}