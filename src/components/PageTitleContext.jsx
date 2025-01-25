import { createContext, useContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

// Create Context
const PageTitleContext = createContext();

// Custom Hook to use Context
export const usePageTitle = () => useContext(PageTitleContext);

// Route-to-Title Mapping
const routeTitleMap = {
  "/": "Dashboard",
  "/emails": "Emails",
  "/accounts": "Accounts",
  "/contacts": "Contacts",
  "/leads": "Leads",
  "/opportunities": "Opportunities",
  "/marketing": "Marketing",
  "/calendar": "Calendar",
  "/more": "Tasks",
  "/cases": "Cases",
  "/knowledge-base": "Knowledge Base",
};

// Context Provider
export const PageTitleProvider = ({ children }) => {
  const { pathname } = useLocation();

  // Determine the title dynamically based on the current route
  const getTitleForRoute = (path) => routeTitleMap[path] || "Dashboard";

  const [pageTitle, setPageTitle] = useState(getTitleForRoute(pathname));

  useEffect(() => {
    setPageTitle(getTitleForRoute(pathname));
  }, [pathname]);

  return (
    <PageTitleContext.Provider value={{ pageTitle, setPageTitle }}>
      {children}
    </PageTitleContext.Provider>
  );
};
