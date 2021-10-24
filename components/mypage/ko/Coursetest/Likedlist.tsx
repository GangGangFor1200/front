import React, { FC, memo, useEffect, useMemo, useState } from 'react';
import axios from 'axios';

const Likedlist = () => {
  var local = sessionStorage.getItem('memberid');
  try {
    var memberid = Number(local.split('')[1]);
  } catch {
    var memberid = 0;
  }

  const [namelist, setNamelist] = useState([] as any);
  const [placeidlist, setPlaceidlist] = useState([] as any);
  console.log(memberid);
  useEffect(() => {
    axios
      .get(`/api/myplace/findall/${memberid}`)
      .then(async (response) => {
        console.log('likedlist 에서 GET', response.data.data);

        for (var i = 0; i < response.data.data.length; i++) {
          setNamelist((prev: any) => [...prev, response.data.data[i].name]);
          setPlaceidlist((prev: any) => [...prev, response.data.data[i].id]);
        }
      })
      .catch((error) => {});
  }, []);

  const likedlist: any = namelist.map((v: string, index: number) => (
    <>
      <div id={v} key={index}>
        {namelist[index]}
      </div>
    </>
  ));

  return (
    <>
      <div className="Likedlist">
        <div>[하트 누른 장소들 목록]</div>
        <div className="likedlist" style={{ display: 'inline-block' }}>
          {likedlist}
        </div>
      </div>
    </>
  );
};

export default Likedlist;
