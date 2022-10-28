import * as Colors from '@brightlayer-ui/colors';
import { useSecurityActions } from '@brightlayer-ui/react-auth-shared';
import { ChannelValue, Spacer, UserMenu, InfoListItem, ScoreCard } from '@brightlayer-ui/react-components';
import { List } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ExitToApp from '@mui/icons-material/ExitToApp';
import { InfoOutlined, MoreVert } from '@material-ui/icons';
import CachedIcon from '@mui/icons-material/Cached';
import Lock from '@mui/icons-material/Lock';
import Menu from '@mui/icons-material/Menu';
import MiscellaneousServicesIcon from '@mui/icons-material/MiscellaneousServices';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import { AppBar, Avatar, IconButton, Toolbar, Typography, useTheme, useMediaQuery, Box } from '@mui/material';
import { LocalStorage } from '../store/local-storage';
import { useDrawer } from '../contexts/drawerContextProvider';
import { action } from '@storybook/addon-actions';

import { useGetDeviceInformation } from '../utils/dataAccess/DeviceDataAccess';

function DeviceInformation() {
    const deviceinformations = useGetDeviceInformation();

    const useStyles = makeStyles({
        title: {
            fontWeight: 400,
        },
    });
    const classes = useStyles();

    var DeviceInformation = ({ ID, HardwareModel, HardwareSerialNumber, FirmwareBootstrapVersion, FirmwareOsVersion, FirmwareApplicationVersion, SettingsName
        , SettingsDescription, SettingsCompany, SettingsRegion, SettingsSubstation, SettingsFilename, SettingsFileData, SettingsFileCRC, LastUpdateDateTime }) => (

        <ScoreCard
            style={{ width: '0 0 auto', flex: '0 0 auto' }}
            headerTitle={HardwareModel}
            headerSubtitle={"ID :" + ID}
            headerInfo={'Serial number : ' + HardwareSerialNumber}
            headerFontColor={Colors.white[50]}
            actionItems={[<MoreVert onClick={action('clicked more')} key={'morevert'} />]}
        >
            <List style={{ padding: '1.5rem 0' }}>
                <InfoListItem
                    dense
                    style={{ paddingTop: '70px' }}
                    title={<b>Information</b>}
                    icon={<InfoOutlined color={Colors.blue[500]} />}
                    classes={{ title: classes.title }}
                    subtitle={
                        <div>
                            <ChannelValue value={'Name :'} units={SettingsName ? <b>{SettingsName}</b> : "n/a"} key={"SettingsName"} />
                            <br />
                            <ChannelValue value={'Description :'} units={SettingsDescription ? <b>{SettingsDescription}</b> : "n/a"} key={"SettingsDescription"} />
                            <br />
                            <ChannelValue value={'Company :'} units={SettingsCompany ? <b>{SettingsCompany}</b> : "n/a"} key={"SettingsCompany"} />
                            <br />
                            <ChannelValue value={'Region :'} units={SettingsRegion ? <b>{SettingsRegion}</b> : "n/a"} key={"SettingsRegion"} />
                            <br />
                            <ChannelValue value={'Substation :'} units={SettingsSubstation ? <b>{SettingsSubstation}</b> : "n/a"} key={"SettingsSubstation"} />
                            <br />
                            <ChannelValue value={'Filename :'} units={SettingsFilename ? <b>{SettingsFilename}</b> : "n/a"} key={"SettingsFilename"} />
                            <br />
                            <ChannelValue value={'File data :'} units={SettingsFileData ? <b>{SettingsFileData}</b> : "n/a"} key={"SettingsFileData"} />
                            <br />
                            <ChannelValue value={'File CRC :'} units={SettingsFileCRC ? <b>{SettingsFileCRC}</b> : "n/a"} key={"SettingsFileCRC"} />
                        </div>
                    }
                />
                <InfoListItem
                    dense
                    style={{ paddingTop: '125px' }}
                    title={<b>Firmware</b>}
                    icon={<MiscellaneousServicesIcon color={Colors.blue[500]} />}
                    classes={{ title: classes.title }}
                    subtitle={
                        <div>
                            <ChannelValue value={'Bootstrap version :'} units={<b>{FirmwareBootstrapVersion}</b>} key={"FirmwareBootstrapVersion"} />
                            <br />
                            <ChannelValue value={'OS Version :'} units={<b>{FirmwareOsVersion}</b>} key={"FirmwareOsVersion"} />
                            <br />
                            <ChannelValue value={'Application version :'} units={<b>{FirmwareApplicationVersion}</b>} key={"FirmwareApplicationVersion"} />
                        </div>
                    }
                />
                <InfoListItem
                    dense
                    style={{ paddingTop: '50px' }}
                    title={'Online'}
                    icon={<PowerSettingsNewIcon color={'inherit'} />}
                    classes={{ title: classes.title }}
                />
                <InfoListItem
                    dense
                    style={{ paddingTop: '50px',paddingRight : 0}}
                    title={'Last Updated'}
                    subtitle={LastUpdateDateTime}
                    icon={<CachedIcon color={'inherit'} />}
                    classes={{ title: classes.title }}
                />
            </List>
        </ScoreCard>
    );

    if (deviceinformations) {
        return (
            <div>
                {deviceinformations.map((deviceinformation) => (
                    <DeviceInformation
                        ID={deviceinformation.ID}
                        HardwareModel={deviceinformation["Hardware.Model"]}
                        HardwareSerialNumber={deviceinformation["Hardware.SerialNumber"]}
                        FirmwareBootstrapVersion={deviceinformation["Firmware.BootstrapVersion"]}
                        FirmwareOsVersion={deviceinformation["Firmware.OsVersion"]}
                        FirmwareApplicationVersion={deviceinformation["Firmware.ApplicationVersion"]}
                        SettingsName={deviceinformation["Settings.Name"]}
                        SettingsDescription={deviceinformation["Settings.Description"]}
                        SettingsCompany={deviceinformation["Settings.Company"]}
                        SettingsRegion={deviceinformation["Settings.Region"]}
                        SettingsSubstation={deviceinformation["Settings.Substation"]}
                        SettingsFilename={deviceinformation["Settings.Filename"]}
                        SettingsFileData={deviceinformation["Settings.FileData"]}
                        SettingsFileCRC={deviceinformation["Settings.FileCRC"]}
                        LastUpdateDateTime={deviceinformation["ModificationDateTime"] ? deviceinformation["ModificationDateTime"] : deviceinformation["CreationDateTime"]}
                    />
                ))
                }
            </div>
        );
    }
}

