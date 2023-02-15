import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import theme from "../../theme";
import Image from "next/image";
import { checkoutImagesList } from "../../data/checkoutImageList";
export const CheckoutNewArrivals = () => {
    return (
        <Box
            sx={{
                padding: {
                    xs: "0px 30px",
                    sm: "50px 65px",
                    md: "50px 200px",
                    lg: "50px 250px",
                },
            }}
        >
            <Typography
                sx={{
                    marginBottom: { xs: "40px", md: "30px", lg: "50px" },
                    fontFamily: theme.typography.titleHeading.fontFamily,
                    fontWeight: "700",
                    fontSize: {
                        xl: "42px",
                        md: "39px",
                        sm: "28px",
                        xs: "22px",
                    },
                    color: "#212121",
                    marginTop: { xs: "40px", sm: "0px" },
                    textAlign: "center",
                }}
            >
                Checkout New Arrivals
            </Typography>
            <Grid container columnSpacing={1}>
                {checkoutImagesList.map((product) => {
                    return (
                        <Grid
                            key={product.id}
                            item
                            sm={3}
                            xs={6}
                            sx={{ width: "100%", height: "100%" }}
                        >
                            <Image
                                src={product.productImage}
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
                        </Grid>
                    );
                })}
            </Grid>
        </Box>
    );
};
