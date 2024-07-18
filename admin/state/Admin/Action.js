import { API_BASE_URL, api, apiFormData } from "@/config/apiConfig";
import {
  ADD_BRAND_FAILURE,
  ADD_BRAND_REQUEST,
  ADD_BRAND_SUCCESS,
  ADD_NEW_PRODUCT_REQUEST,
  ADD_NEW_PRODUCT_FAILURE,
  ADD_NEW_PRODUCT_SUCCESS,
  ADD_CATEGORY_FAILURE,
  ADD_CATEGORY_REQUEST,
  ADD_CATEGORY_SUCCESS,
  DELETE_BRAND_FAILURE,
  DELETE_BRAND_REQUEST,
  DELETE_BRAND_SUCCESS,
  DELETE_CATEGORY_FAILURE,
  DELETE_CATEGORY_REQUEST,
  DELETE_CATEGORY_SUCCESS,
  GET_ALL_USER_FAILURE,
  GET_ALL_USER_SUCCESS,
  GET_ALL_USER_REQUEST,
  DELETE_PRODUCT_FAILURE,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  CHANGE_ROLE_REQUEST,
  CHANGE_ROLE_SUCCESS,
  CHANGE_ROLE_FAILURE,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAILURE,
  GET_ALL_ORDERS_REQUEST,
  GET_ALL_ORDERS_SUCCESS,
  GET_ALL_ORDERS_FAILURE,
  UPDATE_BRAND_REQUEST,
  UPDATE_BRAND_SUCCESS,
  UPDATE_BRAND_FAILURE,
  UPDATE_CATEGORY_REQUEST,
  UPDATE_CATEGORY_SUCCESS,
  UPDATE_CATEGORY_FAILURE,
  UPDATE_ORDER_STATUS_REQUEST,
  UPDATE_ORDER_STATUS_SUCCESS,
  UPDATE_ORDER_STATUS_FAILURE,
  GET_ANALYTIC_REQUEST,
  GET_ANALYTIC_SUCCESS,
  GET_ANALYTIC_FAILURE,
  GET_ALL_PERMISSION_REQUEST,
  GET_ALL_PERMISSION_SUCCESS,
  GET_ALL_PERMISSION_FAILURE,
  GET_ALL_ROLE_REQUEST,
  GET_ALL_ROLE_SUCCESS,
  GET_ALL_ROLE_FAILURE,
  DELETE_ROLE_REQUEST,
  DELETE_ROLE_SUCCESS,
  DELETE_ROLE_FAILURE,
  CREATE_NEW_COUPCON_FAILURE,
  CREATE_NEW_COUPCON_REQUEST,
  CREATE_NEW_COUPCON_SUCCESS,
  GET_ALL_COUPCON_FAILURE,
  GET_ALL_COUPCON_REQUEST,
  GET_ALL_COUPCON_SUCCESS,
  DELETE_COUPCON_FAILURE,
  DELETE_COUPCON_SUCCESS,
  DELETE_COUPCON_REQUEST,
  UPDATE_COUPCON_FAILURE,
  UPDATE_COUPCON_REQUEST,
  UPDATE_COUPCON_SUCCESS,
  CREATE_SUB_ADMIN_ACCOUNT_FAILURE,
  CREATE_SUB_ADMIN_ACCOUNT_REQUEST,
  CREATE_SUB_ADMIN_ACCOUNT_SUCCESS,
  REMOVE_ACCOUNT_FAILURE,
  REMOVE_ACCOUNT_REQUEST,
  REMOVE_ACCOUNT_SUCCESS,
  EDIT_ACCOUNT_FAILURE,
  EDIT_ACCOUNT_REQUEST,
  EDIT_ACCOUNT_SUCCESS,
  GET_ALL_PRODUCT_REQUEST,
  GET_ALL_PRODUCT_SUCCESS,
  GET_ALL_PRODUCT_FAILURE,
  CHANGE_ACCOUNT_STATUS_FAILURE,
  CHANGE_ACCOUNT_STATUS_REQUEST,
  CHANGE_ACCOUNT_STATUS_SUCCESS,
  RESET_PASSWORD_FAILURE,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  GET_ORDER_BY_ID_REQUEST,
  GET_ORDER_BY_ID_SUCCESS,
  GET_ORDER_BY_ID_FAILURE,
  CREATE_ROLE_SUCCESS,
  CREATE_ROLE_FAILURE,
  CREATE_ROLE_REQUEST,
  GET_SINGLE_ROLE_FAILURE,
  GET_SINGLE_ROLE_REQUEST,
  GET_SINGLE_ROLE_SUCCESS
} from "./ActionType";
import { toast } from "react-toastify";
import axios from "axios";

