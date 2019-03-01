import React, { Component} from "react";
import { NavLink } from 'react-router-dom';
import { Button } from "antd";

class Other extends Component {
  state = {
    msg: "这是其他信息页面",
    count: 0,
    hasError: false
  }

  static getDerivedStateFromProps(props, state){
    console.log("do it before render -> ", props, state)
    
    return state
  }

  componentDidMount(){
    console.log("did mount -> ")
  }

  shouldComponentUpdate(nextProps, nextState){
    console.log("can i update", nextProps, nextState)
    return true
  }

  getSnapshotBeforeUpdate(prevProps, prevState){
    console.log("props or state has changed", prevProps, prevState)
    return null
  }

  componentDidUpdate(prevProps, prevState, snapshot){
    console.log("did update", prevProps, prevState, snapshot)
  }

  static getDerivedStateFromError(error){
    console.log("error", error)
    return { hasError: true}
  }

  componentDidCatch(error, info){
    console.log("catch error", error, info)
  }

  componentWillUnmount(){
    console.log("will unmount")
  }

  add = () => {
    const { count } = this.state;
    this.setState({
      count: count + 1
    })
  }

  render(){
    const { count, msg, hasError } = this.state;
    console.log("render -> ", this.state)

    if(hasError){
      return (
        <h1 style={{color: 'red'}}>Somthing went wrong.</h1>
      )
    }

    return (
      <>
        <NavLink to="/">首页</NavLink>
        <h1>{msg} --- {count}</h1>
        <Button type="primary" onClick={this.add}>+</Button>
      </>
    )
  }
}

export default Other;