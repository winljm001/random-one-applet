import { Component } from "react";
import { View, Text } from "@tarojs/components";
import "./index.less";
import CloseBtn from "../close-btn";

type propsType = {
  visible: boolean;
  children: React.ReactNode;
  onClose?: () => void;
};
interface Index {
  props: propsType;
}
class Index extends Component {
  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    if (!this.props.visible) {
      return null;
    }
    return (
      <>
        <View className="mask" onClick={this.props?.onClose} />
        <View className="modal">
          <CloseBtn onClick={this.props?.onClose} />
          {this.props.children}
        </View>
      </>
    );
  }
}

export default Index;
