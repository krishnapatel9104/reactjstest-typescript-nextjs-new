import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    // components: {
    //     MuiTypography: {
    //         variants: [
    //             {
    //                 props: { variant: "titleHeading" },
    //                 style: {
    //                     fontFamily: "Jost",
    //                     fontStyle: "normal",
    //                     fontWeight: "700",
    //                     fontSize: "39px",
    //                     lineHeight: "56px",
    //                     color: "#212121",
    //                     textAlign: "center",
    //                 },
    //             },
    //         ],
    //     },
    // },
    typography: {
        titleHeading: {
            fontFamily: "Jost",
        },
        headerNavbarLink: {
            fontFamily: "Josefin Sans",
        },
        headerNavbarSubLink: {
            fontFamily: "Inter",
        },
        desc: {
            fontFamily: "Lato",
        },
    },
    palette: {
        backgroundColor: {
            default: "#F5F5F5",
        },
        primary: {
            main: "#212121",
        },
        secondary: {
            main: "#424242",
        },
        navbarSubLink: {
            color: "#8E8E93",
        },
        navbarLink: {
            color: "#1B2437",
        },
        currentPrice: {
            color: "#FF705C",
        },
        originalPrice: {
            color: "#9E9E9E",
        },
        footerSubLink: {
            color: "#616161",
        },
    },
});
export default theme;
