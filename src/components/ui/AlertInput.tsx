import { Input } from 'tamagui';
import type { Dispatch, SetStateAction } from 'react';

type AlertInputProps = {
    price: string;
    setPrice: Dispatch<SetStateAction<string>>;
}

function AlertInput({price, setPrice}: AlertInputProps) {
    return (
        <Input 
            flex={1} 
            minWidth={200}
            size={'$5'} 
            placeholder={'Target price'} 
            value={price}
            onChangeText={(newText) => setPrice(newText)}
            keyboardType='numeric'
        />
    )
}

export default AlertInput;