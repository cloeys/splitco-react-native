import { StackNavigator } from 'react-navigation';
import GroupPage from '../pages/GroupPage';
import GroupDetailPage from '../pages/GroupDetailPage';
import CostDetailPage from '../pages/CostDetailPage';
import AddGroupPage from '../pages/AddGroupPage';
import AddCostPage from '../pages/AddCostPage';
import SettlePage from '../pages/SettlePage';
import RegisterPage from '../pages/RegisterPage';
import GroupInformationPage from '../pages/GroupInformationPage';

const Navigation = StackNavigator({
    Home: {
        screen: GroupPage
    },
    GroupDetail: {
        screen: GroupDetailPage
    },
    CostDetail: {
        screen: CostDetailPage
    },
    AddGroup: {
        screen: AddGroupPage
    },
    AddCost: {
        screen: AddCostPage
    },
    Settle: {
        screen: SettlePage
    },
    Register: {
        screen: RegisterPage
    },
    GroupInfo: {
        screen: GroupInformationPage
    }
});

export default Navigation;