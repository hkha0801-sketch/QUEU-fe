import React, { useRef, useState } from "react";
import { HiOutlineUpload } from "react-icons/hi";

interface AttachmentUploadProps {
  onChange: (files: FileList | null) => void;
}

export const AttachmentUpload: React.FC<AttachmentUploadProps> = ({ onChange }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string>("");

  const handleBoxClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setFileName(files[0].name);
      onChange(files);
    } else {
      setFileName("");
      onChange(null);
    }
  };

  return (
    <div className="report-field">
      <label className="report-label">Attachments</label>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
      <div className="report-upload-zone" onClick={handleBoxClick}>
        <HiOutlineUpload className="report-upload-icon" />
        <span className="report-upload-text">
          {fileName ? fileName : "Chọn tệp hoặc kéo thả tệp vào đây"}
        </span>
      </div>
    </div>
  );
};