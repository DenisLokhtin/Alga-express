import React from 'react';
import Box from "@mui/material/Box";

const TabPanelComponent = (props) => {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ py: 1 , height: "100%"}}>
                    {children}
                </Box>
            )}
        </div>
    );
};

export default TabPanelComponent;