export const addNewBrand = (req) => async (dispatch) => {
  dispatch({ type: ADD_BRAND_REQUEST });
  try {
    const { data } = await axios.post(`${API_BASE_URL}admin/brand/create`, req);
    dispatch({ type: ADD_BRAND_SUCCESS, payload: data });
    toast.success("Thêm nhãn hàng thành công");
  } catch (e) {
    dispatch({ type: ADD_BRAND_FAILURE, payload: e });
  }
};

export const updateBrand = (req) => async (dispatch) => {
  dispatch({ type: UPDATE_BRAND_REQUEST });
  try {
    const { data } = await axios.put(`${API_BASE_URL}admin/brand/update`, req);
    dispatch({ type: UPDATE_BRAND_SUCCESS, payload: data });
    toast.success("Sửa thành công");
  } catch (e) {
    dispatch({ type: UPDATE_BRAND_FAILURE, payload: e.message });
    console.log(e)
  }
};

export const deleteBrand = (brandId) => async (dispatch) => {
  dispatch({ type: DELETE_BRAND_REQUEST });
  try {
    const { data } = await axios.delete(`${API_BASE_URL}admin/brand/delete/${brandId}`);
    dispatch({ type: DELETE_BRAND_SUCCESS, payload: data });
    toast.success("Xóa thành công");
    // setTimeout(refresh, 1000);
  } catch (e) {
    dispatch({ type: DELETE_BRAND_FAILURE, payload: e.message });
    toast.error(e?.response?.data.message);
    console.log(e)
  }
};

export const addNewCategory = (req) => async (dispatch) => {
  dispatch({ type: ADD_CATEGORY_REQUEST });
  try {
    const { data } = await axios.post(`${API_BASE_URL}admin/category/create`, req);

    dispatch({ type: ADD_CATEGORY_SUCCESS, payload: data });
    toast.success("Thêm thành công");
    // setTimeout(refresh, 1000);
  } catch (e) {
    dispatch({ type: ADD_CATEGORY_FAILURE, payload: e.message });
    console.log(e)
  }
};

export const updateCategory = (req) => async (dispatch) => {
  // formdata.append('multipartFile', fs.createReadStream('/path/to/file'));
  dispatch({ type: UPDATE_CATEGORY_REQUEST });
  try {
    const { data } = await axios.put(`${API_BASE_URL}admin/category/update`, req);
    dispatch({ type: UPDATE_CATEGORY_SUCCESS, payload: data });
    toast.success("Sửa thành công");
    // setTimeout(refresh, 1000);
  } catch (e) {
    dispatch({ type: UPDATE_CATEGORY_FAILURE, payload: e });
    console.log(e)
    toast.error(e);
  }
};

export const deleteCategory = (categoryId) => async (dispatch) => {
  dispatch({ type: DELETE_CATEGORY_REQUEST });
  try {
    const { data } = await axios.delete(`${API_BASE_URL}admin/category/delete/${categoryId}`);
    dispatch({ type: DELETE_CATEGORY_SUCCESS, payload: data });
    toast.success("Xóa thành công");
    // setTimeout(refresh, 1000);
  } catch (e) {
    dispatch({ type: DELETE_CATEGORY_FAILURE, payload: e.message });
  }
};

export const getAllUser = () => async (dispatch) => {
  dispatch({ type: GET_ALL_USER_REQUEST });
  try {
    const { data } = await api.get(`user/admin/get-all`);
    dispatch({ type: GET_ALL_USER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_ALL_USER_FAILURE, payload: error.message });
  }
};


export const getAllOrders = () => async (dispatch) => {
  dispatch({ type: GET_ALL_ORDERS_REQUEST });
  try {
    const { data } = await api.get(`admin/order/get-all`);
    dispatch({ type: GET_ALL_ORDERS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_ALL_ORDERS_FAILURE, payload: error.message });
  }
};

