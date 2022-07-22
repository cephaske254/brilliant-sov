import { SafeAreaView } from "react-native";
import SearchInput from "../components/SearchInput";
import Box from "../components/theme/Box";

const Search = () => {
  return (
    <SafeAreaView>
      <Box>
        <SearchInput />
      </Box>
    </SafeAreaView>
  );
};

export default Search;
