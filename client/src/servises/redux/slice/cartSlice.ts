import {
    createAsyncThunk,
    createEntityAdapter,
    createSlice
} from "@reduxjs/toolkit";
import { IReqCart } from "@types";
import { AxiosError } from "axios";
import CartEntities from "domain/entities/CartEntities/Cart.entities";
import { RequestCart } from "servises/repository/Axios/Request";
import { RTKCart } from "servises/repository/RTK/RTKCart";
import { AppDispatch, RootState } from "../createStore";
import { actionPaymentAccsess, actionPaymentReady } from "./bankCardSlice";

const cartAdapter = createEntityAdapter<IReqCart>({
    selectId: (product) => product.id
});

export const cartSelector = cartAdapter.getSelectors(
    (state: RootState) => state.cart
);

export const fetchAllCart = createAsyncThunk(
    "cart/getAll",
    async (_, { dispatch, rejectWithValue }) => {
        try {
            const request = await RequestCart.allCart();
            if (request.status == 200 && request.data) {
                dispatch(addAllCart(request.data.cart));
                dispatch(setTotalPrice(request.data.totalPrice));
            }
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
);
export const fetchAddToCart = createAsyncThunk(
    "cart/add",
    async (id: string, { dispatch, rejectWithValue }) => {
        try {
            const request = await RequestCart.addToCart({ productId: id });
            if (request.status == 200 && request.data) {
                dispatch(addCart(request.data.item));
                dispatch(setTotalPrice(request.data.totalPrice));
            }
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const fetchChangeAmount = createAsyncThunk(
    "cart/amount",
    async (change: any, { dispatch, rejectWithValue }) => {
        try {
            const request = await RequestCart.changeAmount(change);
            console.log(request, change);
            if (request.status == 200) {
                dispatch(
                    changeCart({
                        id: change.cartId,
                        changes:request.data.item
                    })
                );
                dispatch(setTotalPrice(request.data.totalPrice));
            }
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const fetchRemoveCart = createAsyncThunk(
    "cart/removeOne",
    async (cartId: string, { dispatch, rejectWithValue }) => {
        try {
            const request = await RequestCart.removeCart({ cartId });
            if (request.status == 200 && cartId === request.data.deletedId) {
                dispatch(removeCart(cartId));
                dispatch(setTotalPrice(request.data.totalPrice));
            }
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const fetchDeleteCart = createAsyncThunk(
    "cart/deleteAll",
    async (_, { dispatch, rejectWithValue }) => {
        try {
            const request = await RequestCart.deleteCart();
            if (request.status == 200) {
                dispatch(deleteCart());
                dispatch(setTotalPrice(0));
            }
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
);
export const fetchOrderCart = createAsyncThunk(
    "cart/order",
    async (value: any, { dispatch, rejectWithValue }) => {
        try {
            const request = await RequestCart.OrderCheckCart(value);
            if (request.data && request.status === 200) {
                const order = await RequestCart.OrderCart(value);
                dispatch(actionPaymentAccsess())
                return order.data.number;
            }
        } catch (error: any) {
            // Ошибка валидации по количеству
            dispatch(actionPaymentReady(false))
            if (error.response.status === 422) {
                dispatch(setErrors(error.response.data));
            } else {
                return rejectWithValue(error.response.data)
            }
        }
    }
);

const cartSlice = createSlice({
    name: "cart",
    initialState: cartAdapter.getInitialState(CartEntities.getEntities),
    reducers: {
        addAllCart: cartAdapter.addMany,
        addCart: cartAdapter.setOne,
        changeCart: cartAdapter.updateOne,
        removeCart: cartAdapter.removeOne,
        deleteCart: cartAdapter.removeAll,
        setAdress: (state, action) => {
            state.address = action.payload;
        },
        setTotalPrice: (state, action) => {
            state.totalPrice = action.payload;
        },
        setErrors: (state, action) => {
            state.orderError = action.payload.errors;
        },
        accessOrder:(state) => {
            state.orderNumber = null
            state.orderError = {}
            state.address = ''
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchOrderCart.fulfilled, (state, action) => {
            state.orderNumber = action.payload;
        }),
            builder.addCase(fetchOrderCart.rejected, (state,action) => {
                state.orderError = {
                    error: action.payload,
                    status: 500
                };
            });
    }
});
export const {
    addAllCart,
    addCart,
    changeCart,
    removeCart,
    deleteCart,
    setAdress,
    setTotalPrice,
    setErrors,
    accessOrder
} = cartSlice.actions;
export default cartSlice;
