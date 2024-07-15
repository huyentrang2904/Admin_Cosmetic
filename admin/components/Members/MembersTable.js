import { useDispatch, useSelector } from "react-redux";
import { getAllUser } from "@/state/Admin/Action";
import { useState, useEffect } from "react";
// import BasicModal from "../Modal/BasicModal";
// import DeleteCategory from "./DeleteCategory";
// import UpdateCategory from "./UpdateCategory";
import { If } from "react-haiku";

export default function MembersTable() {
  const dispatch = useDispatch();
  const brands = useSelector((state) => state?.admin.allUser);
  console.log(brands)
  const [openDelete, setOpenDelete] = useState(false)
  const [openUpdate, setOpenUpdate] = useState(false)
  const [id, setId] = useState()
  const [initB, setInitB] = useState()

  useEffect(() => {
    dispatch(getAllUser());
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
                  No.
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-base font-semibold text-gray-900"
                >
                  Member's username
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-base font-semibold text-gray-900"
                >
                  Member's role
                </th>
                <th className="w-1/12"></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 ">
              {brands?.map((data, index) => (
                <If isTrue={data.roleId !== 2}>

                  <>
                    <tr key={index} className="">
                      <td className="py-4 pr-10 text-base font-medium text-left text-gray-900 whitespace-nowrap sm:pl-6 ">
                        {index + 1}
                      </td>
                      <td className="px-3 py-4 text-base text-gray-500 whitespace-nowrap">
                        {data.userName}
                      </td>
                      <td className="px-3 py-4 text-base text-gray-500 whitespace-nowrap">
                        {data.userName}
                      </td>
                      <td className="flex px-3 py-4 text-base text-gray-500 whitespace-nowrap">
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
                </If>
              ))}

            </tbody>
          </table>
          {/* <BasicModal open={openDelete} onClose={() => setOpenDelete(false)}>
            <DeleteCategory onClose={() => setOpenDelete(false)} data={id} />
          </BasicModal>
          <BasicModal open={openUpdate} onClose={() => setOpenUpdate(false)}>
            <UpdateCategory
              open={openUpdate}
              onClose={() => setOpenUpdate(false)}
              brand={initB}
            />
          </BasicModal> */}

        </div>
      </div>
    </div>
  );
}
