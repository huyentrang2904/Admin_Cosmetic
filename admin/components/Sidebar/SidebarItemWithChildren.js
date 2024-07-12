import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { useRouter } from "next/router";
import { For } from "react-haiku";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function SidebarItemWithChildren({ item }) {
  const { asPath } = useRouter();

  // Kiểm tra xem nav con nào được click
  let check = false;
  let indicies;
  item.children.map((value, index) => {
    if (asPath.startsWith(value.href)) {
      check = true;
      indicies = index;
    }
  });

  if (check) {
    item.children[indicies].current = true;
    item.current = true;
  }
  if (!check) {
    item.children.map((value) => {
      value.current = false;
    });
    item.current = false;
  }

  return (
    <Disclosure as="div" key={item.name} className="w-full">
      {({ open }) => (
        <>
          <DisclosureButton
            className={classNames(
              item.current
                ? "bg-gray-900 text-white"
                : "text-gray-300 hover:bg-gray-700 hover:text-white",
              "group flex w-full items-center px-2 py-2 text-lg font-medium rounded-md relative"
            )}
          >
            <item.icon
              className={classNames(
                item.current ? 'text-gray-300' : 'text-gray-400 group-hover:text-gray-300',
                'mr-3 flex-shrink-0 h-6 w-6'
              )}
              aria-hidden="true"
            />
            {item.name}
            <DisclosurePanel
              className="fixed z-50 px-2 py-2 mt-1 space-y-1 bg-gray-500 rounded-md drop-shadow-xl"
              style={{ left: "16.6%" }}
            >
              <For
                each={item.children}
                render={(subItem, index) => (
                  <DisclosureButton
                    key={subItem.name}
                    as="a"
                    href={subItem.href}
                    className={classNames(
                      item.children[index].current
                        ? "bg-gray-900 text-white "
                        : "text-gray-200 hover:bg-gray-700 hover:text-white",
                      "flex items-center w-full px-6 py-2 text-base text-center font-medium rounded-md group "
                    )}
                  >
                    {subItem.name}
                  </DisclosureButton>
                )}
              />
            </DisclosurePanel>
          </DisclosureButton>
        </>
      )}
    </Disclosure>
  );
}
