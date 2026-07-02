import React from "react";
import { FaPaperPlane } from "react-icons/fa";
import { HiOutlineUserCircle } from "react-icons/hi2";
import { useReport } from "../hooks/useReport";
import { AttachmentUpload } from "./AttachmentUpload";

const ISSUE_TYPE_OPTIONS = [
  "Lỗi hiển thị",
  "Lỗi chấm bài",
  "Lỗi tài khoản",
  "Góp ý tính năng",
  "Khác",
];

export const ReportForm: React.FC = () => {
  const {
    issueType,
    setIssueType,
    relatedUrl,
    setRelatedUrl,
    description,
    setDescription,
    setAttachments,
    showIssueOptions,
    setShowIssueOptions,
    isSubmitting,
    handleCancel,
    handleSubmit,
  } = useReport();

  return (
    <form className="report-form" onSubmit={handleSubmit}>
      {/* 1. Ô Issue Type */}
      <div className="report-field">
        <label className="report-label">Issue type</label>
        <div className="report-input-wrap">
          <input
            type="text"
            className="report-input"
            placeholder="Chọn hoặc nhập loại lỗi bạn gặp phải..."
            value={issueType}
            onChange={(e) => setIssueType(e.target.value)}
            onFocus={() => setShowIssueOptions(true)}
            onBlur={() => setTimeout(() => setShowIssueOptions(false), 150)}
          />
          <button type="button" className="report-input-icon" aria-label="Send">
            <FaPaperPlane />
          </button>

          {showIssueOptions && (
            <ul className="report-options">
              {ISSUE_TYPE_OPTIONS.filter((opt) =>
                opt.toLowerCase().includes(issueType.toLowerCase())
              ).map((opt) => (
                <li
                  key={opt}
                  onMouseDown={() => setIssueType(opt)}
                  className="report-option"
                >
                  {opt}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="report-hint">
          <HiOutlineUserCircle />
          <span>Hint</span>
        </div>
      </div>

      {/* 2. Ô Related Problem URL */}
      <div className="report-field">
        <label className="report-label">Related problem URL</label>
        <div className="report-input-wrap">
          <input
            type="text"
            className="report-input"
            placeholder="Dán đường dẫn (URL) của bài tập hoặc trang bị lỗi vào đây..."
            value={relatedUrl}
            onChange={(e) => setRelatedUrl(e.target.value)}
          />
          <button type="button" className="report-input-icon" aria-label="Send">
            <FaPaperPlane />
          </button>
        </div>
        <div className="report-hint">
          <HiOutlineUserCircle />
          <span>Hint</span>
        </div>
      </div>

      {/* 3. Ô Description */}
      <div className="report-field">
        <label className="report-label">Description</label>
        <div className="report-input-wrap">
          <input
            type="text"
            className="report-input"
            placeholder="Mô tả chi tiết các bước xảy ra lỗi hoặc mong muốn của bạn..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button type="button" className="report-input-icon" aria-label="Send">
            <FaPaperPlane />
          </button>
        </div>
        <div className="report-hint">
          <HiOutlineUserCircle />
          <span>Hint</span>
        </div>
      </div>

      <AttachmentUpload onChange={(files) => setAttachments(files)} />

      <div className="report-actions">
        <button type="button" className="report-btn report-btn-cancel" onClick={handleCancel}>
          Cancel
        </button>
        <button type="submit" className="report-btn report-btn-submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </div>
    </form>
  );
};