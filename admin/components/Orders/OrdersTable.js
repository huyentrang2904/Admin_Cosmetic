import { useDispatch, useSelector } from "react-redux";
import { getAllOrders } from "@/state/Admin/Action";
import { useState, useEffect } from "react";
import BasicModal from "../Modal/BasicModal";
import UpdateStatus from "./UpdateStatus";
import ViewOrder from "./ViewOrder";

export default function OrdersTable() {
  const dispatch = useDispatch();
  const brands = useSelector((state) => state?.admin.orders);
  const [openView, setOpenView] = useState(false)
  const [openUpdate, setOpenUpdate] = useState(false)
  const [id, setId] = useState()
  const statusList = {
    "Đặt hàng thành công.": 'ORDER PLACED SUCCESS',
    "Đơn hàng đã bị hủy.": 'ORDER CANCELLED',
    "Người bán đang chuẩn bị hàng.": 'SELLER PREPARING ORDER',
    "Đang giao hàng.": 'IN TRANSIT',
    "Giao hàng thành công.": 'DELIVERY SUCCESSFUL',
    "Giao hàng không thành công.": 'DELIVERY FAILED',
    "Trả hàng /Hoàn tiền.": 'RETURNED AND REFUNDED',
    "Thanh toán tiền mặt.": "Cash"
  }
  useEffect(() => {
    dispatch(getAllOrders());
  }, []);
  return (
    <div id='root' className="flex flex-col mt-4 overflow-y-scroll h-[90vh]">
      {/* <div className="-mx-4 -my-2 sm:-mx-6 lg:-mx-8"> */}
      <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8 ">
        <div className="shadow ring-1 ring-black ring-opacity-5 md:rounded-lg ">
          <table className="min-w-full divide-y divide-gray-300 ">
            <thead className="sticky top-0 z-20 rounded-t-lg bg-gray-50">
              <tr className="">
                <th
                  scope="col"
                  className="py-3.5 pl-4 pr-3 text-left text-base font-semibold text-gray-900 sm:pl-6 w-1/12"
                >
                  No.
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-base font-semibold text-gray-900"
                >
                  Name
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-base font-semibold text-gray-900"
                >
                  Total cost
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-base font-semibold text-gray-900"
                >
                  Payment method
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-base font-semibold text-gray-900"
                >
                  Status
                </th>
                <th className="w-1/12"></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 ">
              {brands?.map((data, index) => (

                <>
                  <tr key={index} className="">
                    <td className="py-4 pr-10 text-base font-medium text-left text-gray-900 whitespace-nowrap sm:pl-6 ">
                      {index + 1}
                    </td>
                    <td className="px-3 py-4 text-base text-gray-500 whitespace-nowrap">
                      {data.fullName}
                    </td>
                    <td className="px-3 py-4 text-base text-gray-500 whitespace-nowrap">
                      {data.totalCost.toFixed(2)}
                    </td>
                    <td className="px-3 py-4 text-base text-gray-500 whitespace-nowrap">
                      {statusList[data.paymentMethod]}
                    </td>
                    <td className="px-3 py-4 text-base text-gray-500 whitespace-nowrap">
                      {statusList[data.status]}
                    </td>
                    <td className="flex px-3 py-4 text-base text-gray-500 whitespace-nowrap">
                      <button
                        onClick={() => {
                          setOpenView(true);
                          setId(data.id);
                        }}
                        className="px-2 py-1 mr-4 text-sm border-2 rounded-full border-dark-purple hover:cursor-pointer hover:bg-dark-purple hover:text-white text-dark-purple"
                      >Detail</button>

                      <button
                        onClick={() => {
                          setOpenUpdate(true);
                          setId(data.id);
                        }}
                        className="px-2 py-1 text-sm border-2 rounded-full border-dark-purple hover:cursor-pointer hover:bg-dark-purple hover:text-white text-dark-purple"
                      >Update</button>
                    </td>

                  </tr>
                </>
              ))}

            </tbody>
          </table>
          <BasicModal open={openView} onClose={() => setOpenView(false)}>
            <ViewOrder open={openView} onClose={() => setOpenView(false)} data={id} />
          </BasicModal>
          <BasicModal open={openUpdate} onClose={() => setOpenUpdate(false)}>
            <UpdateStatus
              open={openUpdate}
              onClose={() => setOpenUpdate(false)}
              data={id}
            />
          </BasicModal>

        </div>
      </div>
    </div>
  );
}
