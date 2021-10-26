import axios from 'axios';
import React, { FC, useEffect, useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import Coursemap from '../Course/Coursemap';
import TodoTemplate from './TodoTemplate';

const Main = () => {
  var local = sessionStorage.getItem('memberid');
  const [state, setState] = useState(0);
  const [course, setCourese] = useState([] as any);
  const [name, setName] = useState('');

  try {
    var memberid = Number(local.split('')[1]);
  } catch {
    var memberid = 0;
  }

  useEffect(() => {
    setCourese([]);
    axios
      .get(`/api/course/findall/${memberid}`)
      .then(async (response) => {
        setCourese(response.data.data);
      })
      .catch((error) => {});
  }, []);

  const onClick = (id: number, name: string) => {
    setState(id);
    setName(name);
  };

  const courselist: any = course.map((v: string, index: number) => (
    <>
      <button id={v} key={index} onClick={() => onClick(course[index].courseid, course[index].name)}>
        {course[index].name}
      </button>
    </>
  ));
  return (
    <>
      <div className="likedlist" style={{ display: 'inline-block' }}>
        {courselist}
      </div>
      {state !== 0 && (
        <>
          <TodoTemplate courseid={state} coursename={name} />
          <Coursemap />
        </>
      )}
    </>
  );
};
export default Main;