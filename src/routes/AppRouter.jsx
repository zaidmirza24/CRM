import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "../components/Layout.jsx";
import Dashboard from "../pages/Dashboard.jsx";
import Accounts from "../pages/Accounts.jsx";
import Contacts from "../pages/Contacts.jsx";
import Leads from "../pages/Leads.jsx";
import Opportunities from "../pages/Opportunities.jsx";
import Marketing from "../pages/Marketing.jsx";
import Emails from "../pages/Emails.jsx";
import Calendar from "../pages/Calendar.jsx";
import More from "../pages/More.jsx";
import Cases from "../pages/Cases.jsx";
import KnowledgeBase from "../pages/KnowledgeBase.jsx";
import CreateTask from "../pages/CreateTask.jsx";

const AppRouter = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/accounts" element={<Accounts />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/leads" element={<Leads />} />
        <Route path="/opportunities" element={<Opportunities />} />
        <Route path="/marketing" element={<Marketing />} />
        <Route path="/emails" element={<Emails />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/more" element={<More />} />
        <Route path="/cases" element={<Cases />} />
        <Route path="/knowledge-base" element={<KnowledgeBase />} />
        <Route path="/more/create-task" element={<CreateTask />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
