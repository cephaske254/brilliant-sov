import renderer from "react-test-renderer";
import App from "../App";

describe("<App/>", () => {
  it("renders correctly", async () => {
    const wrapper = renderer.create(<App />);

    wrapper.unmount();

    await expect(wrapper.toJSON()).toMatchSnapshot();
  });
});
