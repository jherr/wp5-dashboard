/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { useRecoilState } from "recoil";
import { useTheme } from "emotion-theming";
import { PieChart } from "react-minimal-pie-chart";

const Graph2 = ({ state }) => {
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
      <PieChart
        data={[
          { title: "One", value: graph[0], color: "yellow" },
          { title: "Two", value: graph[1], color: "red" },
          { title: "Three", value: graph[2], color: "green" },
        ]}
        radius={PieChart.defaultProps.radius - 3}
        lineWidth={30}
        animate={true}
      />{" "}
    </div>
  );
};

export default Graph2;
