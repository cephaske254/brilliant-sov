import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  TextInput,
  TouchableNativeFeedback
} from "react-native";
import { Icon } from "react-native-eva-icons";
import { SharedElement } from "react-navigation-shared-element";
import { SharedRoutesProps } from "../router";
import Box from "./theme/Box";
import { palette } from "./theme/palette";

const SearchInput = () => {
  const { navigate, getId } = useNavigation<SharedRoutesProps<"Search">>();

  const [{ loading, value }, setState] = useState({
    loading: false,
    errored: false,
    value: "",
  });

  const handleSearch = (e: any) => {
    setState((state) => ({ ...state, loading: true, errored: false }));

    const promise = new Promise((resolve) => {
      setTimeout(resolve, 3000);
    });

    promise
      .then(() => {
        setState((state) => ({ ...state, loading: false, errored: false }));
      })
      .catch(() => {
        setState((state) => ({ ...state, loading: false, errored: true }));
      })
      .finally(() => {
        if (getId() !== "Search") navigate("Search");
      });
  };

  return (
    <SharedElement id="search-input">
      <Box
        paddingHorizontal="m"
        flexDirection="row"
        style={{
          borderWidth: StyleSheet.hairlineWidth,
          borderColor: palette.grey[50032],
          borderRadius: 25,
          alignItems: "center",
          height: 50,
          width: "100%",
        }}
      >
        <TextInput
          value={value}
          onChangeText={(value) => setState((b) => ({ ...b, value }))}
          onSubmitEditing={(e) => handleSearch(e)}
          placeholder="Search..."
          allowFontScaling
          style={{
            paddingVertical: 10,
            paddingLeft: 20,
            flexGrow: 1,
            fontSize: 16,
            letterSpacing: 0.6,
            flex: 1,
          }}
        />
        {loading ? (
          <ActivityIndicator size={35} />
        ) : (
          <TouchableNativeFeedback onPress={(e) => handleSearch(e)}>
            <Box
              style={{
                borderLeftColor: palette.grey[50032],
                borderLeftWidth: StyleSheet.hairlineWidth,
                alignItems: "center",
                justifyContent: "center",
                width: 35,
              }}
            >
              <Icon
                name="search"
                height={20}
                width={20}
                color={palette.grey[500]}
              />
            </Box>
          </TouchableNativeFeedback>
        )}
      </Box>
    </SharedElement>
  );
};

export default SearchInput;
