import React from 'react'
import Row from '..'
import Col from '../../Col'

const App: React.FC = () => {
  return (
    <>
      <Row gutter={16}>
        <Col span={6} className="Kyong-col-demo">
          Col-6
        </Col>
        <Col span={6} className="Kyong-col-demo">
          Col-6
        </Col>
        <Col span={6} className="Kyong-col-demo">
          Col-6
        </Col>
        <Col span={6} className="Kyong-col-demo">
          Col-6
        </Col>
      </Row>
      <br />
      <Row gutter={16}>
        <Col span={8} className="Kyong-col-demo">
          Col-8
        </Col>
        <Col span={8} className="Kyong-col-demo">
          Col-8
        </Col>
        <Col span={8} className="Kyong-col-demo">
          Col-8
        </Col>
      </Row>
      <br />
      <Row gutter={16}>
        <Col span={12} className="Kyong-col-demo">
          Col-12
        </Col>
        <Col span={12} className="Kyong-col-demo">
          Col-12
        </Col>
      </Row>
      <br />
      <Row gutter={16}>
        <Col span={24} className="Kyong-col-demo">
          Col-24
        </Col>
      </Row>
    </>
  )
}

export default App
