import Sidebar from "./Sidebar";
import Header from "./Header";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Header />
      <div className="flex flex-1">
        <div className="w-[15%]">
          <Sidebar />
        </div>
        {/* <div className="flex-1  bg-gray-100 p-6"> */}
        <div className="flex-1 bg-white p-6">
          <main className="">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default Layout;
