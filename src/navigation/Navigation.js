import { StackNavigator } from 'react-navigation';
import GroupPage from '../pages/GroupPage';
import GroupDetailPage from '../pages/GroupDetailPage';
import CostDetailPage from '../pages/CostDetailPage';

const Navigation = StackNavigator({
    Home: {
        screen: GroupPage
    },
    GroupDetail: {
        screen: GroupDetailPage
    },
    CostDetail: {
        screen: CostDetailPage
    }
});
export default Navigation;