import { Component } from "react";
import { View, Text, Image, Input } from "@tarojs/components";
import "./index.less";
import Card from "./components/card";
import createIcon from "./images/lamb-create.png";

import removeIcon from "./images/lamb-remove.png";
import editIcon from "./images/bianji.png";

import Tag from "./components/tag";
import Taro from "@tarojs/taro";
import { defaultRandomList } from "./const";
import Modal from "./components/modal";

export default class Index extends Component {
  constructor(props) {
    super(props);

    try {
      let storageTypes = Taro.getStorageSync("types");
      storageTypes = storageTypes
        ? JSON.parse(storageTypes)
        : defaultRandomList;
      if (storageTypes) {
        const initTypes = storageTypes?.map((v, i) => ({
          ...v,
          edit: false,
        }));
        console.log({ initTypes });
        this.state = {
          types: initTypes,
          editType: "",
          activeIndex: 0,
          addText: "",
          loading: false,
          shareModal: false,
          randomTarget: -1,
        };
      }
    } catch (e) {
      console.log(e);

      // Do something when catch error
    }
  }
  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}
  addType = () => {
    if (this.state.addText.trim() === "") {
      return false;
    }
    if (
      this.state.types?.map((v) => v?.name)?.includes(this.state.addText.trim())
    ) {
      return false;
    } else {
      this.setState({
        types: [
          ...(this.state.types || []),
          { name: this.state.addText.trim(), list: [] },
        ],
        addText: "",
      });
    }
  };
  removeType = (index) => {
    this.setState({
      types: this.state.types?.filter((v, i) => i !== index),
    });
  };
  addItem = () => {
    if (this.state.addText.trim() === "") {
      return false;
    }
    if (
      this.state?.types?.[this.state?.activeIndex]?.list
        ?.map((v) => v?.name)
        ?.includes(this.state.addText.trim())
    ) {
      return false;
    } else {
      this.setState({
        types: this.state.types?.map((v, i) => {
          if (i === this.state?.activeIndex) {
            return {
              ...v,
              list: [
                ...(v?.list || []),
                { name: this.state.addText.trim(), count: 0 },
              ],
            };
          }
          return v;
        }),
        addText: "",
      });
    }
  };
  removeItem = (index) => {
    this.setState({
      types: this.state.types?.map((v, i) => {
        if (i === this.state?.activeIndex) {
          return {
            ...v,
            list: v?.list?.filter((item, j) => j !== index),
          };
        }
        return v;
      }),
    });
  };

  randomAction = () => {
    this.setState({
      loading: true,
    });
    const callback = () => {
      const randomTarget = Math.floor(
        Math.random() *
          this.state?.types?.[this.state?.activeIndex]?.list.length
      );

      this.setState({
        randomTarget: randomTarget,
        loading: false,
        shareModal: true,
        types: this.state?.types?.map((v, i) => {
          if (this.state?.activeIndex === i) {
            return {
              ...v,
              list: v?.list?.map((item, j) => {
                if (j === randomTarget) {
                  console.log({ item });

                  return { ...item, count: (item?.count || 0) + 1 };
                } else {
                  return item;
                }
              }),
            };
          } else {
            return v;
          }
        }),
      });
    };
    let randomNum = 15;
    let interval = setInterval(() => {
      randomNum--;
      if (randomNum === 0) {
        clearInterval(interval);
        callback();
        return false;
      }
      this.setState({
        randomTarget: Math.floor(
          Math.random() *
            this.state?.types?.[this.state?.activeIndex]?.list.length
        ),
      });
    }, 100);
  };
  render() {
    const shareItem =
      this.state?.types?.[this.state?.activeIndex]?.list?.[
        this.state?.randomTarget
      ];
    return (
      <View className="page">
        {/* <View className="bg">
          <View className="bg-animation" />
          <View className="filter" />
        </View> */}
        <View className="body">
          <View className="scroll-view">
            <View className="title">
              <Text>分类：</Text>
            </View>
            <View className="hr" />
            <View className="list">
              {this.state?.types?.map((v, i) => {
                const active = this.state.activeIndex === i;
                return (
                  <Tag
                    key={i}
                    active={active}
                    onClick={() => {
                      this.setState({ activeIndex: i });
                    }}
                  >
                    {v?.name}
                  </Tag>
                );
              })}
              <Image
                src={editIcon}
                className="edit-icon"
                onClick={() => {
                  this.setState({
                    editType: "type",
                  });
                }}
              />
            </View>
            <View className="title">
              <Text>项目：</Text>
            </View>
            <View className="hr" />
            <View className="list">
              {this.state?.types?.[this.state?.activeIndex]?.list?.map(
                (v, i) => {
                  return (
                    <Tag key={i} active={i === this.state.randomTarget}>
                      {v?.name}
                    </Tag>
                  );
                }
              )}
              <Image
                src={editIcon}
                className="edit-icon"
                onClick={() => {
                  this.setState({
                    editType: "item",
                    editTypeIndex: this.state.activeIndex,
                  });
                }}
              />
            </View>
          </View>
          {/* <Card name="sss" counts={8} /> */}
          <View className="bottom-bar">
            <View className="nes-btn is-primary" onClick={this.randomAction}>
              随便一下
            </View>
          </View>
        </View>
        <Modal
          visible={this.state?.editType}
          onClose={() => {
            this.setState({ editType: "" });
          }}
        >
          <View className="edit-content">
            <View className="edit-list">
              {this.state?.editType === "type" &&
                this.state?.types?.map((v, i) => {
                  const active = this.state.activeIndex === i;
                  return (
                    <View className="edit-item" key={i}>
                      {v?.name}
                      {active ? null : (
                        <Image
                          src={removeIcon}
                          className="remove-icon"
                          onClick={() => {
                            Taro.showModal({
                              title: "提示",
                              content: "是否删除？",
                              success: (res) => {
                                if (res.confirm) {
                                  this.removeType(i);
                                }
                              },
                            });
                          }}
                        />
                      )}
                    </View>
                  );
                })}
              {this.state?.editType === "item" &&
                this.state?.types?.[this.state?.activeIndex]?.list?.map(
                  (v, i) => {
                    return (
                      <View className="edit-item" key={i}>
                        {v?.name}

                        <Image
                          src={removeIcon}
                          className="remove-icon"
                          onClick={() => {
                            Taro.showModal({
                              title: "提示",
                              content: "是否删除？",
                              success: (res) => {
                                if (res.confirm) {
                                  this.removeItem(i);
                                }
                              },
                            });
                          }}
                        />
                      </View>
                    );
                  }
                )}
            </View>
            <View className="input-wrap">
              <Input
                className="input"
                value={this.state.addText}
                onInput={(e) => {
                  this.setState({ addText: e.detail.value });
                }}
              />
              <Image
                src={createIcon}
                className="create-icon"
                onClick={() => {
                  if (this.state.editType === "type") {
                    this.addType();
                  }
                  if (this.state.editType === "item") {
                    this.addItem();
                  }
                }}
              />
            </View>
          </View>
        </Modal>
        {/* 分享 */}
        <Modal
          visible={this.state?.shareModal}
          onClose={() => {
            this.setState({ shareModal: false });
          }}
        >
          <View className="share-box">
            <View className="share-name">{shareItem?.name}</View>
            <View className="share-count">次数：{shareItem?.count}</View>
          </View>
        </Modal>
        {this.state?.loading && <View className="transparent-mask" />}
      </View>
    );
  }
}
