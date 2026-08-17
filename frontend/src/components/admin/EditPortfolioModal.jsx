import { useState, useRef } from 'react';
import { updatePortfolioItem } from '../../services/api';
import './EditPortfolioModal.css';

const EditPortfolioModal = ({ item, token, onClose, onUpdated }) => {
  const [title, setTitle] = useState(item.title);
  const [category, setCategory] = useState(item.category);
  const [eventDate, setEventDate] = useState(item.eventDate?.split('T')[0]);

  // Existing media from the portfolio item
  const [existingMedia, setExistingMedia] = useState(item.media || []);
  const [removedMediaIds, setRemovedMediaIds] = useState([]);

  // Cover image state
  const [currentCover, setCurrentCover] = useState(item.coverImage);
  const [newCoverFile, setNewCoverFile] = useState(null);
  const [newCoverPreview, setNewCoverPreview] = useState(null);

  // New media files to upload
  const [newMediaFiles, setNewMediaFiles] = useState([]);
  const [newMediaPreviews, setNewMediaPreviews] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const mediaInputRef = useRef(null);
  const coverInputRef = useRef(null);

  // --- Remove an existing media image ---
  const handleRemoveExisting = (media) => {
    setRemovedMediaIds((prev) => [...prev, media.cloudinaryPublicId]);
    setExistingMedia((prev) =>
      prev.filter((m) => m.cloudinaryPublicId !== media.cloudinaryPublicId)
    );
  };

  // --- Undo removal of an existing media image ---
  const handleUndoRemove = (publicId) => {
    const restoredMedia = item.media.find(
      (m) => m.cloudinaryPublicId === publicId
    );
    if (restoredMedia) {
      setExistingMedia((prev) => [...prev, restoredMedia]);
      setRemovedMediaIds((prev) => prev.filter((id) => id !== publicId));
    }
  };

  // --- Replace cover image ---
  const handleCoverChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setNewCoverFile(file);
    setNewCoverPreview(URL.createObjectURL(file));
  };

  // --- Add new media files ---
  const handleAddMedia = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    const previews = files.map((f) => ({
      file: f,
      url: URL.createObjectURL(f),
      name: f.name,
    }));

    setNewMediaFiles((prev) => [...prev, ...files]);
    setNewMediaPreviews((prev) => [...prev, ...previews]);

    // Reset input so the same file(s) can be selected again
    e.target.value = '';
  };

  // --- Remove a newly added file before upload ---
  const handleRemoveNewMedia = (index) => {
    URL.revokeObjectURL(newMediaPreviews[index].url);
    setNewMediaFiles((prev) => prev.filter((_, i) => i !== index));
    setNewMediaPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  // --- Submit the update ---
  const handleUpdate = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('category', category);
      formData.append('eventDate', eventDate);

      // Send removed media IDs
      if (removedMediaIds.length > 0) {
        formData.append('removedMedia', JSON.stringify(removedMediaIds));
      }

      // Attach new cover image file
      if (newCoverFile) {
        formData.append('coverImage', newCoverFile);
      }

      // Attach new media files
      for (const file of newMediaFiles) {
        formData.append('media', file);
      }

      await updatePortfolioItem(item._id, formData, token);

      // Clean up object URLs
      if (newCoverPreview) URL.revokeObjectURL(newCoverPreview);
      newMediaPreviews.forEach((p) => URL.revokeObjectURL(p.url));

      onUpdated();
      onClose();
    } catch (err) {
      setError(err.message || 'Failed to update portfolio');
    } finally {
      setIsLoading(false);
    }
  };

  // Items marked for removal (for undo UI)
  const removedItems = item.media?.filter((m) =>
    removedMediaIds.includes(m.cloudinaryPublicId)
  ) || [];

  return (
    <div className="edit-portfolio-overlay" onClick={onClose}>
      <div
        className="edit-portfolio-box"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="edit-portfolio-close"
          onClick={onClose}
          disabled={isLoading}
        >
          ×
        </button>

        <form onSubmit={handleUpdate} className="edit-portfolio-form">
          <h2>Edit Portfolio</h2>

          {error && <div className="edit-portfolio-error">{error}</div>}

          {/* ---- Text fields ---- */}
          <div className="edit-field-group">
            <label>Title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Portfolio title"
              disabled={isLoading}
            />
          </div>

          <div className="edit-field-group">
            <label>Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              disabled={isLoading}
            >
              <option value="wedding">Wedding</option>
              <option value="pre-shoot">Pre-shoot</option>
              <option value="portrait">Portrait</option>
              <option value="event">Event</option>
              <option value="commercial">Commercial</option>
            </select>
          </div>

          <div className="edit-field-group">
            <label>Event Date</label>
            <input
              type="date"
              value={eventDate}
              onChange={(e) => setEventDate(e.target.value)}
              disabled={isLoading}
            />
          </div>

          {/* ---- Cover Image ---- */}
          <div className="edit-field-group">
            <label>Cover Image</label>
            <div className="edit-cover-section">
              <div className="edit-cover-preview">
                <img
                  src={newCoverPreview || currentCover?.url}
                  alt="Cover"
                />
                {newCoverPreview && (
                  <span className="edit-cover-badge">New</span>
                )}
              </div>
              <button
                type="button"
                className="edit-replace-cover-btn"
                onClick={() => coverInputRef.current?.click()}
                disabled={isLoading}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="17 8 12 3 7 8" />
                  <line x1="12" y1="3" x2="12" y2="15" />
                </svg>
                Replace Cover
              </button>
              <input
                ref={coverInputRef}
                type="file"
                accept="image/*"
                onChange={handleCoverChange}
                style={{ display: 'none' }}
              />
            </div>
          </div>

          {/* ---- Existing Media ---- */}
          <div className="edit-field-group">
            <label>
              Media Images
              <span className="edit-media-count">
                {existingMedia.length + newMediaFiles.length} total
              </span>
            </label>

            {existingMedia.length > 0 && (
              <div className="edit-media-grid">
                {existingMedia.map((media) => (
                  <div
                    key={media.cloudinaryPublicId}
                    className="edit-media-thumb"
                  >
                    <img src={media.url} alt="Media" />
                    <button
                      type="button"
                      className="edit-media-remove"
                      onClick={() => handleRemoveExisting(media)}
                      disabled={isLoading}
                      title="Remove this image"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Undo removed items */}
            {removedItems.length > 0 && (
              <div className="edit-removed-items">
                <span className="edit-removed-label">
                  {removedItems.length} image{removedItems.length > 1 ? 's' : ''} marked for removal
                </span>
                <div className="edit-removed-list">
                  {removedItems.map((media) => (
                    <div
                      key={media.cloudinaryPublicId}
                      className="edit-removed-thumb"
                    >
                      <img src={media.url} alt="Removed" />
                      <button
                        type="button"
                        className="edit-undo-remove"
                        onClick={() =>
                          handleUndoRemove(media.cloudinaryPublicId)
                        }
                        disabled={isLoading}
                        title="Undo removal"
                      >
                        ↩
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* New media previews */}
            {newMediaPreviews.length > 0 && (
              <div className="edit-new-media-section">
                <span className="edit-new-label">New uploads</span>
                <div className="edit-media-grid">
                  {newMediaPreviews.map((preview, idx) => (
                    <div key={idx} className="edit-media-thumb new-media">
                      <img src={preview.url} alt={preview.name} />
                      <span className="edit-cover-badge">New</span>
                      <button
                        type="button"
                        className="edit-media-remove"
                        onClick={() => handleRemoveNewMedia(idx)}
                        disabled={isLoading}
                        title="Remove this file"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Add media button */}
            <button
              type="button"
              className="edit-add-media-btn"
              onClick={() => mediaInputRef.current?.click()}
              disabled={isLoading}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              Add Images
            </button>
            <input
              ref={mediaInputRef}
              type="file"
              accept="image/*,video/*"
              multiple
              onChange={handleAddMedia}
              style={{ display: 'none' }}
            />
          </div>

          {/* ---- Submit ---- */}
          <button
            type="submit"
            disabled={isLoading}
            className={isLoading ? 'loading' : ''}
          >
            {isLoading ? (
              <span className="edit-loading-content">
                <span className="edit-spinner" />
                Updating...
              </span>
            ) : (
              'Update Portfolio'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditPortfolioModal;