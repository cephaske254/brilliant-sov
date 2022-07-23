import AppHeader from "../components/AppHeader";
import Box from "../theme/Box";
import Text from "../theme/Text";

const Home = () => {
  return (
    <Box style={{ backgroundColor: "transparent" }}>
      <AppHeader title="Categories" />
      <Box backgroundColor={"primary"}>
        <Text variant="buttonLabel">Hell</Text>
      </Box>
    </Box>
  );
};

export default Home;
