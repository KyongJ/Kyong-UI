import React from 'react'
import Row from '..'
import Col from '../../Col'

const App: React.FC = () => {
  return (
    <>
      <Row gutter={16}>
        <Col xs={2} sm={4} md={6} lg={8} xl={10} className="Kyong-col-demo">
          Col
        </Col>
        <Col xs={20} sm={16} md={12} lg={8} xl={4} className="Kyong-col-demo">
          Col
        </Col>
        <Col xs={2} sm={4} md={6} lg={8} xl={10} className="Kyong-col-demo">
          Col
        </Col>
      </Row>
    </>
  )
}

export default App
