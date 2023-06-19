import { Button } from 'antd';
import axios from 'axios';
import React from 'react';

export default function Home() {
  const ajax = () => {
    // 增 post
    // axios.post('http://localhost:8000/posts', {
    //   title: '333',
    //   author: 'xiaoming'
    // }).then((res) => {
    //   console.log(res.data);
    // });

    // 更新 put
    // axios.put('http://localhost:8000/posts/1', {
    //   title: '1111-修改',
    //   author: 'kerwin-修改'
    // }).then((res) => {
    //   console.log(res.data);
    // });

    // 更新 patch
    // axios
    //   .patch('http://localhost:8000/posts/1', {
    //     title: '1111-修改2'
    //   })
    //   .then((res) => {
    //     console.log(res.data);
    //   });

    // 删除 delete
    // axios.delete('http://localhost:8000/posts/2').then((res) => {
    //   console.log(res.data);
    // });

    // 取数据 get
    // axios
    //   .get('http://localhost:8000/posts')
    //   .then((res) => {
    //     console.log(res.data);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });

    // _embed
    // axios.get('http://localhost:8000/posts?_embed=comments').then((res) => {
    //   console.log(res.data);
    // });

    // _expand
    axios.get('/comments?_expand=post').then((res) => {
      console.log(res.data);
    });
  };
  return (
    <div>
      Home
      <br />
      <Button type="primary" onClick={ajax}>
        Button
      </Button>
    </div>
  );
}