export const DeviceInformationPage = () => {
    const theme = useTheme();
    const { setDrawerOpen } = useDrawer();
    const md = useMediaQuery(theme.breakpoints.up('md'));
    const securityHelper = useSecurityActions();

    const logOut = () => {
        LocalStorage.clearAuthCredentials();
        securityHelper.onUserNotAuthenticated();
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <AppBar position={'sticky'}>
                <Toolbar sx={{ px: 2 }}>
                    {md ? null : (
                        <IconButton
                            color={'inherit'}
                            onClick={() => {
                                setDrawerOpen(true);
                            }}
                            edge={'start'}
                            sx={{ mr: 3 }}
                            size="large"
                        >
                            <Menu />
                        </IconButton>
                    )}
                    <Typography variant={'h6'} color={'inherit'}>
                        Device Information
                    </Typography>
                    <Spacer />
                    <UserMenu
                        avatar={<Avatar>UN</Avatar>}
                        menuGroups={[
                            {
                                items: [
                                    {
                                        title: 'Change Password',
                                        icon: <Lock />,
                                        onClick: securityHelper.showChangePassword,
                                    },
                                    {
                                        title: 'Log Out',
                                        icon: <ExitToApp />,
                                        onClick: logOut,
                                    },
                                ],
                            },
                        ]}
                        MenuProps={{
                            anchorOrigin: { horizontal: 'right', vertical: 'bottom' },
                            transformOrigin: { horizontal: 'right', vertical: 'top' },
                        }}
                    />
                </Toolbar>
            </AppBar>
            <Box style={{
                position: 'absolute', left: '50%', top: '35%',
                transform: 'translate(-50%, -50%)'
            }} sx={{ flex: '3 3 0px' }}>
                <DeviceInformation />
            </Box>
        </Box>
    );
};