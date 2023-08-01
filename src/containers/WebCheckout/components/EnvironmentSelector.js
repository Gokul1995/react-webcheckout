import React, { useState } from 'react';
import { Form, Row, Col, Container, Form } from 'react-bootstrap';
import { environmentSelectorList } from '../../commonHelper';

const EnvironmentSelector = ({ data, handleChange }) => {
  return (
    <Container>
      <h4>Select Environment:</h4>
      <Form.Group>
        <Row>
          <Col>
            {environmentSelectorList.map(each => (
              <Form.Check
                key={each.label}
                type="radio"
                label={each.label}
                value={each.value}
                checked={data === each.value}
                onChange={handleChange}
                name="environment"
              />
            ))}
          </Col>
        </Row>
      </Form.Group>
    </Container>
  );
};

export default EnvironmentSelector;
