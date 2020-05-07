import React, { useState } from 'react'
import axios from 'axios'
import { Input, Card, Row, Col, Empty } from 'antd';
import iTunesLogo from '../../images/ITunes_logo.svg'
import soapLogo from '../../images/soap_logo.jpg'
import tvmLogo from '../../images/tvm_api.png'
import './index.scss'

const { Search } = Input;

const Homepage = () => {

  const [loading, setLoading] = useState(false)

  const [data, setData] = useState({
    crcind: [],
    itunes: [],
    tvMaze: []
  });

  const searchName = async name => {
    const url = `http://localhost:8000/?name=${name}`
    await setLoading(true)
    await axios.get(url)
    .then(async function (response) {
      // handle success
      setData(response.data)
      setLoading(false)
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
  }

  console.log(data)

  return(
    <div>
      <h1>Tribal MnC Test</h1>
      <div className='search-container'>
        <span className='input-label' >Search something!</span>
        <Search placeholder="What are you searching?" onSearch={value => searchName(value)} enterButton loading={loading} />
      </div>
      <div className='data-container'>
        <Row>
          {data.crcind.map(el => (
            <Col span={6} key={el.ID[0]}>
              <Card
                title={el.Name[0]}
                cover={<img alt="i_tunes_logo" src={soapLogo} />}
              >
                <p>ID: {el.ID[0]}</p>
                <p>DOB: {el.DOB[0]}</p>
                <p>SSN: {el.SSN[0]}</p>
              </Card>
            </Col>
          ))}
          {data.itunes.map(el => (
            <Col span={6} key={el.trackId}>
              <Card
                title={!!el.trackName ? el.trackName : 'Unknown name'}
                cover={<img alt="i_tunes_logo" src={iTunesLogo} />}
              >
                <p>Collection Name: {el.collectionName}</p>
                <p>Artist: {el.artistName}</p>
                <p>Type: {el.wrapperType}</p>
              </Card>
            </Col>
          ))}
          {data.tvMaze.map(el => (
            <Col span={6} key={el.show.id}>
              <Card
                title={el.show.name}
                cover={<img alt="i_tunes_logo" src={tvmLogo} />}
              >
                <p>Premiered: {el.show.premiered}</p>
                <p>Status: {el.show.status}</p>
                <p>Rating: {!!el.show.rating.average ? el.show.rating.average : 'Unknown' }</p>
              </Card>
            </Col>
          ))}
          {data.crcind.length === 0 && data.itunes.length === 0 && data.tvMaze.length === 0 ?
            <Col span={24}>
              <Empty />
            </Col>
          :
            ''
          }
        </Row>
      </div>
    </div>
  )
}

export default Homepage