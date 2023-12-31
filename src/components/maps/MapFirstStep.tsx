import React from "react";
import styled from "styled-components";
import Canvas from "../canvas/Canvas";
import { getAllItem } from "../../utils/request";
// import { getGameStart } from "../apis/setGame";
// import { useRecoilValue } from "recoil";
// import { userNameAtom } from "../../utils/recoilVal";

interface MapFirstStepProps {
  itemClicked: boolean;
  selectedItem: getAllItem | undefined;
  mapArr: number[][];
  setMapArr: React.Dispatch<React.SetStateAction<number[][]>>;
  setItems: React.Dispatch<React.SetStateAction<getAllItem[]>>;
  setItemClicked: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedItem: React.Dispatch<React.SetStateAction<getAllItem | undefined>>;
  setCurrentHealth: React.Dispatch<React.SetStateAction<number>>;
  setIsDone: React.Dispatch<React.SetStateAction<boolean>>;
}

const MapFirstStep = (props: MapFirstStepProps) => {
  return (
    <Wrapper>
      {props.mapArr.map((row) => {
        return (
          <RowFlex>
            {row.map((element) => {
              if (element === 0) {
                return <Box color="red"> </Box>;
              } else if (element === 1) {
                return <Box color="black"> </Box>;
              } else if (element === 2) {
                return <Box color="whitesmoke"> </Box>;
              } else if (element === 3) {
                return (
                  <Box color="black">
                    <img src={`/img/item-3.png`} />
                  </Box>
                );
              } else if (element === 4) {
                return (
                  <Box color="black">
                    <img src={`/img/item-4.png`} />
                  </Box>
                );
              } else if (element === 5) {
                return (
                  <Box color="black">
                    <img src={`/img/item-5.png`} />
                  </Box>
                );
              } else if (element === 9) {
                return (
                  <Box color="black">
                    <img src={`/img/finish.png`} />
                  </Box>
                );
              } else {
                return <Box color="green"> </Box>;
              }
            })}
          </RowFlex>
        );
      })}
      <Canvas
        mapArr={props.mapArr}
        selectedItem={props.selectedItem}
        itemClicked={props.itemClicked}
        setMapArr={props.setMapArr}
        setItems={props.setItems}
        setItemClicked={props.setItemClicked}
        setSelectedItem={props.setSelectedItem}
        setCurrentHealth={props.setCurrentHealth}
        setIsDone={props.setIsDone}
      />
    </Wrapper>
  );
};

export default MapFirstStep;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;

const RowFlex = styled.div`
  display: flex;
  flex-direction: row;
`;

const Box = styled.div<{ color: string }>`
  display: flex;
  width: 28px;
  height: 28px;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.color || "white"};
  & > img {
    width: 80%;
    object-fit: cover;
  }
`;
