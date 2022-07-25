import { useNavigation } from "@react-navigation/native";
import { Fragment, useEffect, useRef } from "react";
import {
  ScrollView,
  TextInput,
  TouchableNativeFeedback,
} from "react-native-gesture-handler";
import { useSelector } from "react-redux";
import { Quote } from "../api/quotes";
import AppHeader from "../components/AppHeader";
import Loading from "../components/empty-states/Loading";
import ResultNotFound from "../components/empty-states/ResultNotFound";
import { SharedNavigationProps } from "../router";
import { selectSearchResults } from "../store/selectors/search";
import Box from "../theme/Box";
import Card from "../theme/Card";
import { colors, palette } from "../theme/palette";
import Text from "../theme/Text";

const Search = () => {
  const { loading, results, notFound, hasResults, retry, query } =
    useSelector(selectSearchResults);
  const { navigate } = useNavigation<SharedNavigationProps<"Search">>();

  const searchInputRef = useRef<TextInput>(null);

  const launchQuote = (quote: Quote) => {
    navigate("Quote", {
      id: quote.id,
      query,
    });
  };

  useEffect(() => {
    if (!query?.trim().length) searchInputRef.current?.focus();
  }, [searchInputRef]);

  return (
    <Fragment>
      <AppHeader
        title="Explore"
        gradientProps={{
          style: { flex: 1 },
          ...(hasResults
            ? {
                colors: [colors["paper"], colors["paper"]],
              }
            : {}),
        }}
        safeAreaStyle={{
          backgroundColor: hasResults ? colors["primary.main"] : "transparent",
        }}
        searchInputRef={searchInputRef}
      >
        <Loading
          loading={loading}
          styles={{ zIndex: -1, backgroundColor: "transparent" }}
        />
        {notFound && (
          <Box marginTop={"xl"} flex={1} zIndex={1}>
            <ResultNotFound
              onRetry={() => {
                retry();
              }}
            />
          </Box>
        )}

        <ScrollView
          style={{
            flex: 1,
            backgroundColor: hasResults ? colors.paper : "transparent",
          }}
        >
          {hasResults && (
            <Box
              backgroundColor={"paper"}
              paddingHorizontal="m"
              overflow="hidden"
            >
              <Box paddingVertical="m">
                {results.map((result) => {
                  return (
                    <TouchableNativeFeedback
                      key={result.id}
                      onPress={() => {
                        launchQuote(result);
                      }}
                    >
                      <Card
                        variant="rounded"
                        paddingVertical={"m"}
                        marginBottom="m"
                        style={{
                          backgroundColor: palette.grey["500_8"],
                        }}
                      >
                        <Text
                          variant={"body2"}
                          numberOfLines={3}
                          color="grey.800"
                        >
                          {result.value}
                        </Text>
                      </Card>
                    </TouchableNativeFeedback>
                  );
                })}
              </Box>
            </Box>
          )}
        </ScrollView>
      </AppHeader>
    </Fragment>
  );
};

export default Search;
