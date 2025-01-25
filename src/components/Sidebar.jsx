import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { GrHomeRounded } from "react-icons/gr";
import { VscAccount } from "react-icons/vsc";
import { MdOutlineContactSupport, MdOutlineLeaderboard } from "react-icons/md";
import { LuCircleDollarSign, LuCalendarDays } from "react-icons/lu";
import { HiOutlineSpeakerWave, HiOutlineClipboardDocumentList } from "react-icons/hi2";
import { IoMailOutline, IoBriefcaseOutline } from "react-icons/io5";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { RiMoreFill } from "react-icons/ri";
import { CiCircleMore } from "react-icons/ci";
import user from "../assets/user.png"
import { usePageTitle } from "./PageTitleContext";

const Sidebar = () => {

  const { pageTitle,setPageTitle } = usePageTitle(); // Access the context
  const { pathname } = useLocation();
  const menuItems = [
    {
      items: [
        { name: "Home", icon: <GrHomeRounded />, route: "/" },
      ],
    },
    {
      heading: "CRM",
      items: [
        { name: "Accounts", icon: <VscAccount />, route: "/accounts" },
        { name: "Contacts", icon: <MdOutlineContactSupport />, route: "/contacts" },
        { name: "Leads", icon: <MdOutlineLeaderboard />, route: "/leads" },
        { name: "Opportunities", icon: <LuCircleDollarSign />, route: "/opportunities" },
        { name: "Marketing", icon: <HiOutlineSpeakerWave />, route: "/marketing" },
      ],
    },
    {
      heading: "Activities",
      items: [
        { name: "Emails", icon: <IoMailOutline />, route: "/emails" },
        { name: "Calendar", icon: <LuCalendarDays />, route: "/calendar" },
        { name: "More", icon: <CiCircleMore />, route: "/more" },
      ],
    },
    {
      heading: "Support",
      headingIcon: <IoIosArrowForward className="cursor-pointer" />,
      items: [
        { name: "Cases", icon: <IoBriefcaseOutline />, route: "/cases" },
        { name: "Knowledge Base", icon: <HiOutlineClipboardDocumentList />, route: "/knowledge-base" },
        { icon: <RiMoreFill />, route: "" },
      ],
    },
  ];

  return (
    <aside className="bg-white h-screen shadow-lg border-r border-gray-200 overflow-scroll">
      <nav className="pt-2">
        <div className="">
          {menuItems.map((item, index) => (
            <div key={index}>
              <h3 className="text-gray-500 px-6 py-2 md:text-sm lg:text-[1rem] flex justify-between">{item.heading}{item.headingIcon}</h3>
              {item.items.map((item, idx) => (
                <Link
                  to={item.route}
                  onClick={() => setPageTitle(item.name === "Home" ? "Dashboard" : pageTitle)}
                  key={idx}
                  className={`md:px-3 lg:px-6 md:py-2 lg:py-3 md:text-sm lg:text-lg flex
                   items-center gap-3 text-gray-700 hover:bg-red-50
                   ${pathname === item.route ? 'bg-red-100 border-r-4 border-red-700' : ''}`}
                >
                  <span className="md:text-lg lg:text-xl">{item.icon}</span>
                  {item.name}
                </Link>
              ))}
            </div>
          ))}
        </div>
      </nav>
      {/* user */}
      <div className="flex items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <img src={user} alt="User Avatar" className="w-10 h-10 rounded-full" />
          <div>
            <h6 className="text-sm font-semibold">Evano</h6>
            <span className="text-xs text-gray-500">Project Manager</span>
          </div>
        </div>
        <div className="ml-auto">
          <IoIosArrowBack className="text-lg cursor-pointer text-gray-500" />
        </div>
      </div>

    </aside>
  );
};

export default Sidebar;