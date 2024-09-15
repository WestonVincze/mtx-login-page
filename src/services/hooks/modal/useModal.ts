import React, { useState } from "react";

export const useModal = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [content, setContent] = useState<React.ReactNode>(null);

  const openModal = (newContent: React.ReactNode) => {
    setIsOpen(true);
    setContent(newContent);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return { isOpen, content, openModal, closeModal };
};
