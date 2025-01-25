import { IoMdAddCircleOutline, IoIosStar } from "react-icons/io";
import { FiStar } from "react-icons/fi";
import { FaTrash } from "react-icons/fa";
import { useState } from "react";
import Button from "../components/Button.jsx";
import SearchInput from "../components/SearchInput.jsx";
import Container from "../components/Container.jsx";
import Popup from "../components/Popup.jsx";

// Sample Emails Data
const initialEmails = [
  { id: 1, sender: "Jared Black", subject: "New Insurance Policy", content: "This is the beginning of the email", starred: false, checked: false },
  { id: 2, sender: "John Wick", subject: "Security Alert", content: "Your password was changed recently.", starred: false, checked: false },
  { id: 3, sender: "Alice Doe", subject: "Meeting Reminder", content: "Don't forget our meeting at 3 PM.", starred: false, checked: false },
  { id: 4, sender: "Bob Smith", subject: "Project Update", content: "Here's the latest update on the project.", starred: false, checked: false },
];

const Emails = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [emails, setEmails] = useState(initialEmails);
  const [activeTab, setActiveTab] = useState("Inbox");

  const tabs = ["Inbox", "Starred", "Sent", "Drafts", "Spam", "Archived"];

  // Toggle Star Function
  const toggleStar = (id) => {
    setEmails((prevEmails) =>
      prevEmails.map((email) =>
        email.id === id ? { ...email, starred: !email.starred } : email
      )
    );
  };

  // Toggle Checkbox Selection
  const toggleCheck = (id) => {
    setEmails((prevEmails) =>
      prevEmails.map((email) =>
        email.id === id ? { ...email, checked: !email.checked } : email
      )
    );
  };

  // Delete Selected Emails
  const deleteSelectedEmails = () => {
    setEmails((prevEmails) => prevEmails.filter((email) => !email.checked));
  };

  // Get selected emails
  const selectedEmails = emails.filter((email) => email.checked);

  // Function to filter emails based on the active tab
  const getFilteredEmails = () => {
    if (activeTab === "Starred") {
      return emails.filter((email) => email.starred);
    }
    if (activeTab === "Inbox") {
      return emails.filter((email) => !["Spam", "Archived"].includes(email.sender));
    }
    return emails.filter((email) => email.sender.includes(activeTab));
  };

  return (
    <Container>
      <Header openModal={() => setIsModalOpen(true)} deleteSelectedEmails={deleteSelectedEmails} selectedEmails={selectedEmails} />
      <EmailTabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
      <EmailList activeTab={activeTab} emails={getFilteredEmails()} toggleStar={toggleStar} toggleCheck={toggleCheck} />

      {/* Compose Email Popup */}
      <Popup isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2 className="text-xl font-bold mb-4">Compose Email</h2>
        <textarea
          className="w-full p-2 border border-gray-300 rounded-md"
          rows="4"
          placeholder="Type your email here"
        />
      </Popup>
    </Container>
  );
};

// 📌 Header Component (Search + Compose + Delete Button)
const Header = ({ openModal, deleteSelectedEmails, selectedEmails }) => {
  return (
    <div className="flex justify-between items-center">
      <SearchInput width="w-[50%]" />
      <div className="flex space-x-2">
        {selectedEmails.length > 0 && (
          <Button
            onClick={deleteSelectedEmails}
            textColor="text-white bg-red-500"
            className="px-3 py-2 rounded-md"
          >
            <FaTrash /> ({selectedEmails.length})
          </Button>
        )}
        <Button
          onClick={openModal}
          textColor="text-white"
          icon={<IoMdAddCircleOutline />}
          iconPosition="left"
          iconSize="text-2xl"
        >
          Compose
        </Button>
      </div>
    </div>
  );
};

// 📌 Tabs Component (Inbox, Starred, etc.)
const EmailTabs = ({ tabs, activeTab, setActiveTab }) => {
  return (
    <div className="flex my-4">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`mr-10 py-2 text-md font-medium
            ${activeTab === tab ? "text-red-600 font-bold" : "text-gray-500"}
            hover:text-red-600 transition-all duration-200`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

// 📌 Email List Component
const EmailList = ({ emails, toggleStar, toggleCheck, activeTab }) => {
  return (
    <div className="mt-4">
      {emails.length === 0 ? (
        <p className="text-gray-500">
          {
            activeTab === "Inbox" || activeTab === "Starred" || activeTab === "Drafts"
              ? `No emails in ${activeTab}`
              : `No ${activeTab} emails`
          }
        </p>
      ) : (
        emails.map((email) => (
          <EmailItem key={email.id} email={email} toggleStar={toggleStar} toggleCheck={toggleCheck} />
        ))
      )}
    </div>
  );
};

// 📌 Email Item Component
const EmailItem = ({ email, toggleStar, toggleCheck }) => {
  return (
    <div className="p-3 border-b flex items-center hover:bg-gray-50 transition-all">
      {/* Checkbox */}
      <input
        type="checkbox"
        checked={email.checked}
        onChange={() => toggleCheck(email.id)}
        className="mr-3"
      />

      {/* Star Icon */}
      <button onClick={() => toggleStar(email.id)} className="mr-3">
        {email.starred ? <IoIosStar className="text-yellow-500 text-xl" /> : <FiStar className="text-gray-400 text-xl" />}
      </button>

      {/* Email Details - Flex container for proper spacing */}
      <div className="flex flex-1 items-center justify-between">
        {/* Left: Sender, Subject & Content */}
        <div className="flex items-center space-x-2">
          <h3 className="font-semibold whitespace-nowrap">{email.sender}</h3>
          <p className="text-sm text-gray-700 whitespace-nowrap">Re: {email.subject}</p>
          <p className="text-xs text-gray-500 truncate">{email.content}</p>
        </div>

        {/* Right: Timestamp */}
        <p className="text-xs text-gray-500 whitespace-nowrap">{email.timestamp || "10:07 AM"}</p>
      </div>
    </div>
  );
};

export default Emails;
