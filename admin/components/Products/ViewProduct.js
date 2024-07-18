import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSingleProduct } from '@/state/Products/Action';
import { useForm } from 'react-hook-form';

export default function ViewProduct(props) {
    const dispatch = useDispatch();
    const productT = useSelector((state) => state.product?.product)
    console.log(productT)
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            title: productT?.displayProductDTO.title,
            description: productT?.displayProductDTO.description,
            currentCost: productT?.displayProductDTO.currentCost,
            productStatus: productT?.displayProductDTO.productStatus,
            madeIn: productT?.displayProductDTO.madeIn,
            quantity: productT?.displayProductDTO.quantity,
            capacity: productT?.displayProductDTO.capacity,
            brandId: productT?.displayProductDTO.brandName,
            categoryId: productT?.displayProductDTO.categoryName,
            discountId: productT?.displayProductDTO.percentDiscount
        }
    });
    const imgArr = productT?.productImages
    const [fileInputs, setFileInputs] = useState(imgArr);
    const [data, setData] = useState({
        multipartFiles: imgArr || [],
    });
    
    useEffect(() => {
        dispatch(getSingleProduct(props.data))
    }, [dispatch]);

    const onSubmit = async (formData) => {
        formData.discount_id = ''
        console.log(data)
        // const submitData = {
        //     ...formData,
        //     multipartFiles: fileInputs,
        // };
        // await dispatch(addNewProduct(submitData)).then((value) => {
        //     props.onClose();
        //     dispatch(getProducts())
        // });
    };

    if (props.open && productT) {
        return (
            <div id="root">
                <div className="absolute w-3/5 px-10 py-5 mt-4 overflow-auto max-h-[85vh] -translate-x-1/2 -translate-y-1/2 bg-white min-w-fit top-1/2 left-1/2 rounded-xl">
                    <h3 className="mb-4 text-xl font-semibold tracking-wide">
                        View product
                    </h3>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-4">
                            <label className="block">Title</label>
                            <input
                                disabled
                                {...register('title', { required: true })}
                                type="text"
                                className="w-full p-2 mt-2 border border-gray-300 rounded-lg"
                            />
                            {errors.title && <span className="text-red-500">This field is required</span>}
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Description</label>
                            <textarea
                                disabled
                                {...register('description')}
                                rows="3"
                                className="w-full p-2 mt-2 border border-gray-300 rounded-lg"
                            />
                        </div>
                        <div className='flex'>
                            <div className="w-1/2 mb-4 mr-4">
                                <label htmlFor="currentCost" className="block text-sm font-medium text-gray-700">Current Cost</label>
                                <input
                                    disabled
                                    {...register('currentCost', { required: true, pattern: /^[0-9]*$/ })}
                                    type="text"
                                    id="currentCost"
                                    className="w-full p-2 mt-2 border border-gray-300 rounded-lg"
                                />
                                {errors.currentCost && <span className="text-red-500">Please enter a valid number</span>}
                            </div>
                            <div className="w-1/2 mb-4 ml-4">
                                <label htmlFor="madeIn" className="block text-sm font-medium text-gray-700">Made In</label>
                                <input
                                    disabled
                                    {...register('madeIn', { required: true })}
                                    type="text"
                                    id="madeIn"
                                    className="w-full p-2 mt-2 border border-gray-300 rounded-lg"
                                />
                                {errors.madeIn && <span className="text-red-500">This field is required</span>}
                            </div>
                        </div>
                        <div className='flex'>
                            <div className="w-1/2 mb-4 mr-4">
                                <label className="block text-sm font-medium text-gray-700">Capacity</label>
                                <input
                                    disabled
                                    {...register('capacity', { required: true })}
                                    type="text"
                                    id="capacity"
                                    className="w-full p-2 mt-2 border border-gray-300 rounded-lg"
                                />
                                {errors.capacity && <span className="text-red-500">This field is required</span>}
                            </div>
                            <div className="w-1/2 mb-4 ml-4">
                                <label className="block text-sm font-medium text-gray-700">Quantity</label>
                                <input
                                    disabled
                                    {...register('quantity', { required: true, pattern: /^[0-9]*$/ })}
                                    type="text"
                                    id="quantity"
                                    className="w-full p-2 mt-2 border border-gray-300 rounded-lg"
                                />
                                {errors.quantity && <span className="text-red-500">Please enter a valid number</span>}
                            </div>
                        </div>
                        <div className='flex'>

                            <div className="w-1/2 mb-4 mr-4">
                                <label className="block text-sm font-medium text-gray-700">Brand</label>
                                <input
                                    disabled
                                    {...register('brandId', { required: true })}
                                    id="brandId"
                                    className="w-full p-2 mt-2 border border-gray-300 rounded-lg"
                                >
                                </input>
                                {errors.brandId && <span className="text-red-500">Please select a brand</span>}
                            </div>
                            <div className="w-1/2 mb-4 ml-4">
                                <label className="block text-sm font-medium text-gray-700">Category</label>
                                <input
                                    disabled
                                    {...register('categoryId', { required: true })}
                                    id="categoryId"
                                    className="w-full p-2 mt-2 border border-gray-300 rounded-lg"
                                >
                                </input>
                                {errors.categoryId && <span className="text-red-500">Please select a category</span>}
                            </div>
                        </div>
                        <div className='flex'>

                            <div className="w-1/2 mb-4 mr-4">
                                <label className="block text-sm font-medium text-gray-700">Status</label>
                                <select
                                    disabled
                                    {...register('productStatus')}
                                    id="productStatus"
                                    className="w-full p-2 mt-2 border border-gray-300 rounded-lg"
                                >
                                    <option value='Còn hàng'>Stocking</option>
                                    <option value='Hết hàng'>Out of stock</option>
                                    <option value='Ẩn'>Hide</option>

                                </select>
                            </div>
                            <div className="w-1/2 mb-4 ml-4">
                                <label className="block text-sm font-medium text-gray-700">Discount</label>
                                <input
                                    disabled
                                    {...register('discountId', { required: true })}
                                    id="discountId"
                                    className="w-full p-2 mt-2 border border-gray-300 rounded-lg"
                                >
                                </input>
                            </div>
                        </div>
                        <div className='flex'>

                            <div className="w-1/2 mb-4 mr-4">
                                <label className="block text-sm font-medium text-gray-700">Purchased</label>
                                <input
                                    disabled
                                    defaultValue={productT?.displayProductDTO.countPurchase}
                                    id="countPurchase"
                                    className="w-full p-2 mt-2 border border-gray-300 rounded-lg"
                                >
                                </input>
                            </div>
                            <div className="w-1/2 mb-4 ml-4">
                                <label className="block text-sm font-medium text-gray-700">Viewed</label>
                                <input
                                    disabled
                                    defaultValue={productT?.displayProductDTO.countView}
                                    id="countView"
                                    className="w-full p-2 mt-2 border border-gray-300 rounded-lg"
                                >
                                </input>
                            </div>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="dropzone" className="block mb-2 text-sm font-medium text-gray-700">Image</label>
                            <div className='p-4 border-2 border-gray-300 rounded-lg'>
                                <div className="flex mt-2">
                                    {fileInputs?.map((file, index) => (
                                        <div key={index} className="relative mr-2">
                                            <img src={file.preview || file} alt={file.name} className="object-cover w-20 h-20 rounded-lg" />
                                        </div>
                                    ))}
                                </div>
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
                    </form>
                </div>
            </div>
        );
    } else {
        return null;
    }
}