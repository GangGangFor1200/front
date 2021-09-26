import Getapi from '@components/GetAPI/Getapi';
import React, { createRef, FC, memo, useMemo, useRef, useState } from 'react';
import { useEffect } from 'react';
import './Controller.css';

const useSlider = (min: any, max: any, defaultState: any, label: any, id: any) => {
  const [state, setSlide] = useState(defaultState);
  const handleChange = (e: any) => {
    setSlide(e.target.value);
  };

  const Slider = () => (
    <input
      type="range"
      id={id}
      min={min}
      max={max}
      step={0.5}
      // value={state} // don't set value from state
      defaultValue={state} // but instead pass state value as default value
      // onChange={(e) => console.log(e.target.value)} // don't set state on all change as react will re-render
      onMouseUp={handleChange} // only set state when handle is released
    />
  );
  return [state, Slider, setSlide];
};

const Controller = () => {
  const [slideValue, Slider] = useSlider(1, 100, 70, 'Threshold', 'threshold');
  const [selectedArrange, setSelectedArrange] = useState(''); //  정렬기준 *인기순 B / 거리순 E
  const [selectedType, setSelectedType] = useState(0);
  const [apiopen, setApigopen] = useState(false);
  function funcType(selected: number) {
    setSelectedType(selected);
  }
  function funcArrange(selected: string) {
    setSelectedArrange(selected);
  }

  return (
    <>
      <div className="controller">
        {/*슬라이더*/}
        <div className="slider-parent">
          0
          <Slider />
          20km
          <div className="buble">{slideValue}m</div>
        </div>
        <br />
        {/*인기순거리순*/}
        <div className="order">
          {/*인기순 B / 거리순 E*/}
          <button
            onClick={() => funcArrange('B')}
            className={selectedArrange === 'popularity' ? 'selected' : 'unselected'}
          >
            인기순
          </button>
          <button
            onClick={() => funcArrange('E')}
            className={selectedArrange === 'distance' ? 'selected' : 'unselected'}
          >
            거리순
          </button>
        </div>
        {/*카테고리*/}
        <div className="category">
          <button onClick={() => funcType(12)} className={selectedType === 12 ? 'selected' : 'unselected'}>
            관광지
          </button>
          <button onClick={() => funcType(14)} className={selectedType === 14 ? 'selected' : 'unselected'}>
            문화시설
          </button>
          <button onClick={() => funcType(15)} className={selectedType === 15 ? 'selected' : 'unselected'}>
            축제,공연,행사
          </button>
          <button onClick={() => funcType(25)} className={selectedType === 25 ? 'selected' : 'unselected'}>
            여행코스
          </button>
          <button onClick={() => funcType(28)} className={selectedType === 28 ? 'selected' : 'unselected'}>
            레포츠
          </button>
          <button onClick={() => funcType(32)} className={selectedType === 32 ? 'selected' : 'unselected'}>
            숙박
          </button>
          <button onClick={() => funcType(38)} className={selectedType === 38 ? 'selected' : 'unselected'}>
            쇼핑
          </button>
          <button onClick={() => funcType(39)} className={selectedType === 39 ? 'selected' : 'unselected'}>
            음식
          </button>
        </div>
        <br />
        Arrange : {selectedArrange}
        <br />
        거리 : {slideValue}
        <br />
        Type : {selectedType}
        <br />
      </div>

      <div className="gobtn">
        <button
          className="go"
          onClick={() => {
            setApigopen(!apiopen);
          }}
        >
          장소 더보기 GO
        </button>
      </div>

      <div className="클래스명모하지">{apiopen && <Getapi />}</div>
    </>
  );
};

export default Controller;
