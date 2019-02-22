import React, { 
  useState, 
  useEffect, 
  useRef, 
  useContext,
  useMemo,
  useReducer,
  useCallback,
  // useImperativeHandle,
  useLayoutEffect,
  // useDebugValue
} from 'react';
import { NavLink } from 'react-router-dom';
import { Button, Input } from "antd";
import "./App.less";
import { ThemeContext } from "./themes";

function TextInputWithFocusButton() {
  const inputEl = useRef(null);
  const onButtonClick = () => {
    inputEl.current.focus();
  };
  return (
    <>
      <Input style={{width: 200}} ref={inputEl} type="text" />
      <Button type="primary" onClick={onButtonClick}>点击获得input框焦点</Button>
    </>
  );
}

function TestUseCallback({ num }) {
  const numRef = useRef();

  useLayoutEffect(() => {
    numRef.current = num
  });
  const memoizedCallback = useCallback(
    () => {
      // 一些计算操作
      return numRef.current;
    },
    [numRef],
  );
  console.log('原始 num -> ', num)
  console.log('记忆 num -> ', memoizedCallback())

  return (
    <div>
      <p>TestUseCallback</p>
    </div>
  )
}
 
const num1 = [1,2,3], num2 = [4,5,6]
function App() {
  const context = useContext(ThemeContext);
  const [count, setCount] = useState(0);
  const prevCount = usePrevious(count);
  const [theme, setTheme] = useState(context.themes.dark);
  const [state, dispatch] = useReducer((state, action) => {
    switch(action.type) {
      case 'update':
        return {...state, name: action.payload}
      default:
        return state
    }
  }, {name: 'Mary'});
  const [num, setNumber] = useState(num1);
  const [wordIndex, setWordIndex] = useState(0);

  const words = ['hey', 'this', 'is', 'cool'];
  const word = words[wordIndex];

  //
  useEffect(() => {
    document.title = `你点击了 ${count} 次`;
  }, [count]);
  // 
  function usePrevious(value){
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  }
  //
  const add = () => setCount(count + 1)
  //
  const del = () => setCount(count - 1)
  // 切换主题
  const toggleTheme = () => {
    let th = theme === context.themes.dark
           ? context.themes.light
           : context.themes.dark
    setTheme(th)
  }
  // 修改名称
  const changeName = () => {
    dispatch({
      type: 'update',
      payload: "Tommy"
    })
  }
  // 计算单词字母的个数
  const computeLetterCount = word => {
    let i = 0;
    while (i < 1000000000) i++;
    return word.length;
  };
  // 
  const letterCount = useMemo(() => computeLetterCount(word), [word]);
  // 
  function Toolbar(props){
    return (
      <>
        <Button style={{backgroundColor: theme.background, color: theme.foreground}} onClick={toggleTheme}>
          {`Hello ${props.name}`}
        </Button>
      </>
    )
  };

  // 使用 useImperativeHandle
  // const FancyInput = (props, ref) => {
  //   const inputRef = useRef();
  //   useImperativeHandle(ref, () => ({
  //     focus: () => {
  //       inputRef.current.focus();
  //     }
  //   }));
  //   return <input ref={inputRef} {...props}/>;
  // }

  // 模拟实现 getDerivedStateFromProps
  // function ScrollView({row}) {
  //   let [isScrollingDown, setIsScrollingDown] = useState(false);
  //   let [prevRow, setPrevRow] = useState(null);
  
  //   if (row !== prevRow) {
  //     setIsScrollingDown(prevRow !== null && row > prevRow);
  //     setPrevRow(row);
  //   }
  
  //   return `Scrolling down: ${isScrollingDown}`;
  // }

  // 模拟实现 forceUpdate
  // const [ignored, forceUpdate] = useReducer(x => x + 1, 0);

  // function handleClick() {
  //   forceUpdate();
  // }

  // 模拟实现 shouldComponentUpdate
  // const Button = React.memo((props) => {
  //   // your component
  // });
  
  // 使用 useDebugValue
  // useDebugValue(date, date => date.toDateString());

  return (
    <>
      <h1>useState、useEffect API</h1>
      <p>Now: 你点击了 {count} 次, Before: {prevCount}</p>
      <Button type="primary" className="left-btn" onClick={add}>加</Button>
      <Button type="primary" onClick={del}>减</Button>

      <h1>导航</h1>
      <NavLink to="/about">关于我们</NavLink>

      <h1>useRef API</h1>
      {TextInputWithFocusButton()}

      <h1>useContext API</h1>
      <Toolbar {...state}/>
      <Button onClick={changeName}>修改名称</Button>

      <h1>useCallback API</h1>
      <TestUseCallback num={num} />
      <Button onClick={() => setNumber(num2)}>修改num的值</Button>

      <h1>useMemo API</h1>
      <p>"{word}" has {letterCount} letters</p>
      <Button
        onClick={() => {
          const next = wordIndex + 1 === words.length ? 0 : wordIndex + 1;
          setWordIndex(next);
        }}
      >
        下一个单词
      </Button>
      
      <h1>useImperativeHandle API</h1>

      <h1>useLayoutEffect API</h1>

      <h1>useDebugValue API</h1>
    </>
  );
}

export default App