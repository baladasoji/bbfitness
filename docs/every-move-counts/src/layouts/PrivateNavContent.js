import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import DashboardIcon from '@material-ui/icons/Dashboard';
import SettingsIcon from '@material-ui/icons/Settings';

const menus = [
    {
        label: 'Home',
        icon: <DashboardIcon />,
        url: '/home',
    },
    {
        label: 'Members',
        icon: <DashboardIcon />,
        url: '/members',
    },
    {
        label: 'Annual Dashboard',
        icon: <DashboardIcon />,
        url: '/yearly',
    },
    {
        label: 'Weekly Dashboard',
        icon: <DashboardIcon />,
        url: '/weekly',
    },
    {
        label: 'Spring Challenge',
        icon: <DashboardIcon />,
        url: '/spring',
    },
    {
        label: 'Settings',
        icon: <SettingsIcon />,
        url: '/settings',
    },
];

const PrivateNavContent = () => {
    const { path } = useRouteMatch();

    const ListItemLink = props => {
        const { icon, primary, to } = props;

        const renderLink = React.useMemo(
            () =>
                React.forwardRef((linkProps, ref) => (
                    <Link ref={ref} to={to} {...linkProps} />
                )),
            [to],
        );

        return (
            <ListItem
                button
                component={renderLink}
                selected={path.includes(to)}>
                {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
                <ListItemText primary={primary} />
            </ListItem>
        );
    };

    return (
        <>
            <List>
                {menus.map(({ label, icon, url }, index) => (
                    <li key={index}>
                        <ListItemLink to={url} primary={label} icon={icon} />
                    </li>
                ))}
            </List>
        </>
    );
};

export default PrivateNavContent;
