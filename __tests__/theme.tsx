import renderer, { ReactTestRenderer } from "react-test-renderer";
import { ThemeProvider } from "../contexts/ThemeContext";
import Box from "../theme/Box";

test("Mock theme and theme provider", async () => {
  let wrapper: ReactTestRenderer;

  await renderer.act(() => {
    wrapper = renderer.create(
      <ThemeProvider>
        <Box></Box>
      </ThemeProvider>
    );
    expect(wrapper.toJSON()).toMatchSnapshot();
  });
});
