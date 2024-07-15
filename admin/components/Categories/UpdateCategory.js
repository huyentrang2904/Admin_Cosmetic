import { updateCategory } from "@/state/Admin/Action";
import { getAllCategory } from "@/state/Products/Action";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";


const UpdateCategory = (props) => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      categoryName: props.brand.categoryName,
    }
  });
  const onSubmit = (data) => {
    data.id = props.brand.id
    dispatch(updateCategory(data)).then((value) => {
      dispatch(getAllCategory());
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
            Update category
          </h3>
          <form onSubmit={handleSubmit(onSubmit)}>
            <label className="block">Category's name</label>
            <input
              className="w-full p-2 mt-2 border border-gray-300 rounded-lg"
              {...register("categoryName", { required: true })}
            />
            {errors.categoryName && (
              <div className="mt-2 text-sm italic text-red-400 text-italic">
                *Category's name is required
              </div>
            )}

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

export default UpdateCategory;
