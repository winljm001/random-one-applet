import { Component } from "react";
import { View, Text } from "@tarojs/components";
import "./index.less";
import CloseBtn from "../close-btn";

type propsType = {
  name: string;
  counts?: number;
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
    return (
      <View className="card fixed">
        <CloseBtn />
        <Text>{this.props.name}</Text>
        {this.props.counts ? (
          <Text className="counts">次数:{this.props.counts}</Text>
        ) : null}
      </View>
    );
  }
}

export default Index;
