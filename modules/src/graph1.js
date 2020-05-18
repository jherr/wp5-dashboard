/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { useRecoilState } from "recoil";
import { useTheme } from "emotion-theming";
import { PieChart } from "react-minimal-pie-chart";

const Graph1 = ({ state }) => {
  const [graph, setGraph] = useRecoilState(state);
  const theme = useTheme();
  return (
    <div
      css={{
        padding: 10,
        border: `10px solid ${theme.colors.primary}`,
        background: "#eee",
        fontSize: "x-large",
      }}
    >
      <button
        onClick={() => setGraph([10, 20, 30])}
        style={{
          fontSize: "xx-large",
        }}
      >
        Change the data now!!!
      </button>
      <PieChart
        data={[
          { title: "One", value: graph[0], color: "#E38627" },
          { title: "Two", value: graph[1], color: "#C13C37" },
          { title: "Three", value: graph[2], color: "#6A2135" },
        ]}
        radius={PieChart.defaultProps.radius - 6}
        lineWidth={60}
        animate={true}
      />{" "}
    </div>
  );
};

export default Graph1;
