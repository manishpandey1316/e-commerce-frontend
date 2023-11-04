import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchProduct,fetchProductById,fetchProductByFilter,fetchCategories,fetchBrands, fetchUpdateProduct, fetchCreateProduct } from './ProductAPI';

const initialState = {
  products:[],
  status: 'idle',
  TotalCount:0,
  categories:[],
  brands:[],
  selectedProduct:null
};

export const fetchProductAsync = createAsyncThunk(
  'Product/fetchAllProducts',
  async () => {
    const response = await fetchProduct()
    return response.data
  }
)
export const fetchProductByIdAsync = createAsyncThunk(
  'Product/fetchProductById',
  async (id) => {
    const response = await fetchProductById(id)
    return response.data
  }
)
export const fetchProductByFilterAsync = createAsyncThunk(
  'Product/fetchByFilter',
  async ({FilterVal,Sort,Pagination}) => {
    const response = await fetchProductByFilter({FilterVal,Sort,Pagination})
    return response.data
  }
)
export const fetchUpdateProductAsync = createAsyncThunk(
  'Product/fetchUpdateProduct',
  async (productData) => {
    const response = await fetchUpdateProduct(productData)
    return response.data
  }
)
export const fetchCreateProductAsync = createAsyncThunk(
  'Product/fetchCreateProduct',
  async (productData) => {
    const response = await fetchCreateProduct(productData)
    return response.data
  }
)

export const fetchCategoriesAsync = createAsyncThunk(
  'Product/fetchCategories',
  async () => {
    const response = await fetchCategories()
    return response.data
  }
)
export const fetchBrandsAsync = createAsyncThunk(
  'Product/fetchBrands',
  async () => {
    const response = await fetchBrands()
    return response.data
  }
)
export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    resetSelectedProduct: (state) => {
      
      state.selectedProduct=null;
    },
  },
  
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.products = action.payload;
      })
      .addCase(fetchProductByIdAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductByIdAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.selectedProduct=action.payload;
      })
      .addCase(fetchProductByFilterAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductByFilterAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.products = action.payload.products;
        state.TotalCount = action.payload.totalCount;
      })
      .addCase(fetchUpdateProductAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUpdateProductAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const tempProducts=[...state.products]
        const index=tempProducts.findIndex((product)=>product.id===action.payload.id)
        tempProducts[index]=action.payload
        state.products=tempProducts
      })
      .addCase(fetchCreateProductAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCreateProductAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.products.push(action.payload)
      })
      .addCase(fetchCategoriesAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCategoriesAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.categories = action.payload;
      })
      .addCase(fetchBrandsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBrandsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.brands= action.payload;
      });
  },
});

export const { resetSelectedProduct} = productSlice.actions;


export const selectProduct = (state) => state.product.products;
export const selectTotal = (state)=>state.product.TotalCount;
export const selectCategories = (state) => state.product.categories;
export const selectBrands = (state)=>state.product.brands;
export const selectSelectedProduct=(state)=>state.product.selectedProduct;
export const selectProductStatus=(state)=>state.product.status;
export default productSlice.reducer;
