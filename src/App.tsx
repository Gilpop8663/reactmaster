import {
  AnimatePresence,
  motion,
  motionValue,
  useTransform,
  Variants,
} from "framer-motion";
import { useRef, useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const BiggerBox = styled.div`
  width: 600px;
  height: 600px;
  background-color: rgba(255, 255, 255, 0.4);
  border-radius: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Box = styled(motion.div)`
  display: flex;
  top: 100px;
  justify-content: center;
  position: absolute;
  align-items: center;
  width: 400px;
  height: 200px;
  background-color: white;
  border-radius: 40px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const Circle = styled(motion.div)`
  place-self: center;
  width: 70px;
  height: 70px;
  border-radius: 35px;
  background-color: white;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const BoxVariants: Variants = {
  initial: (back: boolean) => ({ scale: 0, opacity: 0, x: back ? -500 : 500 }),
  visiable: { scale: 1, opacity: 1, x: 0 },
  leaving: (back: boolean) => ({ scale: 0, opacity: 0, x: back ? 500 : -500 }),
  hover: { rotateZ: 90 },
  click: { borderRadius: "100px" },
};

function App() {
  const biggerBoxRef = useRef<HTMLDivElement>(null);
  const x = motionValue(0);
  const scale = useTransform(x, [-800, 0, 800], [2, 1, 0.1]);
  const [value, setValue] = useState(1);
  const [back, setBack] = useState(false);
  const nextToggle = () => {
    setBack(false);
    setValue((current) => (current === 10 ? 10 : current + 1));
  };
  const prevToggle = () => {
    setBack(true);
    setValue((current) => (current === 1 ? 1 : current - 1));
  };
  return (
    <Wrapper>
      <AnimatePresence exitBeforeEnter custom={back}>
        <Box
          custom={back}
          variants={BoxVariants}
          initial="initial"
          animate="visiable"
          exit="leaving"
          key={value}
        >
          {value}
        </Box>
      </AnimatePresence>
      <button onClick={nextToggle}>next</button>
      <button onClick={prevToggle}>prev</button>
    </Wrapper>
  );
}
export default App;
