import React, { useContext, useState } from "react";
import "./Modal.scss";

interface ModalProps {
  title?: string;
  description?: string;
  setIconAsImg: boolean;
  imgUrl?: string;
  children?: JSX.Element[] | JSX.Element;
  openModal: boolean;
  bgColor?: string
  closeModal: () => void;
  isNFT?: boolean
}
export const Modal = (props: ModalProps) => {
  if (!props.openModal) return null;

  if (props.isNFT) {
    return (
      <>
        <div className="backdropTest">
          <div className={`nft-modal-container light-theme`}
            style={{
              backgroundImage: `url(${props.imgUrl})`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              backgroundSize: 'cover'
            }}
          >
            <div className="modal-header flex justify-end">
              <i className="fa-solid fa-xmark" onClick={() => props.closeModal()}></i>
            </div>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <div className="backdropTest">
        <div className={`modal-container light-theme`}
          style={{ backgroundColor: `${props.bgColor}` }}
        >
          <div className="modal-header">
            <i className="fa-solid fa-xmark" style={{ color: 'white' }} onClick={() => props.closeModal()}></i>
          </div>

          <div className="modal-body flex column align-center">
            {props.setIconAsImg ? <i className={`${props.imgUrl} modal-icon`}></i> : <img src={props.imgUrl} />}
            <h2 className="h2b">{props.title}</h2>
            <p>{props.description}</p>
            {props.children && <div className="btn-container">{props.children}</div>}
          </div>
        </div>
      </div>
    </>
  );
};
