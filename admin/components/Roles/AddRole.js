import { CustomTextField } from "@/components/Roles/CustomTextField";
import { addNewBrand, createRole, getAllPermission, getAllRole, updateRole } from "@/state/Admin/Action";
import React, { useEffect, useState } from "react";
import { If } from "react-haiku";
import { useDispatch, useSelector } from "react-redux";

const AddRole = (props) => {
  console.log(props)
  const dispatch = useDispatch();
  const [role, setRole] = useState(props.roleName || "");
  const [error, setError] = useState("");
  const [selectedPermissions, setSelectedPermissions] = useState(props?.permissions?.map(per => per.id) || []);
  const permission = useSelector((state) => state.admin.permission);

  const handleInputChange = (event) => {
    setRole(event.target.value);
    setError(""); // Clear previous error when user starts typing
  };

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    const permissionId = parseInt(value, 10);
    if (checked) {
      setSelectedPermissions([...selectedPermissions, permissionId]);
    } else {
      setSelectedPermissions(selectedPermissions.filter((perm) => perm !== permissionId));
    }
  };

  const handleSave = () => {
    if (!role.trim()) {
      setError("Role's name is required.");
      return;
    } else {
      const roleData = { roleName: role, permissionIdList: selectedPermissions };
      if (props.data) {
        dispatch(updateRole({ ...roleData, roleId: props.data }));
      } else {
        dispatch(createRole(roleData));
      }

      setTimeout(() => {
        dispatch(getAllRole());
      }, 2000);
    }
  };

  useEffect(() => {
    dispatch(getAllPermission());
  }, []);

  if (props.open)
    return (
      <div id="root">
        <div className="absolute w-2/6 px-10 py-5 mt-4 -translate-x-1/2 -translate-y-1/2 bg-white top-1/2 left-1/2 rounded-xl">
          <div className="font-semibold tracking-wide">Add new role</div>

          <div className="mt-5">
            <CustomTextField
              className="mb-4"
              label="Role's name"
              name="Role"
              value={role}
              onChange={handleInputChange}
              fullWidth
              error={Boolean(error)}
              helperText={error}
            />
          </div>

          <div className="grid grid-cols-2 gap-4 mt-5">
            {permission?.map((perm, index) => (
              <div key={index} className="flex items-center">
                <input
                  type="checkbox"
                  id={`checkbox-${index}`}
                  value={perm.id}
                  defaultChecked={selectedPermissions.includes(perm.id)}
                  onChange={handleCheckboxChange}
                  className="mr-2"
                />
                <label htmlFor={`checkbox-${index}`}>{perm.permissionName}</label>
              </div>

            ))}
          </div>

          <div className="flex flex-row-reverse gap-5 mt-5">
            <button
              className="p-2 px-6 bg-white border-2 text-dark-purple hover:bg-dark-purple hover:text-white border-dark-purple rounded-2xl"
              onClick={() => {
                handleSave();
                setTimeout(props.onClose, 200);
              }}
            >
              Confirm
            </button>
            <button
              onClick={props.onClose}
              className="p-2 px-6 text-red-500 bg-white border-2 border-red-500 hover:text-white hover:bg-red-500 rounded-2xl"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  else return <></>;
};

export default AddRole;
