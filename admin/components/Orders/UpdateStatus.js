import { updateOrderStatus, getAllOrders } from "@/state/Admin/Action";
import React from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

const UpdateStatus = (props) => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      oId: props.data
    }
  });
  const onSubmit = (data) => {
    dispatch(updateOrderStatus(data)).then((value) => {
      dispatch(getAllOrders());
      setTimeout(props.onClose, 200);
      // Expected output: "Success!"
    });
  };
  // Call your save function here with the brand name
  // Example: props.onSave(brand);
  if (props.open)
    return (
      <div id="root">
        <div className="absolute w-2/5 px-10 py-5 mt-4 -translate-x-1/2 -translate-y-1/2 bg-white min-w-fit top-1/2 left-1/2 rounded-xl">
          <h3 className="mb-4 text-xl font-semibold tracking-wide">
            Update order's status
          </h3>
          <form onSubmit={handleSubmit(onSubmit)}>
            <label className="block">Status</label>
            <select
              className="w-full p-2 mt-2 border border-gray-300 rounded-lg"
              {...register("status", { required: true })}
            >
              <option value="Đặt hàng thành công.">1. ORDER PLACED SUCCESS</option>
              <option value="Người bán đang chuẩn bị hàng.">2. SELLER PREPARING ORDER</option>
              <option value="Đơn hàng đã bị hủy.">3. ORDER CANCELLED</option>
              <option value="Đang giao hàng.">4. IN TRANSIT</option>
              <option value="Giao hàng thành công.">5. DELIVERY SUCCESSFUL</option>
              <option value="Giao hàng không thành công.">6. DELIVERY FAILED</option>
              <option value="Trả hàng /Hoàn tiền.">7. RETURNED AND REFUNDED</option>

            </select>
            {errors.roleId && (
              <div className="mt-2 text-sm italic text-red-400 text-italic">
                *Status is required
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

export default UpdateStatus;
