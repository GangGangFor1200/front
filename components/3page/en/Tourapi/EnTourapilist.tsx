import React, { FC, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import '@components/3page/LikeTourapi.css';
import { History, LocationState } from 'history';

interface Props {
  arrange: string;
  type: number;
  distance: number;
  mapx: any;
  mapy: any;
  history: History<LocationState>;
}

const EnTourapilist: FC<Props> = (props: Props) => {
  let api = process.env.REACT_APP_TOUR_API_KEY;
  let number = 5;
  let pnumber = 1;
  const [data, setData] = useState([] as any);
  const [names, setNames] = useState([] as any);
  const [categories, setCategories] = useState([] as any);
  const [locx, setLocx] = useState([] as any);
  const [locy, setLocy] = useState([] as any);
  const [addr, setAddr] = useState([] as any);
  const [dist, setDist] = useState([] as any);
  const [img, setImg] = useState([] as any);
  const [id, setId] = useState([] as any);
  const [placeid, setPlaceid] = useState([0, 0, 0, 0, 0] as any);

  var local = sessionStorage.getItem('memberid');
  try {
    var memberid = Number(local.split('')[1]);
  } catch {
    var memberid = 0;
  }

  var ggcategory = '관광명소';
  if (props.type === 39) {
    ggcategory = '음식점';
  } else {
    ggcategory = '관광명소';
  }
  var len = 0;
  useEffect(() => {
    axios
      .get(
        `http://api.visitkorea.or.kr/openapi/service/rest/EngService/locationBasedList?serviceKey=${api}&numOfRows=${number}&pageNo=${pnumber}&MobileOS=ETC&MobileApp=AppTest&listYN=Y&arrange=${props.arrange}&contentTypeId=${props.type}&mapX=${props.mapx}&mapY=${props.mapy}&radius=${props.distance}&_type=json`,
      )
      .then((response) => {
        console.log(response.data.response.body);
        if (response.data.response.body.items === '') {
          setData([]);
        } else {
          setData(response.data.response.body.items.item);
          for (var i = 0; i < response.data.response.body.items.item.length; i++) {
            console.log(response.data.response.body);
            setNames((prev: any) => [...prev, response.data.response.body.items.item[i].title]);
            setCategories((prev: any) => [...prev, ggcategory]);
            setLocx((prev: any) => [...prev, response.data.response.body.items.item[i].mapx]);
            setLocy((prev: any) => [...prev, response.data.response.body.items.item[i].mapy]);
            setAddr((prev: any) => [...prev, response.data.response.body.items.item[i].addr1]);
            setDist((prev: any) => [...prev, response.data.response.body.items.item[i].dist]);
            if (typeof response.data.response.body.items.item[i].firstimage === 'undefined') {
              var altimg = '/src/icon/nosearch.jpg';
              setImg((prev: any) => [...prev, altimg]);
            } else {
              setImg((prev: any) => [...prev, response.data.response.body.items.item[i].firstimage]);
            }
            setId((prev: any) => [...prev, response.data.response.body.items.item[i].contentid]);
          }
        }
      })
      .catch((error) => {
        setData([]);
        console.log(error);
      });
  }, []);

  len = data.length;
  const [like0, setLike0] = useState(0); //초기0 누르면1 눌렀다 빼면 2 //처음렌더링대 false라 else문들어갈까봐
  const [like1, setLike1] = useState(0);
  const [like2, setLike2] = useState(0);
  const [like3, setLike3] = useState(0);
  const [like4, setLike4] = useState(0);

  function func_post(e: number) {
    var placeId = id[e];
    var name = names[e];
    var category = categories[e];
    var location_x = locx[e];
    var location_y = locy[e];
    var address = addr[e];
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
    if (memberid === 0) {
      alert('You need to log in. Please log in.')
      console.log(props.history);
      return props.history.push('/login');
    } else {
      axios
        .post(
          `/api/en/myplace/addfromapi/${memberid}`,
          JSON.stringify({ name, category, location_x, location_y, address, placeId }),
          { headers },
        ) // 500에러
        // { withCredentials:true }) //이건 415인데 위에 headers 저렇게써야하는거라구해서 header로 바꾸면 500..
        .then((res) => {
          placeid[e] = res.data.myplaceid;
          console.log(res.data);
        })
        .catch((error) => {});
    }
  }
  function func_delete(e: number) {
    axios
      .delete(`/api/en/myplace/deletebymyplace/${memberid}/${placeid[e]}`)
      .then(() => {})
      .catch((error) => {});
  }
  function func(e: number) {
    //api에 post나 delete 하는 함수
    if (e === 0) {
      if (like0 === 0 || like0 === 2) {
        //처음 onClick때 setlike 한게 func에 반영 안되서 이렇게 해야할듯
        func_post(e);
      } else if (like0 === 1) {
        func_delete(e);
      }
    } else if (e === 1) {
      if (like1 === 0 || like1 === 2) {
        func_post(e);
      } else if (like1 === 1) {
        func_delete(e);
      }
    } else if (e === 2) {
      if (like2 === 0 || like2 === 2) {
        func_post(e);
      } else if (like2 === 1) {
        func_delete(e);
      }
    } else if (e === 3) {
      if (like3 === 0 || like3 === 2) {
        func_post(e);
      } else if (like3 === 1) {
        func_delete(e);
      }
    } else if (e === 4) {
      if (like4 === 0 || like4 === 2) {
        func_post(e);
      } else if (like4 === 1) {
        func_delete(e);
      }
    }
  } //func

  function makelike0() {
    return (
      <>
        <li className="page3placelist">
          <input
            type="checkbox"
            className="likeinput"
            id="listidx0"
            onClick={() => {
              func(0);
              like0 === 1 ? setLike0(2) : setLike0(1);
            }}
          />
          {/*{func(0)}*/}
          <label className="custom" htmlFor="listidx0">
            <span className="like">{like0 === 1 ? '💛' : '🤍'}</span>
            <div className="likeplace">{names[0]}</div>
            <div className="likeaddr">{addr[0]}</div>
            <div>{dist[0]}m</div>
            <img src={img[0]} alt={names[0]} />
          </label>
        </li>
      </>
    );
  }
  function makelike1() {
    return (
      <>
        <li className="page3placelist">
          <input
            type="checkbox"
            className="likeinput"
            id="listidx1"
            onClick={() => {
              func(1);
              like1 === 1 ? setLike1(2) : setLike1(1);
            }}
          />
          {/*{func(1)}*/}
          <label className="custom" htmlFor="listidx1">
            <span className="like">{like1 === 1 ? '💛' : '🤍'}</span>
            <div className="likeplace">{names[1]}</div>
            <div className="likeaddr">{addr[1]}</div>
            <div>{dist[1]}m</div>
            <img src={img[1]} alt={names[1]} />
          </label>
        </li>
      </>
    );
  }
  function makelike2() {
    return (
      <>
        <li className="page3placelist">
          <input
            type="checkbox"
            className="likeinput"
            id="listidx2"
            onClick={() => {
              func(2);
              like2 === 1 ? setLike2(2) : setLike2(1);
            }}
          />
          {/*{func(2)}*/}
          <label className="custom" htmlFor="listidx2">
            <span className="like">{like2 === 1 ? '💛' : '🤍'}</span>
            <div className="likeplace">{names[2]}</div>
            <div className="likeaddr">{addr[2]}</div>
            <div>{dist[2]}m</div>
            <img src={img[2]} alt={names[2]} />
          </label>
        </li>
      </>
    );
  }
  function makelike3() {
    return (
      <>
        <li className="page3placelist">
          <input
            type="checkbox"
            className="likeinput"
            id="listidx3"
            onClick={() => {
              func(3);
              like3 === 1 ? setLike3(2) : setLike3(1);
            }}
          />
          {/*{func(3)}*/}
          <label className="custom" htmlFor="listidx3">
            <span className="like">{like3 === 1 ? '💛' : '🤍'}</span>
            <div className="likeplace">{names[3]}</div>
            <div className="likeaddr">{addr[3]}</div>
            <div>{dist[3]}m</div>
            <img src={img[3]} alt={names[3]} />
          </label>
        </li>
      </>
    );
  }
  function makelike4() {
    return (
      <>
        <li className="page3placelist">
          <input
            type="checkbox"
            className="likeinput"
            id="listidx4"
            onClick={() => {
              func(4);
              like4 === 1 ? setLike4(2) : setLike4(1);
            }}
          />
          {/*{func(4)}*/}
          <label className="custom" htmlFor="listidx4">
            <span className="like">{like4 === 1 ? '💛' : '🤍'}</span>
            <div className="likeplace">{names[4]}</div>
            <div className="likeaddr">{addr[4]}</div>
            <div>{dist[4]}m</div>
            <img src={img[4]} alt={names[4]} />
          </label>
        </li>
      </>
    );
  }

  function make() {
    //웹페이지에 표시할 태그들. return에서 호출
    if (len === 1) {
      return <>{makelike0()}</>;
    } else if (len === 2) {
      return (
        <>
          {makelike0()}
          {makelike1()}
        </>
      );
    } else if (len === 3) {
      return (
        <>
          {makelike0()}
          {makelike1()}
          {makelike2()}
        </>
      );
    } else if (len === 4) {
      return (
        <>
          {makelike0()}
          {makelike1()}
          {makelike2()}
          {makelike3()}
        </>
      );
    } else if (len === 5) {
      return (
        <>
          {makelike0()}
          {makelike1()}
          {makelike2()}
          {makelike3()}
          {makelike4()}
        </>
      );
    } else if (len === 0) {
      return (
        <>
          <p>not exist!</p>
        </>
      );
    }
  }

  return <>{make()}</>;
};

export default EnTourapilist;
