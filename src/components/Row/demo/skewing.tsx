import React from 'react'
import Row from '..'
import Col from '../../Col'

const App: React.FC = () => {
  return (
    <>
      <Row gutter={16}>
        <Col span={6} className="Kyong-col-demo">
          col-6 col-offset-6
        </Col>
        <Col span={6} offset={6} className="Kyong-col-demo">
          col-6 col-offset-6
        </Col>
      </Row>
      <br />
      <Row gutter={16}>
        <Col span={6} offset={6} className="Kyong-col-demo">
          col-6 col-offset-6
        </Col>
        <Col span={6} offset={6} className="Kyong-col-demo">
          col-6 col-offset-6
        </Col>
      </Row>
      <br />
      <Row gutter={16}>
        <Col span={8} offset={4} className="Kyong-col-demo">
          Col-8 col-offset-4
        </Col>
        <Col span={8} offset={4} className="Kyong-col-demo">
          Col-8 col-offset-4
        </Col>
      </Row>
    </>
  )
}

export default App
