import { createSubAdmin, getAllRole, getAllUser } from "@/state/Admin/Action";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { For } from "react-haiku";
import { LastPage } from "@mui/icons-material";

const AddMember = (props) => {
  const dispatch = useDispatch();
  const rolesList = useSelector((state) => state?.admin.roles)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      accountStatus: 'Active',
      firstName: '',
      lastName: ''
    }
  });
  const onSubmit = (data) => {
    data.roleId = Number(data.roleId)
    dispatch(createSubAdmin(data)).then((value) => {
      dispatch(getAllUser());
      setTimeout(props.onClose, 200);
      // Expected output: "Success!"
    });
  };
  useEffect(() => {
    dispatch(getAllRole());
  }, []);
  // Call your save function here with the brand name
  // Example: props.onSave(brand);
  if (props.open && rolesList)
    return (
      <div id="root">
        <div className="absolute w-3/5 px-10 py-5 mt-4 -translate-x-1/2 -translate-y-1/2 bg-white min-w-fit top-1/2 left-1/2 rounded-xl">
          <h3 className="mb-4 text-xl font-semibold tracking-wide">
            Add new member
          </h3>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex">

              <div className="w-1/2 mr-4">
                <label className="block">Username</label>
                <input
                  className="w-full p-2 mt-2 border border-gray-300 rounded-lg"
                  {...register("userName", { required: true })}
                />
                {errors.userName && (
                  <div className="mt-2 text-sm italic text-red-400 text-italic">
                    *Username is required
                  </div>
                )}
              </div>
              <div className="w-1/2 ml-4">
                <label className="block">Email</label>
                <input
                  className="w-full p-2 mt-2 border border-gray-300 rounded-lg"
                  {...register("email", { required: true })}
                />
                {errors.email && (
                  <div className="mt-2 text-sm italic text-red-400 text-italic">
                    *Email is required
                  </div>
                )}
              </div>
            </div>
            <div className="flex mt-4 mb-6">

              <div className="w-1/2 mr-4">
                <label className="block">Role</label>
                <select
                  className="w-full p-2 mt-2 border border-gray-300 rounded-lg"
                  {...register("roleId", { required: true })}
                >
                  <For each={rolesList} render={(item, index) =>
                    <option value={item.id}>{item.roleName}</option>
                  } />
                </select>
                {errors.roleId && (
                  <div className="mt-2 text-sm italic text-red-400 text-italic">
                    *Role is required
                  </div>
                )}
              </div>
              <div className="w-1/2 ml-4">
                <label className="block">password</label>
                <input
                  type='password'
                  className="w-full p-2 mt-2 border border-gray-300 rounded-lg"
                  {...register("password", { required: true })}
                />
                {errors.password && (
                  <div className="mt-2 text-sm italic text-red-400 text-italic">
                    *Password is required
                  </div>
                )}
              </div>
            </div>
            <div className="flex flex-row-reverse gap-5 mt-5">
              <button
                type="submit"
                className="p-2 px-6 bg-white border-2 text-dark-purple hover:bg-dark-purple hover:text-white border-dark-purple rounded-2xl"
              >
                Save
              </button>
              <button
                type="button"
                onClick={props.onClose}
                className="p-2 px-6 text-red-500 bg-white border-2 border-red-500 hover:text-white hover:bg-red-500 rounded-2xl"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  else return <></>;
};

export default AddMember;
