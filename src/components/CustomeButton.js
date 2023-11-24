import React from "react";
// import { styled } from "@mui/material/styles";
import { Button } from "@mui/material";

function CustomeButton(props) {
    return (
        <Button
            variant="contained"
            // color="primary"
            {...props}
            style={{
                // boxShadow:
                //   "4px 2px 8px 0px rgba(95, 157, 231, 0.48) inset, -4px -2px 8px 0px #FFF inset",
                // background: "#c4c0f5",
                // borderRadius: "50px",
                // // width: "100%",
                // color: "black",
                // padding: " 7px 21px",
                width: "230px",
                borderRadius: "20px",
                border: " 2px solid rgba(255, 255, 255, 0.20)",
                background: "#7352ff !important",
                // boxShadow:
                //   "4px 2px 8px 0px rgba(95, 157, 231, 0.48) inset, -4px -2px 8px 0px #FFF inset",
            }}
        >
            {props.children}
        </Button>
    );
}

export default CustomeButton;
