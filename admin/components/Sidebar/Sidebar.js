import { For, If } from "react-haiku";
import SidebarItem from "./SidebarItem";
import Profile from "./Profile";
import SidebarItemWithChildren from "./SidebarItemWithChildren";
import { ChartPieIcon, BanknotesIcon, ReceiptPercentIcon, UsersIcon, QuestionMarkCircleIcon } from "@heroicons/react/24/outline";

const adminNavigation = [
  { name: "Trang chủ", href: "/dashboard", icon: ChartPieIcon, current: false },
  {
    name: "Quản lý sản phẩm", href: "", icon: BanknotesIcon, current: false, children: [
      { name: 'Danh sách sản phẩm', href: '/financialManagement/revenueManagement', current: false },
      { name: 'Danh sách nhãn hàng', href: '/financialManagement/sponsorManagement', current: false },
      { name: 'Danh sách danh mục', href: '/financialManagement/expenseManagement', current: false },
    ],
  },
  {
    name: "Quản lý phân quyền", href: "", icon: UsersIcon, current: false, children: [
      { name: 'Quản lý phân quyền', href: '/permissionsManagement', current: false },
      { name: 'Quản lý thành viên', href: '/permissionsManagement/userManagement', current: false },
    ],
  },
  { name: "Quản lý mã giảm giá", href: "/questionsAndAnswers/questionsAndAnswers", icon: ReceiptPercentIcon, current: false },
];

export default function Sidebar() {
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
        <Profile />
      </div>
    </div>
  );
}
