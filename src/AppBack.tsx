import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Button, Image, WaterMark } from 'antd-mobile'
import googleLogo from './assets/google.svg'
import { Routes, Route } from "react-router";
import config from './configs'
// import './App.css'


const textProps = {
  content: 'google Mobile',
}

const rowsTextProps = {
  content: ['google Mobile', 'google Mobile Pro'],
}

const imageProps = {
  image: googleLogo,
  imageWidth: 115,
  imageHeight: 36,
  width: 140,
  height: 80,
}


function App() {
  const [count, setCount] = useState(0)
  const [props, setProps] = useState<{ [key: string]: any }>(textProps)
  const demoSrc2 =
    'https://images.unsplash.com/photo-1620476214170-1d8080f65cdb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=3150&q=80'

 

  // render routes
  const renderRoutes = () => {
    const routes = config.routes

    // old routes
    {/* 
      <Route path='/' element={<Layout />}>
          <Route path='/desktop' element={<LayoutsDesktop />}>
            <Route index path='/desktop/list' element={<DesktopList />} />
            <Route path='/desktop/counter' element={<DesktopCounter />} />
          </Route>
          <Route path='/mobile' element={<LayoutsMobile />}>
            <Route index path='/mobile/list' element={<MobileList />} />
            <Route path='/mobile/counter' element={<MobileCounter />} />
          </Route>
      </Route>
      <Route path='*' element={<Error404 />} /> 
    */}
    return (
      <>
        {routes.map((route) => {
          return route.routes? (
            <>
              <Route key={route.path} path={route.path} element={<route.element/>}>
                {
                  route.routes.map((children) => {
                    console.log("children", children);
                    
                    return children.routes? (
                      <Route key={children.path} path={children.path} element={<children.element/>}>
                        {
                          children.routes.map((child) => {
                            return <Route key={`${children.path}${child.path}`} index={child.index} path={`${children.path}${child.path}`} element={<child.element/>} />
                          })
                        }
                      </Route>
                    ) : <Route key={children.path} index={children.index} path={children.path} element={<children.element/>} />
                  })
                }
              </Route>
            </> 
            ): <Route key={route.path} index={route.index} path={route.path} element={<route.element/>} />
        })}
        
      </>
    );
  }

  return (
    <>
      <Image src={demoSrc2} />
      <Button color='primary' fill='solid'>
        Solid
      </Button>
      <div className='water-mark-overlay'>
        <Button onClick={() => setProps(textProps)}>普通水印</Button>
        <br />
        <Button onClick={() => setProps(rowsTextProps)}>多行文字水印</Button>
        <br />
        <Button onClick={() => setProps(imageProps)}>图片水印</Button>
        <WaterMark {...props} />
      </div>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React + Antd Mobile + React Router + Typescript + Tailwind CSS + ESLint + Prettier + Husky + Commitlint + Lintstaged + Commitizen + Standard Version + Github Actions + Docker + CI/CD</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <Routes>
        {renderRoutes()}
      </Routes>
    </>
  )
}

export default App
