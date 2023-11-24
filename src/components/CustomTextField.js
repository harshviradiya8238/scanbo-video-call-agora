import React from "react";
import { styled } from "@mui/material/styles";
import { TextField } from "@mui/material";

const CustomTextField = styled(({ errorText, ...props }) => {
    return (
        <TextField
            {...props}
        // error={Boolean(errorText)}
        // helperText={errorText} 
        />
    )
})(
    ({ theme }) => ({
        "& .MuiOutlinedInput-input::-webkit-input-placeholder": {
            color: "#767e89",
            opacity: "1",

            // boxShadow:
            //   "4px 2px 8px 0px rgba(95, 157, 231, 0.48) inset, -4px -2px 8px 0px #FFF inset",
            // borderRadius: "50px",
        },
        "& .MuiOutlinedInput-notchedOutline": {
            borderColor: `${theme.palette.mode === "dark" ? "rgba(255, 255, 255, 0.12)" : "#dee3e9"
                }`,

            borderRadius: "20px",
            // border: " 2px solid rgba(255, 255, 255, 0.20)",

            // backgroundColor: "#e5edf5",
            borderRadius: "20px !important",
            // border: " 2px solid rgba(255, 255, 255, 0.20) !important",
            boxShadow:
                " 4px 2px 8px 0px rgba(95, 157, 231, 0.48) inset, -4px -2px 8px 0px #FFF inset",
        },
        "& .MuiOutlinedInput-input.Mui-disabled": {
            backgroundColor: `${theme.palette.mode === "dark" ? "rgba(0, 0, 0, 0.12) " : "#e5edf5 "
                }`,
            boxShadow:
                "4px 2px 8px 0px rgba(95, 157, 231, 0.48) inset, -4px -2px 8px 0px #FFF inset",
            borderRadius: "50px",
        },
        "& .MuiOutlinedInput-input.Mui-disabled::-webkit-input-placeholder": {
            color: "#767e89",
            opacity: "1",
        },
    })
);

export default CustomTextField;

