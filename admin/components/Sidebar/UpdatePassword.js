import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { changePassword } from "@/state/Auth/Action";

const UpdatePassword = (props) => {
    const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm({
        defaultValues: {
            fistName: props.user.fistName,
            userId: props.user.id,
            lastName: props.user.lastName,
            requestDate: props.user.requestDate,
            userName: props.user.userName
        }
    });
    const onSubmit = (data) => {
        delete data.NewPassword
        dispatch(changePassword(data))
        setTimeout(props.onClose, 200);
    };
    const passwordCheck = useRef({});
    passwordCheck.current = watch("password", "");
    if (props.open)
        return (
            <div id="root">
                <div className="absolute w-2/6 px-10 py-5 mt-4 -translate-x-1/2 -translate-y-1/2 bg-white min-w-fit top-1/2 left-1/2 rounded-xl">
                    <h3 className="w-full mb-4 text-xl font-semibold tracking-wide text-center">
                        Change password
                    </h3>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="w-full mt-2">
                            <label className="block">New password</label>
                            <input
                                type="password"
                                className="w-full p-2 mt-2 border border-gray-300 rounded-lg"
                                {...register("password", { required: true })}
                            />
                            {errors.password && (
                                <div className="mt-2 text-sm italic text-red-400 text-italic">
                                    *New password is required
                                </div>
                            )}
                        </div>
                        <div className="w-full mt-2">
                            <label className="block">Confirm new password</label>
                            <input
                                type="password"
                                className="w-full p-2 mt-2 border border-gray-300 rounded-lg"
                                {...register("NewPassword", {
                                    validate: (value) =>
                                        value === passwordCheck.current ||
                                        "The password is not match!",
                                    required: "Confirm is required",
                                })}
                            />
                            {errors.NewPassword && (
                                <div className="mt-2 text-sm italic text-red-400 text-italic">
                                    {errors.NewPassword.message}
                                </div>
                            )}
                        </div>
                        <div className="flex flex-row-reverse gap-5 mt-5">
                            <button
                                onClick={() => {
                                    // setTimeout(props.onClose, 200);
                                }}
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

export default UpdatePassword;
