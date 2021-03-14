import React from "react";
import PropTypes from "prop-types";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Logo from "../static/images/emc.png";

const PrivateNavHeader = ({ collapsed }) => (
    <>
        <div style={{ padding: collapsed ? 8 : 16, transition: "0.3s" }}>
            <img src={Logo} alt="Logo" style={{width:200,height:200}} />
        </div>
        <Divider />
    </>
);

PrivateNavHeader.propTypes = {
    collapsed: PropTypes.bool
};
PrivateNavHeader.defaultProps = {
    collapsed: false
};

export default PrivateNavHeader;
