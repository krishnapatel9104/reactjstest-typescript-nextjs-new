import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import theme from "../../theme";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// import { restoreUserSelectedProductList } from "../../store/reducers/userSelectedProductListSlice";
import Image from "next/image";
import { useRouter } from "next/router";
import { listSlugType } from "../../types/constants/listSlug.type";
const Navbar = () => {
    const themes = useTheme();
    const matches = useMediaQuery(themes.breakpoints.down("md"));
    const router = useRouter();
    const dispatch = useDispatch();
    // const productDetails = useSelector(
    //     (state) =>
    //         state.rootReducer.userSelectedProductListSlice
    //             .userSelectedProductLists
    // );
    const [totalItems, setTotalItems] = useState<number>(0);
    // useEffect(() => {
    //     let total = 0;
    //     productDetails?.forEach((product) => {
    //         total += product.quantity;
    //     });
    //     setTotalItems(total);
    // }, [productDetails]);

    // useEffect(() => {
    //     if (productDetails?.length === 0) {
    //         let list = JSON.parse(
    //             localStorage.getItem("userSelectedProductList")
    //         );
    //         if (list !== null) {
    //             dispatch(restoreUserSelectedProductList(list));
    //         }
    //     }
    // });
    useEffect(() => {
        if(isOpen) setIsOpen(false);
    }, [router.asPath]);

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isMobile, setIsMobile] = useState<boolean>(false);
    const [currentSelectedItem, setCurrentSelectedItem] = useState<String>("");

    const productList: listSlugType[] = [
        {
            id: 1,
            value: "Clothes",
            slug: `/${currentSelectedItem}/products/clothes`,
        },
        { id: 2, value: "Bags", slug: `/${currentSelectedItem}/products/bags` },
        {
            id: 3,
            value: "Accessories",
            slug: `/${currentSelectedItem}/products/accessories`,
        },
        {
            id: 4,
            value: "Shoes",
            slug: `/${currentSelectedItem}/products/shoes`,
        },
        {
            id: 5,
            value: "Beauty",
            slug: `/${currentSelectedItem}/products/beauty`,
        },
        {
            id: 6,
            value: "Denim",
            slug: `/${currentSelectedItem}/products/denim`,
        },
        {
            id: 7,
            value: "Coats & Jackets",
            slug: `/${currentSelectedItem}/products/coatsandjackets`,
        },
    ];
    const designersList: listSlugType[] = [
        {
            id: 1,
            value: "Balenciaga",
            slug: `/${currentSelectedItem}/designers/balenciaga`,
        },
        {
            id: 2,
            value: "Balmain",
            slug: `/${currentSelectedItem}/designers/balmain`,
        },
        {
            id: 3,
            value: "Bottega Veneta",
            slug: `/${currentSelectedItem}/designers/bottegaveneta`,
        },
        {
            id: 4,
            value: "Burbery",
            slug: `/${currentSelectedItem}/designers/burbery`,
        },
        {
            id: 5,
            value: "Dolce & Gabbana",
            slug: `/${currentSelectedItem}/designers/dolceandgabbana`,
        },
        {
            id: 6,
            value: "Fendi",
            slug: `/${currentSelectedItem}/designers/fendi`,
        },
        {
            id: 7,
            value: "Off-White",
            slug: `/${currentSelectedItem}/designers/offwhite`,
        },
    ];
    const archivedCollectionsList: { id: number; value: string }[] = [
        { id: 1, value: "All Products" },
        { id: 2, value: "Accessories" },
        { id: 3, value: "Bags" },
        { id: 4, value: "Coats" },
        { id: 5, value: "Dresses" },
        { id: 6, value: "Shoes" },
        { id: 7, value: "Suits" },
    ];

    if (matches && isOpen) setIsOpen(false);
    const handleClick = () => {
        // if (productDetails.length > 0) {
        //     router.push("/shipping", {
        //         state: { productDetail: productDetails },
        //     });
        // } else {
        //     router.push("/");
        // }
    };

    const handleClickNavbar = (name: string) => {
        console.log("e : ", name);

        if (!matches) {
            setIsOpen(!isOpen);
            setCurrentSelectedItem(name.toLowerCase());
        } else {
            setIsMobile(!isMobile);
        }
    };
    const handleClickMobile = (item: string) => {
        setCurrentSelectedItem(item);
    };

    return (
        <>
            <Box
                sx={{
                    backgroundColor: isOpen ? "white" : "inherit",
                    display: { xs: "none", md: "flex" },
                    justifyContent: "space-around",
                    position: "absolute",
                    top: 0,
                    padding: "30px 0px",
                    color: "black",
                    alignItems: "center",
                    width: "100%",
                    zIndex: 2,
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        gap: "32px",
                        alignItems: "center",
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            gap: "6px",
                            alignItems: "center",
                            fontFamily:
                                theme.typography.headerNavbarLink.fontFamily,
                            fontWeight: "700",
                            fontSize: "16px",
                            letterSpacing: "0.085em",
                            textTransform: "uppercase",
                            color: "#212121",
                        }}
                        onClick={() => router.push("/")}
                    >
                        <Image
                            src={"/images/logo.png"}
                            alt={"Majestic"}
                            width={35}
                            height={25}
                        />
                        Majestic
                    </Box>
                    {["Women", "Men", "Collection", "Outlet"].map(
                        (item, index) => {
                            return (
                                <>
                                    <Box
                                        key={index}
                                        onClick={(e) => handleClickNavbar(item)}
                                        sx={{
                                            cursor: "pointer",
                                            textDecoration:
                                                currentSelectedItem === item
                                                    ? "underline !important"
                                                    : "auto",

                                            fontFamily:
                                                theme.typography
                                                    .headerNavbarLink
                                                    .fontFamily,
                                            fontWeight: "700",
                                            fontSize: "16px",
                                            color: theme.palette.primary.main,
                                        }}
                                    >
                                        {item}
                                    </Box>
                                </>
                            );
                        }
                    )}
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        gap: "30px",
                        alignItems: "center",
                    }}
                >
                    <Image
                        src={"/images/Call.png"}
                        alt={"call"}
                        height={20}
                        width={20}
                    />
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                        }}
                        onClick={handleClick}
                    >
                        <Image
                            src={"/images/Cart.png"}
                            alt={"cart"}
                            height={20}
                            width={20}
                            style={{ position: "relative" }}
                        />
                        <Box
                            sx={{
                                position: "absolute",
                                top: "25%",
                                backgroundColor: "red",
                                left: "76%",
                                borderRadius: "41px",
                                width: "20px",
                                textAlign: "center",
                            }}
                        >
                            <Typography sx={{ color: "white" }}>
                                {totalItems}
                            </Typography>
                        </Box>
                    </Box>
                    <Image
                        src={"/images/Search.png"}
                        alt={"search"}
                        height={20}
                        width={20}
                    />
                    <Image
                        src={"/images/Login.png"}
                        alt={"login"}
                        height={20}
                        width={20}
                    />
                    <Image
                        src={"/images/Like.png"}
                        alt={"like"}
                        height={20}
                        width={20}
                    />
                </Box>
            </Box>

            {/* mobile */}
            <Box
                sx={{
                    backgroundColor: isOpen ? "white" : "inherit",
                    display: { md: "none", xs: "flex" },
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "30px 30px",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        gap: "6px",
                        alignItems: "center",
                        fontFamily:
                            theme.typography.headerNavbarLink.fontFamily,
                        fontWeight: "700",
                        fontSize: "16px",
                        letterSpacing: "0.085em",
                        textTransform: "uppercase",
                        color: "#212121",
                    }}
                    onClick={() => router.push("/")}
                >
                    <Image
                        src={"/images/logo.png"}
                        alt={"Majestic"}
                        width={35}
                        height={25}
                    />
                    Majestic
                </Box>
                <Box>
                    <Image
                        src={"/images/menu.png"}
                        alt="menuicon"
                        height={30}
                        width={30}
                        onClick={(e) => handleClickNavbar(e)}
                    />
                </Box>

                {isMobile ? (
                    <>
                        <Box
                            sx={{
                                display: "block",
                                marginTop: "30px",
                                flexDirection: "column",
                                gap: "21px",
                                position: "absolute",
                                top: "60px",
                                width: "100%",
                                right: "0",
                                backgroundColor: "white",
                                zIndex: 2,
                            }}
                        >
                            {["Women", "Men", "Collection", "Outlet"].map(
                                (item, index) => {
                                    return (
                                        <Accordion
                                            key={index}
                                            sx={{
                                                backgroundColor:
                                                    theme.palette
                                                        .backgroundColor
                                                        .default,
                                            }}
                                            onClick={() =>
                                                handleClickMobile(
                                                    item.toLowerCase()
                                                )
                                            }
                                        >
                                            <AccordionSummary
                                                sx={{
                                                    backgroundColor:
                                                        theme.palette
                                                            .backgroundColor
                                                            .default,
                                                }}
                                                expandIcon={<ExpandMoreIcon />}
                                                aria-controls="panel1a-content"
                                                id="panel1a-header"
                                            >
                                                <Typography>{item}</Typography>
                                            </AccordionSummary>
                                            <AccordionDetails
                                                sx={{
                                                    backgroundColor:
                                                        theme.palette
                                                            .backgroundColor
                                                            .default,
                                                }}
                                            >
                                                <Accordion>
                                                    <AccordionSummary
                                                        expandIcon={
                                                            <ExpandMoreIcon />
                                                        }
                                                        aria-controls="panel2a-content"
                                                        id="panel2a-header"
                                                    >
                                                        <Typography>
                                                            Products
                                                        </Typography>
                                                    </AccordionSummary>
                                                    <AccordionDetails>
                                                        <Box
                                                            sx={{
                                                                display: "flex",
                                                                flexDirection:
                                                                    "column",
                                                                gap: "30px",
                                                            }}
                                                        >
                                                            {productList.map(
                                                                (product) => {
                                                                    return (
                                                                        <Link
                                                                            style={{
                                                                                color: theme
                                                                                    .palette
                                                                                    .navbarSubLink
                                                                                    .color,
                                                                                textDecoration:
                                                                                    "none",
                                                                            }}
                                                                            sx={{
                                                                                fontFamily:
                                                                                    theme
                                                                                        .typography
                                                                                        .headerNavbarSubLink
                                                                                        .fontFamily,
                                                                                fontWeight:
                                                                                    "400",
                                                                                fontSize:
                                                                                    "16px",
                                                                                color: theme
                                                                                    .palette
                                                                                    .navbarSubLink
                                                                                    .color,
                                                                                textDecoration:
                                                                                    "none",
                                                                            }}
                                                                            key={
                                                                                product.id
                                                                            }
                                                                            href={`${product.slug}`}
                                                                        >
                                                                            {
                                                                                product.value
                                                                            }
                                                                        </Link>
                                                                    );
                                                                }
                                                            )}
                                                        </Box>
                                                    </AccordionDetails>
                                                </Accordion>
                                                <Accordion>
                                                    <AccordionSummary
                                                        expandIcon={
                                                            <ExpandMoreIcon />
                                                        }
                                                        aria-controls="panel2a-content"
                                                        id="panel2a-header"
                                                    >
                                                        <Typography>
                                                            Designers
                                                        </Typography>
                                                    </AccordionSummary>
                                                    <AccordionDetails>
                                                        <Box
                                                            sx={{
                                                                display: "flex",
                                                                flexDirection:
                                                                    "column",
                                                                gap: "30px",
                                                            }}
                                                        >
                                                            {designersList.map(
                                                                (product) => {
                                                                    return (
                                                                        <Link
                                                                            style={{
                                                                                color: theme
                                                                                    .palette
                                                                                    .navbarSubLink
                                                                                    .color,
                                                                                textDecoration:
                                                                                    "none",
                                                                            }}
                                                                            sx={{
                                                                                fontFamily:
                                                                                    theme
                                                                                        .typography
                                                                                        .headerNavbarSubLink
                                                                                        .fontFamily,
                                                                                fontWeight:
                                                                                    "400",
                                                                                fontSize:
                                                                                    "16px",
                                                                                color: theme
                                                                                    .palette
                                                                                    .navbarSubLink
                                                                                    .color,
                                                                                textDecoration:
                                                                                    "none",
                                                                            }}
                                                                            key={
                                                                                product.id
                                                                            }
                                                                            href={`${product.slug}`}
                                                                        >
                                                                            {
                                                                                product.value
                                                                            }
                                                                        </Link>
                                                                    );
                                                                }
                                                            )}
                                                        </Box>
                                                    </AccordionDetails>
                                                </Accordion>
                                                <Accordion>
                                                    <AccordionSummary
                                                        expandIcon={
                                                            <ExpandMoreIcon />
                                                        }
                                                        aria-controls="panel2a-content"
                                                        id="panel2a-header"
                                                    >
                                                        <Typography>
                                                            Archived Collections
                                                        </Typography>
                                                    </AccordionSummary>
                                                    <AccordionDetails>
                                                        <Box
                                                            sx={{
                                                                display: "flex",
                                                                flexDirection:
                                                                    "column",
                                                                gap: "30px",
                                                            }}
                                                        >
                                                            {archivedCollectionsList.map(
                                                                (product) => {
                                                                    return (
                                                                        <Link
                                                                            style={{
                                                                                color: theme
                                                                                    .palette
                                                                                    .navbarSubLink
                                                                                    .color,
                                                                                textDecoration:
                                                                                    "none",
                                                                                fontFamily:
                                                                                    theme
                                                                                        .typography
                                                                                        .headerNavbarSubLink
                                                                                        .fontFamily,
                                                                                fontWeight:
                                                                                    "400",
                                                                                fontSize:
                                                                                    "16px",
                                                                                color: theme
                                                                                    .palette
                                                                                    .navbarSubLink
                                                                                    .color,
                                                                                textDecoration:
                                                                                    "none",
                                                                            }}
                                                                            // sx={{

                                                                            // }}
                                                                            key={
                                                                                product.id
                                                                            }
                                                                            href={
                                                                                "/"
                                                                            }
                                                                        >
                                                                            {
                                                                                product.value
                                                                            }
                                                                        </Link>
                                                                    );
                                                                }
                                                            )}
                                                        </Box>
                                                    </AccordionDetails>
                                                </Accordion>
                                            </AccordionDetails>
                                        </Accordion>
                                    );
                                }
                            )}
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "flex-start",
                                    gap: "30px",
                                    alignItems: "flex-start",
                                    padding: "15px 30px",
                                }}
                            >
                                <Image
                                    src={"/images/Call.png"}
                                    alt={"call"}
                                    height={20}
                                    width={20}
                                />
                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        position: "relative",
                                    }}
                                    onClick={handleClick}
                                >
                                    <Image
                                        src={"/images/Cart.png"}
                                        alt={"cart"}
                                        height={20}
                                        width={20}
                                    />
                                    <Box
                                        sx={{
                                            position: "absolute",
                                            top: "-55%",
                                            backgroundColor: "red",
                                            left: "80%",
                                            borderRadius: "41px",
                                            width: "20px",
                                            textAlign: "center",
                                        }}
                                    >
                                        <Typography sx={{ color: "white" }}>
                                            {totalItems}
                                        </Typography>
                                    </Box>
                                </Box>
                                <Image
                                    src={"/images/Search.png"}
                                    alt={"search"}
                                    height={20}
                                    width={20}
                                />
                                <Image
                                    src={"/images/Login.png"}
                                    alt={"login"}
                                    height={20}
                                    width={20}
                                />
                                <Image
                                    src={"/images/Like.png"}
                                    alt={"like"}
                                    height={20}
                                    width={20}
                                />
                            </Box>
                        </Box>
                    </>
                ) : (
                    <></>
                )}
            </Box>
            {isOpen ? (
                <Box
                    sx={{
                        backgroundColor: "white",
                        position: "absolute",
                        top: "85px",
                        textAlign: "left",
                        zIndex: 2,
                        color: "black",
                        width: "100%",
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            padding: {
                                md: "30px 140px",
                                xl: "30px 290px 180px 290px",
                            },
                            borderBottom: "1px solid white",
                            borderBottomLeftRadius: "40px",
                            borderBottomRightRadius: "40px",
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                gap: { md: "100px", xl: "150px" },
                            }}
                        >
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "30px",
                                }}
                            >
                                <Typography
                                    sx={{
                                        fontFamily:
                                            theme.typography.headerNavbarSubLink
                                                .fontFamily,
                                        fontWeight: "400",
                                        fontSize: "24px",
                                        color: theme.palette.navbarLink.color,
                                        marginBottom: "25px",
                                    }}
                                >
                                    Products
                                </Typography>
                                {productList.map((product) => {
                                    return (
                                        <Link
                                            style={{
                                                color: theme.palette
                                                    .navbarSubLink.color,
                                                textDecoration: "none",
                                                fontFamily:
                                                    theme.typography
                                                        .headerNavbarSubLink
                                                        .fontFamily,
                                                fontWeight: "400",
                                                fontSize: "16px",
                                            }}
                                            // sx={{
                                            // }}
                                            key={product.id}
                                            href={`${product.slug}`}
                                        >
                                            {product.value}
                                        </Link>
                                    );
                                })}
                            </Box>
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "30px",
                                }}
                            >
                                <Typography
                                    sx={{
                                        fontFamily:
                                            theme.typography.headerNavbarSubLink
                                                .fontFamily,
                                        fontWeight: "400",
                                        fontSize: "24px",
                                        color: theme.palette.navbarLink.color,
                                        marginBottom: "25px",
                                    }}
                                >
                                    Designers
                                </Typography>
                                {designersList.map((product) => {
                                    return (
                                        <Link
                                            style={{
                                                color: theme.palette
                                                    .navbarSubLink.color,
                                                textDecoration: "none",
                                                fontFamily:
                                                    theme.typography
                                                        .headerNavbarSubLink
                                                        .fontFamily,
                                                fontWeight: "400",
                                                fontSize: "16px",
                                            }}
                                            key={product.id}
                                            href={`${product.slug}`}
                                        >
                                            {product.value}
                                        </Link>
                                    );
                                })}
                            </Box>
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "30px",
                                }}
                            >
                                <Typography
                                    sx={{
                                        fontFamily:
                                            theme.typography.headerNavbarSubLink
                                                .fontFamily,
                                        fontWeight: "400",
                                        fontSize: "24px",
                                        color: theme.palette.navbarLink.color,
                                        marginBottom: "25px",
                                    }}
                                >
                                    Archived collections
                                </Typography>
                                {archivedCollectionsList.map((product) => {
                                    return (
                                        <Link
                                            style={{
                                                color: "#8E8E93",
                                                textDecoration: "none",
                                                fontFamily:
                                                    theme.typography
                                                        .headerNavbarSubLink
                                                        .fontFamily,
                                                fontWeight: "400",
                                                fontSize: "16px",
                                            }}
                                            key={product.id}
                                            href={`/`}
                                        >
                                            {product.value}
                                        </Link>
                                    );
                                })}
                            </Box>
                        </Box>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                textAlign: "left",
                            }}
                        >
                            <Box
                                sx={{
                                    width: "300px",
                                    height: "250px",
                                }}
                            >
                                <Image
                                    src={"/images/catgeorymenuimg.png"}
                                    alt="imageGirl"
                                    height={0}
                                    width={0}
                                    sizes="(max-width:0) 100vw,
                                (max-height:0) 100vh"
                                    style={{
                                        objectFit: "cover",
                                        height: "100%",
                                        width: "100%",
                                    }}
                                />
                                <Typography
                                    sx={{
                                        color: theme.palette.navbarLink.color,
                                    }}
                                >
                                    Sales on ChanelAccessories
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            ) : (
                <></>
            )}
        </>
    );
};

export default Navbar;
