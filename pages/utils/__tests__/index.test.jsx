import { shallow } from "enzyme";
import { useLogin } from "../../index.page";

describe("useHome", () => {
  it("renders", () => {
    const Login = useLogin;

    const wrapper = shallow(<Login />);
    expect(wrapper.isEmptyRender()).toBeFalsy();
  });
});
