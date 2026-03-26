"use client";

import { FC, ReactNode } from "react";
import PageLoadingScreen from "../PageLoadingScreen/PageLoadingScreen";
import { usePageLoading } from "../../hooks/usePageLoading";

interface ClientPageWrapperProps {
  children: ReactNode;
}

const ClientPageWrapper: FC<ClientPageWrapperProps> = ({ children }) => {
  const { isPageLoading, handleLoadingComplete } = usePageLoading();

  return (
    <>
      {isPageLoading && (
        <PageLoadingScreen onLoadingComplete={handleLoadingComplete} />
      )}
      {children}
    </>
  );
};

export default ClientPageWrapper;