export const updateOrderStatus = (req) => async (dispatch) => {
  console.log(req)
  dispatch({ type: UPDATE_ORDER_STATUS_REQUEST });
  try {
    const { data } = await api.put(`admin/order/update-status?orderId=${req.oId}&status=${req.status}`);
    dispatch({ type: UPDATE_ORDER_STATUS_SUCCESS, payload: data });
    toast.success("Update status successfully");
  } catch (e) {
    dispatch({ type: UPDATE_ORDER_STATUS_FAILURE, payload: e.message });
    console.log(e);
  }
};


export const getDataAnalytic = () => async (dispatch) => {
  dispatch({ type: GET_ANALYTIC_REQUEST });
  try {
    const { data } = await api.get(`admin/statistical/2024`);
    console.log(data)
    dispatch({ type: GET_ANALYTIC_SUCCESS, payload: data });
    return data;
  } catch (error) {
    dispatch({ type: GET_ANALYTIC_FAILURE, payload: error.message });
  }
}

export const getAllPermission = () => async (dispatch) => {
  dispatch({ type: GET_ALL_PERMISSION_REQUEST });
  try {
    const { data } = await api.get(`admin/role/permission/get-all`);
    dispatch({ type: GET_ALL_PERMISSION_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_ALL_PERMISSION_FAILURE, payload: error.message });
  }
};

export const getAllRole = () => async (dispatch) => {
  dispatch({ type: GET_ALL_ROLE_REQUEST });
  try {
    const { data } = await api.get(`admin/role/get-all`);
    dispatch({ type: GET_ALL_ROLE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_ALL_ROLE_FAILURE, payload: error.message });
  }
}

export const getSingleRole = (id) => async (dispatch) => {
  dispatch({ type: GET_SINGLE_ROLE_REQUEST });
  try {
    const response = await api.get(`admin/role/${id}`);
    const role = response.data;
    localStorage.setItem('UserRole', JSON.stringify(role))
    dispatch({ type: GET_SINGLE_ROLE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_SINGLE_ROLE_FAILURE, payload: error.message });
  }
}

export const createRole = (req) => async (dispatch) => {
  dispatch({ type: CREATE_ROLE_REQUEST });
  
  try {
    const { data } = await api.post(`admin/role/create?roleName=${req.roleName}&permissionIds=${req.permissionIdList}`);
    dispatch({ type: CREATE_ROLE_SUCCESS, payload: data });
    toast.success("Add new role successfully");
  } catch (e) {
    dispatch({ type: CREATE_ROLE_FAILURE, payload: e.message });
    console.log(e)
  }
}

export const updateRole = (req) => async (dispatch) => {
  dispatch({ type: CHANGE_ROLE_REQUEST });
  try {
    const { data } = await api.put(`admin/role/update?roleId=${req?.roleId}&roleName=${req?.roleName}&permissionIds=${req?.permissionIdList}`);
    dispatch({ type: CHANGE_ROLE_SUCCESS, payload: data });
    toast.success("Update successfully!");
    // setTimeout(refresh, 1000);
  } catch (e) {
    dispatch({ type: CHANGE_ROLE_FAILURE, payload: e.message });
    toast.error(e?.response?.data.message);
  }
};

export const deleteRole = (roleId) => async (dispatch) => {
  dispatch({ type: DELETE_ROLE_REQUEST });
  try {
    const { data } = await api.delete(`admin/role/delete/${roleId}`);
    dispatch({ type: DELETE_ROLE_SUCCESS, payload: data });
    toast.success("Delete successfully!");
  } catch (e) {
    dispatch({ type: DELETE_ROLE_FAILURE, payload: e.message });
    toast.error(e?.response?.data);
    console.log(e)
  }
}

export const addNewCoupcon = (req) => async (dispatch) => {
  dispatch({ type: CREATE_NEW_COUPCON_REQUEST });
  try {
    const { data } = await axios.post(`${API_BASE_URL}admin/discount/create`, req);

    dispatch({ type: CREATE_NEW_COUPCON_SUCCESS, payload: data });
    toast.success("Thêm thành công");
    // setTimeout(refresh, 1000);
  } catch (e) {
    dispatch({ type: CREATE_NEW_COUPCON_FAILURE, payload: e.message });
    console.log(e)
  }
};

