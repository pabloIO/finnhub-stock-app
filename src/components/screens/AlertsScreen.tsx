import { useMemo, useState } from 'react'
import type { FontSizeTokens, SelectProps } from 'tamagui'
import { Adapt, Label, ScrollView, Select, Sheet, XStack, YStack, getFontSize } from 'tamagui'
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