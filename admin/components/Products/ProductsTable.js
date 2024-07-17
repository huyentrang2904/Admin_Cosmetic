import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "@/state/Products/Action";
import { useState, useEffect } from "react";
import BasicModal from "../Modal/BasicModal";
import UpdateProduct from "./UpdateProduct";
// import DeleteCategory from "./DeleteCategory";
// import UpdateCategory from "./UpdateCategory";

export default function ProductsTable() {
  const dispatch = useDispatch();
  const brands = useSelector((state) => state.product?.products);
  const [openDelete, setOpenDelete] = useState(false)
  const [openUpdate, setOpenUpdate] = useState(false)
  const [id, setId] = useState()
  const [initB, setInitB] = useState()
  const statusList = {
    'Còn hàng': "Stocking",
    'Hết hàng': 'Out of stock',
    'Ẩn': 'Hide'
  }

  useEffect(() => {
    dispatch(getProducts());
  }, []);
  return (
    <div id='root' className="flex flex-col mt-4 overflow-y-scroll h-[90vh]">
      {/* <div className="-mx-4 -my-2 sm:-mx-6 lg:-mx-8"> */}
      <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8 ">
        <div className="shadow ring-1 ring-black ring-opacity-5 md:rounded-lg ">
          <table className="min-w-full divide-y divide-gray-300 ">
            <thead className="z-20 rounded-t-lg bg-gray-50">
              <tr className="">
                <th
                  scope="col"
                  className="py-3.5 pl-4 pr-3 text-left text-base font-semibold text-gray-900 sm:pl-6 w-1/12"
                >
                  No.
                </th>
                <th
                  scope="col"
                  className="px-3 w-6/12 truncate py-3.5 text-left text-base font-semibold text-gray-900"
                >
                  Product's name
                </th>
                <th
                  scope="col"
                  className="px-3 w-2/12 truncate py-3.5 text-center text-base font-semibold text-gray-900"
                >
                  Price
                </th>
                <th
                  scope="col"
                  className="px-3 w-2/12 truncate py-3.5 text-center text-base font-semibold text-gray-900"
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
                    <td className="w-3/12 px-3 py-4 overflow-hidden text-base text-gray-500">
                      {data.title}
                    </td>
                    <td className="px-3 py-4 text-base text-center text-gray-500 whitespace-nowrap">
                      {data.currentCost}
                    </td>
                    <td className="px-3 py-4 text-base text-center text-gray-500 whitespace-nowrap">
                      {statusList[data.productStatus]}
                    </td>
                    <td className="flex items-center px-3 py-4 text-base text-gray-500 h-[10vh] whitespace-nowrap">
                      <button
                        onClick={() => {
                          setOpenUpdate(true);
                          setInitB(data);
                          setId(data.id)
                        }}
                        className="px-2 py-1 mr-4 text-sm border-2 rounded-full border-dark-purple hover:cursor-pointer hover:bg-dark-purple hover:text-white text-dark-purple"
                      >Update</button>

                      {/* <button
                        onClick={() => {
                          setOpenDelete(true);
                          setId(data.id);
                        }}
                        className="px-2 py-1 text-red-400 border-2 border-red-400 rounded-full hover:bg-red-400 hover:text-white"
                      >Delete</button> */}
                    </td>

                  </tr>
                </>
              ))}
            </tbody>
          </table>
          {/* <BasicModal open={openDelete} onClose={() => setOpenDelete(false)}>
            <DeleteCategory onClose={() => setOpenDelete(false)} data={id} />
          </BasicModal> */}
          <BasicModal open={openUpdate} onClose={() => setOpenUpdate(false)}>
            <UpdateProduct
              open={openUpdate}
              onClose={() => setOpenUpdate(false)}
              product={initB}
              data={id}
            />
          </BasicModal>

        </div>
      </div>
    </div>
  );
}
