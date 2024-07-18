import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllBrand, getAllCategory } from '@/state/Products/Action';
import {
  Container,
  TextField,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Box,
  Typography,
  IconButton
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { MuiChipsInput } from 'mui-chips-input';
import { useDropzone } from 'react-dropzone';
import { getAllProduct, updateProduct } from '@/state/Admin/Action';

const UpdateProductPage = ({ product, onClose }) => {
  console.log("product:", product);
  const dispatch = useDispatch();
  const brands = useSelector((state) => state.product?.brand?.content || []);
  const categories = useSelector((state) => state.product?.category?.content || []);
  console.log("categories:", categories);
  const [data, setData] = useState({
    title: product.title,
    description: product.description,
    discountPercent: product.discountPercent,
    brandId: product?.brand?.id,
    categoryId: product?.category?.id,
    multipartFiles: product.images || [],
    optionRequestDtoList: product.options.map(option => ({
      id: option.id,
      name: option.name,
      productOptionValues: option.optionValues.map(value => ({ id: value.id, value: value.value }))
    })),
    variantsRequestDtoList: product.productSkus.map(sku => ({
      id: sku.id,
      sku: sku.sku,
      quantity: sku.quantity,
      price: sku.price,
      optionSelectRequestDtoList: sku.skuValues.map(skuValue => ({
        nameOption: skuValue.option.name,
        valueOption: skuValue.optionValues.value
      }))
    }))
  });
  const [fileInputs, setFileInputs] = useState(product.images || []);
  const [imageIdDelete, setImageIdDelete] = useState([]);

  useEffect(() => {
    dispatch(getAllBrand());
    dispatch(getAllCategory());
  }, [dispatch]);

  useEffect(() => {
    if (brands.length > 0) {
      setData((prevData) => ({
        ...prevData,
        brandId: product?.brand?.id
      }));
    }
  }, [brands]);

  useEffect(() => {
    if (categories.length > 0) {
      setData((prevData) => ({
        ...prevData,
        categoryId: product?.category?.id
      }));
    }
  }, [categories]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleAttributeChange = (index, field, value) => {
    const updatedOptions = [...data.optionRequestDtoList];
    updatedOptions[index][field] = value;

    const updatedVariants = data.variantsRequestDtoList.map(variant => {
      const updatedVariantOptions = variant.optionSelectRequestDtoList.map((opt, optIndex) => {
        if (optIndex === index) {
          return { ...opt, nameOption: value };
        }
        return opt;
      });
      return { ...variant, optionSelectRequestDtoList: updatedVariantOptions };
    });

    setData({ ...data, optionRequestDtoList: updatedOptions, variantsRequestDtoList: updatedVariants });
  };

  // const handleChipsChange = (index, newChips) => {
  //   console.log("newChips:", newChips);
  //   const updatedOptions = [...data.optionRequestDtoList];
  //   const existingValues = updatedOptions[index].productOptionValues.filter(val => val.id);


  //   const newValues = [];
  //   for (let i = 0; i < newChips.length; i++) {
  //     let exists = false;
  //     for (let j = 0; j < existingValues.length; j++) {
  //       if (existingValues[j].value === newChips[i]) {
  //         exists = true;
  //         break;
  //       }
  //     }
  //     if (!exists) {
  //       console.log("New chip:", newChips[i]);
  //       newValues.push({ value: newChips[i] });
  //     }
  //   }

  //   updatedOptions[index].productOptionValues = [...existingValues, ...newValues];

  //   setData({ ...data, optionRequestDtoList: updatedOptions });
  // };

  const handleChipsChange = (index, newChips) => {
    console.log("newChips:", newChips);

    const updatedOptions = [...data.optionRequestDtoList];
    const existingValues = updatedOptions[index].productOptionValues.filter(val => val.id);

    const newValues = [];
    for (let i = 0; i < newChips.length; i++) {
      let exists = false;
      for (let j = 0; j < existingValues.length; j++) {
        if (existingValues[j].value === newChips[i]) {
          exists = true;
          break;
        }
      }
      if (!exists) {
        console.log("New chip:", newChips[i]);
        newValues.push({ value: newChips[i] });
      }
    }

    const updatedProductOptionValues = existingValues.filter(val => newChips.includes(val.value)).concat(newValues);

    updatedOptions[index].productOptionValues = updatedProductOptionValues;

    setData({ ...data, optionRequestDtoList: updatedOptions });
  };


  const handleChipDelete = (index, chip) => {
    const updatedOptions = [...data.optionRequestDtoList];
    const filteredValues = updatedOptions[index].productOptionValues.filter(val => val.value !== chip);
    updatedOptions[index].productOptionValues = filteredValues;
    console.log("filteredValues:", filteredValues);

    setData({ ...data, optionRequestDtoList: updatedOptions });
  };

  const addAttribute = () => {
    const newAttribute = { name: '', productOptionValues: [] };
    const updatedOptions = [...data.optionRequestDtoList, newAttribute];
    const updatedVariants = data.variantsRequestDtoList.map(variant => ({
      ...variant,
      optionSelectRequestDtoList: [...variant.optionSelectRequestDtoList, { nameOption: '', valueOption: '' }]
    }));

    setData({ ...data, optionRequestDtoList: updatedOptions, variantsRequestDtoList: updatedVariants });
  };

  const removeAttribute = (index) => {
    const updatedOptions = [...data.optionRequestDtoList];
    updatedOptions.splice(index, 1);

    const updatedVariants = data.variantsRequestDtoList.map(variant => {
      const updatedVariantOptions = variant.optionSelectRequestDtoList.filter((_, i) => i !== index);
      return { ...variant, optionSelectRequestDtoList: updatedVariantOptions };
    });

    setData({ ...data, optionRequestDtoList: updatedOptions, variantsRequestDtoList: updatedVariants });
  };

  const handleVariantChange = (variantIndex, field, value) => {
    const updatedVariants = [...data.variantsRequestDtoList];
    updatedVariants[variantIndex][field] = value;
    setData({ ...data, variantsRequestDtoList: updatedVariants });
  };

  const handleVariantOptionChange = (variantIndex, optionIndex, field, value) => {
    const updatedVariants = [...data.variantsRequestDtoList];
    updatedVariants[variantIndex].optionSelectRequestDtoList[optionIndex][field] = value;
    setData({ ...data, variantsRequestDtoList: updatedVariants });
  };

  const addVariant = () => {
    const newVariant = {
      sku: 'SKU',
      quantity: '',
      price: '',
      optionSelectRequestDtoList: data.optionRequestDtoList.map(opt => ({ nameOption: opt.name, valueOption: '' }))
    };

    setData({
      ...data,
      variantsRequestDtoList: [...data.variantsRequestDtoList, newVariant]
    });
  };

  const removeVariant = (index) => {
    const updatedVariants = [...data.variantsRequestDtoList];
    updatedVariants.splice(index, 1);
    setData({ ...data, variantsRequestDtoList: updatedVariants });
  };

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

  const handleSubmit = async () => {
    // e.preventDefault();

    const formData = {
      title: data.title,
      description: data.description,
      discountPercent: data.discountPercent,
      brandId: data.brandId,
      categoryId: data.categoryId,
      multipartFiles: fileInputs.filter(file => !file.id),
      optionRequestDtoList: data.optionRequestDtoList.map(option => ({
        id: option.id,
        name: option.name,
        productOptionValues: option.productOptionValues.map(value => ({
          id: value.id,
          value: value.value
        }))
      })),
      variantsRequestDtoList: data.variantsRequestDtoList.map(variant => ({
        id: variant.id,
        sku: variant.sku,
        quantity: variant.quantity,
        price: variant.price,
        optionSelectRequestDtoList: variant.optionSelectRequestDtoList.map(option => ({
          nameOption: option.nameOption,
          valueOption: option.valueOption
        }))
      })),
      imageIdDelete: imageIdDelete.join(',')
    };

    // Filter out options without IDs (new options)
    formData.optionRequestDtoList.forEach(option => {
      option.productOptionValues = option.productOptionValues.filter(value => value.id || !value.id);
    });

    // Filter out new options without IDs
    formData.optionRequestDtoList = formData.optionRequestDtoList.filter(option => option.id || !option.id);

    console.log(formData);
    await dispatch(updateProduct(product.id, formData));
    await dispatch(getAllProduct());
  };

  return (
    <Container maxWidth="md">
      <Box className='h-[90vh] overflow-y-scroll' mt={4} p={2} bgcolor="white" boxShadow={3} borderRadius={2}>
        <Typography variant="h4" component="h2" gutterBottom>
          Sửa sản phẩm
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box mb={2}>
            <TextField
              fullWidth
              label="Tên sản phẩm"
              name="title"
              value={data.title}
              onChange={handleInputChange}
              variant="outlined"
              margin="normal"
            />
            <TextField
              fullWidth
              label="Giảm giá"
              name="discountPercent"
              type="number"
              value={data.discountPercent}
              onChange={handleInputChange}
              variant="outlined"
              margin="normal"
            />
          </Box>
          <Box mb={2}>
            <FormControl fullWidth variant="outlined" margin="normal">
              <InputLabel>Danh mục</InputLabel>
              <Select
                name="categoryId"
                value={data.categoryId}
                onChange={handleInputChange}
                label="Category"
              >
                {categories.map((category) => (
                  <MenuItem key={category.id} value={category.id}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth variant="outlined" margin="normal">
              <InputLabel>Nhãn hàng</InputLabel>
              <Select
                name="brandId"
                value={data.brandId}
                onChange={handleInputChange}
                label="Brand"
              >
                {brands.map((brand) => (
                  <MenuItem key={brand.id} value={brand.id}>
                    {brand.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <TextField
            fullWidth
            label="Mô tả sản phẩm"
            name="description"
            value={data.description}
            onChange={handleInputChange}
            variant="outlined"
            margin="normal"
            multiline
            rows={4}
          />

          <Box mt={2} mb={2} {...getRootProps()} border="1px dashed grey" p={2} textAlign="center">
            <input {...getInputProps()} />
            <Typography>{`Thả ảnh vào đây hoặc bấm vào để chọn ảnh`}</Typography>
          </Box>
          <Box display="flex" flexWrap="wrap" gap={2}>
            {fileInputs.map((file, index) => (
              <Box key={index} position="relative" display="inline-block">
                <img src={file.preview || file.imageUrl} alt="Preview" width={100} height={100} />
                <IconButton
                  onClick={() => handleRemoveFile(file)}
                  color="secondary"
                  size="small"
                  style={{ position: 'absolute', top: 0, right: 0 }}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            ))}
          </Box>

          <Box mt={4}>
            <Typography variant="h6" component="h4">
              Thuộc tính sản phẩm
            </Typography>
            {data?.optionRequestDtoList?.map((attribute, index) => (
              <Box key={index} mb={2}>
                <Box display="flex" alignItems="center">
                  <TextField
                    label={`Thuộc tính ${index + 1}`}
                    value={attribute.name}
                    onChange={(e) => handleAttributeChange(index, 'name', e.target.value)}
                    variant="outlined"
                    margin="normal"
                    fullWidth
                  />
                  <IconButton
                    onClick={() => removeAttribute(index)}
                    color="secondary"
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
                <MuiChipsInput
                  value={attribute.productOptionValues.map(val => val.value)}
                  onChange={(newChips) => handleChipsChange(index, newChips)}
                  onDelete={(chip, chipIndex) => handleChipDelete(index, chip)}
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  label="Giá trị của thuộc tính (Ấn Enter để thêm giá trị mới)"
                />
              </Box>
            ))}
            <Button
              onClick={addAttribute}
              variant="contained"
              color="primary"
            >
              Thêm thuộc tính
            </Button>
          </Box>

          <Box mt={4}>
            <Typography variant="h6" component="h4">
              Chi tiết
            </Typography>
            {data?.variantsRequestDtoList?.map((variant, variantIndex) => (
              <Box key={variantIndex} mb={2}>
                <Box display="flex" alignItems="center" justifyContent="space-between">
                  {variant.optionSelectRequestDtoList.map((opt, optIndex) => (
                    <FormControl key={optIndex} variant="outlined" margin="normal" fullWidth>
                      <InputLabel>{opt.nameOption}</InputLabel>
                      <Select
                        value={opt.valueOption}
                        onChange={(e) =>
                          handleVariantOptionChange(variantIndex, optIndex, 'valueOption', e.target.value)
                        }
                        label={opt.nameOption}
                      >
                        <MenuItem value="">Chọn một giá trị</MenuItem>
                        {data.optionRequestDtoList
                          .find((attribute) => attribute.name === opt.nameOption)
                          ?.productOptionValues.map((val, i) => (
                            <MenuItem key={i} value={val.value}>
                              {val.value}
                            </MenuItem>
                          ))}
                      </Select>
                    </FormControl>
                  ))}
                  <TextField
                    label="Số lượng"
                    value={variant.quantity}
                    onChange={(e) => handleVariantChange(variantIndex, 'quantity', e.target.value)}
                    type="number"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                  />
                  <TextField
                    label="Giá tiền"
                    value={variant.price}
                    onChange={(e) => handleVariantChange(variantIndex, 'price', e.target.value)}
                    type="number"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                  />
                  <IconButton
                    onClick={() => removeVariant(variantIndex)}
                    color="secondary"
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </Box>
            ))}
            <Button
              onClick={addVariant}
              variant="contained"
              color="primary"
            >
              + Thêm
            </Button>
          </Box>
          <Box mt={4} display="flex" justifyContent="flex-end">

          </Box>
          <Box mt={4} display="flex" justifyContent="flex-end">
            <div className='mr-4'>
              <Button
                className='mr-5'
                variant="contained"
                color="error"
                onClick={onClose}
              >
                Đóng
              </Button>
            </div>
            <Button
              onClick={() => {
                handleSubmit();
                onClose();

              }}
              // type="submit"
              variant="contained"
              color="success"
            >
              Lưu
            </Button>
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export default UpdateProductPage;
