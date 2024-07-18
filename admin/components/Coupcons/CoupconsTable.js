import { useDispatch, useSelector } from "react-redux";
import { getAllCoupcon } from "@/state/Admin/Action";
import { useState, useEffect } from "react";
import BasicModal from "../Modal/BasicModal";
import DeleteCoupcon from "./DeleteCoupcon";
import UpdateCoupcon from "./UpdateCoupcon";
import ViewCoupcon from "./ViewCoupcon";

export default function CoupconsTable() {
  const dispatch = useDispatch();
  const brands = useSelector((state) => state.admin?.coupcons);
  console.log(brands)
  const [openDelete, setOpenDelete] = useState(false)
  const [openUpdate, setOpenUpdate] = useState(false)
  const [openView, setOpenView] = useState(false)
  const [id, setId] = useState()
  const [initB, setInitB] = useState()

  useEffect(() => {
    dispatch(getAllCoupcon());
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
                  className="px-3 py-3.5 text-left text-base font-semibold text-gray-900"
                >
                  No.
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-base font-semibold text-gray-900"
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-base font-semibold text-gray-900"
                >
                Discount percent
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-base font-semibold text-gray-600"
                >
                Apply to
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-base font-semibold text-gray-900"
                >
                Min amount
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-base font-semibold text-gray-900"
                >
                  Max usage
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-base font-semibold text-gray-900"
                >
                  Total usage
                </th>
                <th className="w-1/12"></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 ">
              {brands?.map((data, index) => (
                <>
                  <tr key={index} className="">
                    <td className="px-3 py-4 text-base text-gray-500 whitespace-nowrap ">
                      {index + 1}
                    </td>
                    <td className="px-3 py-4 text-base text-gray-500 whitespace-nowrap">
                      {data.discountStatus}
                    </td>
                    <td className="px-3 py-4 text-base text-gray-500 whitespace-nowrap">
                      {data.discountPercent}%
                    </td>
                    <td className="px-3 py-4 text-base text-gray-500 whitespace-nowrap">
                      {data.applyTo}
                    </td>
                    <td className="px-3 py-4 text-base text-gray-500 whitespace-nowrap">
                      {data.minAmount}
                    </td>
                    <td className="px-3 py-4 text-base text-gray-500 whitespace-nowrap">
                      {data.maxUsage}
                    </td>
                    <td className="px-3 py-4 text-base text-gray-500 whitespace-nowrap">
                      {data.totalUsage}
                    </td>
                    <td className="flex px-3 py-4 text-base text-gray-500 whitespace-nowrap">
                      <button
                        onClick={() => {
                          setOpenView(true);
                          setInitB(data);
                        }}
                        className="px-2 py-1 mr-4 text-sm border-2 rounded-full border-dark-purple hover:cursor-pointer hover:bg-dark-purple hover:text-white text-dark-purple"
                      >View</button>
                      <button
                        onClick={() => {
                          setOpenUpdate(true);
                          setInitB(data);
                        }}
                        className="px-2 py-1 mr-4 text-sm border-2 rounded-full border-dark-purple hover:cursor-pointer hover:bg-dark-purple hover:text-white text-dark-purple"
                      >Update</button>

                      <button
                        onClick={() => {
                          setOpenDelete(true);
                          setId(data.id);
                        }}
                        className="px-2 py-1 text-red-400 border-2 border-red-400 rounded-full hover:bg-red-400 hover:text-white"
                      >Delete</button>
                    </td>

                  </tr>
                </>
              ))}
            </tbody>
          </table>
          <BasicModal open={openDelete} onClose={() => setOpenDelete(false)}>
            <DeleteCoupcon onClose={() => setOpenDelete(false)} data={id} />
          </BasicModal>
          <BasicModal open={openUpdate} onClose={() => setOpenUpdate(false)}>
            <UpdateCoupcon
              open={openUpdate}
              onClose={() => setOpenUpdate(false)}
              brand={initB}
            />
          </BasicModal>
          <BasicModal open={openView} onClose={() => setOpenView(false)}>
            <ViewCoupcon
              open={openView}
              onClose={() => setOpenView(false)}
              brand={initB}
            />
          </BasicModal>

        </div>
      </div>
    </div>
  );
}
