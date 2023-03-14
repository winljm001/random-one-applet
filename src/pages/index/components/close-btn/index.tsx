import { Component } from "react";
import { View } from "@tarojs/components";
import "./index.less";

type propsType = {
  onClick?: () => void;
};
interface CloseBtn {
  props: propsType;
}
class CloseBtn extends Component {
  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    return (
      <View className="close-btn" onClick={this.props?.onClick}>
        <View className="span" />
        <View className="span" />
      </View>
    );
  }
}

export default CloseBtn;
