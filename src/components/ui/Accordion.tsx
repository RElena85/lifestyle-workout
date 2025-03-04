import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AccordionProps {
  children: ReactNode;
  className?: string;
}

/**
 * Accordion
 * A simple container for Accordion items.
 */
export const Accordion: React.FC<AccordionProps> = ({ children, className }) => {
  return <div className={`space-y-2 ${className || ''}`}>{children}</div>;
};

interface AccordionItemProps {
  children: ReactNode;
  className?: string;
}

interface AccordionItemContextProps {
  open: boolean;
  toggle: () => void;
}

const AccordionItemContext = createContext<AccordionItemContextProps | undefined>(undefined);

/**
 * AccordionItem
 * A wrapper for each collapsible section in the accordion.
 */
export const AccordionItem: React.FC<AccordionItemProps> = ({ children, className }) => {
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen(prev => !prev);

  return (
    <AccordionItemContext.Provider value={{ open, toggle }}>
      <div className={`border rounded ${className || ''}`}>
        {children}
      </div>
    </AccordionItemContext.Provider>
  );
};

interface AccordionTriggerProps {
  children: ReactNode;
  className?: string;
}

/**
 * AccordionTrigger
 * The clickable header for the accordion item that toggles the state.
 */
export const AccordionTrigger: React.FC<AccordionTriggerProps> = ({ children, className }) => {
  const context = useContext(AccordionItemContext);
  if (!context) {
    throw new Error("AccordionTrigger must be used within an AccordionItem");
  }
  const { open, toggle } = context;
  return (
    <button
      onClick={toggle}
      className={`w-full flex items-center justify-between px-4 py-2 font-medium text-left text-sm focus:outline-none focus-visible:ring focus-visible:ring-primary ${className || ''}`}
    >
      <span>{children}</span>
      <svg
        className={`w-4 h-4 transform transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M19 9l-7 7-7-7" />
      </svg>
    </button>
  );
};

interface AccordionContentProps {
  children: ReactNode;
  className?: string;
}

/**
 * AccordionContent
 * The panel that displays the additional content when the accordion item is open.
 */
export const AccordionContent: React.FC<AccordionContentProps> = ({ children, className }) => {
  const context = useContext(AccordionItemContext);
  if (!context) {
    throw new Error("AccordionContent must be used within an AccordionItem");
  }
  const { open } = context;
  return (
    <>
      {open && (
        <div className={`px-4 py-2 text-sm transition-all ${className || ''}`}>
          {children}
        </div>
      )}
    </>
  );
};