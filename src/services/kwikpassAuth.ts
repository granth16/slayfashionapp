import axios from 'axios';
import {GOKWIK_CONFIG} from '../config/gokwik';

const KWIKPASS_API = 'https://api.gokwik.co';

interface SendOTPResponse {
  success: boolean;
  message: string;
  sessionId?: string;
}

interface VerifyOTPResponse {
  success: boolean;
  token?: string;
  user?: {
    id: string;
    phone: string;
    name?: string;
    email?: string;
  };
}

// Send OTP to phone number
export const sendOTP = async (phoneNumber: string): Promise<SendOTPResponse> => {
  try {
    const response = await axios.post(`${KWIKPASS_API}/api/kwikpass/otp/send`, {
      mid: GOKWIK_CONFIG.merchantId,
      mobile: phoneNumber,
      country_code: '91',
    }, {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': GOKWIK_CONFIG.appSecret,
      },
    });

    return {
      success: true,
      message: 'OTP sent successfully',
      sessionId: response.data.session_id || response.data.request_id,
    };
  } catch (error: any) {
    console.error('Error sending OTP:', error.response?.data || error);
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to send OTP',
    };
  }
};

// Verify OTP
export const verifyOTP = async (
  phoneNumber: string,
  otp: string,
  sessionId: string,
): Promise<VerifyOTPResponse> => {
  try {
    const response = await axios.post(`${KWIKPASS_API}/api/kwikpass/otp/verify`, {
      mid: GOKWIK_CONFIG.merchantId,
      mobile: phoneNumber,
      otp,
      request_id: sessionId,
    }, {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': GOKWIK_CONFIG.appSecret,
      },
    });

    return {
      success: true,
      token: response.data.token || response.data.access_token,
      user: {
        id: response.data.user_id || response.data.customer_id,
        phone: phoneNumber,
        name: response.data.name,
        email: response.data.email,
      },
    };
  } catch (error: any) {
    console.error('Error verifying OTP:', error.response?.data || error);
    return {
      success: false,
    };
  }
};

