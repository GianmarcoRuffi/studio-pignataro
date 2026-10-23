"use client";

import { useEffect, useLayoutEffect, useRef, type RefObject } from "react";
import { getScrollContainer, pauseSmoothScroll } from "../utils/scroll";

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function useModalAccessibility(
  isOpen: boolean,
  dialogRef: RefObject<HTMLElement | null>,
  onClose: () => void
) {
  const onCloseRef = useRef(onClose);
  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useLayoutEffect(() => {
    const dialog = dialogRef.current;
    if (!isOpen || !dialog) return;
    const previousFocus =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    const focusable = () =>
      Array.from(dialog.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (element) =>
          element.getClientRects().length > 0 && !element.closest("[inert]")
      );
    const focusFirst = () =>
      (focusable()[0] ?? dialog).focus({ preventScroll: true });

    // Isolate the dialog even when it is nested inside the header or a portal.
    const siblings: { element: HTMLElement; inert: boolean }[] = [];
    let branch: HTMLElement = dialog;
    while (branch.parentElement) {
      for (const sibling of branch.parentElement.children) {
        if (
          sibling !== branch &&
          sibling instanceof HTMLElement &&
          !["SCRIPT", "STYLE", "LINK"].includes(sibling.tagName)
        ) {
          siblings.push({ element: sibling, inert: sibling.inert });
          sibling.setAttribute("inert", "");
        }
      }
      if (branch.parentElement === document.body) break;
      branch = branch.parentElement;
    }

    const resumeSmoothScroll = pauseSmoothScroll();
    const scrollContainer = getScrollContainer();
    const lockedElements = [
      document.body,
      ...(scrollContainer ? [scrollContainer] : []),
    ].map((element) => {
      const overflow = element.style.overflow;
      const prevent = element.getAttribute("data-lenis-prevent");
      element.style.overflow = "hidden";
      element.setAttribute("data-lenis-prevent", "");
      return { element, overflow, prevent };
    });
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        event.stopPropagation();
        onCloseRef.current();
      } else if (event.key === "Tab") {
        event.preventDefault();
        const elements = focusable();
        if (elements.length === 0) {
          dialog.focus({ preventScroll: true });
          return;
        }
        const current = elements.indexOf(document.activeElement as HTMLElement);
        const next = event.shiftKey
          ? current <= 0
            ? elements.length - 1
            : current - 1
          : (current + 1) % elements.length;
        elements[next].focus({ preventScroll: true });
      }
    };
    let isActive = true;
    const handleFocusOut = () => {
      queueMicrotask(() => {
        if (isActive && !dialog.contains(document.activeElement)) focusFirst();
      });
    };
    const handleFocus = (event: FocusEvent) => {
      if (!dialog.contains(event.target as Node)) focusFirst();
    };
    // A CSS visibility transition or the opening tap can defer focusability.
    let focusFrame = 0;
    const focusWhenVisible = () => {
      focusFirst();
      if (!dialog.contains(document.activeElement)) {
        focusFrame = window.requestAnimationFrame(focusWhenVisible);
      }
    };
    focusFirst();
    focusFrame = window.requestAnimationFrame(focusWhenVisible);
    document.addEventListener("keydown", handleKeyDown, true);
    document.addEventListener("focusin", handleFocus);
    document.addEventListener("focusout", handleFocusOut);
    window.addEventListener("focus", handleFocusOut);
    return () => {
      isActive = false;
      window.cancelAnimationFrame(focusFrame);
      document.removeEventListener("keydown", handleKeyDown, true);
      document.removeEventListener("focusin", handleFocus);
      document.removeEventListener("focusout", handleFocusOut);
      window.removeEventListener("focus", handleFocusOut);
      siblings.forEach(({ element, inert }) => {
        element.toggleAttribute("inert", inert);
      });
      resumeSmoothScroll();
      lockedElements.forEach(({ element, overflow, prevent }) => {
        element.style.overflow = overflow;
        if (prevent === null) element.removeAttribute("data-lenis-prevent");
        else element.setAttribute("data-lenis-prevent", prevent);
      });
      if (previousFocus?.isConnected && !previousFocus.closest("[inert]"))
        previousFocus.focus({ preventScroll: true });
    };
  }, [isOpen, dialogRef]);
}
