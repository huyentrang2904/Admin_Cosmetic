import { useState, useEffect } from "react";
import { For, If } from "react-haiku";
import SidebarItem from "./SidebarItem";
import Profile from "./Profile";
import SidebarItemWithChildren from "./SidebarItemWithChildren";
import { ChartPieIcon, BanknotesIcon, ReceiptPercentIcon, UsersIcon, ShoppingCartIcon } from "@heroicons/react/24/outline";
import { toast } from "react-toastify";

const adminNavigation = [
  { name: "Dashboard", href: "/dashboard", requiredPermissions: ["Manage products", "Manage permissions", "Manage discounts ", "Manage orders"], icon: ChartPieIcon, current: false },
  {
    name: "Product Management", href: "", requiredPermissions: "Manage products", icon: BanknotesIcon, current: false, children: [
      { name: 'Product List', href: '/products', current: false },
      { name: 'Brand List', href: '/brands', current: false },
      { name: 'Category List', href: '/categories', current: false },
    ],
  },
  {
    name: "Role Management", href: "", requiredPermissions: "Manage permissions", icon: UsersIcon, current: false, children: [
      { name: 'Role & Permission Management', href: '/roles', current: false },
      { name: 'Member Management', href: '/members', current: false },
    ],
  },
  { name: "Discount Management", href: "/coupcons", requiredPermissions: "Manage discounts", icon: ReceiptPercentIcon, current: false },
  { name: "Order Management", href: "/orders", requiredPermissions: "Manage orders", icon: ShoppingCartIcon, current: false },
];

export default function Sidebar() {
  const [auth, setAuth] = useState();
  const [Role, setRole] = useState();
  let value, value1;
  if (typeof window !== "undefined") {
    value = JSON.parse(localStorage.getItem("userInformation")) || null;
    value1 = JSON.parse(localStorage.getItem("UserRole")) || null;
  }
  useEffect(() => {
    // Get the value from local storage if it exists
    setAuth(value.user);
    setRole(value1.permissions)
  }, []);
  function redirect() {
    window.location.href = '/'
  }
  function handleLogout() {
    setAuth("");
    localStorage.clear();
    toast.success("Log out successfully");
    setTimeout(redirect, 1000)
  }
  const matchingItems = adminNavigation.filter(navItem => {
    // Kiểm tra nếu requiredPermissions là một mảng, nếu không, chuyển đổi thành mảng gồm một phần tử
    const requiredPerms = Array.isArray(navItem.requiredPermissions) ? navItem.requiredPermissions : [navItem.requiredPermissions];
    // Kiểm tra xem mỗi phần tử trong requiredPerms có trong permission
    return requiredPerms.every(reqPerm =>
      Role?.some(permItem =>
        permItem.permissionName === reqPerm
      )
    );
  });
  matchingItems.unshift({ name: "Dashboard", href: "/dashboard", icon: ChartPieIcon, current: false });
  console.log(matchingItems)
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
              each={matchingItems}
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
