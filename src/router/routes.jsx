import { HomePage, PageOne, PageTwo, DeviceInformationPage } from '../pages';
import Home from '@mui/icons-material/Home';
import LooksOne from '@mui/icons-material/LooksOne';
import LooksTwo from '@mui/icons-material/LooksTwo';
import InfoIcon from '@mui/icons-material/Info';


export const PAGES =  [
    {
        title: 'Home Page',
        route: '',
        component: HomePage,
        icon: Home,
    },
    {
        title: 'Page One',
        route: 'page-one',
        component: PageOne,
        icon: LooksOne,
    },
    {
        title: 'Page Two',
        route: 'page-two',
        component: PageTwo,
        icon: LooksTwo,
    },
    {
        title: 'Device Information',
        route: 'device-information',
        component: DeviceInformationPage,
        icon: InfoIcon,
    }
];
