import axios from 'axios';
import { toast } from 'react-toastify';

/** Admin Endpoint start **/
export const changePassword = async (password, confirmPassword) => {
  try {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        'x-access-token': token,
      }
    };
    const response = await axios.post(
      `${process.env.REACT_APP_API}admin/update-password`,
      { password: password, confirm_password: confirmPassword },
      config
    );

    return response.data;
  } catch (error) {
    console.error('Error changing password:', error);
    throw error;
  }
};

export const handlevalidToken = async (role) => {
  try {
    const token = localStorage.getItem('token');
    const userToken = localStorage.getItem('userToken');
    const response = await axios.get(`${process.env.REACT_APP_API}check-token`,
      {
        headers: {
          'x-access-token': role === 'admin' ? token : userToken
        }
      },
    );
    console.log('Valid Token res:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error:', error);
  }
};

export const loginUser = async (userName, password) => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_API}admin/login`, { user_name: userName, password });
    return response.data;
  } catch (error) {
    console.error('Error logging in user:', error);
    throw error;
  }
};


export const presaleStageView = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${process.env.REACT_APP_API}presale-stage/view`, {
      headers: {
        'x-access-token': token
      }
    });
    return response.data;
  } catch (error) {
    toast.error(error?.response?.data?.message, { autoClose: 1000 });
    console.error('Unexpected Error: Unable to get data', error);
    throw error;
  }
};


export const presaleStageToggle = async (stage_number) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post(
      `${process.env.REACT_APP_API}presale-stage/toggle`,
      { stage_number },
      {
        headers: {
          'x-access-token': token,
        },
      }
    );
    return response.data;
  } catch (error) {
    toast.error(error?.response?.data?.message, { autoClose: 1000 });
    console.error('Unexpected Error: Unable to get data', error);
    throw error;
  }
};


export const presaleStageUpdate = async (stage_number, percentage_sold, coin_price) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post(
      `${process.env.REACT_APP_API}presale-stage/update`,
      {
        stage_number,
        percentage_sold,
        coin_price
      },
      {
        headers: {
          'x-access-token': token,
        },
      }
    );
    return response.data;
  } catch (error) {
    toast.error(error?.response?.data?.message, { autoClose: 1000 });
    console.error('Unexpected Error: Unable to get data', error);
    throw error;
  }
};



export const updateVestingDate = async (vesting_number, start_date) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post(
      `${process.env.REACT_APP_API}admin/update-vesting-date`,
      {
        vesting_number,
        start_date
      },
      {
        headers: {
          'x-access-token': token,
        },
      }
    );
    console.log("vestingNumberTime", response.data)
    return response.data;
  } catch (error) {
    toast.error(error?.response?.data?.message, { autoClose: 1000 });
    console.error('Unexpected Error: Unable to get data', error);
    throw error;
  }
};

export const vestingOnOff = async (vesting_number, status) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post(
      `${process.env.REACT_APP_API}admin/toggle-vesting`,
      {
        vesting_number,
        status
      },
      {
        headers: {
          'x-access-token': token,
        },
      }
    );
    console.log("Vesting Data", response.data)
    return response.data;
  } catch (error) {
    toast.error(error?.response?.data?.message, { autoClose: 1000 });
    console.error('Unexpected Error: Unable to get data', error);
    throw error;
  }
};


export const adminUpdateData = async (minimum_purchase, maximum_purchase, presale_allocation, listing_price, tge_date) => {
  const token = localStorage.getItem('token');
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API}admin/update-data`,
      {
        minimum_purchase,
        maximum_purchase,
        presale_allocation,
        listing_price,
        tge_date
      },
      {
        headers: {
          'x-access-token': token,
        },
      }
    );
    return response.data;
  } catch (error) {
    toast.error(error?.response?.data?.message, { autoClose: 1000 });
    console.error(error);
    throw error;
  }
};

export const auditValues = async (audit_link, contract_address, vesting_address) => {
  try {
    const token = localStorage.getItem('token');
    console.log("check the token add: ", token);
    const response = await axios.post(
      `${process.env.REACT_APP_API}admin/add-addresses`,
      {
        audit_link,
        contract_address,
        vesting_address
      },
      {
        headers: {
          'x-access-token': token,
        },
      }
    );

    return response.data;
  } catch (error) {
    toast.error(error?.response?.data?.message)
    console.error('Unexpected Error: Unable to update addresses', error);
    throw error;
  }
};

/** Admin Endpoint end **/
