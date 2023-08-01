import React, { useState, useEffect } from 'react';
import FormUI from './components/FormUI';
import { withRouter } from 'react-router-dom';
import {
  computeDvh,
  removeKeys,
  apiSettings as settings,
  apiBaseSetter,
} from '../commonHelper';
import MerchantList from '../MerchantList';
const initialData = {
  apiKey: '155f86dd-a944-4b25-b3de-200d6a51351e',
  referenceId: `pr${Date.now()}`,
  dvh: '',
  returnUrl: 'https://google.com',
  callbackUrl: 'https://google.com',
  cancelUrl: 'https://google.com',
};
function WebCheckout(props) {
  /* ==================== React Hooks ==================== */
  const [submitType, setSubmitType] = useState('');
  const [responseDvh, setResponseDvh] = useState('');
  const [data, setData] = useState(initialData);
  const [env, setEnv] = useState(localStorage.getItem('env') || 'Development');

  const [merchantList, setMerchantList] = useState(MerchantList);

  const [selectedMerchantData, setSelectedMerchantData] = useState({
    name: '',
    secretKey: '',
  });
  useEffect(() => {
    const { name, secretKey } = merchantList.find((x) => x.env === env) || {};
    if (name && secretKey) {
      setSelectedMerchantData({ name, secretKey, active: true });
    }
  }, []);

  useEffect(() => {
    console.log('Inside use effet : ', responseDvh);
    if (responseDvh) {
      // const filteredData = removeKeys({ ...data });
      const dvhParams = {
        apiKey: data.apiKey,
        referenceId: data.referenceId,
        token: data.token,
      };
      const result = computeDvh(dvhParams, selectedMerchantData.secretKey);
      if (responseDvh === result) {
        const { dvh: exclude, ...rest } = data;
        const requestObject = {
          ...rest,
          dvh: computeDvh(rest, selectedMerchantData.secretKey),
          purpose: 'validation',
        };
        setData(rest);
        console.log('Before calling Second api api : ');
        // 2nd API Call
        verifyRequest(requestObject);
      }
    }
  }, [responseDvh]);

  /* -------------------- FN handleMerchantSelection -------------------- */
  const handleMerchantSelection = (param) => {
    setMerchantList(
      merchantList.map((x) => ({ ...x, active: x.name === param.name }))
    );
    setSelectedMerchantData({ name: param.name, secretKey: param.secretKey });
    setData((state) => ({ ...state, apiKey: param.apiKey }));
  };

  /* -------------------- FN handleGenerateDvh -------------------- */
  const handleGenerateDvh = () => {
    const filteredData = removeKeys({ ...data });
    console.log('filter data : ', filteredData);
    try {
      const result = computeDvh(data, selectedMerchantData.secretKey);
      setData((state) => ({ ...state, dvh: result }));
    } catch (e) {
      console.error(e);
    }
  };

  /* -------------------- FN handleChange -------------------- */
  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'name':
      case 'secretKey': {
        setSelectedMerchantData((state) => ({ ...state, [name]: value }));
        break;
      }
      case 'environment': {
        if (value) {
          setEnv(value);
          localStorage.setItem('env', value);
          const tempMerchant = merchantList.find((x) => x.env === value);
          handleMerchantSelection(tempMerchant);
        }
        break;
      }

      default: {
        console.log('Inside the default : ', name);
        setData((state) => ({ ...state, [name]: value }));
        break;
      }
    }
  };

  /* --------------------2nd API Call FN verifyRequest -------------------- */
  const verifyRequest = async ({ dvh, ...rest }) => {
    console.log('Second api call with :', rest);
    settings.body = JSON.stringify(rest);
    settings.headers = { dvh, 'content-type': 'application/json' };
    try {
      const fetchResponse = await fetch(
        `${apiBaseSetter(env)}merchant/verify-user/token/verify`,
        settings
      );
      const { response = {}, data: successData } = await fetchResponse.json();
      if (response?.status === 200) {
        console.log('test : ', successData);
        const { webCheckoutUrl } = successData;
        console.log('webcheckout utl : ', webCheckoutUrl);
        window.location.replace(webCheckoutUrl);
        // window.open(webCheckoutUrl, '_blank', 'noopener,noreferrer');
      } else {
        alert(response.message);
      }
    } catch (e) {
      console.error(e);
    }
  };

  /* --------------------1st API Call FN requestToken -------------------- */
  const requestToken = async ({ dvh, ...rest }) => {
    settings.headers = { dvh, 'content-type': 'application/json' };
    const tempData = { ...rest, purpose: 'validation' };
    settings.body = JSON.stringify(tempData);
    try {
      const fetchResponse = await fetch(
        `${apiBaseSetter(env)}merchant/verify-user/token`,
        settings
      );
      // const { status, message, data: successData } = await fetchResponse.json();
      const { response = {}, data: successData } = await fetchResponse.json();
      if (response.status && response.status === 200) {
        const { token, dvh, ...rest } = successData;

        let validData = true;
        Object.keys(rest).forEach((x) => {
          validData = validData && rest[x] === data[x];
        });

        if (validData) {
          setData((state) => ({ ...state, token }));
          setResponseDvh(dvh);
        } else {
          alert('Sent data does not match with received data!');
        }
      } else {
        alert(response.message || response.response.message);
      }
    } catch (e) {
      console.error(e);
    }
  };

  /* -------------------- FN handleSubmit -------------------- */
  const handleSubmit = (e) => {
    e.preventDefault();
    if (submitType === 'submit') {
      console.log('data submited : ', data);
      if (data.dvh) {
        // 1st API Call
        requestToken(data);
      }
    }
  };

  return (
    <FormUI
      handleSubmit={handleSubmit}
      handleChange={handleChange}
      handleGenerateDvh={handleGenerateDvh}
      handleMerchantSelection={handleMerchantSelection}
      merchantList={merchantList}
      selectedMerchant={selectedMerchantData}
      data={data}
      env={env}
      setData={setData}
      setSubmitType={setSubmitType}
    />
  );
}

export default withRouter(WebCheckout);
