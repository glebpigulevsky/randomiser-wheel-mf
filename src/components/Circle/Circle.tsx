import React, { useCallback, useState } from "react";
import ColorScheme from "color-scheme";
import styled from "@emotion/styled";

const Wheel = styled.div<{ isSpin: boolean }>`
  height: 350px;
  width: 350px;
  background: #4ed4c6;
  position: relative;
  border-radius: 50%;
  overflow: hidden;
  box-shadow: 0 0 10px gray;
  transition: 3s all;

  ${({ isSpin }) => isSpin && `transform: rotate(1400deg);`}

  & div {
    height: 50%;
    width: 200px;
    clip-path: polygon(100% 0, 50% 100%, 0 0);
    transform: translateX(-50%);
    transform-origin: bottom;
    position: absolute;
    left: 21%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    font-family: monospace;
    font-weight: 1000;
    color: #008276;
    writing-mode: vertical-rl;
  }
`;

export const SegmentList = styled.div``;

const spinningItems = ["1", "2", "3", "4", "6", "7", "8", "9"];

export const Circle = ({
  items = spinningItems,
  isReady,
}: {
  items?: Array<string>;
  isReady: boolean;
}) => {
  const scheme = new ColorScheme();
  scheme.from_hue(21).scheme("contrast").variation("soft");

  const [isSpin, setIsSpin] = useState<boolean>(false);

  const getCircleValues = (items: Array<string>, index: number) => {
    return {
      rotate: index === 0 ? 0 : Math.floor(360 / items.length) * index,
      skewY: Math.floor(360 / items.length) + 90,
    };
  };
  console.log(isReady);
  const onButtonClick = useCallback(() => {
    setIsSpin(!isSpin);
  }, [setIsSpin, isSpin]);

  return (
    <>
      <button onClick={onButtonClick}>spin the wheel!</button>
      {isReady && (
        <Wheel isSpin={isSpin}>
          {items.map((item, index) => {
            return (
              <SegmentList
                key={item}
                style={{
                  background: `#${scheme.colors()[index]}`,
                  transform: `rotate(${
                    getCircleValues(items, index).rotate
                  }deg)`,
                }}
              >
                {item}
              </SegmentList>
            );
          })}
        </Wheel>
      )}
    </>
  );
};
