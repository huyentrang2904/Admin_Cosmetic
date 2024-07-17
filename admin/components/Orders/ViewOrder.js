import { getOrderById } from "@/state/Admin/Action";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { For } from "react-haiku";

const ViewOrder = (props) => {
    const dispatch = useDispatch();
    const orderData = useSelector((state) => state?.admin.orderData)
    console.log(orderData)
    useEffect(() => {
        dispatch(getOrderById(props.data));
    }, []);
    const statusList = {
        "Đặt hàng thành công.": 'ORDER PLACED SUCCESS',
        "Đơn hàng đã bị hủy.": 'ORDER CANCELLED',
        "Người bán đang chuẩn bị hàng.": 'SELLER PREPARING ORDER',
        "Đang giao hàng.": 'IN TRANSIT',
        "Giao hàng thành công.": 'DELIVERY SUCCESSFUL',
        "Giao hàng không thành công.": 'DELIVERY FAILED',
        "Trả hàng /Hoàn tiền.": 'RETURNED AND REFUNDED',
        "Thanh toán tiền mặt.": "Cash"
    }
    // Call your save function here with the brand name
    // Example: props.onSave(brand);
    if (props.open && orderData)
        return (
            <div id="root">
                <div className="absolute w-3/5 px-10 max-h-[80vh] overflow-y-auto py-5 mt-4 -translate-x-1/2 -translate-y-1/2 bg-white min-w-fit top-1/2 left-1/2 rounded-xl">
                    <h3 className="mb-4 text-xl font-semibold tracking-wide">
                        View order's detail
                    </h3>
                    <div className="m-2">
                        <div className="mb-4 text-xl font-semibold">BUYER DETAIL</div>
                        <div className="flex mb-5">
                            <div className="w-1/2 mr-4">
                                <div className="text-lg font-semibold ">Receiver</div>
                                <div className="mt-2 font-semibold text-gray-400">{orderData.order.fullName}</div>
                            </div>
                            <div className="w-1/2 mr-4">
                                <div className="text-lg font-semibold ">Phone number</div>
                                <div className="mt-2 font-semibold text-gray-400">{orderData.order.phoneNumber}</div>
                            </div>
                        </div>
                        <div className="flex mb-5">
                            <div className="w-1/2 mr-4">
                                <div className="text-lg font-semibold ">Payment method</div>
                                <div className="mt-2 font-semibold text-gray-400">CASH</div>
                            </div>
                            <div className="w-1/2 mr-4">
                                <div className="text-lg font-semibold ">Order's status</div>
                                <div className="mt-2 font-semibold text-gray-400">{statusList[orderData.order.status]}</div>
                            </div>
                        </div>
                        <div className="">
                            <div className="text-lg font-semibold ">Address</div>
                            <div className="mt-2 font-semibold text-gray-400">{orderData.order.addressDetail}</div>
                        </div>
                        <div className="p-2 mt-5 border-2 border-gray-400 rounded-lg">
                            <div className="mb-4 text-xl font-semibold">Order</div>
                            <For each={orderData.orderDetail} render={(data, index) => 
                                <div className="flex items-center mb-2">
                                    <img className="w-2/12" src={data.productImageUrl} width='100' height='100'></img>
                                    <div className="w-4/12 mx-4 truncate">{data.productTitle}</div>
                                    <div className="w-3/12 text-center">{data.quantity}</div>
                                    <div className="w-3/12 text-center">{data.productCost}</div>
                                </div>
                            }/>
                            <div className="w-full my-2 border-2 border-gray-300"></div>
                            <div className="flex items-center mb-2">
                                <div className="w-9/12 text-xl font-semibold">Total cost</div>
                                <div className="w-3/12 text-center">{orderData.totalAmount}</div>
                            </div>
                        </div>

                        <div className="flex flex-row-reverse gap-5 mt-5">
                            <button
                                type="button"
                                onClick={props.onClose}
                                className="p-2 px-6 bg-white border-2 text-dark-purple hover:bg-dark-purple hover:text-white border-dark-purple rounded-2xl"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    else return <></>;
};

export default ViewOrder;
