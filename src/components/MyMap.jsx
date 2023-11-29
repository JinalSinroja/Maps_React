import { forwardRef } from "react";

const MyMap = forwardRef((props, ref) => {
  console.log("reff", ref);
  return <div style={{ width: "100%", height: "100vh" }} ref={ref}></div>;
});

export default MyMap;
