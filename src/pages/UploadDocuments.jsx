import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useGetEnvelopIdMutation } from "../slices/usersApiSlice";
import { Upload, File, Trash2, AlertCircle, CheckCircle  } from "lucide-react";
import { useDispatch } from "react-redux";
import { setPostResponse } from "../slices/envelopIdSlice";

function UploadDocuments() {
  const [file, setFile] = useState(null);
  const [emails, setEmails] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const fileInputRef = useRef(null);

  const [ getEnvelopeId, {data} ] = useGetEnvelopIdMutation()

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
  
    const droppedFiles = Array.from(e.dataTransfer.files); // Get the files from the drag-and-drop event
    if (droppedFiles.length > 0) {
      const file = droppedFiles[0]; // Assuming you handle one file at a time
      setFile(file); // Set the file state
    }
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]); // Store the file for submission
  };

  const removeFile = () => {
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = null; // Reset the file input's value
    }
  };
  

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  console.log(file);

  const handleUpload = async () => {
    if (!emails.trim()) {
      alert("Please provide at least one email.");
      return;
    }
    console.log(
      "Sending to emails:",
      emails.split(",").map((email) => email.trim())
    );
    if (file === null) {
      alert("Please select files to upload.");
      return;
    }
    const formData = new FormData();
    if (file) {
      formData.append("file", file); // Attach the file
    }
    const signerEmails = emails.split(",").map((email) => email.trim());
    formData.set("signerEmails", JSON.stringify(signerEmails));

    const formDataObject = {};
    formData.forEach((value, key) => {
      formDataObject[key] = value;
    });
    console.log(formDataObject);
    try {
      // const token = localStorage.getItem("userInfo");
      // const parsedToken = JSON.parse(token);

      // const response = await fetch("/api/v1/documents/upload", {
      //   method: "POST",
      //   body: formData,
      //   headers: { Authorization: `Bearer ${parsedToken.accessToken}` },
      // });
      const response = await getEnvelopeId(formData)
      console.log(response)
      dispatch(setPostResponse(response));

      if (response) {
        // const result = await response.json();
        // Hide message after 5 seconds
        // alert("Files uploaded successfully!");
        console.log("Server Response:", response);
        setSuccessMessage("Document uploaded successfully!");
        setFile(null);
        setEmails("");
        
        // Clear success message after 5 seconds
        setTimeout(() => {
          setSuccessMessage("");
        }, 5000);
      } else {
        const errorData = await response.json();
        alert(`Upload failed: ${errorData.message}`);
        console.error("Error:", errorData);
      }
    } catch (error) {
      alert("An error occurred during the upload.");
      console.error("Error:", error);
    }
  };

  const handleAuthorize = async () => {
    try {
      const response = await fetch(
        "/api/v1/docusign/consent-url"
      );

      if (response.ok) {
        const data = await response.json();
        const consentUrl = data.consent_url; // Extract the URL from the response
        window.open(consentUrl, "_blank"); 
      } else {
        const errorData = await response.json();
        alert(`Authorization failed: ${errorData.message}`);
      }
    } catch (error) {
      alert("An error occurred while fetching the authorization URL.");
      console.error("Error:", error);
    }
  };
  console.log(successMessage);


  return (
    <>
    {successMessage && (
        <SuccessToast>
          <ToastContent>
            <CheckCircle size={20} />
            <span>{successMessage}</span>
          </ToastContent>
          <ToastProgress />
        </SuccessToast>
      )}
    <Container>
    <AuthorizeButton onClick={handleAuthorize}>
        Get Authorize
      </AuthorizeButton>
      <Alert>
        <AlertCircle size={20} />
        Files will be scanned for viruses before upload
      </Alert>

      <EmailInput
        type="text"
        placeholder="Enter recipient emails, separated by commas"
        value={emails}
        onChange={(e) => setEmails(e.target.value)}
      />

      <UploadArea
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        style={{
          borderColor: isDragging ? "#1a73e8" : "#ccc",
          background: isDragging ? "#f8f9fa" : "white",
        }}
      >
        <Upload size={48} color="#666" style={{ marginBottom: "1rem" }} />
        <h3 style={{ marginBottom: "0.5rem" }}>Drag and drop files here</h3>
        <p style={{ color: "#666" }}>or click to select files</p>
        <FileInput
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          multiple
        />
      </UploadArea>

      {file && (
        <FileList>
          <h3 style={{ marginBottom: "1rem" }}>Selected File</h3>
          <FileItem key={file.name}>
            <FileInfo>
              <File size={20} color="#666" />
              <div>
                <FileName>{file.name}</FileName>
                <FileSize>{formatFileSize(file.size)}</FileSize>
              </div>
            </FileInfo>

            <DeleteButton onClick={() => removeFile()}>
              <Trash2 size={20} />
            </DeleteButton>
          </FileItem>
          <UploadButton
            onClick={handleUpload}
            disabled={file === null || !emails.trim()}
          >
            Upload file
          </UploadButton>
        </FileList>
      )}
      </Container>
    </>
  );
}
const SuccessToast = styled.div`
  position: fixed;
  top: 24px;
  left: 50%;
  transform: translateX(-50%);
  background: #ffffff;
  border-left: 4px solid #10B981;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  border-radius: 6px;
  padding: 16px 24px;
  z-index: 1000;
  min-width: 300px;
  animation: slideIn 0.3s ease-out;

  @keyframes slideIn {
    from {
      transform: translate(-50%, -100%);
      opacity: 0;
    }
    to {
      transform: translate(-50%, 0);
      opacity: 1;
    }
  }
`;

const ToastContent = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  color: #059669;
  font-weight: 500;

  svg {
    flex-shrink: 0;
  }
`;

const ToastProgress = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  height: 3px;
  background: #10B981;
  width: 100%;
  animation: progress 5s linear;

  @keyframes progress {
    from {
      width: 100%;
    }
    to {
      width: 0%;
    }
  }
`;

const Container = styled.div`
    // max-width: 600px;
    margin: 2rem auto;
    padding: 0 1rem;
`;

const Alert = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem;
  border-radius: 0.5rem;
  background: #fff3cd;
  color: #856404;
 
  margin-bottom: 1rem;
`;

const UploadArea = styled.div`
  border: 2px dashed #ccc;
  border-radius: 0.5rem;
  padding: 2rem;
  text-align: center;
  background: white;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: #666;
  }
`;

const AuthorizeButton = styled.button`
  background: #28a745;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-bottom: 1rem;

  &:hover {
    background: #218838;
  }
`;

const FileInput = styled.input`
  display: none;
`;

const FileList = styled.div`
  margin-top: 6rem;
`;

const FileItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  background: white;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`;

const FileInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const FileName = styled.span`
  font-weight: 500;
`;

const FileSize = styled.span`
  color: #666;
  font-size: 0.875rem;
`;

const DeleteButton = styled.button`
  background: none;
  border: none;
  color: #ff4444;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 0.25rem;
  transition: all 0.2s ease;

  &:hover {
    background: #ffeeee;
  }
`;

const UploadButton = styled.button`
  background: #1a73e8;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-top: 1rem;
  margin-bottom: 2rem;

  &:hover {
    background: #1557b0;
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

const EmailInput = styled.input`
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  font-size: 1rem;
`;

export default UploadDocuments;
