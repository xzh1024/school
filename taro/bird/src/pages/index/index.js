import Taro, {Component, hideLoading} from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtInput, AtForm, AtButton, AtList, AtListItem, AtTabBar } from 'taro-ui'
import './index.scss'

export default class Index extends Component {

  config = {
    navigationBarTitleText: '首页'
  }
  constructor(props){
    super(props);

    this.state = {
      current: 0,
      val: '',
      // todos: [
      //   { title: '吃饭', done: true },
      //   { title: '睡觉', done: false },
      //   { title: '写代码', done: false }
      // ],
      todos: Taro.getStorageSync('todos') || []
    }
  }

  componentWillMount () {
    console.log(Taro.getStorageSync('todos'))
  }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  save(){
    Taro.setStorageSync('todos', this.state.todos);
  }

  handleChange = (e) => {
    console.log(e);
    // this.setState({
    //   val: e.detail.value
    // });
    this.setState({
      val: e
    });
  }

  handleClick = (event) => {
    console.log(event);
    const todos = [...this.state.todos];
    todos.push({ title: this.state.val, done: false })
    console.log(todos)
    this.setState({
      todos: todos,
      val: ''
    }, this.save)
  }

  handleSwitchChange = (e, index) => {
    console.log(e);
    console.log(index);
    console.log(e.detail.value);
    const todos = [...this.state.todos];
    todos[index].done = e.detail.value;
    console.log(todos)
    this.setState({
      todos: todos
    }, this.save)
  }

  handleClear = () => {
    Taro.showLoading({
      title: '清理中'
    });
    setTimeout(() => {
      this.setState({
        todos: this.state.todos.filter(v => !v.done)
      },() => {
        this.save();
        Taro.hideLoading();
      })
    }, 2000)
  }

  handleTabClick = (e) => {
    console.log(e);
    switch (e) {
      case 0:
        Taro.redirectTo({
          url: '/pages/index/index'
        });
        break
      case 1:
        Taro.redirectTo({
          url: '/pages/user/user'
        });
        break
      default:
        Taro.redirectTo({
          url: '/pages/index/index'
        });
    }
  }

  render () {
    return (
      <View className='container'>
        <Text>备忘录</Text>
        <View className='main'>
          <AtForm>
            <AtInput
              clear
              border={false}
              placeholder='添加代办项'
              type='text'
              value={this.state.val}
              onChange={this.handleChange}
            >
              <AtButton type='primary' onClick={this.handleClick}>添加</AtButton>
            </AtInput>
          </AtForm>
          <AtButton type='secondary' onClick={this.handleClear}>清空</AtButton>
          {
            this.state.todos.map((todo, index) => {
              return <AtList>
                <AtListItem
                  className={{'todoState': todo.done}}
                  key={index}
                  title={todo.title}
                  isSwitch
                  switchIsCheck={todo.done}
                  onSwitchChange={(e) => this.handleSwitchChange(e, index)}
                />
              </AtList>
            })
          }

          <View>
            {this.state.val}
          </View>
        </View>

        <AtTabBar
          tabList={[
            { title: '待办事项', text: this.state.todos.length },
            { title: '拍照' },
            { title: '通讯录', dot: true }
          ]}
          onClick={this.handleTabClick}
          current={this.state.current}
        />
      </View>
    )
  }
}

