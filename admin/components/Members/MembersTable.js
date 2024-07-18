import { useDispatch, useSelector } from "react-redux";
import { getAllUser } from "@/state/Admin/Action";
import { useState, useEffect } from "react";
import BasicModal from "../Modal/BasicModal";
import { If } from "react-haiku";
import DeleteMember from "./DeleteMember";
import UpdateRole from "./UpdateRole";
import ChangeMemberPassword from "./ChangeMemberPassword";

export default function MembersTable() {
  const dispatch = useDispatch();
  const brands = useSelector((state) => state?.admin.allUser);
  const memberList = brands?.filter((item) => item.roleName !== 'USER');
  const [openDelete, setOpenDelete] = useState(false)
  const [openUpdate, setOpenUpdate] = useState(false)
  const [openChange, setOpenChange] = useState(false)
  const [id, setId] = useState()

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
                  className="px-3 py-3.5 text-left text-base font-semibold text-gray-900"
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
                  Member's email
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
                  Member's role
                </th>
                <th className="w-1/12"></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 ">
              {memberList?.map((data, index) => (
                <If isTrue={data.roleName !== "USER"}>

                  <>
                    <tr key={index} className="">
                      <td className="px-3 py-4 text-base text-gray-500 whitespace-nowrap">
                        {index + 1}
                      </td>
                      <td className="px-3 py-4 text-base text-gray-500 whitespace-nowrap">
                        {data.userName}
                      </td>
                      <td className="px-3 py-4 text-base text-gray-500 whitespace-nowrap">
                        {data.email}
                      </td>
                      <td className="px-3 py-4 text-base text-gray-500 whitespace-nowrap">
                        {data.accountStatus}
                      </td>
                      <td className="px-3 py-4 text-base text-gray-500 whitespace-nowrap">
                        {data.roleName}
                      </td>
                      <td className="flex px-3 py-4 text-base text-gray-500 whitespace-nowrap">
                        <If isTrue={data.roleName !== "ADMIN"}>
                        <button
                            onClick={() => {
                              setOpenUpdate(true);
                              setId(data.id);
                            }}
                            className="px-2 py-1 mr-4 text-sm border-2 rounded-full border-dark-purple hover:cursor-pointer hover:bg-dark-purple hover:text-white text-dark-purple"
                          >Change</button>
                          <button
                            onClick={() => {
                              setOpenUpdate(true);
                              setId(data.id);
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
                        </If>

                      </td>

                    </tr>
                  </>
                </If>
              ))}

            </tbody>
          </table>
          <BasicModal open={openDelete} onClose={() => setOpenDelete(false)}>
            <DeleteMember onClose={() => setOpenDelete(false)} data={id} />
          </BasicModal>
          <BasicModal open={openUpdate} onClose={() => setOpenUpdate(false)}>
            <UpdateRole open={openUpdate} onClose={() => setOpenUpdate(false)} data={id} />
          </BasicModal>
          <BasicModal open={openUpdate} onClose={() => setOpenUpdate(false)}>
            <ChangeMemberPassword
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
