import React from "react";
import { NavLink } from 'react-router-dom';
import { Tree } from "antd";

const { TreeNode } = Tree;


class Demo extends React.Component {
  state = {
    treeData: [
      { title: 'Expand to load', key: '0' },
      { title: 'Expand to load', key: '1' },
      { title: 'Tree Node', key: '2', isLeaf: true },
    ],
  }

  myRef = React.createRef()

  onLoadData = treeNode => new Promise((resolve) => {
    console.log("<<<<<<<<<<", treeNode)
    if (treeNode.props.children) {
      // resolve();
      this.getData(resolve, treeNode)
      return;
    }
    this.getData(resolve, treeNode)
  })

  getData = (resolve, treeNode) => {
    setTimeout(() => {
      console.log("async data loading ...")
      treeNode.props.dataRef.children = [
        { title: 'Child Node', key: `${treeNode.props.eventKey}-0` },
        { title: 'Child Node', key: `${treeNode.props.eventKey}-1` },
      ];
      this.setState({
        treeData: [...this.state.treeData],
      });
      resolve();
    }, 1000);
  }

  renderTreeNodes = data => data.map((item) => {
    if (item.children) {
      return (
        <TreeNode ref={this.myRef} title={item.title} key={item.key} dataRef={item}>
          {this.renderTreeNodes(item.children)}
        </TreeNode>
      );
    }
    return <TreeNode {...item} dataRef={item} />;
  })

  render() {
    console.log("~~~~~~~~~~")
    return (
      <Tree loadData={this.onLoadData} onExpand={(expandedKeys, {expanded})=>{
        console.log(expandedKeys, expanded)
        if(expanded){
          if(this.myRef.current){
            this.onLoadData(this.myRef.current)
          }
        }
        
      }}>
        {this.renderTreeNodes(this.state.treeData)}
      </Tree>
    );
  }
}


function About() {

  return (
    <>
      <NavLink to="/">首页</NavLink>
      <h1>关于我们</h1>
      <Demo />
    </>
  )
}

export default About;