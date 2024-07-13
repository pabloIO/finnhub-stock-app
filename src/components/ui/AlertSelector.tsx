import { Adapt, Select, Sheet, } from 'tamagui';
import Ionicons from '@expo/vector-icons/Ionicons';
import { symbolsToSubscribe } from '@data/watchlist';

import type { SelectProps } from 'tamagui';
import type { Dispatch, SetStateAction } from 'react';

type AlertSelectorProps = {
    trade: string;
    setTrade:  Dispatch<SetStateAction<string>>;
} & SelectProps;

function AlertSelector(props: AlertSelectorProps) {
    
    const { trade, setTrade } = props; 

    return (
      <Select value={trade} onValueChange={setTrade} disablePreventBodyScroll {...props}>
        <Select.Trigger width={220} iconAfter={<Ionicons name='chevron-down'/>}>
          <Select.Value placeholder="Down" />
        </Select.Trigger>
  
        <Adapt when="sm" platform="touch">
          <Sheet
            native={!!props.native}
            modal
            dismissOnSnapToBottom
            animationConfig={{
              type: 'spring',
              damping: 20,
              mass: 1.2,
              stiffness: 250,
            }}
          >
            <Sheet.Frame>
              <Sheet.ScrollView>
                <Adapt.Contents />
              </Sheet.ScrollView>
            </Sheet.Frame>
            <Sheet.Overlay
              animation="lazy"
              enterStyle={{ opacity: 0 }}
              exitStyle={{ opacity: 0 }}
            />
          </Sheet>
        </Adapt>
  
        <Select.Content zIndex={200000}>
          <Select.Viewport
            minWidth={200}
          >
            <Select.Group>
              <Select.Label>Stock trades</Select.Label>
              {
                symbolsToSubscribe.map((item, i) => {
                  return (
                    <Select.Item
                      index={i}
                      key={item}
                      value={item}
                    >
                      <Select.ItemText>{item}</Select.ItemText>
                      <Select.ItemIndicator marginLeft="auto">
                        <Ionicons name='checkmark-circle-outline' size={25} color='green' />
                      </Select.ItemIndicator>
                    </Select.Item>
                  )
                })
              }
            </Select.Group>
          </Select.Viewport>
        </Select.Content>
      </Select>
    )
}

export default AlertSelector;