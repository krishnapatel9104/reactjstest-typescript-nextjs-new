import {
    Box,
    Button,
    MenuItem,
    Select,
    SelectChangeEvent,
    Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import DeleteOutlineSharpIcon from "@mui/icons-material/DeleteOutlineSharp";
import RemoveSharpIcon from "@mui/icons-material/RemoveSharp";
import AddSharpIcon from "@mui/icons-material/AddSharp";
import { useSelector, useDispatch } from "react-redux";
// import {
//     deleteSelectedProductList,
//     updateUserSelectedProductList,
// } from "../../store/reducers/userSelectedProductListSlice";
import Image from "next/image";
import { categoryProductListType } from "../../types/constants/categoryProductList.type";

export const YourOrder = () => {
    const dispatch = useDispatch();
    const colourList = ["Red", "Pink", "Yellow", "Black"];
    const sizeList = ["M", "L", "S", "XS"];
    let total = 0;

    const productDetails: categoryProductListType[] = [];
    const otherDetails = {
        Shipping: 0,
        vatAndTax: 0,
    };
    // const otherDetails = useSelector(
    //     (state) => state.rootReducer.userSelectedProductListSlice.otherDetails
    // );
    // const productDetails = useSelector(
    //     (state) =>
    //         state.rootReducer.userSelectedProductListSlice
    //             .userSelectedProductLists
    // );
    // useEffect(() => {
    //     localStorage.setItem(
    //         "userSelectedProductList",
    //         JSON.stringify(productDetails)
    //     );
    // }, [productDetails]);

    const handleClick = (orderId: number) => {
        // dispatch(deleteSelectedProductList(orderId));
    };
    const handleQuantityChange = (identifier: string, orderId: number) => {
        // if (identifier === "add") {
        //     dispatch(
        //         updateUserSelectedProductList({
        //             orderId: orderId,
        //             quantity: "add",
        //         })
        //     );
        // }
        // if (identifier === "less") {
        //     dispatch(
        //         updateUserSelectedProductList({
        //             orderId: orderId,
        //             quantity: "less",
        //         })
        //     );
        // }
    };
    const handleChange = (e: SelectChangeEvent<string>, orderId: number) => {
        const { name, value } = e.target;
        if (name === "size") {
            // dispatch(
            //     updateUserSelectedProductList({ orderId: orderId, size: value })
            // );
        }
        if (name === "colour") {
            // dispatch(
            //     updateUserSelectedProductList({
            //         orderId: orderId,
            //         color: value,
            //     })
            // );
        }
    };
    return (
        <Box
            sx={{
                color: "#616161",
                padding: { xs: "20px", md: "30px", lg: "50px" },
                backgroundColor: "#EFEFF4",
                borderRadius: "34px",
            }}
        >
            <Typography
                sx={{
                    fontSize: "25px",
                    fontWeight: "700",
                }}
            >
                Your Order
            </Typography>
            {productDetails?.map((order, index) => {
                total += order.quantity * order.productPrice;
                return (
                    <Box key={index}>
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                marginTop: { xs: "30px", md: "50px" },
                                alignItems: { xs: "flex-start", sm: "center" },
                                flexDirection: { xs: "row" },
                                gap: { xs: "20px", md: "0" },
                            }}
                        >
                            <Box
                                sx={{
                                    fontSize: "19px",
                                    fontWeight: "500",
                                }}
                            >
                                {order.productName}
                            </Box>
                            <Box>
                                <Button
                                    sx={{ color: "red" }}
                                    onClick={() => handleClick(order.id)}
                                >
                                    <DeleteOutlineSharpIcon />
                                </Button>
                            </Box>
                        </Box>
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                margin: "20px 0",
                                alignItems: { xs: "flex-start", md: "center" },
                                flexDirection: { xs: "column", sm: "row" },
                                gap: { xs: "20px", md: "0" },
                                marginRight: "40px",
                            }}
                        >
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "50px",
                                }}
                            >
                                <Box>
                                    <Image
                                        src={order.imageSource}
                                        alt="imageicon"
                                        height={65}
                                        width={55}
                                    />
                                </Box>
                                <Box
                                    sx={{
                                        opacity: "0.8",
                                    }}
                                >
                                    {order.productDesc.map((desc, index) => {
                                        return (
                                            <Typography key={index}>
                                                -{desc}
                                            </Typography>
                                        );
                                    })}
                                </Box>
                            </Box>
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                }}
                            >
                                <Box
                                    sx={{
                                        fontWeight: "500",
                                    }}
                                >
                                    Quantity
                                </Box>
                                <Box
                                    sx={{
                                        display: "flex",
                                        gap: "20px",
                                        marginTop: "25px",
                                        alignItems: "center",
                                    }}
                                >
                                    <Button
                                        sx={{
                                            border:
                                                order.quantity === 1
                                                    ? "2px solid #bbacac"
                                                    : "2px solid red",
                                            color: "red",
                                            minWidth: 0,
                                            padding: 0,
                                        }}
                                        name="less"
                                        disabled={order.quantity === 1}
                                        onClick={(e) =>
                                            handleQuantityChange(
                                                "less",
                                                order.id
                                            )
                                        }
                                    >
                                        <RemoveSharpIcon
                                            style={{
                                                color:
                                                    order.quantity === 1
                                                        ? "#bbacac"
                                                        : "red",
                                            }}
                                        />
                                    </Button>
                                    {order.quantity}
                                    <Button
                                        sx={{
                                            border: "2px solid red",
                                            color: "red",
                                            minWidth: 0,
                                            padding: 0,
                                        }}
                                        name="add"
                                        onClick={(e) =>
                                            handleQuantityChange(
                                                "add",
                                                order.id
                                            )
                                        }
                                    >
                                        <AddSharpIcon />
                                    </Button>
                                </Box>
                            </Box>
                        </Box>
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                marginTop: "20px",
                                alignItems: {
                                    xs: "flex-start",
                                    md: "flex-end",
                                },
                                flexDirection: { xs: "column", sm: "row" },
                                gap: { xs: "20px", md: "0" },
                            }}
                        >
                            <Box>
                                <Box
                                    sx={{
                                        fontWeight: "500",
                                        fontSize: "16px",
                                    }}
                                >
                                    Size
                                </Box>
                                <Box sx={{ marginTop: "20px" }}>
                                    <Select
                                        labelId="demo-multiple-name-label"
                                        id="demo-multiple-name"
                                        name="size"
                                        value={order.size}
                                        onChange={(e) =>
                                            handleChange(e, order.id)
                                        }
                                        sx={{
                                            width: {
                                                xs: "170px",
                                                md: "140px",
                                                lg: "170px",
                                            },
                                        }}
                                    >
                                        {sizeList.map((s, index) => (
                                            <MenuItem
                                                key={index}
                                                value={s}
                                                sx={{ padding: "10px 10px" }}
                                            >
                                                {s}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </Box>
                            </Box>
                            <Box>
                                <Box
                                    sx={{
                                        fontWeight: "500",
                                        fontSize: "16px",
                                    }}
                                >
                                    Colour
                                </Box>
                                <Box sx={{ marginTop: "20px" }}>
                                    <Select
                                        labelId="demo-multiple-name-label"
                                        id="demo-multiple-name"
                                        name="colour"
                                        value={order.color}
                                        onChange={(e) =>
                                            handleChange(e, order.id)
                                        }
                                        sx={{
                                            width: {
                                                xs: "170px",
                                                md: "140px",
                                                lg: "170px",
                                            },
                                        }}
                                    >
                                        {colourList.map((color, index) => (
                                            <MenuItem
                                                key={index}
                                                value={color}
                                                sx={{ padding: "10px 10px" }}
                                            >
                                                {color}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </Box>
                            </Box>
                            <Box>
                                <Typography
                                    sx={{
                                        color: "#616161",
                                        fontSize: "22px",
                                        fontWeight: "700",
                                    }}
                                >
                                    ${order.productPrice}
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                );
            })}
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: "30px",
                }}
            >
                <Box
                    sx={{
                        color: "#616161",
                        opacity: "0.8",
                        fontSize: "16px",
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px",
                    }}
                >
                    <Typography>Subtotal</Typography>
                    <Typography>Shipping</Typography>
                    <Typography>Vat,tax</Typography>
                    <Typography
                        sx={{
                            color: "#616161",
                            fontSize: "22px",
                            fontWeight: "700",
                            marginTop: "25px",
                        }}
                    >
                        Total
                    </Typography>
                </Box>
                <Box
                    sx={{
                        color: "#616161",
                        opacity: "0.8",
                        fontSize: "18px",
                        fontWeight: "600",
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px",
                    }}
                >
                    <Typography>${total}</Typography>
                    <Typography>
                        ${total !== 0 ? otherDetails.Shipping : 0}
                    </Typography>
                    <Typography>
                        ${total !== 0 ? otherDetails.vatAndTax : 0}
                    </Typography>
                    <Typography
                        sx={{
                            color: "#616161",
                            fontSize: "22px",
                            fontWeight: "700",
                            marginTop: "25px",
                        }}
                    >
                        $
                        {total !== 0
                            ? total +
                              otherDetails.Shipping +
                              otherDetails.vatAndTax
                            : 0}
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};
