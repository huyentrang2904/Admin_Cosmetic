import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllBrand, getAllCategory, getProducts, getSingleProduct } from '@/state/Products/Action';
import { updateProduct, getAllProductCoupcon } from '@/state/Admin/Action';
import { useDropzone } from 'react-dropzone';
import DeleteIcon from '@mui/icons-material/Delete';
import { useForm } from 'react-hook-form';
import { If } from 'react-haiku';

export default function UpdateProduct(props) {
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
            brandId: productT?.displayProductDTO.brandId,
            categoryId: productT?.displayProductDTO.categoryId,
            discountId: productT?.displayProductDTO.discountId
        }
    });
    const brands = useSelector((state) => state.product?.brand || []);
    const categories = useSelector((state) => state.product?.category || []);
    const coupcons = useSelector(state => state.admin?.coupcons || [])

    const imgArr = productT?.productImages
    const [fileInputs, setFileInputs] = useState(imgArr);
    const [data, setData] = useState({
        multipartFiles: imgArr || [],
    });
    const [imageIdDelete, setImageIdDelete] = useState([]);

    const handleDrop = (acceptedFiles) => {
        const filesWithPreview = acceptedFiles.map(file => Object.assign(file, {
            preview: URL.createObjectURL(file)
        }));
        setFileInputs([...fileInputs, ...filesWithPreview]);
        setData({ ...data, multipartFiles: [...data.multipartFiles, ...filesWithPreview] });
    };

    const handleRemoveFile = (file) => {
        if (file.id) {
            setImageIdDelete(prev => [...prev, file.id]);
        }
        const updatedFiles = fileInputs.filter(f => f !== file);
        const updatedMultipartFiles = data.multipartFiles.filter(f => f !== file);
        setFileInputs(updatedFiles);
        setData({ ...data, multipartFiles: updatedMultipartFiles });
    };

    const { getRootProps, getInputProps } = useDropzone({
        onDrop: handleDrop,
        accept: 'image/*'
    });

    useEffect(() => {
        dispatch(getAllBrand());
        dispatch(getAllCategory());
        dispatch(getSingleProduct(props.data))
        dispatch(getAllProductCoupcon());
    }, [dispatch]);

    const onSubmit = async (formData) => {
        formData.id = productT?.displayProductDTO.id
        formData.imageIdDelete = imageIdDelete.join(',')
        const submitData = {
            ...formData,
            multipartFiles: fileInputs,
        };
        console.log(submitData)
        await dispatch(updateProduct(submitData)).then((value) => {
            props.onClose();
            dispatch(getProducts())
        });
    };

    if (props.open && productT) {
        return (
            <div id="root">
                <div className="absolute w-3/5 px-10 py-5 mt-4 overflow-auto max-h-[85vh] -translate-x-1/2 -translate-y-1/2 bg-white min-w-fit top-1/2 left-1/2 rounded-xl">
                    <h3 className="mb-4 text-xl font-semibold tracking-wide">
                        Update product
                    </h3>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-4">
                            <label className="block">Title</label>
                            <input
                                {...register('title', { required: true })}
                                type="text"
                                className="w-full p-2 mt-2 border border-gray-300 rounded-lg"
                            />
                            {errors.title && <span className="text-red-500">This field is required</span>}
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Description</label>
                            <textarea
                                {...register('description')}
                                rows="3"
                                className="w-full p-2 mt-2 border border-gray-300 rounded-lg"
                            />
                        </div>
                        <div className='flex'>
                            <div className="w-1/2 mb-4 mr-4">
                                <label htmlFor="currentCost" className="block text-sm font-medium text-gray-700">Current Cost</label>
                                <input
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
                                <select
                                    {...register('brandId', { required: true })}
                                    id="brandId"
                                    className="w-full p-2 mt-2 border border-gray-300 rounded-lg"
                                >
                                    {brands.map(brand => (
                                        <option key={brand.id} value={brand.id}>{brand.name}</option>
                                    ))}
                                </select>
                                {errors.brandId && <span className="text-red-500">Please select a brand</span>}
                            </div>
                            <div className="w-1/2 mb-4 ml-4">
                                <label className="block text-sm font-medium text-gray-700">Category</label>
                                <select
                                    {...register('categoryId', { required: true })}
                                    id="categoryId"
                                    className="w-full p-2 mt-2 border border-gray-300 rounded-lg"
                                >
                                    {categories.map(category => (
                                        <option key={category.id} value={category.id}>{category.categoryName}</option>
                                    ))}
                                </select>
                                {errors.categoryId && <span className="text-red-500">Please select a category</span>}
                            </div>
                        </div>
                        <div className='flex'>

                            <div className="w-1/2 mb-4 mr-4">
                                <label className="block text-sm font-medium text-gray-700">Status</label>
                                <select
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
                                <select
                                    {...register('discountId', { required: true })}
                                    id="discountId"
                                    className="w-full p-2 mt-2 border border-gray-300 rounded-lg"
                                >
                                    <option value=''></option>
                                    {coupcons?.map((coupcon, index) => (
                                        <If isTrue={coupcon.discountStatus === 'Active'} key={index}>
                                            <option key={coupcon.id} value={coupcon.id}>{coupcon.discountPercent}</option>
                                        </If>

                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="dropzone" className="block mb-2 text-sm font-medium text-gray-700">Upload Images</label>
                            <div className='p-4 border-2 border-gray-300 rounded-lg hover:cursor-pointer'>
                                <div {...getRootProps({ className: 'dropzone mt-1' })}>
                                    <input {...getInputProps()} />
                                    <p className=''>Drag 'n' drop some files here, or click to select files</p>
                                </div>
                                <div className="flex mt-2">
                                    {fileInputs?.map((file, index) => (
                                        <div key={index} className="relative mr-2">
                                            <img src={file.preview || file} alt={file.name} className="object-cover w-20 h-20 rounded-lg" />
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveFile(file)}
                                                className="absolute top-0 right-0 p-1 bg-white rounded-full shadow"
                                            >
                                                <DeleteIcon className="text-red-500" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
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
    } else {
        return null;
    }
}