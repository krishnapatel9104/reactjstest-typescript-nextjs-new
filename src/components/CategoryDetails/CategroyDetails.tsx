import {
    Box,
    Button,
    Checkbox,
    FormControlLabel,
    FormGroup,
    Grid,
    Pagination,
    Slider,
    Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import { categoryProductList } from "../../data/categoryProductList";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { ProtectedRoute } from "../../utils/ProtectedRoute";
import {
    filterListType,
    allFilterListType,
    sizeFilterListType,
} from "../../types/constants/filterList.type";
import { categoryProductListType } from "../../types/constants/categoryProductList.type";
import Image from "next/image";
import { useRouter } from "next/router";
import { FC } from "react";

interface categoryDetailsProps {}
const CategroyDetails: FC<categoryDetailsProps> = () => {
    const [isOpen, setIsOpen] = useState(false);
    const themes = useTheme();
    const matches = useMediaQuery(themes.breakpoints.up("md"));
    if (matches && isOpen) setIsOpen(false);
    const [brandfilterList, setBrandfilterList] = useState<filterListType[]>([
        {
            id: 1,
            value: "H&M",
            isChecked: false,
        },
        {
            id: 2,
            value: "Mark & Spencer",
            isChecked: false,
        },
        {
            id: 3,
            value: "Victoria’s Secret",
            isChecked: false,
        },
        {
            id: 4,
            value: "Dior",
            isChecked: false,
        },
        {
            id: 5,
            value: "Gucci",
            isChecked: false,
        },
        {
            id: 6,
            value: "Fendi",
            isChecked: false,
        },
        {
            id: 7,
            value: "Prada",
            isChecked: false,
        },
        {
            id: 8,
            value: "Chanel",
            isChecked: false,
        },
        {
            id: 9,
            value: "Versace",
            isChecked: false,
        },
        {
            id: 10,
            value: "Dolce & Gabbana",
            isChecked: false,
        },
        {
            id: 11,
            value: "Zara",
            isChecked: false,
        },
        {
            id: 12,
            value: "Bata",
            isChecked: false,
        },
    ]);
    const [sizefilterList, setSizefilterList] = useState<sizeFilterListType[]>([
        {
            id: 1,
            name: "Small",
            value: "S",
            isChecked: false,
        },
        {
            id: 2,
            name: "Medium",
            value: "M",
            isChecked: false,
        },
        {
            id: 3,
            name: "Large",
            value: "L",
            isChecked: false,
        },
        {
            id: 4,
            name: "Extra Large",
            value: "XL",
            isChecked: false,
        },
        {
            id: 5,
            name: "Double Extra Large",
            value: "XXL",
            isChecked: false,
        },
    ]);
    const [allFiltersArray, setAllFiltersArray] = useState<allFilterListType>({
        mainFilter: [],
        brandFitler: [],
        categoryFilter: [],
        sizeFilter: [],
        priceFilters: [100, 500],
    });

    const router = useRouter();
    const [filterCategoryData, setFilterCategoryData] = useState<
        categoryProductListType[]
    >([]);
    const [filterDataByRoute, setFilterDataByRoute] = useState<
        categoryProductListType[]
    >([]);
    const [page, setPage] = useState<number>(1);
    const PER_PAGE = 9;
    const count = Math.ceil(filterCategoryData.length / PER_PAGE);
    const indexOfLastRecord = page * PER_PAGE;
    const indexOfFirstRecord = indexOfLastRecord - PER_PAGE;

    useEffect(() => {
        let mainCatName = router.asPath.split("/")[1];
        let identifier = router.asPath.split("/")[2];
        let categoryName = router.asPath.split("/")[3];
        const newProductList = categoryProductList.filter((product) => {
            if (
                product.filter === mainCatName &&
                product.category === categoryName &&
                identifier === "products"
            ) {
                return product;
            } else if (
                product.filter === mainCatName &&
                product?.designers === categoryName &&
                identifier === "designers" &&
                product.productPrice >= allFiltersArray.priceFilters[0] &&
                product.productPrice <= allFiltersArray.priceFilters[1]
            ) {
                return product;
            } else return 0;
        });
        if (newProductList.length > 0) setFilterDataByRoute(newProductList);
        else setFilterCategoryData([]);
    }, [router.asPath]);

    const handleChangeFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const { name, value, checked } = e.target;

        if (name === "brand") {
            let changedList = brandfilterList.map((s) => {
                if (s.value.toLowerCase() === value)
                    return { ...s, isChecked: checked };
                return s;
            });
            setBrandfilterList(changedList);
        }
        if (name === "size") {
            let changedList = sizefilterList.map((s) => {
                if (s.value === value) return { ...s, isChecked: checked };
                return s;
            });
            setSizefilterList(changedList);
        }
        if (name === "brand" && checked) {
            let newArray = {
                ...allFiltersArray,
                brandFitler: [...allFiltersArray.brandFitler, value],
            };
            setAllFiltersArray(newArray);
        } else if (name === "brand" && !checked) {
            let newArray = {
                ...allFiltersArray,
                brandFitler: allFiltersArray.brandFitler.filter(
                    (v) => v !== value
                ),
            };
            setAllFiltersArray(newArray);
        }
        if (name === "size" && checked) {
            let newArray = {
                ...allFiltersArray,
                sizeFilter: [...allFiltersArray.sizeFilter, value],
            };
            setAllFiltersArray(newArray);
        } else if (name === "size" && !checked) {
            let newArray = {
                ...allFiltersArray,
                sizeFilter: allFiltersArray.sizeFilter.filter(
                    (v) => v !== value
                ),
            };
            setAllFiltersArray(newArray);
        }
        if (name === "price") {
            let newArray = {
                ...allFiltersArray,
                priceFilters: value,
            };
            setAllFiltersArray(newArray);
        }
    };

    useEffect(() => {
        let arrayObj = filterDataByRoute.filter((product) => {
            if (
                product.productPrice >= allFiltersArray.priceFilters[0] &&
                product.productPrice <= allFiltersArray.priceFilters[1]
            )
                return product;
        });
        setFilterCategoryData(arrayObj);
    }, [filterDataByRoute]);

    const handleProductClick = (productDetail: categoryProductListType) => {
        setIsOpen(!isOpen);
        let curPath = router.asPath;
        router.push({
            pathname: `${curPath}/${productDetail.productName.toLowerCase()}`,
            query: { productDetails: JSON.stringify(productDetail) },
        });
    };

    const [isBrandExtend, setIsBrandExtend] = useState<boolean>(false);
    const [isCategorydExtend, setIsCategoryExtend] = useState<boolean>(false);

    const handlerExtendFilters = (type: string) => {
        if (type === "brand") setIsBrandExtend(!isBrandExtend);
        else if (type === "category") setIsCategoryExtend(!isCategorydExtend);
    };
    useEffect(() => {
        const newProductList = filterDataByRoute.filter((product) => {
            if (
                allFiltersArray.mainFilter.includes(
                    product.filter.toLowerCase()
                ) ||
                allFiltersArray.brandFitler.includes(
                    product.brand.toLowerCase()
                ) ||
                allFiltersArray.categoryFilter.includes(
                    product.category.toLowerCase()
                ) ||
                allFiltersArray.sizeFilter.includes(product.size) ||
                (product.productPrice >= allFiltersArray.priceFilters[0] &&
                    product.productPrice <= allFiltersArray.priceFilters[1])
            ) {
                return product;
            }
        });
        setFilterCategoryData(newProductList);
    }, [allFiltersArray]);

    useEffect(() => {
        setPage(1);
    }, [filterCategoryData]);
    const handleChangePagination = () => {
        if (page !== count) setPage(page + 1);
        if (page !== 1) setPage(page - 1);
    };
    return (
        <ProtectedRoute>
            <Box
                sx={{
                    marginTop: { xs: "0", md: "150px" },
                }}
            >
                <Navbar />
                <Box
                    sx={{
                        padding: {
                            xl: "0 290px",
                            md: "0 140px",
                            sm: "0 40px",
                            xs: "0 30px",
                        },
                        display: "flex",
                        gap: "60px",
                    }}
                >
                    {isOpen ? (
                        <Box
                            sx={{
                                width: { xs: "40%", sm: "30%" },
                                display: "flex",
                                flexDirection: "column",
                                gap: "40px",
                                position: "absolute",
                                top: "9%",
                                left: 0,
                                zIndex: 1,
                                backgroundColor: "white",
                                padding: "0 30px",
                            }}
                        >
                            <Box
                                sx={{
                                    marginTop: "50px",
                                    display: "flex",
                                    justifyContent: "space-between",
                                }}
                            >
                                <Typography
                                    sx={{
                                        fontFamily: "Jost",
                                        fontWeight: "600",
                                        fontSize: "16px",
                                        letterSpacing: "0.02em",
                                        textTransform: "uppercase",
                                        color: "#1F2937",
                                        marginBottom: "10px",
                                    }}
                                >
                                    Filter
                                </Typography>
                                <Image
                                    src={"/images/closeicon.png"}
                                    alt="closeicon"
                                    height={20}
                                    width={20}
                                    onClick={() => setIsOpen(!isOpen)}
                                />
                            </Box>
                            <Box>
                                <Typography
                                    sx={{
                                        fontFamily: "Jost",
                                        fontWeight: "600",
                                        fontSize: "16px",
                                        letterSpacing: "0.02em",
                                        textTransform: "uppercase",
                                        color: "#1F2937",
                                        marginBottom: "10px",
                                    }}
                                >
                                    PRICES
                                </Typography>
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                    }}
                                >
                                    <Typography
                                        id="range-slider"
                                        gutterBottom
                                        sx={{
                                            fontFamily: "Jost",
                                            fontWeight: "400",
                                            fontSize: "20px",
                                            letterSpacing: "0.02em",
                                            color: "#4B5563",
                                        }}
                                    >
                                        Range
                                    </Typography>
                                    <Typography
                                        id="range-slider"
                                        gutterBottom
                                        sx={{
                                            fontFamily: "Jost",
                                            fontWeight: "500",
                                            fontSize: "20px",
                                            letterSpacing: "0.02em",
                                            color: "#1F2937",
                                        }}
                                    >
                                        ${allFiltersArray.priceFilters[0]}-$
                                        {allFiltersArray.priceFilters[1]}
                                    </Typography>
                                </Box>
                                <Slider
                                    sx={{
                                        color: "#EB5757",
                                    }}
                                    value={allFiltersArray.priceFilters}
                                    onChange={(e) => handleChangeFilter(e)}
                                    valueLabelDisplay="auto"
                                    aria-labelledby="range-slider"
                                    max={2000}
                                    min={1}
                                    name="price"
                                    disableSwap
                                    getAriaLabel={() => "Minimum distance"}
                                />
                            </Box>
                            <Box>
                                <Typography
                                    sx={{
                                        fontFamily: "Jost",
                                        fontWeight: "600",
                                        fontSize: "16px",
                                        letterSpacing: "0.02em",
                                        textTransform: "uppercase",
                                        color: "#1F2937",
                                        marginBottom: "10px",
                                    }}
                                >
                                    BRANDS
                                </Typography>
                                {brandfilterList.map((filter, index) => {
                                    if (
                                        (isBrandExtend &&
                                            index < brandfilterList.length) ||
                                        (!isBrandExtend && index < 10)
                                    ) {
                                        return (
                                            <FormGroup
                                                key={filter.id}
                                                sx={{
                                                    fontFamily: "Jost",
                                                    fontWeight: "400",
                                                    fontSize: "20px",
                                                    letterSpacing: "0.02em",
                                                    color: "#1F2937",
                                                }}
                                            >
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox
                                                            checked={
                                                                filter.isChecked
                                                            }
                                                            value={filter.value.toLowerCase()}
                                                            name="brand"
                                                            onChange={(e) =>
                                                                handleChangeFilter(
                                                                    e
                                                                )
                                                            }
                                                        />
                                                    }
                                                    label={filter.value}
                                                />
                                            </FormGroup>
                                        );
                                    }
                                })}
                                {brandfilterList.length > 10 ? (
                                    !isBrandExtend ? (
                                        <Button
                                            onClick={() =>
                                                handlerExtendFilters("brand")
                                            }
                                        >
                                            +{brandfilterList.length - 10} more
                                        </Button>
                                    ) : (
                                        <Button
                                            onClick={() =>
                                                handlerExtendFilters("brand")
                                            }
                                            sx={{ textTransform: "capitalize" }}
                                        >
                                            See Less
                                        </Button>
                                    )
                                ) : (
                                    <></>
                                )}
                            </Box>
                            <Box>
                                <Typography
                                    sx={{
                                        fontFamily: "Jost",
                                        fontWeight: "600",
                                        fontSize: "16px",
                                        letterSpacing: "0.02em",
                                        textTransform: "uppercase",
                                        color: "#1F2937",
                                        marginBottom: "10px",
                                    }}
                                >
                                    SIZE
                                </Typography>
                                {sizefilterList.map((filter, index) => {
                                    return (
                                        <FormGroup
                                            key={index}
                                            sx={{
                                                fontFamily: "Jost",
                                                fontWeight: "400",
                                                fontSize: "20px",
                                                letterSpacing: "0.02em",
                                                color: "#1F2937",
                                            }}
                                        >
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        checked={
                                                            filter.isChecked
                                                        }
                                                        value={filter.value}
                                                        name="size"
                                                        onChange={(e) =>
                                                            handleChangeFilter(
                                                                e
                                                            )
                                                        }
                                                    />
                                                }
                                                label={filter.name}
                                            />
                                        </FormGroup>
                                    );
                                })}
                            </Box>
                        </Box>
                    ) : (
                        <></>
                    )}
                    <Box
                        sx={{
                            width: "30%",
                            display: { md: "flex", xs: "none" },
                            flexDirection: "column",
                            gap: "40px",
                        }}
                    >
                        <Box sx={{ marginTop: "70px" }}>
                            <Typography
                                sx={{
                                    fontFamily: "Jost",
                                    fontWeight: "600",
                                    fontSize: "16px",
                                    letterSpacing: "0.02em",
                                    textTransform: "uppercase",
                                    color: "#1F2937",
                                    marginBottom: "10px",
                                }}
                            >
                                Filter
                            </Typography>
                        </Box>
                        <Box>
                            <Typography
                                sx={{
                                    fontFamily: "Jost",
                                    fontWeight: "600",
                                    fontSize: "16px",
                                    letterSpacing: "0.02em",
                                    textTransform: "uppercase",
                                    color: "#1F2937",
                                    marginBottom: "10px",
                                }}
                            >
                                PRICES
                            </Typography>
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                }}
                            >
                                <Typography
                                    id="range-slider"
                                    gutterBottom
                                    sx={{
                                        fontFamily: "Jost",
                                        fontWeight: "400",
                                        fontSize: "20px",
                                        letterSpacing: "0.02em",
                                        color: "#4B5563",
                                    }}
                                >
                                    Range
                                </Typography>
                                <Typography
                                    id="range-slider"
                                    gutterBottom
                                    sx={{
                                        fontFamily: "Jost",
                                        fontWeight: "500",
                                        fontSize: "20px",
                                        letterSpacing: "0.02em",
                                        color: "#1F2937",
                                    }}
                                >
                                    ${allFiltersArray.priceFilters[0]}-$
                                    {allFiltersArray.priceFilters[1]}
                                </Typography>
                            </Box>
                            <Slider
                                sx={{
                                    color: "#EB5757",
                                }}
                                value={allFiltersArray.priceFilters}
                                onChange={(e) => handleChangeFilter(e)}
                                valueLabelDisplay="auto"
                                aria-labelledby="range-slider"
                                max={2000}
                                min={1}
                                name="price"
                                disableSwap
                                getAriaLabel={() => "Minimum distance"}
                            />
                        </Box>
                        <Box>
                            <Typography
                                sx={{
                                    fontFamily: "Jost",
                                    fontWeight: "600",
                                    fontSize: "16px",
                                    letterSpacing: "0.02em",
                                    textTransform: "uppercase",
                                    color: "#1F2937",
                                    marginBottom: "10px",
                                }}
                            >
                                BRANDS
                            </Typography>
                            {brandfilterList.map((filter, index) => {
                                if (
                                    (isBrandExtend &&
                                        index < brandfilterList.length) ||
                                    (!isBrandExtend && index < 10)
                                ) {
                                    return (
                                        <FormGroup
                                            key={filter.id}
                                            sx={{
                                                fontFamily: "Jost",
                                                fontWeight: "400",
                                                fontSize: "20px",
                                                letterSpacing: "0.02em",
                                                color: "#1F2937",
                                            }}
                                        >
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        checked={
                                                            filter.isChecked
                                                        }
                                                        value={filter.value.toLowerCase()}
                                                        name="brand"
                                                        onChange={(e) =>
                                                            handleChangeFilter(
                                                                e
                                                            )
                                                        }
                                                    />
                                                }
                                                label={filter.value}
                                            />
                                        </FormGroup>
                                    );
                                }
                            })}
                            {brandfilterList.length > 10 ? (
                                !isBrandExtend ? (
                                    <Button
                                        onClick={() =>
                                            handlerExtendFilters("brand")
                                        }
                                    >
                                        +{brandfilterList.length - 10} more
                                    </Button>
                                ) : (
                                    <Button
                                        onClick={() =>
                                            handlerExtendFilters("brand")
                                        }
                                        sx={{ textTransform: "capitalize" }}
                                    >
                                        See Less
                                    </Button>
                                )
                            ) : (
                                <></>
                            )}
                        </Box>
                        <Box>
                            <Typography
                                sx={{
                                    fontFamily: "Jost",
                                    fontWeight: "600",
                                    fontSize: "16px",
                                    letterSpacing: "0.02em",
                                    textTransform: "uppercase",
                                    color: "#1F2937",
                                    marginBottom: "10px",
                                }}
                            >
                                SIZE
                            </Typography>
                            {sizefilterList.map((filter, index) => {
                                return (
                                    <FormGroup
                                        key={index}
                                        sx={{
                                            fontFamily: "Jost",
                                            fontWeight: "400",
                                            fontSize: "20px",
                                            letterSpacing: "0.02em",
                                            color: "#1F2937",
                                        }}
                                    >
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    key={index}
                                                    checked={filter.isChecked}
                                                    value={filter.value}
                                                    name="size"
                                                    onChange={(e) =>
                                                        handleChangeFilter(e)
                                                    }
                                                />
                                            }
                                            label={filter.name}
                                        />
                                    </FormGroup>
                                );
                            })}
                        </Box>
                    </Box>
                    <Box
                        sx={{
                            width: "10%",
                            display: {
                                xs: "flex",
                                md: "none",
                            },
                            flexDirection: "column",
                            gap: "40px",
                            marginTop: "20px",
                            position: "relative",
                        }}
                    >
                        <Image
                            src={"/images/arrowicon.png"}
                            alt="menuicon"
                            height={25}
                            width={25}
                            onClick={() => setIsOpen(!isOpen)}
                        />
                    </Box>
                    <Box
                        sx={{
                            width: "70%",
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "flex-start",
                                marginBottom: "15px",
                            }}
                        >
                            <Typography
                                sx={{
                                    fontFamily: "Jost",
                                    fontWeight: "700",
                                    fontSize: {
                                        lg: "50px",
                                        md: "32px",
                                        xs: "25px",
                                    },
                                    textAlign: "center",
                                    color: "#212121",
                                }}
                            >
                                Women Party Dresses
                            </Typography>
                            <Typography
                                sx={{
                                    fontFamily: "Jost",
                                    fontWeight: "400",
                                    fontSize: "20px",
                                    letterSpacing: "0.02em",
                                    color: "#4B5563",
                                }}
                            >
                                {filterCategoryData.length}&nbsp;results
                            </Typography>
                        </Box>
                        <Box
                            sx={{
                                width: "100%",
                                objectFit: "contain",
                            }}
                        >
                            <Grid container columnSpacing={2}>
                                {filterCategoryData.length > 0 ? (
                                    filterCategoryData
                                        .slice(
                                            indexOfFirstRecord,
                                            indexOfLastRecord
                                        )
                                        .map((product) => {
                                            return (
                                                <Grid
                                                    item
                                                    key={product.id}
                                                    sm={6}
                                                    lg={4}
                                                    sx={{
                                                        position: "relative",
                                                    }}
                                                >
                                                    <Box
                                                        sx={{
                                                            display: "flex",
                                                            justifyContent:
                                                                "center",
                                                            alignItems:
                                                                "center",
                                                        }}
                                                    >
                                                        <Image
                                                            src={
                                                                product.imageSource
                                                            }
                                                            alt="imageGirl"
                                                            height={0}
                                                            width={0}
                                                            sizes="(max-width:0) 100vw"
                                                            style={{
                                                                height: "100%",
                                                                width: "100%",
                                                            }}
                                                            onClick={(e) =>
                                                                handleProductClick(
                                                                    product
                                                                )
                                                            }
                                                        />
                                                        {/* <img
                                                            src={
                                                                product.imageSource
                                                            }
                                                            alt="productimg"
                                                            width="100%"
                                                            onClick={(e) =>
                                                                handleProductClick(
                                                                    product
                                                                )
                                                            }
                                                        /> */}
                                                    </Box>
                                                    {product.isNewArrival && (
                                                        <Box
                                                            sx={{
                                                                backgroundColor:
                                                                    "#111827",
                                                                width: "fit-content",
                                                                padding:
                                                                    "2px 10px",
                                                                position:
                                                                    "absolute",
                                                                top: "0%",
                                                            }}
                                                        >
                                                            <Typography
                                                                sx={{
                                                                    fontFamily:
                                                                        "Jost",
                                                                    fontWeight:
                                                                        "400",
                                                                    fontSize:
                                                                        "12px",
                                                                    color: "#FFFFFF",
                                                                }}
                                                            >
                                                                New Arrivals
                                                            </Typography>
                                                        </Box>
                                                    )}
                                                    <Box
                                                        sx={{
                                                            background:
                                                                "rgba(0, 0, 0, 0.3)",
                                                            width: "fit-content",
                                                            padding: "5px 8px",
                                                            position:
                                                                "absolute",
                                                            paddingTop: "10px",
                                                            top: "3%",
                                                            right: 0,
                                                        }}
                                                    >
                                                        <Image
                                                            src={
                                                                "/images/whitelike.png"
                                                            }
                                                            alt="productimg"
                                                            width={25}
                                                            height={22}
                                                        />
                                                    </Box>

                                                    <Box
                                                        sx={{
                                                            padding: "10px",
                                                            display: "flex",
                                                            justifyContent:
                                                                "space-between",
                                                        }}
                                                    >
                                                        <Box
                                                            sx={{
                                                                display: "flex",
                                                                justifyContent:
                                                                    "space-between",
                                                                alignItems:
                                                                    "flex-end",
                                                            }}
                                                        >
                                                            <Typography
                                                                sx={{
                                                                    width: "80%",
                                                                    fontFamily:
                                                                        "Inter",
                                                                    fontWeight:
                                                                        "400",
                                                                    fontSize:
                                                                        "18px",
                                                                    color: "#000000",
                                                                }}
                                                            >
                                                                {
                                                                    product.productName
                                                                }
                                                            </Typography>
                                                        </Box>
                                                        <Image
                                                            src={
                                                                "/images/womenproductcart.png"
                                                            }
                                                            alt="productimg"
                                                            height={22}
                                                            width={32}
                                                        />
                                                    </Box>
                                                    <Typography
                                                        sx={{
                                                            width: "80%",
                                                            fontFamily: "Inter",
                                                            fontWeight: "400",
                                                            fontSize: "20px",
                                                            color: "#1B2437",
                                                            alignItems:
                                                                "flex-start",
                                                        }}
                                                    >
                                                        $ {product.productPrice}
                                                    </Typography>
                                                    {/* </Box> */}
                                                </Grid>
                                            );
                                        })
                                ) : (
                                    <Image
                                        src="/images/data-not-found.jpg"
                                        alt="data not found"
                                        height={300}
                                        width={300}
                                    />
                                )}
                            </Grid>
                            {filterCategoryData.length > 0 ? (
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "flex-end",
                                        marginTop: "70px",
                                        marginBottom: "70px",
                                        "& .MuiButtonBase-root": {
                                            backgroundColor: "#D1D5DB",
                                        },
                                        "& .MuiPagination-ul> li:first-child > button":
                                            {
                                                backgroundColor: "#D1D5DB",
                                            },
                                        "& .MuiPagination-ul>li:last-child > button":
                                            {
                                                backgroundColor: "#1F2937",
                                                color: "white",
                                            },
                                    }}
                                >
                                    <Pagination
                                        count={count}
                                        variant="outlined"
                                        shape="rounded"
                                        page={page}
                                        onChange={handleChangePagination}
                                    />
                                </Box>
                            ) : (
                                <></>
                            )}
                        </Box>
                    </Box>
                </Box>
            </Box>
        </ProtectedRoute>
    );
};
export default CategroyDetails;
