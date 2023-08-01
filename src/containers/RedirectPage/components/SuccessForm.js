import React from 'react';
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  ListGroup,
  Badge,
  CardGroup,
  Card,
} from 'react-bootstrap';

const nameMapper = {
  txnId: 'Transaction Id',
  referenceId: 'Reference Id',
  merchantName: 'Merchant Name',
  bankCode: 'Bank Code',
  amount: 'Amount',
  amount: 'Total Amount',
  charge: 'Charge',
  discount: 'Discount',
};

const verificationNameMapper = { ...nameMapper };
export default ({
  data,
  title,
  handleVerify,
  isVerified = false,
  verifiedData,
}) => (
  <Container className="text-center">
    <h1 className="text-success display-4">{title.toUpperCase()}</h1>
    <Row>
      <Form.Group as={Col}>
        <Button
          variant="success"
          type="button"
          name="reset"
          onClick={handleVerify}
        >
          Verify
        </Button>
      </Form.Group>
    </Row>

    <CardGroup>
      <Card>
        <Card.Header>
          <h3>Received Data </h3>
        </Card.Header>
        <Card.Body>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <Row>
                <Col>
                  <b>Transaction Id</b>
                </Col>
                <Col>{data.txnId || ''}</Col>
              </Row>
            </ListGroup.Item>

            <ListGroup.Item>
              <Row>
                <Col>
                  <b>Reference Id</b>
                </Col>
                <Col>{data.referenceId || ''}</Col>
              </Row>
            </ListGroup.Item>

            <ListGroup.Item>
              <Row>
                <Col>
                  <b>Merchant Name</b>
                </Col>
                <Col>{data.merchantName || ''}</Col>
              </Row>
            </ListGroup.Item>

            <ListGroup.Item>
              <Row>
                <Col>
                  <b>Bank Code</b>
                </Col>
                <Col>{data.bankCode || ''}</Col>
              </Row>
            </ListGroup.Item>

            <ListGroup.Item>
              <Row>
                <Col>
                  <b>Amount</b>
                </Col>
                <Col>{data.amount || ''}</Col>
              </Row>
            </ListGroup.Item>

            {data.charge && (
              <ListGroup.Item>
                <Row>
                  <Col>
                    <b>Charge</b>
                  </Col>
                  <Col>{data.charge || ''}</Col>
                </Row>
              </ListGroup.Item>
            )}

            {data.discount && (
              <ListGroup.Item>
                <Row>
                  <Col>
                    <b>Discount</b>
                  </Col>
                  <Col>{data.discount || ''}</Col>
                </Row>
              </ListGroup.Item>
            )}

            <ListGroup.Item>
              <Row>
                <Col>
                  <b>Total Amount</b>
                </Col>
                <Col>{data.amount || ''}</Col>
              </Row>
            </ListGroup.Item>
          </ListGroup>
        </Card.Body>
      </Card>
      {isVerified && (
        <Card>
          <Card.Header>
            <h3>
              <Badge variant="success">
                Verified Data{' '}
                <svg
                  width="1em"
                  height="1em"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"
                  />
                </svg>
              </Badge>
            </h3>
          </Card.Header>
          <Card.Body>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Row>
                  <Col>
                    <b>Transaction Id</b>
                  </Col>
                  <Col>{verifiedData.txnId || ''}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>
                    <b>Reference Id</b>
                  </Col>
                  <Col>{verifiedData.referenceId || ''}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>
                    <b>Merchant Name</b>
                  </Col>
                  <Col>{verifiedData.merchantName || ''}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>
                    <b>Bank Code</b>
                  </Col>
                  <Col>{verifiedData.bankCode || ''}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>
                    <b>Amount</b>
                  </Col>
                  <Col>{verifiedData.amount || ''}</Col>
                </Row>
              </ListGroup.Item>

              {verifiedData.charge && (
                <ListGroup.Item>
                  <Row>
                    <Col>
                      <b>Charge</b>
                    </Col>
                    <Col>{verifiedData.charge || ''}</Col>
                  </Row>
                </ListGroup.Item>
              )}

              {verifiedData.discount && (
                <ListGroup.Item>
                  <Row>
                    <Col>
                      <b>Discount</b>
                    </Col>
                    <Col>{verifiedData.discount || ''}</Col>
                  </Row>
                </ListGroup.Item>
              )}

              <ListGroup.Item>
                <Row>
                  <Col>
                    <b>Total Amount</b>
                  </Col>
                  <Col>{verifiedData.amount || ''}</Col>
                </Row>
              </ListGroup.Item>
            </ListGroup>
          </Card.Body>
        </Card>
      )}
    </CardGroup>
  </Container>
);
