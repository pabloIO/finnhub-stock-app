import { ScrollView, Button, Text } from 'tamagui'
import AlertForm from '@components/ui/AlertForm';
import AlertList from '@components/ui/AlertList';

function AlertsScreen (){

    return (
        <ScrollView 
            padding='$2'
            width="100%"
            backgroundColor="$background">
            <AlertForm />
            <AlertList />
        </ScrollView>
    );
}

export default AlertsScreen;