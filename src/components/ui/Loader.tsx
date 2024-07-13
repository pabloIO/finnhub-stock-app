import { Spinner, YStack } from 'tamagui';
function Loader() {

  return (
    <YStack background="$white" padding="$3" alignItems="center">
      <Spinner size="large" color="$orange10" />
    </YStack>
  );
}

export default Loader;