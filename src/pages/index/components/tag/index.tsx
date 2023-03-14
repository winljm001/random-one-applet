import React, { Component } from "react";
import { View, Image } from "@tarojs/components";
import "./index.less";
import removeIcon from "../../images/lamb-remove.png";

type propsType = {
  children: React.ReactNode;
  canDel?: boolean;
  active?: boolean;
  onClick?: () => void;
  onDel?: () => void;
};
interface Index {
  props: propsType;
}
const colors = ["#209cee", "#92cc41", "#e76e55"];
class Index extends Component {
  constructor(props) {
    super(props);
    // 状态初始化：手动给实例挂载一个属性 指向 一个对象
    this.state = {
      color: colors[Math.floor(Math.random() * colors.length)],
    };
  }
  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    return (
      <View
        className="tag"
        onClick={this.props?.onClick}
        style={{
          "--tag-color": this.props?.active ? this.state.color : "#212529",
        }}
      >
        {this.props.children}
        {this.props?.canDel ? (
          <Image src={removeIcon} className="remove-icon" />
        ) : null}
      </View>
    );
  }
}

export default Index;
