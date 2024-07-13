import { CustomTextField } from "@/components/Auth/CustomTextField";
import { addNewBrand } from "@/state/Admin/Action";
import { getAllBrand } from "@/state/Products/Action";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

const AddBrand = (props) => {
  const dispatch = useDispatch();
  const [brand, setBrand] = useState("");
  const [error, setError] = useState("");

  const handleInputChange = (event) => {
    setBrand(event.target.value);
    setError(""); // Clear previous error when user starts typing
  };

  const handleSave = () => {
    if (!brand.trim()) {
      setError("Vui lòng nhập tên nhãn hàng.");
      return;
    } else {
      dispatch(addNewBrand({ title: brand }));
      setTimeout(() => {
        dispatch(getAllBrand());
      }, 2000);
    }
    // Call your save function here with the brand name
    // Example: props.onSave(brand);
  };
  if (props.open)
    return (
      <div id="root">
        <div className="absolute w-2/6 px-10 py-5 mt-4 -translate-x-1/2 -translate-y-1/2 bg-white top-1/2 left-1/2 rounded-xl">
          <div className="font-semibold tracking-wide">Thêm nhãn hàng mới</div>

          <div className="mt-5">
            <CustomTextField
              className="mb-4"
              label="Tên nhãn hàng"
              name="brand"
              value={brand}
              onChange={handleInputChange}
              fullWidth
              error={Boolean(error)}
              helperText={error}
            />
          </div>
          <div className="flex flex-row-reverse gap-5 mt-5">
            <button
              className="p-2 px-6 bg-white border-2 text-dark-purple hover:bg-dark-purple hover:text-white border-dark-purple rounded-2xl"
              onClick={() => {
                handleSave();
                setTimeout(props.onClose, 200);
              }}
            >
              Lưu
            </button>
            <button
              onClick={props.onClose}
              className="p-2 px-6 text-red-500 bg-white border-2 border-red-500 hover:text-white hover:bg-red-500 rounded-2xl"
            >
              Hủy
            </button>
          </div>
        </div>
      </div>
    );
  else return <></>;
};

export default AddBrand;
