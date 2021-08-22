import React, { useRef } from "react";
import ReactModal from "react-modal";
import { disableBodyScroll, clearAllBodyScrollLocks } from "body-scroll-lock";
import { MdClose } from "react-icons/md";

import "./profile-modal.css";
import { Mentor } from "../interfaces";

const CloseButton = ({ onClose }: { onClose: () => void }) => (
  <button className="modal-close" onClick={onClose}>
    <MdClose />
  </button>
);

const ProfileModal = ({
  isOpen,
  mentor,
  onClose,
}: {
  isOpen: boolean;
  mentor?: Mentor;
  onClose: () => void;
}) => {
  const scrollEl = useRef(null);

  // Disable body scroll when modal is open.
  const onAfterOpenHandler = () =>
    disableBodyScroll(scrollEl.current as any, { reserveScrollBarGap: true });

  const onAfterCloseHandler = () => clearAllBodyScrollLocks();

  return (
    <ReactModal
      className="modal-container"
      overlayClassName="modal-overlay"
      isOpen={isOpen}
      shouldCloseOnOverlayClick={true}
      onAfterOpen={onAfterOpenHandler}
      onRequestClose={onClose}
      onAfterClose={onAfterCloseHandler}
      /* Set a timeout so modal element is removed after transition (0.3s). */
      closeTimeoutMS={300}
      contentLabel="View Details"
    >
      <CloseButton onClose={onClose} />
      <div className="modal-content" ref={scrollEl}>
        <div className="modal-left">
          <img
            className="modal-image"
            src={process.env.PUBLIC_URL + mentor?.fullImageUrl}
            alt={mentor?.name}
          />
          <div className="modal-metadata-container">
            <h2>{mentor?.name}</h2>
            <div className="modal-metadata">
              <strong>Role:</strong> {mentor?.role}
            </div>
            {mentor?.industries && (
              <div className="modal-metadata">
                <strong>Industries:</strong> {mentor.industries.join(", ")}
              </div>
            )}
            {mentor?.organisation && (
              <div className="modal-metadata">
                <strong>Organisation:</strong> {mentor.organisation}
              </div>
            )}
            {mentor?.school && (
              <div className="modal-metadata">
                <strong>School Graduated From:</strong> {mentor.school}
              </div>
            )}
            {mentor?.courseOfStudy && (
              <div className="modal-metadata">
                <strong>Course of Study:</strong> {mentor.courseOfStudy}
              </div>
            )}
          </div>
        </div>
        <div className="modal-right">
          <p className="modal-bio">{mentor?.fullBio}</p>
        </div>
      </div>
    </ReactModal>
  );
};

ProfileModal.defaultProps = {
  mentor: {},
};

export default ProfileModal;
