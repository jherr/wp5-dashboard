import React from "react";
import { RecoilRoot, atom, useRecoilState } from "recoil";
import { ThemeProvider } from "emotion-theming";

const useDynamicScript = (url) => {
  const [ready, setReady] = React.useState(false);
  const [failed, setFailed] = React.useState(false);

  React.useEffect(() => {
    if (!url) {
      return;
    }

    const element = document.createElement("script");
    element.src = url;
    element.type = "text/javascript";
    element.async = true;

    setReady(false);
    setFailed(false);

    element.onload = () => {
      console.log(`Dynamic Script Loaded: ${url}`);
      setReady(true);
    };

    element.onerror = () => {
      console.error(`Dynamic Script Error: ${url}`);
      setReady(false);
      setFailed(true);
    };

    document.head.appendChild(element);

    return () => {
      console.log(`Dynamic Script Removed: ${url}`);
      document.head.removeChild(element);
    };
  }, [url]);

  return {
    ready,
    failed,
  };
};

const RemoteReactComponent = ({ url, scope, module, ...props }) => {
  const { ready, failed } = useDynamicScript(url);

  if (ready) {
    const o = global.__webpack_require__ ? global.__webpack_require__.o : {};
    window[scope].override(
      Object.assign(
        {
          recoil: () => Promise.resolve().then(() => () => require("recoil")),
          react: () => Promise.resolve().then(() => () => require("react")),
          "react-dom": () =>
            Promise.resolve().then(() => () => require("react-dom")),
          "@emotion/core": () =>
            Promise.resolve().then(() => () => require("@emotion/core")),
          "emotion-theming": () =>
            Promise.resolve().then(() => () => require("emotion-theming")),
        },
        o
      )
    );
  }

  if (!ready) {
    return <h2>Loading dynamic script: {url}</h2>;
  }

  if (failed) {
    return <h2>Failed to load dynamic script: {url}</h2>;
  }

  const Component = React.lazy(
    async () =>
      await window[scope].get(module).then((factory) => {
        const Module = factory();
        return Module;
      })
  );

  return (
    <React.Suspense fallback="Loading System">
      <Component {...props} />
    </React.Suspense>
  );
};

const graphState = atom({
  key: "graphState",
  default: [5, 2, 30],
});

const DashboardWidget = ({ name, ...props }) => (
  <RemoteReactComponent
    url={`http://localhost:3001/${name}/remoteEntry.js`}
    module={name}
    scope={name}
    {...props}
  />
);

function Dashboard() {
  const [graph, setGraph] = useRecoilState(graphState);
  return (
    <div
      style={{
        padding: 10,
      }}
    >
      <div style={{ fontSize: "xx-large" }}>Data: {JSON.stringify(graph)}</div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "50% 50%",
          gridGap: 10,
        }}
      >
        <DashboardWidget name="graph1" state={graphState} />
        <DashboardWidget name="graph2" state={graphState} />
      </div>
    </div>
  );
}

const theme = {
  colors: {
    primary: "hotpink",
  },
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <RecoilRoot>
        <Dashboard></Dashboard>
      </RecoilRoot>
    </ThemeProvider>
  );
}

export default App;
