import { Spinner, YStack } from 'tamagui';
function Loader() {

  return (
    <YStack background="$white" padding="$3" alignItems="center">
      <Spinner size="large" color="$green10" />
    </YStack>
  );
}

export default Loader;