import { useState } from 'react';
import { Label, Form, XStack, Button, H3, Paragraph } from 'tamagui';
import AlertSelector from './AlertSelector';
import AlertInput from './AlertInput';
import { useAppContext } from 'src/context/app-context';

function AlertForm(){
    const [trade, setTrade] = useState<string>('APPL');
    const [price, setPrice] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const { addPriceAlert, watchlist } = useAppContext();

    function handleSubmit(){
        // check price is numeric only
        const regExpNumeric = new RegExp(/^[1-9]\d*(\.\d+)?$/);
        if (!regExpNumeric.test(price)){
            setErrorMessage('Target price only accepts numeric values');
            return;
        }
        setErrorMessage(null);
        // add new price alert to AppContext 
        addPriceAlert(trade, Number(price));
        setPrice('');
    }

    return (
        <Form
            ai='center' 
            gap='$4'
            borderWidth={1}
            borderColor='$gray10Light'
            borderRadius='$4'
            padding='$3'
            minWidth={300}
            onSubmit={handleSubmit}
        >
            <H3>Create new price alert</H3>
            <XStack paddingHorizontal='$4'>
                <Label f={1} miw={80}>
                    Stock trade
                </Label>
                <AlertSelector trade={trade} setTrade={setTrade} />
            </XStack>
            <Paragraph size='$1'>Current price: {watchlist[trade].price}</Paragraph>
            <XStack paddingHorizontal='$4'>
                <Label f={1} miw={80}>
                    Target price
                </Label>
                <AlertInput price={price} setPrice={setPrice}/>
            </XStack>
            {errorMessage &&
                <Paragraph color='$red10Light'>{errorMessage}</Paragraph>
            }
            <Form.Trigger asChild disabled={price === ''}>
                <Button
                    width='100%'>
                    Create
                </Button>
            </Form.Trigger>
        </Form>
    );
}

export default AlertForm;