import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';

import {
  computeDvh,
  removeKeys,
  getParameterByName,
  dataExtractor,
  apiSettings as settings,
  API_BASE,
} from '../commonHelper';
import FailurePage from './FailurePage';
import SuccessPage from './components/SuccessForm';

const RedirectPage = () => {
  const [toDisplay, setToDisplay] = useState(null);

  const [isVerified, setIsVerified] = useState(false);
  const [transactionDetail, setTransactionDetail] = useState({});
  const [verifiedData, setVerifiedData] = useState({});
  useEffect(() => {
    const urlData = getParameterByName('data');
    if (urlData) setTransactionDetail(dataExtractor(urlData));
  }, []);

  const handleVerify = () => {
    const { dvh, ...rest } = transactionDetail;
    const { apiKey, referenceId, token, amount } = rest;

    (async ({ dvh, ...rest }) => {
      settings.headers = { dvh, 'content-type': 'application/json' };
      settings.body = JSON.stringify(rest);
      try {
        const fetchResponse = await fetch(
          `${API_BASE}merchant/web-checkout/verify-transaction`,
          settings
        );
        const { response, data: successData } = await fetchResponse.json();
        if (response.status === 200) {
          console.log(successData);
          setIsVerified(true);
          setVerifiedData(successData);
        } else {
          alert(response.message);
        }
      } catch (e) {
        console.error(e);
      }
    })({
      apiKey,
      referenceId,
      token,
      amount: parseFloat(amount),
      dvh: computeDvh(rest),
    });
  };

  const { txnStatus = '' } = transactionDetail || {};

  const displayComponent = {
    '00': (
      <SuccessPage
        isVerified={isVerified}
        data={transactionDetail}
        title={'Success'}
        handleVerify={handleVerify}
        verifiedData={verifiedData}
      />
    ),
    '01': <FailurePage title={'Transaction Failed'} />,
    '03': <FailurePage title={'Transaction Failed'} />,
  };
  return (
    <Container>
      {displayComponent[txnStatus] || (
        <h1 className="display-4">NOTHING TO DISPLAY</h1>
      )}
    </Container>
  );
};

export default RedirectPage;
