import { updateCoupcon, getAllCoupcon } from "@/state/Admin/Action";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";


const ViewCoupcon = (props) => {
    const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch
    } = useForm({
        defaultValues: {
            id: props.brand.id,
            applyTo: props.brand.applyTo,
            discountPercent: props.brand.discountPercent,
            fromDate: props.brand.fromDate,
            toDate: props.brand.toDate,
            maxUsage: props.brand.maxUsage,
            minAmount: props.brand.minAmount,
            totalUsage: props.brand.totalUsage,
            discountStatus: props.brand.discountStatus
        }
    });
    const applyToOrder = watch("applyToOrder");
    const onSubmit = (data) => {
        if (data.applyToOrder) {
            data.applyTo = 'Order'
            delete data.applyToOrder
        } else if (!data.applyToOrder) {
            data.applyTo = ''
            data.minAmount = ''
        }
        dispatch(updateCoupcon(data)).then((value) => {
            dispatch(getAllCoupcon());
            setTimeout(props.onClose, 200);
        });

    };
    // Call your save function here with the brand name
    // Example: props.onSave(brand);
    if (props.open)
        return (
            <div id="root">
                <div className="absolute w-2/5 px-10 py-5 mt-4 -translate-x-1/2 -translate-y-1/2 bg-white min-w-fit top-1/2 left-1/2 rounded-xl">
                    <h3 className="mb-4 text-xl font-semibold tracking-wide">
                        Add new coupcon
                    </h3>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="flex">
                            <div className="w-1/2 mr-4">

                                <label className="block">Discount percent</label>
                                <input
                                    disabled
                                    type='number'
                                    className="w-full p-2 mt-2 border border-gray-300 rounded-lg"
                                    {...register("discountPercent", { required: true })}
                                />
                                {errors.discountPercent && (
                                    <div className="mt-2 text-sm italic text-red-400 text-italic">
                                        *Discount percent is required
                                    </div>
                                )}
                            </div>
                            <div className="w-1/2 ml-4">

                                <label className="block">Max usage</label>
                                <input
                                    disabled
                                    type='number'
                                    className="w-full p-2 mt-2 border border-gray-300 rounded-lg"
                                    {...register("maxUsage", { required: true })}
                                />
                                {errors.maxUsage && (
                                    <div className="mt-2 text-sm italic text-red-400 text-italic">
                                        *Max usage is required
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="flex mt-2">
                            <div className="w-1/2 mr-4">

                                <label className="block">Start date</label>
                                <input
                                    disabled
                                    type="datetime-local"
                                    className="w-full p-2 mt-2 border border-gray-300 rounded-lg"
                                    {...register("fromDate", { required: true })}
                                />
                                {errors.fromDate && (
                                    <div className="mt-2 text-sm italic text-red-400 text-italic">
                                        *Start date is required
                                    </div>
                                )}
                            </div>
                            <div className="w-1/2 ml-4">
                                <label className="block">End date</label>
                                <input
                                    disabled
                                    type="datetime-local"
                                    className="w-full p-2 mt-2 border border-gray-300 rounded-lg"
                                    {...register("toDate", { required: true })}
                                />
                                {errors.toDate && (
                                    <div className="mt-2 text-sm italic text-red-400 text-italic">
                                        *End date is required
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="flex mt-2">
                            <div className="w-1/2 mr-4">

                                <label className="block">Total usage</label>
                                <input
                                    disabled
                                    className="w-full p-2 mt-2 border border-gray-300 rounded-lg"
                                    {...register("totalUsage")}
                                />
                               
                            </div>
                            <div className="w-1/2 ml-4">
                                <label className="block">Status</label>
                                <input
                                    disabled
                                    className="w-full p-2 mt-2 border border-gray-300 rounded-lg"
                                    {...register("discountStatus")}
                                />
                            </div>
                        </div>
                        <div className="flex items-center mt-4">
                            <input
                                disabled
                                id="applyToOrder"
                                defaultChecked={props.brand.applyTo}
                                type="checkbox"
                                {...register("applyToOrder")}
                                className="mr-2"
                            />
                            <label htmlFor="applyToOrder" className="text-sm">
                                Apply to Order
                            </label>
                        </div>
                        {applyToOrder || props.brand.applyTo && (
                            <div className="mt-4">
                                <label className="block">Min Amount</label>
                                <input
                                    disabled
                                    type="number"
                                    className="w-full p-2 mt-2 border border-gray-300 rounded-lg"
                                    {...register("minAmount")}
                                />
                            </div>
                        )}
                        <div className="flex flex-row-reverse gap-5 mt-5">
                            <button
                                type="button"
                                onClick={props.onClose}
                                className="p-2 px-6 bg-white border-2 text-dark-purple hover:bg-dark-purple hover:text-white border-dark-purple rounded-2xl"
                            >
                                Close
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    else return <></>;
};

export default ViewCoupcon;
