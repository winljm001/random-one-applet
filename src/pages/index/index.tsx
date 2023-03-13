import { Component } from "react";
import { View, Text } from "@tarojs/components";
import "./index.less";
import Card from "./components/card";

export default class Index extends Component {
  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    return (
      <View className="page">
        <View className="bg">
          <View className="bg-animation" />
          <View className="filter" />
        </View>
        <View className="body">
          <Text>Hello world!</Text>
          <Card name="sss" counts={8} />
        </View>
      </View>
    );
  }
}
