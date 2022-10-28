import React, { useState, useCallback } from 'react';
import { useMediaQuery, useTheme } from '@mui/material';
import { useNavigate, useLocation } from 'react-router';
import { useDrawer } from '../contexts/drawerContextProvider';
import Menu from '@mui/icons-material/Menu';
import { Drawer, DrawerBody, DrawerHeader, DrawerNavGroup } from '@brightlayer-ui/react-components';
import { PAGES } from './routes';

export const NavigationDrawer = () => {
    const { drawerOpen, setDrawerOpen } = useDrawer();
    const theme = useTheme();
    const navigate = useNavigate();
    const location = useLocation();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const [selected, setSelected] = useState(location.pathname);

    const handleNavigate = useCallback(
        (id) => {
            navigate(id);
            setSelected(id);
        },
        [navigate, setSelected]
    );

    return (
        <Drawer
            open={drawerOpen}
            ModalProps={{
                onBackdropClick: () => {
                    setDrawerOpen(false);
                },
            }}
            variant={isMobile ? 'temporary' : 'persistent'}
            activeItem={selected}
        >
            <DrawerHeader
                title={'PXMC'}
                subtitle={'3000'}
                icon={<Menu />}
                onIconClick={() => {
                    setDrawerOpen(!drawerOpen);
                }}
            />
            <DrawerBody>
                <DrawerNavGroup
                    items={PAGES.map((page) => {
                        const Icon = page.icon;
                        return {
                            title: page.title,
                            itemID: page.route || '',
                            icon: <Icon />,
                            onClick:
                                page.route !== undefined
                                    ? () => {
                                          handleNavigate(page.route);
                                          if (isMobile) setDrawerOpen(false);
                                      }
                                    : undefined,
                        };
                    })}
                    hidePadding
                />
            </DrawerBody>
        </Drawer>
    );
};
