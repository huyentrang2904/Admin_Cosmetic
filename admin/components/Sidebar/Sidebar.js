import { useState, useEffect } from "react";
import { For, If } from "react-haiku";
import SidebarItem from "./SidebarItem";
import Profile from "./Profile";
import SidebarItemWithChildren from "./SidebarItemWithChildren";
import { ChartPieIcon, BanknotesIcon, ReceiptPercentIcon, UsersIcon, ShoppingCartIcon } from "@heroicons/react/24/outline";
import { toast } from "react-toastify";

const adminNavigation = [
  { name: "Trang chủ", href: "/dashboard", icon: ChartPieIcon, current: false },
  {
    name: "Quản lý sản phẩm", href: "", requiredPermissions: "Manage products", icon: BanknotesIcon, current: false, children: [
      { name: 'Danh sách sản phẩm', href: '/products', current: false },
      { name: 'Danh sách nhãn hàng', href: '/brands', current: false },
      { name: 'Danh sách danh mục', href: '/categories', current: false },
    ],
  },
  {
    name: "Quản lý phân quyền", href: "", requiredPermissions: "Manage permissions", icon: UsersIcon, current: false, children: [
      { name: 'Quản lý quyền', href: '/roles', current: false },
      { name: 'Quản lý thành viên', href: '/members', current: false },
    ],
  },
  { name: "Quản lý mã giảm giá", href: "/coupcons", requiredPermissions: "Manage discounts", icon: ReceiptPercentIcon, current: false },
  { name: "Quản lý đơn hàng", href: "/orders", requiredPermissions: "Manage orders", icon: ShoppingCartIcon, current: false },

];

export default function Sidebar() {
  const [auth, setAuth] = useState();
  let value;
  if (typeof window !== "undefined") {
    value = JSON.parse(localStorage.getItem("userInformation")) || null;
  }
  useEffect(() => {
    // Get the value from local storage if it exists
    setAuth(value.user);
  }, []);
  function redirect() {
    window.location.href = '/'
  }
  function handleLogout() {
    setAuth("");
    localStorage.clear();
    toast.success("Bạn đã đăng xuất");
    setTimeout(redirect, 1000)
  }
  return (
    <div className="flex flex-row w-1/6 h-full">
      <div className="flex flex-col flex-1 h-screen min-h-0 bg-gray-800">
        <div className="flex flex-col flex-1 pt-5 pb-4 overflow-y-auto">
          <div className="flex items-center flex-shrink-0 px-4 text-2xl font-semibold tracking-wider text-white">
            COSMETIC
          </div>
          <nav
            className="flex-1 px-2 mt-5 space-y-1 bg-gray-800"
            aria-label="Sidebar"
          >
            <For
              each={adminNavigation}
              render={(item, index) => (
                <>
                  <If isTrue={!item.children}>
                    <SidebarItem item={item} />
                  </If>
                  <If isTrue={item.children}>
                    <SidebarItemWithChildren item={item} />
                  </If>
                </>
              )}
            />

          </nav>
        </div>
        <Profile user={auth} logout={handleLogout} />
      </div>
    </div>
  );
}
