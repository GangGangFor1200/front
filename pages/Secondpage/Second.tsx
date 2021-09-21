import React, {FC, memo, useMemo, useState} from 'react';
import Slide from "@components/Slide/Slide";
import Layout from '@components/Layouts';

const Second=(props:any)=> {
  const selectedcity = props.match.params.selectedcity;
  const selectedcategory = props.match.params.selectedcategory;

  if (selectedcity==='없음'){
    if (selectedcategory==='안'){
      return (
        <h2>지역과 카테고리를 선택하여 주십시오</h2>
      )
    }
    else{
      return (
        <h2>지역을 선택하여 주십시오</h2>
      )
    }
  }
  if (selectedcategory==='안'){
    if (selectedcity !=='없음'){
      return (
        <h2>카테고리를 선택하여 주십시오</h2>
      )
    }
  }
  return (
    <Layout>
      <h2>{selectedcity}의 {selectedcategory} 추천장소 TOP5 </h2>
      <Slide city={selectedcity} />
    </Layout>
  );

}

export default Second;