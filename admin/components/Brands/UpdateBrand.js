import { updateBrand } from "@/state/Admin/Action";
import { getAllBrand } from "@/state/Products/Action";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";


const UpdateBrand = (props) => {
  console.log(props)
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: props.brand.name,
      description: props.brand.description
    }
  });
  const onSubmit = (data) => {
    data.id = props.brand.id
    dispatch(updateBrand(data)).then((value) => {
      dispatch(getAllBrand());
      setTimeout(props.onClose, 200);
      // Expected output: "Success!"
    });;
  };
    // Call your save function here with the brand name
    // Example: props.onSave(brand);
  if (props.open)
    return (
      <div id="root">
        <div className="absolute w-3/5 px-10 py-5 mt-4 -translate-x-1/2 -translate-y-1/2 bg-white min-w-fit top-1/2 left-1/2 rounded-xl">
          <h3 className="mb-4 text-xl font-semibold tracking-wide">
            Add Brand
          </h3>
          <form onSubmit={handleSubmit(onSubmit)}>
            <label className="block">Brand's Name</label>
            <input
              className="w-full p-2 mt-2 border border-gray-300 rounded-lg"
              {...register("name", { required: true })}
            />
            {errors.name && (
              <div className="mt-2 text-sm italic text-red-400 text-italic">
                *Không được để trống tên nhãn hàng
              </div>
            )}
            <label className="block mt-3">Mô tả nhãn hàng</label>
            <textarea
              className="w-full p-2 mt-2 border border-gray-300 rounded-lg"
              {...register("description", { required: true })}
              type='text'
            />
            {errors.description && (
              <div className="mt-2 text-sm italic text-red-400 text-italic">
                *Không được để trống mô tả nhãn hàng
              </div>
            )}
            <div className="flex flex-row-reverse gap-5 mt-5">
              <button

                type="submit"
                className="p-2 px-6 bg-white border-2 text-dark-purple hover:bg-dark-purple hover:text-white border-dark-purple rounded-2xl"
              >
                Lưu
              </button>
              <button
                type="button"
                onClick={props.onClose}
                className="p-2 px-6 text-red-500 bg-white border-2 border-red-500 hover:text-white hover:bg-red-500 rounded-2xl"
              >
                Hủy
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  else return <></>;
};

export default UpdateBrand;