export const getAllCoupcon = () => async (dispatch) => {
  dispatch({ type: GET_ALL_COUPCON_REQUEST });
  try {
    const { data } = await axios.get(`${API_BASE_URL}admin/discount/get-all`);
    dispatch({ type: GET_ALL_COUPCON_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_ALL_COUPCON_FAILURE, payload: error.message });
  }
};

export const deleteCoupcon = (id) => async (dispatch) => {
  dispatch({ type: DELETE_COUPCON_REQUEST });
  try {
    const { data } = await axios.delete(`${API_BASE_URL}admin/discount/delete/${id}`);
    dispatch({ type: DELETE_COUPCON_SUCCESS, payload: data });
    toast.success("Delete successfully");
    // setTimeout(refresh, 1000);
  } catch (e) {
    dispatch({ type: DELETE_COUPCON_FAILURE, payload: e.message });
    console.log(e)
    toast.error('Failed')
  }
};

export const updateCoupcon = (req) => async (dispatch) => {
  dispatch({ type: UPDATE_COUPCON_REQUEST });
  try {
    const { data } = await api.put(`admin/discount/update`, req);
    dispatch({ type: UPDATE_COUPCON_SUCCESS, payload: data });
    toast.success("Update successfully");
    // setTimeout(refresh, 1000);
  } catch (e) {
    dispatch({ type: UPDATE_COUPCON_FAILURE, payload: e });
    console.log(e)
    toast.error('Failed')
  }
};

export const createSubAdmin = (req) => async (dispatch) => {
  dispatch({ type: CREATE_SUB_ADMIN_ACCOUNT_REQUEST });
  try {
    const { data } = await api.post(`user/admin/create-user`, req);

    dispatch({ type: CREATE_SUB_ADMIN_ACCOUNT_SUCCESS, payload: data });
    toast.success('Create account successfully')
    // setTimeout(refresh, 1000);
  } catch (e) {
    dispatch({ type: CREATE_SUB_ADMIN_ACCOUNT_FAILURE, payload: e.message });
    console.log(e)
  }
};

export const deleteAccount = (id) => async (dispatch) => {
  dispatch({ type: REMOVE_ACCOUNT_REQUEST });
  try {
    const { data } = await api.delete(`user/admin/delete-user/${id}`);
    dispatch({ type: REMOVE_ACCOUNT_SUCCESS, payload: data });
    toast.success("Delete account succesfully");
    // setTimeout(refresh, 1000);
  } catch (e) {
    dispatch({ type: REMOVE_ACCOUNT_FAILURE, payload: e.message });
  }
};

export const updateRoleAccount = (req) => async (dispatch) => {
  dispatch({ type: EDIT_ACCOUNT_REQUEST });
  try {
    const { data } = await api.put(`user/admin/change-role/${req.uId}/${req.rId}`,);
    dispatch({ type: EDIT_ACCOUNT_SUCCESS, payload: data });
    toast.success("Update account succesfully");
    // setTimeout(refresh, 1000);
  } catch (e) {
    dispatch({ type: EDIT_ACCOUNT_FAILURE, payload: e });
    console.log(e);
  }
};


export const addNewProduct = (req) => async (dispatch) => {
  dispatch({ type: ADD_NEW_PRODUCT_REQUEST });

  try {
    const formData = new FormData();
    formData.append("title", req.title);
    formData.append("description", req.description);
    formData.append("currentCost", req.currentCost); // Corrected to match backend field name
    formData.append("madeIn", req.madeIn); // Corrected to match backend field name
    formData.append("capacity", req.capacity); // Corrected to match backend field name
    formData.append("quantity", req.quantity); // Corrected to match backend field name
    formData.append("brandId", req.brandId); // Corrected to match backend field name (case sensitive)
    formData.append("category_id", req.category_id); // Corrected to match backend field name (case sensitive)
    formData.append("discount_id", req.discount_id); // Corrected to match backend field name (case sensitive)
    formData.append("productStatus", req.productStatus); // Corrected to match backend field name (case sensitive)

    req.multipartFiles.forEach((file, index) => {
      formData.append("multipartFiles", file, file.name);
    });

    const { data } = await apiFormData.post('admin/product/create', formData);
    dispatch({ type: ADD_NEW_PRODUCT_SUCCESS, payload: data });
    toast.success("Add product successfully");
    console.log(data);
  } catch (error) {
    dispatch({ type: ADD_NEW_PRODUCT_FAILURE, payload: error.response.data });
    toast.error("Failed");
    console.log(error);
  }
};


