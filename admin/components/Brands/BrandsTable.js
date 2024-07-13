import { useDispatch, useSelector } from "react-redux";
import { getAllBrand } from "@/state/Products/Action";
import { useState, useEffect } from "react";
import BasicModal from "../Modal/BasicModal";
import DeleteBrand from "./DeleteBrand";
import UpdateBrand from "./UpdateBrand";
import ViewBrand from "./ViewBrand";

export default function BrandsTable() {
  const dispatch = useDispatch();
  const brands = useSelector((state) => state.product?.brand);
  const [openDelete, setOpenDelete] = useState(false)
  const [openUpdate, setOpenUpdate] = useState(false)
  const [openView, setOpenView] = useState(false)
  const [id, setId] = useState()
  const [initB, setInitB] = useState()

  useEffect(() => {
    dispatch(getAllBrand());
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
                  className="py-3.5 pl-4 pr-3 text-left text-base font-semibold text-gray-900 sm:pl-6 w-2/12"
                >
                  STT
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-base font-semibold text-gray-900"
                >
                  Tên nhãn hàng
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
                      {data.name}
                    </td>
                    
                    <td className="flex px-3 py-4 text-base text-gray-500 whitespace-nowrap">
                      <button
                        onClick={() => {
                          setOpenView(true);
                          setInitB(data);
                        }}
                        className="mr-4 py-1 px-2 border-2 border-dark-purple rounded-full text-sm hover:cursor-pointer hover:bg-dark-purple hover:text-white text-dark-purple"
                      >Xem</button>
                      <button
                        onClick={() => {
                          setOpenUpdate(true);
                          setInitB(data);
                        }}
                        className="py-1 px-2 mr-4 border-2 border-dark-purple rounded-full text-sm hover:cursor-pointer hover:bg-dark-purple hover:text-white text-dark-purple"
                      >Sửa</button>

                      <button
                        onClick={() => {
                          setOpenDelete(true);
                          setId(data.id);
                        }}
                        className=" hover:bg-red-400 border-red-400 border-2 px-2 py-1 rounded-full hover:text-white text-red-400 "
                      >Xóa</button>
                    </td>

                  </tr>
                </>
              ))}
            </tbody>
          </table>
          <BasicModal open={openDelete} onClose={() => setOpenDelete(false)}>
            <DeleteBrand onClose={() => setOpenDelete(false)} data={id} />
          </BasicModal>
          <BasicModal open={openUpdate} onClose={() => setOpen(false)}>
            <UpdateBrand
              open={openUpdate}
              onClose={() => setOpenUpdate(false)}
              brand={initB}
            />
          </BasicModal>
          <BasicModal open={openView} onClose={() => setOpenView(false)}>
            <ViewBrand
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
