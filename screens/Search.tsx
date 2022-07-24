import AppHeader from "../components/AppHeader";
import ResultNotFound from "../components/empty-states/ResultNotFound";
import Box from "../theme/Box";

const Search = () => {
  return (
    <Box flex={1}>
      <AppHeader
        title="Explore"
        gradientProps={{ style: { flex: 1 } }}
        safeAreaStyle={{
          borderBottomEndRadius: 0,
          borderBottomStartRadius: 0,
        }}
      >
        <ResultNotFound />
      </AppHeader>
    </Box>
  );
};

export default Search;
