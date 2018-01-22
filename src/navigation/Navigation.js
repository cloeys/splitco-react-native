import { StackNavigator } from 'react-navigation';
import GroupPage from '../pages/GroupPage';
import GroupDetailPage from '../pages/GroupDetailPage';
import CostDetailPage from '../pages/CostDetailPage';
import AddGroupPage from '../pages/AddGroupPage';
import AddCostPage from '../pages/AddCostPage';

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
    }
});

export default Navigation;