export const deleteProduct = (productId) => async (dispatch) => {
  console.log(productId)

  dispatch({ type: DELETE_PRODUCT_REQUEST });
  try {
    const { data } = await axios.delete(`${API_BASE_URL}admin/product/delete/${productId}`);
    dispatch({ type: DELETE_PRODUCT_SUCCESS, payload: data });
    toast.success("Xóa thành công");
  } catch (e) {
    dispatch({ type: DELETE_PRODUCT_FAILURE, payload: e.message });
    // toast.error(e?.response?.data.message);
    toast.error("Xoá thất bại, vì sản phẩm đang tham chiếu đến đơn hàng hoặc có người mua sản phẩm này")
  }
}

export const getAllProduct = (req) => async (dispatch) => {
  dispatch({ type: GET_ALL_PRODUCT_REQUEST });
  try {
    const { data } = await axios.get(
      `${API_BASE_URL}admin/product/get-all?${req?.brand ? `brandName=${req?.brand}&` : ""
      }${req?.category ? `categoryName=${req?.category}&` : ""}${req?.minPrice ? `minPrice=${req?.minPrice}&` : ""
      }${req?.maxPrice ? `maxPrice=${req?.maxPrice}&` : ""}${`size=${1000}`}`
    );
    dispatch({ type: GET_ALL_PRODUCT_SUCCESS, payload: data });
    console.log(data);
  } catch (error) {
    dispatch({ type: GET_ALL_PRODUCT_FAILURE, payload: error.message })
  }
};


export const updateProduct = (productId, req) => async (dispatch) => {
  dispatch({ type: UPDATE_PRODUCT_REQUEST });
  try {
    const formData = new FormData();
    formData.append("title", req.title);
    formData.append("description", req.description);
    formData.append("discountPercent", req.discountPercent);
    formData.append("brandId", req.brandId);
    formData.append("categoryId", req.categoryId);

    if (req.multipartFiles) {
      req.multipartFiles.forEach((file, index) => {
        formData.append("multipartFiles", file, file.name);
      });
    }

    formData.append("optionRequestDtoList", JSON.stringify(req.optionRequestDtoList));
    formData.append("variantsRequestDtoList", JSON.stringify(req.variantsRequestDtoList));
    formData.append("imageIdDelete", req.imageIdDelete);

    const { data } = await apiFormData.put(`admin/product/update/${productId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    dispatch({ type: UPDATE_PRODUCT_SUCCESS, payload: data });
    toast.success("Sửa thành công");
    console.log(data);
  } catch (error) {
    dispatch({ type: UPDATE_PRODUCT_FAILURE, payload: error.message });
    toast.error("Sửa thất bại, biến thể của sản phẩm đang tham chiếu đến một đơn hàng hoặc có người mua sản phẩm này");
    console.log(error);
  }
}

export const updateAccountStatus = (id) => async (dispatch) => {
  dispatch({ type: CHANGE_ACCOUNT_STATUS_REQUEST });
  console.log(id)
  try {
    const { data } = await api.put(`admin/account/change-status?userId=${id}`,);
    dispatch({ type: CHANGE_ACCOUNT_STATUS_SUCCESS, payload: data });
    toast.success("Thay đổi thành công");
    // setTimeout(refresh, 1000);
  } catch (e) {
    dispatch({ type: CHANGE_ACCOUNT_STATUS_FAILURE, payload: e });
    console.log(e);
  }
};

export const resetPassword = (req) => async (dispatch) => {
  dispatch({ type: RESET_PASSWORD_REQUEST });
  try {
    const { data } = await api.put(`user/admin/reset-password`, req);
    dispatch({ type: RESET_PASSWORD_SUCCESS, payload: data });
    toast.success("Change successfully");
    // setTimeout(refresh, 1000);
  } catch (e) {
    dispatch({ type: RESET_PASSWORD_FAILURE, payload: e });
    console.log(e);
  }
};


export const getOrderById = (orderId) => async (dispatch) => {
  dispatch({ type: GET_ORDER_BY_ID_REQUEST });

  try {
    const { data } = await api.get(`admin/order/get-by-id/${orderId}`);
    dispatch({ type: GET_ORDER_BY_ID_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_ORDER_BY_ID_FAILURE, payload: error.message });
  }
};