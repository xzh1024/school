import React, { Component, ReactNode } from 'react'
import styles from "./index.scss";
import { Card } from 'antd';

interface CardItemProps {
  children: {
    content?: ReactNode,
    title?: ReactNode | string,
    extra?: ReactNode,
  }
}

export default class CardItem extends Component<CardItemProps> {
  render() {
    const { children } = this.props;
    const titleNode = () => {
      return (
        <span
          style={{
            paddingLeft: "5px",
            borderLeft: "3px solid blue"
          }}
        >
          {children.title}
        </span>
      )
    }
    return (
      <Card size="small" title={titleNode()} className={styles.card_style} bodyStyle={{flex: 1}} extra={children.extra ? children.extra : null}>
        {children.content}
      </Card>
    )
  }
}
