import React, { Component } from 'react';
import withRouter from '../../components/withRouter';

class FilmItem extends Component {
  render() {
    console.log(this.props);
    const { item } = this.props;
    return (
      <div onClick={() => this.handleClick(item.filmId)}>
        <img src={item.poster} alt="" style={{ width: '100px' }} />
        {item.name}
      </div>
    );
  }

  handleClick(id) {
    console.log(id);
    this.props.history.push(`/detail/${id}`);

    // this.props.history.push 跳转页面
    // this.props.history.match 获取参数
    // this.props.history.location 获取当前路由
  }
}

export default withRouter(FilmItem);
